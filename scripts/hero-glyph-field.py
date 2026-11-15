#!/usr/bin/env python3
# Generates public/brand/home/hero-glyph-field.webp, the homepage hero's glyph field (see docs/design/README.md).
# Usage (from the repo root): python3 scripts/hero-glyph-field.py [out.webp]
# Needs: pip install numpy scipy pillow cairosvg   (about 5 s; the output is deterministic for the same inputs)
#
# Everything is in hero-stage units (1 unit = 1 px at 1280 wide) and rendered at S px per unit. The image covers
# stage x XL..XL+WU and y 0..HU; app/lanes-home.css places it at 1x, with the head under the Programs / Resources gap.
# Inputs in scripts/hero-glyph-field/:
#   glyphs/       the 20 CC glyphs (bone SVGs from the brand asset pack); only their shape is used
#   silhouette.png  the seated figure's outline (white on black), traced from a reference image Dat supplied (Nov 12):
#                   confirm that image's licence before launch
#   tone.png      the figure's inner shading, 16-bit greyscale, same size as the silhouette
import io,os,sys,numpy as np,cairosvg
from PIL import Image
from scipy import ndimage as nd

ROOT=os.path.dirname(os.path.abspath(__file__)); IN=os.path.join(ROOT,'hero-glyph-field')
OUT=sys.argv[1] if len(sys.argv)>1 else os.path.join(ROOT,'..','public','brand','home','hero-glyph-field.webp')
QUALITY=82

# ── Settings ────────────────────────────────────────────────────────────────────────────────────────────────
S=2                       # px per stage unit
XL,WU,HU=-480,2240,1150   # image extent in stage units (overhangs both sides for wide screens)
CX,TOP,HT=840,80,624      # figure: centre x, top of head, height (Nov 15: head 80 units below the stage top, clear of the header)
SP,GS=28,15               # glyph grid pitch and glyph size (Nov 15: larger and sparser; was 19.8, 11.7)
DTOP_OFFSET=72            # dispersal starts this far above the seat line (TOP+HT)
DBOT=1100                 # dispersal ends here (just above the phase boxes, which start at 1110)
FLOOR=0.22                # minimum density through the dispersal, so no area empties
BX0,BXW=40,300            # phase box columns: falling glyphs take the colour of the column below them
FIELD_COLOUR=0.10         # share of field glyphs that take a phase colour (rising towards the bottom)
FIG_STRENGTH=0.95         # how far the figure stands out from the field (0 = invisible)
FIG_COLOUR_BOOST=1.7      # extra ink for the figure's coloured glyphs
GAIN=1.9                  # overall darkness of the field
RAIN_ALPHA=0.75           # opacity of the falling coloured glyphs
RING=41                   # width of each colour ring around the heart
CROWN=96                  # no clay within this many units of the top of the head
SEED=7
# Copy area (Nov 15): no glyphs behind "LIVE IN PRACTICE", the lede or the button. Rectangles in stage units
# (x0, y0, x1, y1) taken from the page at 1440 x 900, padded; the edge is roughened by EDGE_JITTER.
COPY_CLEAR=[(-480,0,720,300),(-480,0,410,505)]
EDGE_JITTER=14
# Warp (Nov 15): the grid bends around the figure. Glyphs near the outline are pushed outward along it, with a little
# twist, and glyphs inside the body grow, so the figure reads as a swelling in the field.
WARP_SIGMA=42             # how far from the outline the bend reaches (units)
WARP=26                   # largest push (units)
WARP_TWIST=0.55           # share of the push turned along the outline
SWELL=0.4                 # extra glyph size inside the figure
FIG_FILL=0.05             # strength of the faint shaded body behind the figure's glyphs
# ────────────────────────────────────────────────────────────────────────────────────────────────────────────

DX=-XL
def P(v): return int(round(v*S))
W_,H_=P(WU),P(HU)
BASE=TOP+HT; DTOP=BASE-DTOP_OFFSET
m=np.asarray(Image.open(os.path.join(IN,'silhouette.png')).convert('L'))>127
T=np.asarray(Image.open(os.path.join(IN,'tone.png')),np.float32)/65535
ys,xs=np.nonzero(m); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max(); sc=HT/(y1-y0)
def place(arr):
    c=arr[y0:y1+1,x0:x1+1].astype(np.float32); h,w=c.shape
    a=np.asarray(Image.fromarray(c,'F').resize((P(w*sc),P(h*sc)),Image.BICUBIC))
    out=np.zeros((H_,W_),np.float32); ox=P(CX-w*sc/2+DX); oy=P(TOP); out[oy:oy+a.shape[0],ox:ox+a.shape[1]]=a; return out
