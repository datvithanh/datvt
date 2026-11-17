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
CX,TOP,HT=840,26,624      # figure: centre x, top of head, height (Nov 15: +20%, was 520)
SP,GS=19.8,11.7           # glyph grid pitch and glyph size (Nov 15: +20%, was 16.5, 9.75)
DTOP_OFFSET=72            # dispersal starts this far above the seat line (TOP+HT)
DBOT=1100                 # dispersal ends here (just above the phase boxes, which start at 1110)
FLOOR=0.22                # minimum density through the dispersal, so no area empties
BX0,BXW=40,300            # phase box columns: falling glyphs take the colour of the column below them
FIELD_COLOUR=0.0          # share of field glyphs that take a phase colour (rising towards the bottom)
FIG_STRENGTH=0.35         # how far the figure stands out from the field (0 = invisible)
FIG_COLOUR_BOOST=1.5      # extra ink for the figure's coloured glyphs
GAIN=2.3                  # overall darkness of the field
RAIN_ALPHA=0.75           # opacity of the falling coloured glyphs
RING=41                   # width of each colour ring around the heart
CROWN=96                  # no clay within this many units of the top of the head
SEED=7
# Relief (Nov 17, after Dat's dark reference): the figure is a raised surface under the grid. Every glyph, field and
# figure alike, is shifted by that surface, so rows arch up over the body and fold at its edges, like a grid draped
# over it; light from the top left shades the slopes. Glyph sizes never change, and figure membership is tested at
# each glyph's shifted position, so the outline stays exact.
RELIEF_SOFT=44            # softness of the surface's edge (units): smaller = sharper fold at the outline
RELIEF_LIFT=24            # how far the grid lifts over the body (units, upwards)
RELIEF_SWELL=0.07         # how much the grid widens over the body, from its centre line (share of the distance)
RELIEF_FOLD=0             # extra pull of the grid into the edge (units): rows bunch at the outline
EMBOSS=0.55               # light and shadow on the slopes (0 = none)
# Glyphs on the 3D body (Nov 17): each figure glyph is bent by the surface under it. The body is the silhouette inflated
# into a rounded form (with the shading map adding the inner forms), and each glyph is squashed along the slope by how
# far the surface turns away from the viewer (foreshortening) and tilted with it: full size on the flat parts, thin
# slivers at the outline. Field glyphs stay flat.
GLYPH_3D=False            # Nov 17 trial, off: set True to bend the figure glyphs (not on the site yet)
BODY_ROUND=55             # how far in from the outline the body rounds over (units): larger = rounder, more squashing
BODY_FORM=0.45            # how much the shading map shapes the inner forms (arms, legs)
SQUASH_MIN=0.22           # thinnest a glyph gets at the outline (share of its width)
TILT=0.18                 # extra shear of a glyph along the slope (0 = squash only)
# Figure clarity (Nov 16): colour only inside the figure (FIELD_COLOUR 0), a quiet halo of lighter glyphs just outside
# the outline, the figure's shading carried by glyph strength, and the grid centred on the figure's axis.
HALO=30                   # width of the halo outside the outline (units)
HALO_MIN=1.0              # field strength at the outline (1 = no halo; Nov 17: off, replaced by the warp)
SHADE_MIN=0.85            # glyph strength in the figure's lightest shading (0..1)
SHADE_DARK=0.38           # how far deep shading darkens the figure's colours towards ink
SHADE_GAMMA=1.1           # contrast of the shading (higher = more modelling)
DISPERSE=False            # False: the field stays an even grid below the figure (the page fades it out); True: the old
                          # irregular dispersal with phase-coloured falling glyphs
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
n=P(GS); gl=[np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(url=f'{gd}/{f}',output_width=n,output_height=n))).convert('RGBA'),np.float32)[...,3]/255 for f in files]
# Relief surface: Hs (0..1) is the figure softened at its edge, with a little of its inner shading for form.
Hs=nd.gaussian_filter(M,RELIEF_SOFT*S); Hs=Hs*(0.85+0.15*nd.gaussian_filter(np.clip(Tn,0,1),8*S))
hy,hx=np.gradient(Hs); hy*=S; hx*=S; gmax=np.hypot(hx,hy).max() or 1
def warp(x,y):
    i=min(max(P(y),0),H_-1); k=min(max(P(x+DX),0),W_-1); h=Hs[i,k]
    return RELIEF_SWELL*h*(x-CX)+RELIEF_FOLD*hx[i,k]/gmax, -RELIEF_LIFT*h+RELIEF_FOLD*hy[i,k]/gmax
