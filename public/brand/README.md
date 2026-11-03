# Public brand assets

Brand assets v1 (CC_brand_assets_v1, 4 Nov 2026), copied unchanged:

- `cc-lockup-stacked-ink.svg`, `cc-lockup-stacked-bone.svg`: primary lockup (mask + stacked
  wordmark, outlined Archivo Black). Header: mask 56 px tall on desktop, 40 px on mobile.
- `cc-mark-ink.svg`: logo master (ink). `cc-mark-bone-512.png`: logo master (bone, 512 px),
  used as the placeholder mark on course and video thumbnails.
- `favicon.svg`: final favicon (the nose on an ink tile). `icon-192.png`, `icon-512.png`,
  `apple-touch-icon.png` and `app/favicon.ico` (16/32/48) are exported from it unchanged.

`cc-social-preview.png` is a deterministic 1200×630 social card: the v1 ink lockup, 150 px
tall, centred on bone `#F2ECDC`. No generated artwork. Page titles and descriptions remain
contextual in Open Graph and Twitter metadata.

`field-paper.webp` replaces the 1080×1350 PNG without changing its dimensions,
CSS scale, placement, or overlay colors. WebP quality 95, effort 6: 244,818 bytes
versus 1,627,151 bytes (85.0% smaller). The original is preserved in Git history.
The decoded image was compared under all three current CSS overlays: maximum
channel difference 2/255; mean channel difference 0.061–0.154/255. Side-by-side
inspection at the site's 650px texture scale showed no visible appearance change.

Legacy Rubik and Courier Prime font resources remain because retained course
pages still use them. Public UI uses the existing Archivo, Archivo Black wordmark,
and IBM Plex Mono resources; no font files or license files were removed.

`bone-paper.webp` is the material ground from the CC Instagram system
(`mindtraining-cc/design`, `library/textures/bone-paper/sheet.png`): one slide-sized cell,
downscaled to 720 × 900, mirrored 2 × 2 so it tiles without seams, with the dark flecks filled
from a local median so none read as dirt at web scale.

`hero-mongaku.webp` (home hero) is *Mongaku's austerity* (文覚荒行之図) from a Hokusai picture
collection (北斎画集), a Meiji-era woodblock print after a Hokusai design, dated 1885 in its colophon:
public domain. 1000 × 1423 from a scan found via Pinterest (no museum page attached). Swap in a
museum scan when one is to hand. No on-page credit, by request.
