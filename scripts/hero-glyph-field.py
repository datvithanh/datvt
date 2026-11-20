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
LAYER=os.environ.get('LAYER','solid')     # Nov 19: solid (the whole field) or sparse (the spread below and left)
if LAYER=='solid' and os.environ.get('ONLY')!='1':   # render the sparse layer too
    import subprocess; subprocess.run([sys.executable,__file__]+sys.argv[1:],env={**os.environ,'LAYER':'sparse'},check=True)
if LAYER=='sparse': OUT=OUT.replace('.webp','-sparse.webp')
QUALITY=82

# ── Settings ────────────────────────────────────────────────────────────────────────────────────────────────
S=2                       # px per stage unit
XL,WU,HU=-480,2240,1150   # image extent in stage units (overhangs both sides for wide screens)
CX,TOP,HT=840,26,760      # figure: centre x, top of head, height (Nov 15: +20%, was 520)
SP,GS=32.2,17.5           # glyph grid pitch and glyph size (Nov 15: +20%, was 16.5, 9.75)
DTOP_OFFSET=72            # dispersal starts this far above the seat line (TOP+HT)
DBOT=1100                 # dispersal ends here (just above the phase boxes, which start at 1110)
FLOOR=0.22                # minimum density through the dispersal, so no area empties
BX0,BXW=40,300            # phase box columns: falling glyphs take the colour of the column below them
FIELD_COLOUR=0.0          # share of field glyphs that take a phase colour (rising towards the bottom)
# Section colours (Dat, Nov 17): field glyphs are picked to take the colour of the phase box below them. The image
# can't do the colouring itself (the field is placed against the header, the boxes against the stage, so they slide
# against each other with screen size), so the picked glyphs go to a second image, TINT_OUT, which the page uses as a
# mask over four colour columns placed against the boxes (app/lanes-home.css, .ln-field-tint). Positions don't change.
# Nov 18 (Dat, "uniform"): every glyph that has broken loose from the field (the edge and bottom break-up, LOOSE_EDGE /
# any bottom thinning) takes its colour; the whole field stays grey. No random mix of grey and coloured glyphs.
FIELD_SPLIT=float(os.environ.get('FIELD_SPLIT','1'))
LOOSE_EDGE=0.05           # how far into the edge break-up (0..1) a glyph counts as loose
# Nov 18 (Dat, "more uniformity & solidity to the bottom left corner ... colours start lower ... progressively"): below the
# cut's end the field stays nearly whole and on grid, then thins and drifts over CORNER_RAMP units, the same at every
# screen size (the page's mask widens it into the corner on a soft diagonal). The share of coloured glyphs rises with
# how far a glyph has come loose (COL_GAMMA > 1 = colour later).
CORNER_RAMP=200
COL_GAMMA=1.4
FIG_STRENGTH=0.35         # how far the figure stands out from the field (0 = invisible)
FIG_COLOUR_BOOST=1.5      # extra ink for the figure's coloured glyphs
GAIN=1.6                  # overall darkness of the field
RAIN_ALPHA=0.75           # opacity of the falling coloured glyphs
RING=50                   # width of each colour ring around the heart
CROWN=117                 # no clay within this many units of the top of the head
SEED=7
# Relief (Nov 17, after Dat's dark reference): the figure is a raised surface under the grid. Every glyph, field and
# figure alike, is shifted by that surface, so rows arch up over the body and fold at its edges, like a grid draped
# over it; light from the top left shades the slopes. Glyph sizes never change, and figure membership is tested at
# each glyph's shifted position, so the outline stays exact.
RELIEF_SOFT=44            # softness of the surface's edge (units): smaller = sharper fold at the outline
RELIEF_LIFT=30            # how far the grid lifts over the body (units, upwards)
RELIEF_SWELL=0.07         # how much the grid widens over the body, from its centre line (share of the distance)
RELIEF_FOLD=0             # extra pull of the grid into the edge (units): rows bunch at the outline
EMBOSS=0.55               # light and shadow on the slopes (0 = none)
# Glyphs on the 3D body (Nov 17): each figure glyph is bent by the surface under it. The body is the silhouette inflated
# into a rounded form (with the shading map adding the inner forms), and each glyph is squashed along the slope by how
# far the surface turns away from the viewer (foreshortening) and tilted with it: full size on the flat parts, thin
# slivers at the outline. Field glyphs stay flat.
GLYPH_3D=True             # Nov 17 trial, off: set True to bend the figure glyphs (not on the site yet)
BODY_ROUND=90             # how far in from the outline the body rounds over (units): larger = rounder, more squashing
BODY_FORM=0.45            # how much the shading map shapes the inner forms (arms, legs)
SQUASH_MIN=0.18           # thinnest a glyph gets at the outline (share of its width)
TILT=0.22                 # extra shear of a glyph along the slope (0 = squash only)
SKIRT=34                  # the sheet slopes down from the body into the field over this distance (units): field glyphs
SKIRT_DROP=0.55           #   there squash and tilt too; SKIRT_DROP is the slope at the outline relative to the body's edge
# Figure definition (Nov 17): a very faint ink outline along the silhouette, and soft shading of the body itself from the
# shading map (darker where the form turns away), so the shape reads between the glyphs.
OUTLINE=0.0               # strength of the outline (0..1 of ink); Nov 17: off, shading only
OUTLINE_W=1.4             # its width (units)
BODY_SHADE=0.05           # strength of the body shading (0..1 of ink)
# Figure clarity (Nov 16): colour only inside the figure (FIELD_COLOUR 0), a quiet halo of lighter glyphs just outside
# the outline, the figure's shading carried by glyph strength, and the grid centred on the figure's axis.
HALO=30                   # width of the halo outside the outline (units)
HALO_MIN=1.0              # field strength at the outline (1 = no halo; Nov 17: off, replaced by the warp)
SHADE_MIN=0.85            # glyph strength in the figure's lightest shading (0..1)
SHADE_DARK=0.38           # how far deep shading darkens the figure's colours towards ink
SHADE_GAMMA=1.1           # contrast of the shading (higher = more modelling)
DISPERSE=False            # False: the field stays an even grid below the figure (the page fades it out); True: the old
                          # irregular dispersal with phase-coloured falling glyphs
