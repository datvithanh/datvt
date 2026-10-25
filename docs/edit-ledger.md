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

### 2026-10-25 · Copy: first decided rows from the copy sheet
- Home subline: "Build a practice that can meet your life, with people who train alongside you." (brand memo's working message).
- Home hero button: "Explore the Bootcamp".
- Home community body: "CC is a community for serious contemplative training: guidance from teachers, structured daily practice, study that sharpens understanding, and people who train alongside you."
- Bootcamp card (Home and Programs share it): "Twelve weeks of intensive training for practitioners ready for transmission and relational feedback."
- Bootcamp hero: method line plus the promise, "Built for one outcome: self-emptiness realization, held in your life." (replaces "Daily transmission, live reflection… The aim is…").
- Bootcamp "who it's for" heading: "Sophisticated on the cushion. Reactive by noon."
- Why: Dat's picks in the "CC Website — Copy Decisions" sheet, rows 2, 3, 5, 7, 10, 13, 14 (status Decided (provisional)); options shaped by the Oct 24 brand memo. **Provisional:** all of these; rows still Open or Needs team are not applied.

### 2026-10-25 · Programs menu shows dates and a dropdown cue
- "Programs" in the header now has a small chevron that flips when the menu opens.
- Each menu item shows its next run under the name: "12 weeks · starts January 25, 2027" and "Free · December 14–18". Dates come from `lib/cohort.ts`, so they roll with each cohort.
- Mobile menu unchanged apart from the new date lines (no chevron there; the items are always listed).
- Why: Dat, Oct 25.
- Fixed the mobile menu: the program items no longer sit in a half-width paper box.

### 2026-10-25 · Compact home hero; Bootcamp hero cleanup
- Home hero fits one laptop screen: the print scales with window height (capped at 520px, never cropped), the headline shrinks on short windows, and the top padding is tighter. On a 1440×780 window the hero now ends at 676px instead of 762px, so the next section peeks in. Desktop only; mobile unchanged.
- Bootcamp hero: the cohort date strip is a single ink rule again (the material layer had boxed it, leaving the text sitting on the bottom border), and "A practice carried into life." is centred under the artifact.
- Why: Dat, Oct 25 ("only full hero at 80%", "main hero bootcamp looks weird").

### 2026-10-25 · Bootcamp shows its people; gold buttons; phase colours
- Bootcamp hero: the carved serpent is replaced by Frank Yang's participant-faces film ("Why Enlightenment Is A Team Sport"), linking to YouTube, with the cohort date strip underneath.
- Bootcamp stories: every quote now carries that person's story thumbnail (Kristen, Adrian, Ryan, Tom, James, John) with a play mark; the dark Zoom still is gone from this page. Thumbnails are CC's own YouTube covers, kept in `public/brand/stories/full/`.
- Bootcamp schedule adds the weekly community rhythm from mindtraining.cc: Saturday review, Friday BFF talk show, Discord every day.
- Buttons site-wide are now the carousels' gold CTA: outlined gold, filled on hover, instead of blue-black on the paper.
- The four phase bars are an orange progress line (¼, ½, ¾, full) instead of four unrelated colours.
- Bootcamp sections sit closer together on desktop.
- Why: Dat, Oct 25, after comparing with mindtraining.cc: team transcript asks for real faces and quotes everywhere; the bluish button on the yellow paper looked off. **Provisional:** weekly event times are copied from the live site; phase names still placeholders.

### 2026-10-25 · Bootcamp: fit, tuition, application and FAQ from mindtraining.cc
- Fit: under "Sophisticated on the cushion. Reactive by noon." come the four "This is for you if…" cards and the "This may not be the right time if…" list. The old third paragraph ("We look at fit together…") is gone; the application section now says it in full.
- Tuition is now "Four components. One container.": 180 live training sessions, 180 reflection sessions, many-on-one mentoring, direct transmission from Meicheng, next to the price; plus an "Also included" list (Discord, weekly events, Meicheng's private teachings, alumni access), the payment terms and the 10% referral discount.
- Application is now "Honest about fit.": ten written questions, a 10-minute video, about two weeks for a decision, and what happens if it isn't the right time; Cohort 11 dates and the priority-registration deadline come from `lib/cohort.ts`. The button goes to the mailing list ("Get application updates") rather than promising the application by email, because our signup is the general newsletter form; "Ask the team" stays as a mail link.
- FAQ shows all 17 questions (heading "Common questions."). Order is now tuition → apply → FAQ; the section nav gains Apply and FAQ.
- Why: Dat, Oct 25, after the mindtraining.cc comparison. Copy is ported from the live Bootcamp page with light punctuation edits. **Provisional:** payment terms (one week, live) vs Adrian's 10-day deposit plan; the referral discount and early bird need Adrian/Cheng; the FAQ answer "The transformation is reliably magical when you put in the work" is a results claim the brand memo would want evidence for.

### 2026-10-25 · Spell Meicheng consistently
- The FAQ answer to "What's a transmission holder?" now says "Meicheng", matching the rest of the site.
- Why: Dat, Oct 25: Meicheng is the correct spelling.

### 2026-10-25 · Calmer Bootcamp tuition section
- Left: the four components with one short line each. Right: one price card with the price, "12 weeks · Live online", the extras as a short list, "How to apply", and a single fine-print line for payment terms, payment plans and the referral discount.
- Cut from the ported copy: the long component descriptions (including the "100,000 prostrations" line), the per-item descriptions of the extras, and the two payment paragraphs (now one line).
- Why: Dat, Oct 25: "this is very busy, make it clear and clean."

### 2026-10-25 · Correct what the Bootcamp includes
- "Also included" now lists Discord, weekly community events, and the internal podcast from Meicheng and team members. Removed "Meicheng's weekly private teachings" and "Alumni access after the Bootcamp", which were not accurate.
- FAQ "What happens after the 12 weeks?" no longer promises lifetime access to materials or ongoing community access; it says many practitioners join consecutive cohorts.
- The unused legacy `components/bootcamp/PricingPanel.tsx` gets the same correction so it can't resurface.
- Why: Dat, Oct 25: the extra is an internal podcast, access is only for the interim period, and each cohort's material is sealed for the next cohort.

### 2026-10-25 · Drop the BFF talk show from the schedule
- The Bootcamp "Each week" list now shows the Saturday weekly review and Discord only; the Friday 6:00 pm BFF talk show row is gone (also from the unused legacy `SchedulePanel.tsx`).
- Why: Dat, Oct 25.

### 2026-10-25 · Bootcamp "who it's for" section stands out
- "Reactive by noon." is now orange, like the other split headlines.
- The section sits on a slightly deeper paper band. The four "This is for you if…" items are paper cards (orange top rule, orange 01–04, 2×2 on desktop) whose last line is set in bold ink: "The isolation is.", "won't close on its own", "Spiritual over here, regular life over there.", "You need systematic deconstruction…". Same words as before, split into body and punchline.
- Why: Dat, Oct 25: "something to make this section pop?"

### 2026-10-25 · Four-tone accents for card groups
- Groups of headed items now rotate through blue (#34537b), orange (as designed), maroon (#7d2f3b) and dark green (#2f5a45) instead of all orange: the Bootcamp "This is for you if…" cards (top rule and number), the four phase bars and numbers, and the three-item card rows on Bootcamp ("When insight meets the rest of your life") and Mini Bootcamp. Orange numbers use a deeper #a8452f for contrast. Headline orange is unchanged.
- Why: Dat, Oct 25: "too orange dominant… balance the color schemes for multi headers stuff."
