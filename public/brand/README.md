# Public brand assets

`cc-social-preview.png` is a deterministic 1200×630 social card: the unchanged
approved `cc-logo-guide.svg` mark and the existing Archivo Black wordmark font
(`fonts/archivo.ttf`) on the current bone color `#f2ecdc`. No generated artwork.
Page titles and descriptions remain contextual in Open Graph and Twitter metadata.

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

`hero-placeholder.webp` (home hero) is a **placeholder**: yamabushi walking a cedar-forest path,
a recent photograph found via Pinterest (from a travel feature), rights unknown and not cleared.
Replace it with a licensed or public-domain image before mindtraining.cc goes live.
