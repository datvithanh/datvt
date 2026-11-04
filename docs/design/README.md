# Homepage hero: "04 Lanes" (design notes)

Live on `/` since 2026-11-04. Source: the "04 Lanes" board on the CC Website design canvas.

## Still wrong: the first bend of the lower band

The lower band (four lanes: mineral blue, sage, clay, marigold) enters from the right, passes in
front of the figure and then makes **two bends** before it drops into the four phase rows:

1. **First bend: NOT RIGHT YET.** In the reference it is a smooth, bent **U-fold** that gives the
   band a 3D twist: lane widths and the gaps between lanes are *not* kept constant through the fold
   (the band appears to turn over, so it compresses and the lanes cross over in depth). The current
   build keeps the lanes nearly parallel through the fold, so it reads flat. Match the reference.
2. **Second bend: OK.** The rounded 90° turn into the vertical drop. Keep it.

The upper band (behind the figure) and the four R=44 turns into the phase rows are approved.

Reference, as Dat supplied it: [`hero-bands-reference.png`](hero-bands-reference.png).
Crop of the fold: [`hero-bands-reference-fold.png`](hero-bands-reference-fold.png).

## How the hero is built

- `components/field-guide/Home.tsx` and `app/lanes-home.css`. The hero is a 1280 × 1490-unit stage;
  `--u` is one unit in px, so bands, figure and copy scale together (down to 900 px wide; below
  that the copy and phases stack and the art becomes a cropped band; phone layout is provisional).
- `public/brand/home/bands-upper.svg` (under the figure) and `bands-lower.svg` (over it): viewBox
  `-1300 -200 3880 1700` in stage units, stroke 14.5, lanes on a 20.5-unit pitch. The ends are
  extended so the bands run off both edges of wide screens.
- `public/brand/home/hero-figure.svg`: seated figure built from the v1 CC glyphs, glyph-like marks
  along the contour, dots outside, and a faint bone glow.
- To fix the fold, replace the lower band's path segment between the right-hand entry and the
  vertical drop (stage x ≈ 250–700, y ≈ 700–1000) in `bands-lower.svg`; nothing else depends on it.