# 3D body for the glyph shapes: inflated silhouette plus inner forms; nzb = how much each point faces the viewer.
d_body=nd.distance_transform_edt(Mf>0.5)/S
prof=np.sqrt(np.clip(1-(1-np.clip(d_body/BODY_ROUND,0,1))**2,0,1))
form=nd.gaussian_filter(Tf,10*S)/np.maximum(nd.gaussian_filter(W8,10*S),1e-3); fm=Mf>0.5
form=np.clip((form-np.percentile(form[fm],10))/(np.percentile(form[fm],90)-np.percentile(form[fm],10)+1e-6),0,1)
hb=nd.gaussian_filter(BODY_ROUND*prof*((1-BODY_FORM)+BODY_FORM*form)*fm,3*S)
hby,hbx=np.gradient(hb); hbx*=S; hby*=S; nzb=1/np.sqrt(1+hbx**2+hby**2)
def body_glyph(g,x,y):
    i=min(max(P(y),0),H_-1); k=min(max(P(x+DX),0),W_-1)
    f=max(SQUASH_MIN,float(nzb[i,k]))
    if f>0.985: return g
    th=np.arctan2(hby[i,k],hbx[i,k]); c,s_=np.cos(th),np.sin(th)
    R=np.array([[c,-s_],[s_,c]])                                  # columns: slope direction, along the contour (x,y)
    Mx=R@np.array([[f,TILT*(1-f)],[0,1]])@R.T                     # glyph -> screen: squash along the slope, slight shear
    Mx=Mx[::-1,::-1]                                              # to (row, col) order
    inv=np.linalg.inv(Mx); n_=g.shape[0]; cc=np.array([(n_-1)/2,(n_-1)/2])
    return nd.affine_transform(g,inv,offset=cc-inv@cc,order=1,mode='constant',cval=0)
rng=np.random.default_rng(SEED); np.random.seed(3)
COL={'marigold':(217,143,43),'clay':(166,58,46),'sage':(76,107,84),'blue':(69,107,134)}; PC=['marigold','clay','sage','blue']
def ss(t): t=np.clip(t,0,1); return t*t*(3-2*t)
def quarter(x): return int(np.clip((x-BX0+np.random.normal(0,22))//BXW,0,3))
CI=np.zeros((H_,W_,3),np.float32)+np.array([30,29,26.],np.float32); AC=np.zeros((H_,W_),np.float32)
A=np.zeros((H_,W_),np.float32); Cg=np.zeros((H_,W_,3),np.float32); Cw=np.zeros((H_,W_),np.float32)
HX,HY=CX,TOP+0.40*HT
for j,y in enumerate(np.arange(-SP,HU+SP,SP)):
    for x in np.arange(CX-np.ceil((CX-(XL-SP))/SP)*SP,XL+WU+SP,SP)+(SP/2 if j%2 else 0):   # a column on the figure's axis
        g=gl[rng.integers(20)]; u=rng.random(); col=None
        wx,wy=warp(x,y)
        if DISPERSE and y>=DTOP:
            t=np.clip((y-DTOP)/(DBOT-DTOP),0,1)
            edge=0.5+0.22*np.sin(x/97+1.3)+0.14*np.sin(x/41+0.4)+0.08*np.sin(x/23+2.1)
            p=np.clip(1-ss((t-edge*0.8)/0.55),0,1)*(1-0.5*t); p=max(p,FLOOR*(1-0.6*t)); p*=1-ss((y-(DBOT-30))/50)
            if u>p: continue
            if np.random.random()<ss((t-0.05)/0.45): col=PC[quarter(x)]
        X=P(x+wx+DX)-n//2; Y=P(y+wy)-n//2
        if X<0 or Y<0 or X+n>W_ or Y+n>H_: continue
        if col:
            Cg[Y:Y+n,X:X+n]+=g[...,None]*np.array(COL[col],np.float32); Cw[Y:Y+n,X:X+n]=np.maximum(Cw[Y:Y+n,X:X+n],g); continue
        inside=M[min(max(P(y+wy),0),H_-1),min(max(P(x+wx+DX),0),W_-1)]>0.5; acc=None   # tested where the glyph lands
        if inside and GLYPH_3D: g=body_glyph(g,x+wx,y+wy)
        A[Y:Y+n,X:X+n]=np.maximum(A[Y:Y+n,X:X+n],g)
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
halo=HALO_MIN+(1-HALO_MIN)*ss(nd.distance_transform_edt(Mf<=0.5)/S/HALO)
B=np.clip((0.17*left*halo*(1-M)+(0.17+FIG_STRENGTH*(Bf-0.17))*M)*0.85*GAIN,0,1)
BONE=np.array([242,236,220.])
amt=np.clip(A*B*np.where(AC>0.05,np.where(M>0.5,FIG_COLOUR_BOOST*1.9,1.9),1.0),0,1)
# Shading models the body: figure glyphs are at least SHADE_MIN strong, and darken towards ink where the tone is deep.
sh=np.clip(Bf,0,1)**SHADE_GAMMA
FG=(M>0.5)&(AC>0.05)   # the figure's own glyph pixels (field glyphs overlapping the edge keep the field's look)
amt=np.where(FG,A*(SHADE_MIN+(1-SHADE_MIN)*sh),amt)
CI=np.where(FG[...,None],CI*(1-SHADE_DARK*sh[...,None]),CI)
# Emboss: slopes facing the light (top left) get lighter glyphs, slopes facing away darker ones.
lit=-(hx*-0.55+hy*-0.83)/gmax; amt=np.clip(amt*(1+EMBOSS*np.clip(lit*2.2,-1,1)),0,1)
c=BONE+amt[...,None]*(CI-BONE)
colr=Cg/np.maximum(Cw[...,None],1e-3); a=Cw*RAIN_ALPHA; c=c*(1-a[...,None])+colr*a[...,None]
im=Image.fromarray(c.round().clip(0,255).astype(np.uint8))
im.save(OUT,quality=QUALITY,method=6); print(OUT, im.size, os.path.getsize(OUT),'bytes')