Mf=nd.gaussian_filter(place(m.astype(np.float32)),2.0*S); M=np.clip((Mf-0.5)*6+0.5,0,1)
Tf=place(np.where(m,T,0)); W8=place(m.astype(np.float32))
Tn=nd.gaussian_filter(Tf,4*S)/np.maximum(nd.gaussian_filter(W8,4*S),1e-3)
Bf=0.22+0.78*np.clip(Tn,0,1)**0.9; d_in=nd.distance_transform_edt(Mf>0.5)/S; Bf=np.clip(Bf+0.2*np.exp(-(d_in/4.0)**2),0,1)
gd=os.path.join(IN,'glyphs'); files=sorted(f for f in os.listdir(gd) if f.endswith('.svg'))
SCALES=[1.0,1.12,1.24,1.36]
def raster(f,k): m=P(GS*k); return np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(url=f'{gd}/{f}',output_width=m,output_height=m))).convert('RGBA'),np.float32)[...,3]/255
GL=[[raster(f,k) for f in files] for k in SCALES]; gl=GL[0]
# Warp field: the blurred figure mask's gradient gives the outward direction along the outline.
Dm=nd.gaussian_filter(M,WARP_SIGMA*S); gy,gx=np.gradient(Dm); mag=np.hypot(gx,gy); gmax=mag.max() or 1
Ms=nd.gaussian_filter(M,6*S)
def warp(x,y):
    i=min(max(P(y),0),H_-1); k=min(max(P(x+DX),0),W_-1)
    ox,oy=-gx[i,k]/gmax,-gy[i,k]/gmax          # outward, 0..1
    dx=WARP*(ox-WARP_TWIST*oy); dy=WARP*(oy+WARP_TWIST*ox)
    return dx,dy,Ms[i,k]
def cleared(x,y):
    j=np.random.normal(0,EDGE_JITTER)
    return any(x0<=x<=x1+j and y0<=y<=y1+j for x0,y0,x1,y1 in COPY_CLEAR)
rng=np.random.default_rng(SEED); np.random.seed(3)
COL={'marigold':(217,143,43),'clay':(166,58,46),'sage':(76,107,84),'blue':(69,107,134)}; PC=['marigold','clay','sage','blue']
def ss(t): t=np.clip(t,0,1); return t*t*(3-2*t)
def quarter(x): return int(np.clip((x-BX0+np.random.normal(0,22))//BXW,0,3))
CI=np.zeros((H_,W_,3),np.float32)+np.array([30,29,26.],np.float32); AC=np.zeros((H_,W_),np.float32)
A=np.zeros((H_,W_),np.float32); Cg=np.zeros((H_,W_,3),np.float32); Cw=np.zeros((H_,W_),np.float32)
HX,HY=CX,TOP+0.40*HT
for j,y in enumerate(np.arange(-SP,HU+SP,SP)):
    for x in np.arange(XL-SP,XL+WU+SP,SP)+(SP/2 if j%2 else 0):
        gi=rng.integers(20); u=rng.random(); col=None
        if cleared(x,y): continue
        wx,wy,ins=warp(x,y); si=int(np.clip(round(ins*SWELL/0.12),0,len(SCALES)-1)); g=GL[si][gi]; n=g.shape[0]
        if y>=DTOP:
            t=np.clip((y-DTOP)/(DBOT-DTOP),0,1)
            edge=0.5+0.22*np.sin(x/97+1.3)+0.14*np.sin(x/41+0.4)+0.08*np.sin(x/23+2.1)
            p=np.clip(1-ss((t-edge*0.8)/0.55),0,1)*(1-0.5*t); p=max(p,FLOOR*(1-0.6*t)); p*=1-ss((y-(DBOT-30))/50)
            if u>p: continue
            if np.random.random()<ss((t-0.05)/0.45): col=PC[quarter(x)]
        X=P(x+wx+DX)-n//2; Y=P(y+wy)-n//2
        if X<0 or Y<0 or X+n>W_ or Y+n>H_: continue
        if col:
            Cg[Y:Y+n,X:X+n]+=g[...,None]*np.array(COL[col],np.float32); Cw[Y:Y+n,X:X+n]=np.maximum(Cw[Y:Y+n,X:X+n],g); continue
        A[Y:Y+n,X:X+n]=np.maximum(A[Y:Y+n,X:X+n],g)
        inside=M[min(P(y),H_-1),min(max(P(x+DX),0),W_-1)]>0.5; acc=None
        if inside:
            r=np.hypot(x-HX,(y-HY)*0.8)+np.random.normal(0,7); acc=PC[int(r//RING)%4]
            if acc=='clay' and y<TOP+CROWN: acc='marigold'
        elif y<BASE+10:
            prog=np.clip((y+70)/(BASE+80),0,1)
            if np.random.random()<FIELD_COLOUR*(0.15+0.85*prog**1.5): acc=PC[quarter(x)]
        if acc:
            mk=g>0.05; CI[Y:Y+n,X:X+n][mk]=np.array(COL[acc],np.float32); AC[Y:Y+n,X:X+n]=np.maximum(AC[Y:Y+n,X:X+n],g)
yy,xx=np.mgrid[0:H_,0:W_].astype(np.float32)/S; xs_=xx-DX
left=0.45+0.55*ss((xs_-380)/360)
B=np.clip((0.17*left*(1-M)+(0.17+FIG_STRENGTH*(Bf-0.17))*M)*0.85*GAIN,0,1)
BONE=np.array([242,236,220.])
amt=np.clip(A*B*np.where(AC>0.05,np.where(M>0.5,FIG_COLOUR_BOOST*1.9,1.9),1.0),0,1)
c=BONE+amt[...,None]*(CI-BONE)
colr=Cg/np.maximum(Cw[...,None],1e-3); a=Cw*RAIN_ALPHA; c=c*(1-a[...,None])+colr*a[...,None]
# Body relief (Nov 15): a faint warm shading inside the figure, following its tone, so the shape reads behind the glyphs.
rel=(FIG_FILL*nd.gaussian_filter(M,10*S)*(0.35+0.65*np.clip(Tn,0,1)))[...,None]; c=c*(1-rel)+np.array([120,96,70.])*rel
im=Image.fromarray(c.round().clip(0,255).astype(np.uint8))
im.save(OUT,quality=QUALITY,method=6); print(OUT, im.size, os.path.getsize(OUT),'bytes')
