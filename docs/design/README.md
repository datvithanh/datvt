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

- `components/field-guide/Home.tsx` and `app/lanes-home.css`. The hero is a 1280 × 1440-unit stage;
  `--u` is one unit in px, so the field, copy and phases scale together (down to 900 px wide; below
  that the copy and phases stack and the field becomes a band centred on the figure).
- Glyph field (Nov 15): `public/brand/home/hero-glyph-field.webp`, one image of the 20 CC glyphs at
  2 px per stage unit, covering stage x −480 to 1760 and y 0 to 1150 so it overhangs wide screens. It is shown
  at 1×; on desktop the head sits under the gap between Programs and Resources at every width.
  - The seated figure (624 units tall, glyphs 11.7 on a 19.8 grid since Nov 15; was 520, 9.75, 16.5) is centred at x 840: its glyphs follow its shading and take marigold, clay, sage
    and blue in rings from the heart, with no clay at the crown. The field is lighter behind the copy.
  - From y 578 the field disperses irregularly, never quite emptying, and ends at 1100 above the
    phase boxes (from 1110; the title sits at 960). As the glyphs fall they take the colour of the phase box below them.
  - Fades and warp (Nov 15): the full field is back (no cut). On desktop a feathered bone panel behind the copy
    (`.ln-copy::before` in `app/lanes-home.css`) fades the field out evenly around "LIVE IN PRACTICE", the lede and the
    button. It is drawn with the copy, so it fits at every width. A mask fades the field's bottom into the next
    section. In the script, field glyphs (never the figure's own) bend slightly around the figure: `WARP`, `WARP_SIGMA`,
    `WARP_TWIST`.
  - The figure outline was traced from a reference image (Dat, Nov 12); confirm its licence before launch.
  - Regenerate it with `python3 scripts/hero-glyph-field.py` (needs numpy, scipy, Pillow, cairosvg). The
    settings are at the top of the script; its inputs (glyphs, figure silhouette and shading) are in
    `scripts/hero-glyph-field/`. The CSS only places the image, so re-render to change the field itself.
- Phases: four boxes across the content width, outlined in the phase colour, the glyph set into
  a gap in the top line at the top left. The title sits inside the dispersing field.
- Earlier art, no longer used on the page: `bands.svg` (regenerate with `scripts/hero-band.py`) and
  `hero-figure.svg`.

## Running-track lines (Dat, Nov 7)

The four hero lanes now use fine grayscale procedural grain blended with their solid colors,
not the card frame's distressed printing. The seeded SVG filter uses fractal noise at 0.85,
three octaves, and overlay blending clipped to the strokes. The edges stay clean and opaque;
there is no displacement or paper-hole mask. Paths, widths, spacing, and colors are unchanged.
The community divider uses `public/brand/home/rule-track.svg` as a tiny repeating background
with subtle tonal grain. The Mini Bootcamp card retains its distressed frame. No bitmap texture,
extra lane stripes, or filter on text, buttons, or the figure is introduced.

## Solid numbered finish boxes (Dat, Nov 7)

The Olympic-inspired separated stripe tails are removed. Each solid staggered lane ends in
a crisp bone-colored number with a cross-line and short underline. Lane order from outside
(leftmost on the vertical drop) to inside is yellow 1, red 2, green 3, blue 4. Yellow is longest
and blue shortest. The running-track grain, curve geometry, widths, and gaps are retained.
Mobile keeps the existing cropped artwork. Phase descriptions retain 01–04 above their names.

## Shared brand grain

`app/brand-track-grain.css` applies track material to brand-colored text, glyphs, surfaces,
and hover colors across modern and legacy routes. `BrandTrackGrain` defines a shared
alpha-clipped SVG type filter with a reduced contrast range for legibility. Filled surfaces
use the seeded 200px overlay tile; photos and videos are not filtered. Existing textured
hero bands/leaves are not processed a second time. New colored roles can opt into
`brand-grain` (type/glyph) or `brand-grain-surface` (background). Print and forced-color
modes suppress decorative grain.