# Fragmenting edges (Nov 17): the field breaks up along the waterfall line on its left and below the figure, instead of
# being cut by a mask. Near the edge glyphs thin out in uneven clumps, a few stragglers wander past it, and the rest
# drift outwards. Only field glyphs; the figure is untouched. The line is the waterfall curve in stage units, placed as on
# the page at 1440 px wide (stage x = image x + EDGE_SHIFT); it shifts by under 100 units at other widths.
EDGE_PATH=[(500,-60),(500,560),('C',(500,700),(330,780),(150,880)),('C',(20,960),(-120,1060),(-220,1210))]
SOLID_TO=610              # above this (stage y) the page's CSS cuts the field crisply at x 500; the image keeps it whole
EDGE_SHIFT=141.5
EDGE_BAND=230             # how far inside the line the field starts to break up (units)
EDGE_OUT=110              # how far past the line stragglers reach (units)
EDGE_KEEP=0.30            # share of glyphs left right at the line
EDGE_DRIFT=26             # how far glyphs drift outwards at the line (units)
CLUMP=0.35                # unevenness of the break-up (0 = even thinning)
BOTTOM_START=-10          # the bottom break-up starts this far below the seat line (units)
BOTTOM_LEN=230            # and runs over this distance
BOTTOM_KEEP=0.05          # share of glyphs left at its end
BOTTOM_DRIFT=22           # how far glyphs drift downwards at its end (units)
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
hb=BODY_ROUND*prof*((1-BODY_FORM)+BODY_FORM*form)*fm
d_fld=nd.distance_transform_edt(~fm)/S                       # the skirt: the sheet falls from the outline into the field
hb=hb+(~fm)*SKIRT_DROP*SKIRT*np.exp(-d_fld/SKIRT)
hb=nd.gaussian_filter(hb,3*S)
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
# Waterfall line -> signed distance from it (units, + inside the field), on the image grid.
from PIL import ImageDraw
def _bez(p0,p1,p2,p3,k=40): return [tuple((1-t)**3*np.array(p0)+3*(1-t)**2*t*np.array(p1)+3*(1-t)*t*t*np.array(p2)+t**3*np.array(p3)) for t in np.linspace(0,1,k)[1:]]
_pts=[EDGE_PATH[0]]
for seg in EDGE_PATH[1:]:
    _pts+= _bez(_pts[-1],*seg[1:]) if seg[0]=='C' else [seg]
