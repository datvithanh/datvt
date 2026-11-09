# CC website redesign: handoff context (as of Nov 6, 2026)

Paste this into a new thread to pick up the work. The owner is Dat. Communication style: Dat sends short requests, often with screenshots. Do the work, verify it, push, and report briefly.

## Production vs this repo (updated Nov 9)

- **Production (mindtraining.cc)** is the Netlify site `contemplativecrossfit`, built from
  `mindtraining-cc/cc` → `projects/cc-content-site/`, branch `main`. Pushing there goes live at once.
  The 04 Lanes redesign was ported there on Nov 7 (cc PRs #28, #29).
- **Work continues here in `datvt` on `home-04-lanes`. Dat ports it to cc.** Don't push to cc.
- On Nov 9 this branch was synced with cc `main` (`2dce30d`): website code and assets match. The
  only intended differences are this preview's Netlify, noindex and asset-origin settings
  (`netlify.toml`, `next.config.ts`, `app/layout.tsx`) and the docs.
- Before porting, Dat can diff `cc/projects/cc-content-site` against this repo; everything in the
  ledger after the "Sync from cc main" entry is new since the last port.

## Where things live

- **Repo:** `datvithanh/datvt` (GitHub). This is the root Next.js app for mindtraining.cc (Contemplative Crossfit, "CC").
- **Branches**
  - `home-04-lanes`: **all current work goes here.** It holds the new "04 Lanes" homepage and the site-wide brand v1 rebuild. Head is `e6ab805`.
  - `v4`: the main Netlify preview at https://poetic-tapioca-bc92a4.netlify.app (older "Realization fitness." homepage). Don't push to `v4` unless Dat asks.
  - `main`: don't push.
- **Preview of current work:** draft PR #1 (https://github.com/datvithanh/datvt/pull/1) gives `home-04-lanes` a deploy preview at **https://deploy-preview-1--poetic-tapioca-bc92a4.netlify.app**. It rebuilds about 60 seconds after each push. Nothing updates without a push, so batch changes only when Dat asks.
- **Another Claude session also pushes to `home-04-lanes`.** Always `git fetch origin home-04-lanes` before pushing. If you're behind, merge (never rebase or force-push). Ledger conflicts are resolved by keeping both entries in date order.

## Rules for every change

1. **Edit ledger:** every commit that changes the site appends an entry at the bottom of `docs/edit-ledger.md` covering:
   - date and short title, with "(`home-04-lanes` only)"
   - what a visitor would notice
   - why (usually "Dat, <date>")
   - anything provisional

   Never rewrite earlier entries.
2. **Verify first:** run `npm run build` before committing, then check the changed pages in Playwright at 1440×900 and 390×844.
   - Start the local server with `npx next start -p 8767 -H 127.0.0.1`.
   - To stop it, kill only the `next-server` pid. Don't `pkill -f`: it kills your own shell.
3. **Commit trailer** (no model names anywhere else in commits):
   ```
   Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
   ```
4. **Pushes:** no force-pushes, no empty commits, and no closing and reopening the PR to trigger builds. If Netlify misses a build, the next real push fixes it, or Dat can use "Clear cache and deploy".
5. **Spelling:** American English throughout ("Realization", "centered"). Write "Contemplative Crossfit" with a lowercase f.
6. **Voice sources:** Dat's brand memo plus the meeting transcripts outrank the repo's `cc-voice` skill, which is stale.

## Design system (brand v1)

- **Typography:** the source of truth is the "CC Website Typography Guide" in Claude Docs (doc id `Siz3j9CgKUEk1EWjNNTfzm`).
  - Fonts: CC Archivo for headings and body (ExtraBold for section heads); CC Plex (IBM Plex Mono) for eyebrows, labels, breadcrumbs, dates and captions.
  - Headings have no trailing full stops.
- **Scale unit:** `--ln-u = max(0.55px, min(min(100vw,1280px)/1280, (100svh - 93px)/860))`. It's defined on `:root .field-guide`, so it applies on every page.
  - Section headline: 56u
  - Subhead / second level: 44u SemiBold, sentence case
  - h3: 30u
  - Lede: 22u
  - Body: 17u (minimum 15px)
  - Phones use fixed px sizes.
- **Colors:** ink, bone/paper background, clay (red accent, used for dates like "Next run: …"), marigold (text selection and focus rings), blue, sage, maroon, dark green. Keep the palette balanced and avoid orange-dominant layouts.
- **Buttons:** primary is an ink fill with bone text. Secondary is a clay outline with clay text, no fill. On black backgrounds, use bone. The header CTA "Join the Bootcamp" is an ink outline with no fill.
- **Layout:** the content frame matches the header, `width: min(1200px, calc(100% - 80px))`, with 20px margins on phones. Everything aligns to the header's left and right edges. The header floats.
- **Videos:** always embedded inline via `components/ui/InlineVideo.tsx` (click-to-play youtube-nocookie). Never link out to YouTube.

## Key files

- **Stylesheets,** in load order in `app/layout.tsx` (later wins): `globals` → `legacy-fonts` → `field-guide.css` → `field-guide-desktop.css` → `field-guide-material.css` → `lanes-home.css` → `brand-v1.css` → `brand-v1-legacy.css`.
  - `brand-v1.css`: type roles and buttons for non-home pages.
  - `brand-v1-legacy.css`: maps the old Tailwind-page tokens to the brand kit.
  - Specificity gotcha: unlayered CSS beats Tailwind's layered utilities. The margin reset in `field-guide.css` is scoped to `:not(.legacy-page)` for this reason.
- **`components/field-guide/SiteShell.tsx`:** every route renders in the field-guide shell, and it sets the page classes:
  - `home-page`, `program-page`, `resource-page`, `legal-page`
  - `legacy-page` for the older Tailwind routes
  - `course-page` for `/courses/*`
- **Page components** (`components/field-guide/`):
  - `Home.tsx`: the lanes homepage, including the `stories` array.
  - `Bootcamp.tsx`: the Illumination Bootcamp page, including its own `stories` array.
  - Also: `BootcampFAQ`, `MiniBootcamp`, `Resources`, `Journal` (articles), `Media`, `Programs`, `Transmission`, `Signup`.
- **Dates:**
  - Values: `lib/cohort.ts`
  - Display strings: `lib/field-guide.ts` (`NEXT_COHORT_START` = "January 25, 2027"; `NEXT_MINI_DATES` = "December 14–18, 2026")
- **Participant stories:**
  - Headshots: `public/brand/stories/<name>-headshot.jpg` (4:3, 1200×900, homepage) and `public/brand/stories/full/<name>-headshot.webp` (16:9, 800×450, Bootcamp).
  - Each headshot is cropped with the face centered horizontally, and the provenance is recorded in `public/brand/stories/README.md`.
  - To add a person, put an `image` field on their entry in both `stories` arrays.

## Current state of the main pages

- **Homepage (lanes):**
  - Floating header, compact hero, and the phases section rebuilt to Dat's mock-up.
  - "Ways to train" cards have their buttons on the left, with the Bootcamp date on the right.
  - Community section "You've found the maps / Find your people": six story cards in full color (no grayscale filter).
    - Order and videos: Tyson `tHBd3sCOjWk`, Taylor `M4tPoR5-n40`, Ryan `zcrvJoSpfYs`, Adrian `-uMMTet2FP8`, Tom `mTZIjfB5BZ8`, John `WoQbN-CnHJg`.
    - The play button is a bone corner disc. Quotes are Archivo Regular italic.
  - No "Ready to train?" band on any page; the header CTA covers it.
- **Bootcamp (/bootcamp):**
  - Hero: "Paid program · Live online · 12 weeks", then ILLUMINATION BOOTCAMP, lead, description, "Next cohort: **January 25, 2027** · 12 weeks" (date in clay), and "Apply for Cohort 11" button linking to the Zoom application.
  - On the right, the Frank Yang faces video (`NCYL4JZKBLM`), wider and top-aligned with the eyebrow, no caption.
  - Section shortcuts: Participant stories, Course details, Schedule, Tuition, Apply, FAQ (Phases removed; phases live inside Course details).
  - Same six stories, with longer quotes.
  - Fit, tuition, application and FAQ sections were ported from mindtraining.cc. Tuition is simplified.
  - Extras listed:
    - Internal podcast from Meicheng (spelled that way) and team members.
    - No alumni access.
    - Cohort material is sealed for the next cohort.
  - No BFF talk show.
- **Mini Bootcamp:**
  - Title "MINI BOOTCAMP" with Dat's description, then "Next run: **December 14–18, 2026**" (date in clay).
  - "Five days of training" has three items, each with a leaf glyph. It sits one heading level below the title, and so does "Can't wait? Begin exploring now".
  - The clips section and the duplicate intro were removed. The clips live behind the Transmission 101 email wall.
- **Course pages** (`/courses/*`, e.g. Transmission 101):
  - Left-aligned, three-level hierarchy: course title, then section ("Before you begin"), then lesson.
  - Lesson prose headings at 26u.
- **Resources:**
  - One column. Essays three across, with images cover-cropped.
  - "Free courses" and "Notes from practice" sit one heading level down.
  - The "Read the article" links and the essay count are removed.

## Open questions (asked, not yet answered by Dat)

- Whether to sentence-case the headings inside lesson MDX files.
- The legal pages' reading width (currently a narrower reading column).
- When to bring `home-04-lanes` to `v4`/production. Nothing has been merged; wait for Dat to say.
- Cohort 11 application is live at https://s.zoom.us/m/bPlPelXHc (`COHORT_NEXT_APPLICATION_URL` in `lib/cohort.ts`). The Bootcamp hero, tuition, and application-section buttons link there. The form asks ten questions, allows about 30 minutes, then invites applicants to schedule a brief Zoom introduction.

## Verification quick reference

```bash
cd datvt && npm run build
npx next start -p 8767 -H 127.0.0.1   # background it
# Playwright is preinstalled: require('playwright'); chromium.launch()
# check desktop 1440x900 and phone 390x844; to find layout problems, compare element
# edges to the header's left/right edges rather than eyeballing
```
