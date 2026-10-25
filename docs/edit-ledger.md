# Website edit ledger

One entry per commit that changes the site, appended at the bottom, oldest first. Each entry says
what a visitor would notice, why it changed (meeting, doc or person), and what is still provisional.
Deploys: `v4` builds the Netlify preview at https://poetic-tapioca-bc92a4.netlify.app (noindex).

An entry can't contain its own commit hash; `git log --follow docs/edit-ledger.md` maps entries to
commits. Hashes below were backfilled for commits made before the ledger existed.

---

### 2026-10-21 · `19cf1ff` · Migrate the CC redesign into this repo
- Replaced the Quartz site with the Next.js CC redesign from `mindtraining-cc/cc` (`codex/cc-website-redesign`).
- Why: datvt.com / Netlify serves as the temporary preview host for the redesign.

### 2026-10-21 · `a7a18d6` · Keep the preview out of search
- `X-Robots-Tag: noindex, follow` is now sent by the Next runtime as well as Netlify config.
- Why: the preview is a temporary copy; mindtraining.cc stays canonical.

### 2026-10-22 · `c6e9273` · Apply the Oct 21 operator review
- Home and Programs show one paid door (Illumination Bootcamp); Mini Bootcamp became a "Want a taste first?" link.
- Programs gets a hover/focus dropdown; Resources, Media and every article end with a "Ready to train?" band.
- Bootcamp gets a "Twelve weeks. Four phases." section. **Provisional:** phase names are placeholders.
- Fixed dark-on-blue offer card titles.
- Why: Oct 21 operator call; decisions tracked in the "CC Website — Pending Decisions" doc.

### 2026-10-22 · `07eff30` · Instagram material aesthetic
- Woven bone-paper background, blue-black ink, burnt orange for the italic half of headlines, paper cards with ink rules, muted video thumbnails.
- Layouts and the Archivo/Plex type system unchanged.
- Why: Dat, after reviewing `mindtraining-cc/design`. **Provisional:** the visual system is still open per `design/strategy/website-decisions.md`.

### 2026-10-22 · `4ee42e7` · "Realization fitness." headline
- Home headline changed from "Live in practice." to "Realization fitness."
- Why: Dat's pick "for now". **Provisional:** the brand memo wants it paired with a concrete explanation and tested.

### 2026-10-22 · `08cc6dc` · Placeholder hero photo
- Hero briefly used an uncleared photo of yamabushi in a cedar forest; replaced in the next commit. The file remains in git history.

### 2026-10-22 · `b573e8b` · Hero: Mongaku under the waterfall
- Hero image is *Mongaku's austerity*, a public-domain 1885 print after Hokusai. No on-page credit, by request; provenance in `public/brand/README.md`.
- Why: Dat's pick from the second Pinterest reference sheet.

### 2026-10-25 · Start this ledger
- Added this file and a `CLAUDE.md` rule to append an entry with every site commit. No visitor-facing change.