_poly=[(P(x-EDGE_SHIFT+DX),P(y)) for x,y in _pts]+[(W_+P(200),P(HU+200)),(W_+P(200),-P(200))]
_im=Image.new('L',(W_,H_),0); ImageDraw.Draw(_im).polygon(_poly,fill=255); FM=np.asarray(_im)>127
dE=(nd.distance_transform_edt(FM)-nd.distance_transform_edt(~FM))/S
_eg=nd.gaussian_filter(dE,4*S); eGy,eGx=np.gradient(_eg); eGn=np.hypot(eGx,eGy)+1e-6        # points into the field
_rs=np.random.default_rng(99)
_rc=np.random.default_rng(7)   # section colours (own stream, so nothing else moves)
_nc=nd.gaussian_filter(_rs.normal(size=(int(HU/8)+2,int(WU/8)+2)),2.2); _nc/=_nc.std()
def clump(x,y): return _nc[min(int(y/8),_nc.shape[0]-1),min(max(int((x-XL)/8),0),_nc.shape[1]-1)]
def fragment(x,y,u):
    # -> (keep, dx, dy, loose) for a field glyph landing at (x,y); loose = how far it has come loose (0..1)
    i=min(max(P(y),0),H_-1); k=min(max(P(x+DX),0),W_-1); e=dE[i,k]
    if e>=EDGE_BAND: pe=1.0; te=0.0
    elif e>=0: te=1-e/EDGE_BAND; te=te*te*(3-2*te); pe=1-(1-EDGE_KEEP)*te
    else: te=1.0; pe=EDGE_KEEP*np.exp(e/EDGE_OUT)
    wsol=1-ss((y-(SOLID_TO-30))/CORNER_RAMP)                 # whole above SOLID_TO − 30 on both sides of the line: the page's CSS cut
                                                             # through "CE" is the only edge there at every screen size (Dat, Nov 17);
                                                             # below it the break-up comes in over CORNER_RAMP (Nov 18)
    td=te*ss((y-(SOLID_TO-30))/(2*CORNER_RAMP))                # drift comes in more slowly than the thinning: glyphs stay on grid
    pe=pe+(1-pe)*wsol; te=te*(1-wsol)
    tb=np.clip((y-(TOP+HT+BOTTOM_START))/BOTTOM_LEN,0,1); tb=tb*tb*(3-2*tb); pb=1-(1-BOTTOM_KEEP)*tb
    p=pe*pb
    if p<1: p=np.clip(p+CLUMP*clump(x,y)*min(p,1-p)*2,0,1)
    if u>p: return False,0.0,0.0,False
    dx=-EDGE_DRIFT*td*eGx[i,k]/eGn[i,k]+_rs.normal(0,0.3*EDGE_DRIFT*td+0.3*BOTTOM_DRIFT*tb)
    dy=-EDGE_DRIFT*td*eGy[i,k]/eGn[i,k]+abs(_rs.normal(0,BOTTOM_DRIFT*tb))
    lo=max(te,tb); return True,dx,dy,(lo if lo>LOOSE_EDGE or tb>0 else 0.0)
