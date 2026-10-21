# Contemplative CrossFit preview — datvt v4

The production website remains this Next.js 16 App Router application. Netlify
builds the repository root with `npm run build`, publishes `.next`, and uses its existing
Next plugin, SSR configuration, security headers, and domain redirect.

The approved Field Guide design is implemented as native React components in
`components/field-guide/`, through the existing layout Header/Footer and root
analytics/provider setup. Transmission 101 captures email inline in its hero,
with the complete lesson outline below and a single shared Kit form. Articles, courses, media, flags, legal pages and deep
playback routes remain backed by the existing source modules and content files.

## Develop and verify

Use Node 22.16 (the configured deployment version) or a supported newer LTS.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 8767
```

In a separate terminal:

```sh
npx tsc --noEmit
npm run build
node scripts/check-kit-form.cjs
node scripts/audit-video-manifests.mjs
python3 scripts/check-public-site.py http://127.0.0.1:8767
```

The Kit test replaces fetch with a stub and never sends a subscription. The HTTP
audit is read-only. Browser QA should use empty/invalid email values and should
not submit real registrations.

See [integration evidence](docs/field-guide-integration.md) for the preservation
checklist, route decisions, validation, and known limits. Original branding/source
provenance is recorded in `docs/field-guide-brand-sources.json` and alongside the
original participant/video images in `public/brand/`.

## Migration and publication

This checkout intentionally publishes the CC redesign from `v4`, replacing the
Quartz tree in a normal descendant commit. Quartz remains available in Git at
`634c09a7eb050db3be03b7e423c73f73353f5fb0`; its former workflows and ignored generated
output are not part of the CC application.

The complete app was imported from `mindtraining-cc/cc`, branch
`codex/cc-website-redesign`, commit `576fea70bd2820b81e4ae1087047fe3dcbd6d881`,
subdirectory `projects/cc-content-site`. Application content, UI, assets, Kit
form `9576210`, course and video manifests, and the analytics implementation are
preserved. Only temporary-host build/asset configuration and migration checks differ.

Netlify project `poetic-tapioca-bc92a4` is connected to `datvithanh/datvt` and
publishes `v4`. Root `netlify.toml` supplies `npm run build`, `.next`, Node
22.16.0 and the Next.js adapter. The npm lockfile is authoritative. A normal
`git push origin v4` uses that existing deployment connection; do not force-push.

This is a temporary publication host. Canonical, sitemap, Open Graph page and
schema URLs remain on `https://mindtraining.cc`. `CC_ASSET_ORIGIN` sets the origin
for relative social-image/icon metadata to this Netlify host, so the new shared
preview image resolves before the redesign reaches mindtraining.cc. Historical
article-specific image URLs remain canonical. The response header
`X-Robots-Tag: noindex, follow` is applied by both Netlify configuration and the
Next runtime while `CC_ASSET_ORIGIN` is set, keeping this temporary copy out of
search results.
Remove that staging header deliberately if this repository is ever promoted to
canonical CC production. GA4 still requires a production build **and** exact
origin `https://mindtraining.cc`; it stays off on datvt.com and Netlify domains.

Use port 8767 for this checkout. The original CC preview on port 8765 and its
source checkout are independent and must not be repurposed by this migration.

The approved [decision checklist](docs/website-redesign-decisions.md) and its
[PDF export](output/pdf/website-redesign-decisions.pdf) are retained unchanged.
