# Homepage hero: "04 Lanes" (design notes)

Live on `/` since 2026-11-04. Source: the "04 Lanes" board on the CC Website design canvas.

## The lower band (Dat, Nov 6)

The lower band (four lanes: mineral blue, sage, clay, marigold) enters from the right, passes in
front of the figure, and from its lowest point under the figure (stage x ≈ 1020) runs **straight and
level** to the left. It turns **one rounded 90° corner** (concentric arcs, blue outermost at R 120,
marigold innermost at R 58.5) and drops straight down beside the phases. The lanes end flat and
staggered: marigold shortest, then clay, sage, and blue longest (ends at 1050 / 1080 / 1110 / 1140).
They no longer turn into the phase rows. This replaced the earlier U-fold, S-bend and R=44 turns.

Spacing: "Realization as a fitness" starts 100 units below marigold's bottom edge (726), and
"Ways to train" starts 100 units below the phase rows, with no rule between them. The phases are a
2 × 2 grid in normal flow, so the stage grows if a description wraps to a third line.

The earlier references are kept for history: [`hero-bands-reference.png`](hero-bands-reference.png),
[`hero-bands-reference-fold.png`](hero-bands-reference-fold.png).

## How the hero is built

- `components/field-guide/Home.tsx` and `app/lanes-home.css`. The hero is a 1280 × 1490-unit stage;
  `--u` is one unit in px, so bands, figure and copy scale together (down to 900 px wide; below
  that the copy and phases stack and the art becomes a cropped band; phone layout is provisional).
- `public/brand/home/bands-upper.svg` (under the figure) and `bands-lower.svg` (over it): viewBox
  `-1300 -200 3880 1700` in stage units, stroke 14.5, lanes on a 20.5-unit pitch. The ends are
  extended so the bands run off both edges of wide screens.
- `public/brand/home/hero-figure.svg`: seated figure built from the v1 CC glyphs, glyph-like marks
  along the contour, dots outside, and a faint bone glow.
- On desktop the lower band is drawn 112 units right of its SVG coordinates (`translateX` in the CSS).
  The corner's centre is at SVG (427, 776.9), i.e. stage x 539.