# Two layers (Dat, Nov 19): the page shows the whole field (LAYER solid) inside a rectangle, right of the cut through
# "CE" and above SOLID_BOTTOM, and this sparse layer (LAYER sparse) below and to the left of it. Both masks are placed
# against the stage, so the rectangle keeps its edges at every screen size. The sparse layer: glyphs kept at
# SPARSE_KEEP, thinning to the left of the old edge line (SIDE_OUT) and downwards below the rectangle (SPARSE_FALL to
# SPARSE_END). Above SOLID_BOTTOM they only drift left and down, by under 6 units, so none crosses into the rectangle.
SOLID_BOTTOM=853.3        # the gap between the glyph rows at y 837.2 and 869.4
SPARSE_KEEP=0.225         # below the rectangle, at its edge
SIDE_OUT=200
SPARSE_FALL=300
SPARSE_END=0.015
ASH_FADE=0.6             # Nov 19 (Dat, "like ashes"): falling glyphs fade unevenly, up to this much at the bottom
LEFT_KEEP=0.2            # left of the cut, above the bottom edge (Nov 19: kept low and sparse)
SPARSE_CLUMP=0.05        # less clumping than the old break-up: no big empty patches
_rk=np.random.default_rng(11)
# Nov 20 (Dat): inside the rectangle the bottom three glyph rows (y 772.8, 805, 837.2) fragment gradually: about 5%,
# 30% and 55% of their glyphs gone, the rest loosened by up to 4 units.
FRAG_TOP=756.7
FRAG_LOSS=0.6
_rf=np.random.default_rng(13)
def sparse(x,y,u):
    # -> (keep, dx, dy, loose) for a field glyph of the sparse layer landing at (x,y); loose (0..1) drives its colour
    i,k=min(max(P(y),0),H_-1),min(max(P(x+DX),0),W_-1); e=dE[i,k]
    hx=float(np.exp(min(e,0)/SIDE_OUT))
    t=ss((y-SOLID_BOTTOM)/SPARSE_FALL) if y>SOLID_BOTTOM else 0.0
    p=(LEFT_KEEP if y<SOLID_BOTTOM else SPARSE_KEEP*(1-t)+SPARSE_END*t)*hx
    p=float(np.clip(p+SPARSE_CLUMP*clump(x,y)*min(p,1-p)*2,0,1))
    if u>p: return False,0.0,0.0,0.0
    if y<SOLID_BOTTOM: dx=-min(abs(_rk.normal(0,3)),6); dy=min(abs(_rk.normal(0,3)),6)
    else: dx=_rk.normal(0,6+18*t); dy=abs(_rk.normal(0,6+24*t))   # ash: scattered well off the grid as it falls
    lo=max(ss((y-(SOLID_BOTTOM-40))/80), 1-hx, ss((y-600)/250) if e<0 else 0.0)   # most glyphs below the edge are coloured
    return True,dx,dy,(lo,1-ASH_FADE*t*_rk.random())
