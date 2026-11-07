#!/usr/bin/env python3
# Generates public/brand/home/bands.svg, the homepage hero band (see docs/design/README.md).
# Usage: python3 scripts/hero-band.py 620 1223,1193,1163,1133 public/brand/home/bands.svg
import math,sys
# Single four-lane band, stage units (desktop). Centreline runs right -> left, then turns down.
H=float(sys.argv[1]) if len(sys.argv)>1 else 620   # centreline y of the level run
XV=40+7.25+30.75   # centreline x of the vertical drop: blue's outer edge on the 40-unit margin
RC=70              # centreline corner radius (blue 100.75, marigold 39.25)
PITCH=20.5; SW=14.5
lanes=[('#456B86',1.5),('#4C6B54',.5),('#A63A2E',-.5),('#D98F2B',-1.5)]  # + = right of travel (top / outside)
ENDS=[float(v) for v in sys.argv[2].split(",")] if len(sys.argv)>2 else [1223,1193,1163,1133]
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
# Running-track rubber: fine grayscale noise blended into opaque, clean-edged lanes.
# Clip the grain to SourceAlpha; no displacement or paper holes in the strokes.
svg.append('''<defs>
  <filter id="track-grain" filterUnits="userSpaceOnUse" x="30" y="95" width="2580" height="1140" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="17" stitchTiles="stitch" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0" result="gray"/>
    <feComponentTransfer in="gray" result="rubber">
      <feFuncR type="linear" slope="0.85" intercept="0.075"/>
      <feFuncG type="linear" slope="0.85" intercept="0.075"/>
      <feFuncB type="linear" slope="0.85" intercept="0.075"/>
      <feFuncA type="linear" slope="0" intercept="1"/>
    </feComponentTransfer>
    <feComposite in="rubber" in2="SourceAlpha" operator="in" result="clipped-grain"/>
    <feBlend in="clipped-grain" in2="SourceGraphic" mode="overlay"/>
  </filter>
</defs>
<g filter="url(#track-grain)">''')
labels=[]
for number, ((col,k),end) in enumerate(zip(lanes,ENDS), start=1):
    o=offset(k*PITCH)
    # Combine numbered finish boxes with progressively thinner striped terminals.
    thicknesses = [13, 11, 9, 7, 5, 3.5, 2, 1.5]
    pitch = 20
    first_center = end - thicknesses[-1] / 2 - pitch * (len(thicknesses) - 1)
    solid_end = first_center - 15
    d='M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in o)+f' V{solid_end:.2f}'
    svg.append(f'<path d="{d}" stroke="{col}"/>')
    x = o[-1][0]
    for i, thickness in enumerate(thicknesses):
        y = first_center + i * pitch - thickness / 2
        svg.append(f'<rect x="{x-SW/2:.2f}" y="{y:.2f}" width="{SW}" height="{thickness}" fill="{col}" stroke="none"/>')
    labels.append(f'<path d="M{x-SW/2:.2f} {solid_end-35:.2f}h{SW} M{x-5.25:.2f} {solid_end-4:.2f}h10.5" fill="none" stroke="#F2ECDC" stroke-width="1.5"/>')
    labels.append(f'<text x="{x:.2f}" y="{solid_end-9:.2f}" fill="#F2ECDC" stroke="none" font-family="Arial, sans-serif" font-weight="700" font-size="16" text-anchor="middle">{number}</text>')
    print(col,'vertical x',round(o[-1][0],2),'left edge',round(o[-1][0]-SW/2,2),'level y',round(offset(k*PITCH)[pts.index((850,H))][1],2),'corner R',round(RC+k*PITCH,2))
svg.append('</g>')
svg.extend(labels)  # Keep the finish markings crisp, outside the rubber-grain filter.
svg.append('</svg>')
open(sys.argv[3] if len(sys.argv)>3 else 'bands.svg','w').write('\n'.join(svg)+'\n')
