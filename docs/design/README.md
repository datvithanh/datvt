# Homepage hero: "04 Lanes" (design notes)

Live on `/` since 2026-11-04. Source: the "04 Lanes" board on the CC Website design canvas.

## The band (Dat, Nov 6)

There is **one band** (four lanes: mineral blue, sage, clay, marigold); the second band that crossed
behind the figure is gone. It comes in from the upper right, sweeps down **behind** the figure's
lower right (the figure's glow sits over it), and runs straight and level under the figure. At the
left it turns **one rounded 90° corner** and drops straight down beside the phases.

- Blue is on the outside of the corner. Its outer edge sits exactly on the 40-unit content margin,
  the left edge of "LIVE IN PRACTICE".
- The four lanes are true offsets of one centreline (20.5-unit pitch, 14.5 stroke), so the gaps never
  pinch or widen through a bend. The corner radii are blue 100.75, sage 80.25, clay 59.75 and
  marigold 39.25.
- The lanes end flat and staggered, marigold shortest (ends at 1133 / 1163 / 1193 / 1223, marigold
  to blue; blue stops 40 units above "Ways to train"). They don't turn into the phase rows.
- Spacing:
  - "Realization as a fitness" starts 100 units below marigold's bottom edge on the level run (658).
  - "Ways to train" starts 100 units below the phase rows, with no rule between them.
  - The phases (title and glyph column at 200 units) sit beside the lanes in a 2 × 2 grid in normal
    flow, so the stage grows if a description wraps.

The older references (two bands, U-fold) are kept for history:
[`hero-bands-reference.png`](hero-bands-reference.png),
[`hero-bands-reference-fold.png`](hero-bands-reference-fold.png).

## How the hero is built

- `components/field-guide/Home.tsx` and `app/lanes-home.css`. The hero is a 1280 × 1490-unit stage;
  `--u` is one unit in px, so bands, figure and copy scale together (down to 900 px wide; below
  that the copy and phases stack and the art becomes a cropped band; phone layout is provisional).
- `public/brand/home/bands.svg`, drawn under the figure. Its viewBox is `-1300 -200 3880 1700` in
  stage units, so SVG coordinates are stage coordinates. The entry runs far off the right edge for
  wide screens. Regenerate it with `scripts/hero-band.py`; the centreline, corner radius and lane
  ends are set at the top of the script.
- `public/brand/home/hero-figure.svg`: seated figure built from the v1 CC glyphs, glyph-like marks
  along the contour, dots outside, and a faint bone glow.

## Running-track lines (Dat, Nov 7)

The four hero lanes now use fine grayscale procedural grain blended with their solid colors,
not the card frame's distressed printing. The seeded SVG filter uses fractal noise at 0.85,
three octaves, and overlay blending clipped to the strokes. The edges stay clean and opaque;
there is no displacement or paper-hole mask. Paths, widths, spacing, and colors are unchanged.
The community divider uses `public/brand/home/rule-track.svg` as a tiny repeating background
with subtle tonal grain. The Mini Bootcamp card retains its distressed frame. No bitmap texture,
extra lane stripes, or filter on text, buttons, or the figure is introduced.

## Numbered finish-line terminals (Dat, Nov 7)

Dat's follow-up reference replaced the striped-tip interpretation with numbered track ends.
The lower tips stay solid and staggered, with upright bone-colored numbers 1–4 from left to
right, a cross-line above each number, and a short underline below. Markings sit outside the
rubber-grain filter to stay crisp. Lane widths, colors, curves, and endpoint positions remain
unchanged. Mobile keeps the existing cropped artwork.