rng=np.random.default_rng(SEED); np.random.seed(3)
COL={'marigold':(217,143,43),'clay':(166,58,46),'sage':(76,107,84),'blue':(69,107,134)}; PC=['marigold','clay','sage','blue']
def ss(t): t=np.clip(t,0,1); return t*t*(3-2*t)
def quarter(x): return int(np.clip((x-BX0+np.random.normal(0,22))//BXW,0,3))
CI=np.zeros((H_,W_,3),np.float32)+np.array([30,29,26.],np.float32); AC=np.zeros((H_,W_),np.float32)
TA=np.zeros((H_,W_),np.float32); TB=np.zeros((H_,W_),np.float32)   # glyphs picked for section colour, in two halves
A=np.zeros((H_,W_),np.float32); Cg=np.zeros((H_,W_,3),np.float32); Cw=np.zeros((H_,W_),np.float32)
HX,HY=CX,TOP+0.40*HT
# Glyph choice (Nov 17): every glyph is used evenly. Each row deals from shuffled decks of all glyphs, never repeating the
# glyph to its left or the one above it.
_deck=[]; _above={}; _left=[None]
def pick(j,ci):
    if ci==0: _left[0]=None
    bad={_left[0],_above.get(ci)}
    while True:
        for t,k in enumerate(_deck):
            if k not in bad:
                _deck.pop(t); _left[0]=k; _above[ci]=k; return int(k)
        _deck.extend(rng.permutation(len(gl)).tolist())      # deal a fresh deck of all glyphs
def at(x,y): return min(max(P(y),0),H_-1),min(max(P(x+DX),0),W_-1)
for j,y in enumerate(np.arange(-SP,HU+SP,SP)):
    for ci,x in enumerate(np.arange(CX-np.ceil((CX-(XL-SP))/SP)*SP,XL+WU+SP,SP)):   # straight rows and columns, a column on the figure's axis
        g=gl[pick(j,ci)]; u=rng.random()
        wx,wy=warp(x,y)
        # The previous single-layer break-up (fragment), run only so the random numbers the figure's colours draw on
        # stay exactly as they were (Nov 19): it decides nothing that is drawn.
        okeep=True; ox,oy=wx,wy
        if not M[at(x+wx,y+wy)]>0.5:
            okeep,_dx,_dy,_=fragment(x+wx,y+wy,u)
            if okeep: ox+=_dx; oy+=_dy
        OX=P(x+ox+DX)-n//2; OY=P(y+oy)-n//2
        okeep=okeep and not (OX<0 or OY<0 or OX+n>W_ or OY+n>H_)
        oin=okeep and M[at(x+ox,y+oy)]>0.5
        rn=np.random.normal(0,7) if oin else None
        if okeep and not oin and y<BASE+10: np.random.random()
        # This layer.
        lo=0.0
        if LAYER=='solid' and y>SOLID_BOTTOM+20 and not M[at(x+wx,y+wy)]>0.5: continue   # never shown: saves bytes
        if LAYER=='solid' and FRAG_TOP<y<SOLID_BOTTOM and not M[at(x+wx,y+wy)]>0.5:   # Nov 20: the last rows start to come apart
            tf=ss((y-FRAG_TOP)/(SOLID_BOTTOM-FRAG_TOP))
            if _rf.random()>1-FRAG_LOSS*tf: continue
            wx+=float(np.clip(_rf.normal(0,2.5*tf),-4,4)); wy+=float(np.clip(_rf.normal(0,2.5*tf),-4,4))   # small: never crosses the rectangle's edges
        if LAYER=='sparse' and not M[at(x+wx,y+wy)]>0.5:
            _keep,_dx,_dy,lo=sparse(x+wx,y+wy,u)
            if not _keep: continue
            lo,_f=lo; g=g*_f
            wx+=_dx; wy+=_dy
        X=P(x+wx+DX)-n//2; Y=P(y+wy)-n//2
        if X<0 or Y<0 or X+n>W_ or Y+n>H_: continue
        inside=M[at(x+wx,y+wy)]>0.5; acc=None   # tested where the glyph lands
        if GLYPH_3D and (inside or d_fld[at(x+wx,y+wy)]<4*SKIRT): g=body_glyph(g,x+wx,y+wy)
        A[Y:Y+n,X:X+n]=np.maximum(A[Y:Y+n,X:X+n],g)
        if inside:
            r=np.hypot(x-HX,(y-HY)*0.8)+(rn if rn is not None else _rk.normal(0,7)); acc=PC[int(r//RING)%4]
            if acc=='clay' and y<TOP+CROWN: acc='marigold'
        elif FIELD_SPLIT and LAYER=='sparse' and lo and _rc.random()<lo**COL_GAMMA:
            T_=TA if _rc.random()<0.5 else TB          # two even halves: the page splits them at different places (marigold mix)
            T_[Y:Y+n,X:X+n]=np.maximum(T_[Y:Y+n,X:X+n],g)
        if acc:
            mk=g>0.05; CI[Y:Y+n,X:X+n][mk]=np.array(COL[acc],np.float32); AC[Y:Y+n,X:X+n]=np.maximum(AC[Y:Y+n,X:X+n],g)
yy,xx=np.mgrid[0:H_,0:W_].astype(np.float32)/S; xs_=xx-DX
left=1.0   # Nov 17: even field; the waterfall mask in app/lanes-home.css sets its shape (was lighter towards the copy)
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
INKC=np.array([30,29,26.])
bod=nd.gaussian_filter(Mf,1.5*S)*(1-np.clip(Bf,0,1))**1.2                    # deeper tone = more shade
dline=np.abs(nd.distance_transform_edt(Mf>0.5)-nd.distance_transform_edt(Mf<=0.5))/S
line=np.exp(-(dline/OUTLINE_W)**2)
under=np.clip(BODY_SHADE*bod+OUTLINE*line,0,1)
BG=BONE[None,None,:]+under[...,None]*(INKC-BONE)                               # the paper under the glyphs
c=BG+amt[...,None]*(CI-BG)
colr=Cg/np.maximum(Cw[...,None],1e-3); a=Cw*RAIN_ALPHA; c=c*(1-a[...,None])+colr*a[...,None]
im=Image.fromarray(c.round().clip(0,255).astype(np.uint8))
im.save(OUT,quality=QUALITY,method=6); print(OUT, im.size, os.path.getsize(OUT),'bytes')
if FIELD_SPLIT and LAYER=='sparse':
    TINT_OUT=os.environ.get('TINT_OUT',os.path.join(os.path.dirname(OUT),'hero-glyph-field-tint.webp'))
    for T_,out in ((TA,TINT_OUT),(TB,TINT_OUT.replace('-tint','-tint-b'))):
        ta=(np.clip(T_,0,1)*255).round().astype(np.uint8)
        Image.fromarray(np.dstack([np.full_like(ta,255)]*3+[ta])).save(out,quality=60,alpha_quality=90,method=6)
        print(out, os.path.getsize(out),'bytes')
