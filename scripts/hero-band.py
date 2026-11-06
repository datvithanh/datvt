#!/usr/bin/env python3
# Generates public/brand/home/bands.svg, the homepage hero band (see docs/design/README.md).
# Usage: python3 scripts/hero-band.py 620 1163,1133,1103,1073 public/brand/home/bands.svg
import math,sys
# Single four-lane band, stage units (desktop). Centreline runs right -> left, then turns down.
H=float(sys.argv[1]) if len(sys.argv)>1 else 620   # centreline y of the level run
XV=40+7.25+30.75   # centreline x of the vertical drop: blue's outer edge on the 40-unit margin
RC=70              # centreline corner radius (blue 100.75, marigold 39.25)
PITCH=20.5; SW=14.5
lanes=[('#456B86',1.5),('#4C6B54',.5),('#A63A2E',-.5),('#D98F2B',-1.5)]  # + = right of travel (top / outside)
ENDS=[float(v) for v in sys.argv[2].split(",")] if len(sys.argv)>2 else [1163,1133,1103,1073]
def cubic(p0,p1,p2,p3,n=160):
    return [tuple((1-t)**3*a+3*(1-t)**2*t*b+3*(1-t)*t*t*c+t**3*d for a,b,c,d in zip(p0,p1,p2,p3)) for t in (i/n for i in range(n+1))]
pts=[(2600,140),(1500,140)]
pts+=cubic((1500,140),(1350,140),(1280,250),(1180,400))[1:]
pts+=cubic((1180,400),(1100,520),(1000,H),(850,H))[1:]
pts+=[(XV+RC,H)]
cx,cy=XV+RC,H+RC
pts+=[(cx+RC*math.cos(a),cy-RC*math.sin(a)) for a in (math.pi/2+i*(math.pi/2)/60 for i in range(1,61))]
def offset(d):
    out=[]
    for i,(x,y) in enumerate(pts):
        a=pts[max(i-1,0)]; b=pts[min(i+1,len(pts)-1)]
        tx,ty=b[0]-a[0],b[1]-a[1]; L=math.hypot(tx,ty); tx,ty=tx/L,ty/L
        out.append((x-ty*d, y+tx*d))   # right-hand normal in y-down coords
    return out
svg=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1300 -200 3880 1700" width="3880" height="1700" fill="none" stroke-width="14.5" stroke-linejoin="round">']
for (col,k),end in zip(lanes,ENDS):
    o=offset(k*PITCH)
    d='M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in o)+f' V{end:.1f}'
    svg.append(f'<path d="{d}" stroke="{col}"/>')
    print(col,'vertical x',round(o[-1][0],2),'left edge',round(o[-1][0]-SW/2,2),'level y',round(offset(k*PITCH)[pts.index((850,H))][1],2),'corner R',round(RC+k*PITCH,2))
svg.append('</svg>')
open(sys.argv[3] if len(sys.argv)>3 else 'bands.svg','w').write('\n'.join(svg)+'\n')
