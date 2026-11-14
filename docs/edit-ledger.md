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

### 2026-10-25 · Warm panels instead of grey and sage slabs
- The Transmission 101 card on Resources (was cool grey), the "On Instagram." panel on Media (was sage green with green text) and the course card on /transmission-101 (was pale blue with royal-blue labels) are now warm paper cards with an ink rule and ink/muted text, matching the Bootcamp cards. A crawl of the main pages finds no other cool-toned panels; /coaching and /embodiment still use the legacy chrome.
- Why: Dat, Oct 25: "color combination not the best."

### 2026-11-03 · Brand assets v1: favicon, lockup, logo
- Favicon is the v1 "nose" on an ink tile (`public/brand/favicon.svg`), with `app/favicon.ico` (16/32/48), 192/512 px icons and a 180 px Apple touch icon exported from it unchanged. Replaces the old roundel favicon and the mask-as-favicon SVG.
- Header and footer now use the v1 primary lockup (mask + stacked wordmark as one SVG) instead of the old mask image beside typed text. Header mask is 56 px on desktop (lockup 310 × 56) and 40 px on mobile (221 × 40), per the lockup README; footer 40 px (34 px mobile). Dark legacy pages invert it.
- The old multicolour roundel emblem (`cc-emblem.png`) is replaced by the v1 bone logo master on the video-thumbnail fallback; `cc-logo-guide.svg` is retired.
- Social preview card rebuilt: v1 ink lockup on bone `#F2ECDC`.
- Not yet applied: the kit's palette (ink #0E0E0C, bone #F2ECDC, marigold, clay, sage, mineral blue), glyphs, leaves and stepped-key ornaments. The compact-nose lockup is "not approved for use" and is not used.
- Why: Dat, Nov 3, with CC_brand_assets_v1 (4 Nov 2026).

### 2026-11-03 · "Crossfit", and the favicon mark in the footer
- "Contemplative CrossFit" is now "Contemplative Crossfit" everywhere the site says it: browser title, social and search metadata, structured data, team pages, image alt text, header/footer labels, docs and the public-site check. Unchanged on purpose: the YouTube channel URL (`@ContemplativeCrossFit`, a link) and Transmission 101 lesson 3's "the CrossFit analogy", which refers to the CrossFit fitness method. The generated `output/pdf/website-redesign-decisions.pdf` is left as it was.
- The footer shows the favicon mark (the nose on an ink tile, 44 px) above the tagline instead of the full lockup; the header keeps the lockup.
- Why: Dat, Nov 3.

### 2026-11-04 · New homepage: "04 Lanes"
- The homepage is rebuilt on the v1 brand kit: flat bone #F2ECDC with ink #0E0E0C (no paper texture), Archivo 800 caps headlines, SemiBold 600 titles and buttons, Plex Mono eyebrows. Hero "LIVE IN / PRACTICE" with a seated figure made of CC glyphs, two four-lane bands (mineral blue, sage, clay, marigold) and the four phases Absorption, Purification, Recognition, Integration, each led by its lane: "REALISATION AS A FITNESS".
- Then "WAYS TO TRAIN" (black Bootcamp card with the O3 stepped-key corner, outlined Mini Bootcamp card), "YOU'VE FOUND THE MAPS. FIND YOUR PEOPLE." (community glyph, the community paragraph and three story cards tinted clay / marigold / sage), and an ink "STAY CLOSE TO THE PRACTICE." mailing-list band with the footer.
- The homepage header gets SemiBold 18 nav and an outlined "Join the Bootcamp" button (hidden on other pages for now). Other pages are unchanged.
- Provisional: the first bend (U-fold) of the lower band does not match the reference yet; see `docs/design/README.md` and `docs/design/hero-bands-reference.png`. Phone layout is a first pass (copy, cropped art, phases as a list).
- Why: Dat, Nov 4: "push it to claude code first… inform that the bend is not right still, send the original reference. also push updates on the page including the typography, buttons and everything else."

### 2026-11-04 · Revert the "04 Lanes" homepage (kept on its own branch)
- Home is back to the version before `cb88ce9`: "Realization fitness." with the Mongaku print, the paper/ink material layer and no "Join the Bootcamp" header button. The brand-kit favicon, lockup and "Crossfit" spelling stay.
- The "04 Lanes" homepage is preserved unchanged on branch `home-04-lanes` (commit `cb88ce9`), including its `docs/design/` notes and references. Its ledger entry above is kept as written.
- Why: Dat, Nov 4: revert it and keep it on a separate branch.

### 2026-11-04 · "04 Lanes" homepage re-applied on `home-04-lanes` for preview
- This branch carries the "04 Lanes" homepage (`cb88ce9`) on top of the current `v4`, so it can be previewed and worked on through a draft pull request without changing the main preview. `v4` itself still has the previous homepage.
- Why: Dat, Nov 4: preview and keep working on the lanes branch.

### 2026-11-04 · Lanes homepage: floating header, no hero eyebrow (`home-04-lanes` only)
- The homepage header now floats: it stays pinned to the top on a full-width bone bar while scrolling, with a soft shadow that fades in once the page moves. Its ends sit on the same margins as the homepage sections (1280 px max width, 40 px sides; 20 px on phones), so the lockup lines up with the hero text and "Join the Bootcamp" with the right edge of the content. The Programs dropdown and the phone menu are not clipped.
- Removed the "REALISATION FITNESS" eyebrow above "LIVE IN PRACTICE".
- Why: Dat, Nov 4. Preview: https://deploy-preview-1--poetic-tapioca-bc92a4.netlify.app

### 2026-11-04 · Lanes homepage: hero scales to the screen height (`home-04-lanes` only)
- On desktop the whole first section now scales with the screen's height as well as its width, so the bottom of the first screen always lands just past the lower band's bend down (about 885 of the hero's 1490 units): the bend peeks in and hints at the phases below. "LIVE IN PRACTICE" stays on the 40 px content margin, in line with the header lockup. Phones keep their stacked layout.
- Why: Dat, Nov 4: "make the whole first section smaller so the bend leading down is slightly visible."
### 2026-11-04 · Lockup v1.1: smaller wordmark
- The header lockup's wordmark is 23% smaller against the mask (cap height 0.23 of the mask, was 0.30; mask-to-type gap 0.16, was 0.18), so the mask leads. The mask stays 56 px tall on desktop and 40 px on mobile, so the lockup is now about 251 × 56 px (was 310 × 56). Same change in the bone lockup and the social preview card.
- Why: Dat, Nov 4: the text was "too big"; picked option B of three.

### 2026-11-04 · ↗ arrows no longer turn into emoji on iPhones
- Archivo has no diagonal-arrow glyphs (U+2196–2199), so iOS fell back to the colour ↗ emoji on buttons and links. Those four characters now come from IBM Plex Mono Medium (already loaded by the site) through a `unicode-range` face on the "CC Archivo" family. All 25 arrows site-wide are covered with no markup change; checked that every arrow on Home, Bootcamp and Resources renders from the web font, not a system fallback.
- Why: Dat, Nov 4 (arrows showing as emoji on iPhone).

### 2026-11-04 · Lanes homepage: header 30% thinner, lockup v1.1 cache-busted (`home-04-lanes` only)
- The homepage header is 30% thinner: 73 px on desktop (was 104) and 62 px on phones (was 88). The lockup is 44 px / 36 px tall (was 56 / 40) to keep the kit's 0.25 H clear space; "Join the Bootcamp" fits inside the bar. The phone menu now hangs from the bar's bottom edge, anchor links and the hero's fold sizing account for the new height. Other pages keep the 104 px header.
- The header lockup URL carries `?v=1.1` so browsers that cached the old lockup fetch the smaller-wordmark v1.1 file (already on this branch since the `v4` merge).
- Why: Dat, Nov 4.

### 2026-11-04 · Lanes homepage: one button style (`home-04-lanes` only)
- Every homepage button now follows the hero "Explore the Bootcamp" button: Archivo SemiBold, 19 units (scales with the hero; 17 px on phones), 18 × 28 units of padding, square corners, soft shadow, 14 px gap before the arrow. Ink with bone text on bone backgrounds ("Explore the Bootcamp", "Save a spot", header "Join the Bootcamp", which were outlined before); bone with ink text on black ("Explore" on the Bootcamp card, "Join the mailing list" in the footer). Hover: clay on ink buttons, marigold on bone ones.
- The header links (Programs, Resources, Media) use the same type size. The phone menu keeps its own size.
- Why: Dat, Nov 4.
### 2026-11-04 · Lanes homepage: worn-press key frame on the Mini Bootcamp card (`home-04-lanes` only)
- In "Ways to train", the Mini Bootcamp card's black outline is replaced by the O3 stepped-key border in clay with a worn-press print treatment (rails stay straight; uneven ink and small drop-outs). It is a 9-slice border image (`public/brand/home/card-frame-worn.png`), so the four key corners keep their size and the rails repeat to fit the card on any screen.
- The clay O3 corner key inside the black Illumination Bootcamp card is removed (and its asset `key-corner-o3-clay.svg`).
- Why: Dat, Nov 4: worn press "as a frame for this block… dont use it for the outer block"; "remove the corner key border within the illumination bootcamp as well."

### 2026-11-04 · Lanes homepage: phases in a 2×2 grid with glyphs (`home-04-lanes` only)
- "Realisation as a fitness" now shows the four phases in two rows of two (Absorption · Purification, then Recognition · Integration). The lower band's lanes turn into the rows in pairs on shared, concentric curves: marigold and clay into the first row, sage and blue into the second.
- Each phase has its glyph in its lane colour: Contact (Absorption), Flame (Purification, new glyph 19), Wisdom (Recognition), Integration (new glyph 20). Descriptions wrap within their column; the hero stage is 120 units shorter (1370) since the phases take less height. Phones keep the single list, now with the glyphs.
- Why: Dat, Nov 4: reorganise the section into pairs with glyphs; approved the mock ("yep this is good push it").

### 2026-11-04 · Lanes homepage: hero alignment, secondary button (`home-04-lanes` only)
- The figure's head now sits under the gap between "Programs" and "Resources" in the header, at every desktop size (the head is the middle of the figure art; the gap's offset from the right margin was measured as 368.6 units + 100 px).
- "REALISATION AS A FITNESS" and the first phases column start where "PRACTICE" ends (572 units); the lower bands slide right by the same 112 units so their lanes still meet the glyphs. The two phase columns now run to the right content margin. Each phase's body text runs the full column width (glyph 40 units, body 17 units), so no phase takes more than two lines.
- "Save a spot" on the Mini Bootcamp card is a secondary button in the card's lower-right corner: clay outline, no fill, clay text, same type and size as the primary; it fills clay on hover.
- Why: Dat, Nov 4.

### 2026-11-04 · Lanes homepage: one heading style (`home-04-lanes` only)
- "Realisation as a fitness", "Ways to train", "You've found the maps. Find your people." and "Stay close to the practice." now share one style: Archivo ExtraBold (800) caps at the phases-title size (56 units, scaling with the hero; 34–48 px fluid on phones), line height 1, letter-spacing −0.02em. Before, all four rendered SemiBold (600) because a site-wide `.field-guide h2` rule forces 600 with `!important`, and their sizes differed (52.5 / 64 / 64 / 56 px at 1440 × 900). Other pages keep their headings.
- Why: Dat, Nov 4.

### 2026-11-04 · Lanes homepage: community transition and reformatted community intro (`home-04-lanes` only)
- Between "Ways to train" and the community section, the thick black rule is replaced by a transition: hairline, the Community glyph (40 px, 32 px on phones), hairline. The Community glyph above the heading is removed.
- The heading sets on two lines: "YOU'VE FOUND THE MAPS." / "FIND YOUR PEOPLE." The intro is now a lead-in line plus a list with clay square bullets: guidance from teachers, structured daily practice, study that sharpens understanding, people who train alongside you. The clay italic line sits beside the list.
### 2026-11-04 · Videos play on the page; marigold selection and focus
- Every participant video now plays in place: the Bootcamp hero film, the six Bootcamp story thumbnails and the homepage story images are click-to-play posters that swap for a youtube-nocookie embed in the same box (`components/ui/InlineVideo.tsx`). The separate "Watch their story" / "Watch the full story" links are removed; each poster is the one control ("Play Kristen's story", …). The footer link to the YouTube channel stays.
- Selected text is ink on marigold (was a near-invisible light-on-beige highlight inherited from the old site).
- Focus outlines on links, buttons, fields and video posters are marigold; the email field's red (clay) focus box read as an error.
- Why: Dat, Nov 4.

### 2026-11-04 · Lanes homepage: stories play in place (`home-04-lanes` only)
- The three homepage story images (Kristen, Ryan, James) are click-to-play posters with a play mark; the video plays in the same 4:3 box. Their "Watch their story" links are removed. Brings in the `v4` inline-video, marigold selection and marigold focus changes.
- Why: Dat, Nov 4.

### 2026-11-04 · Undo the community transition and intro change (`home-04-lanes` only)
- Reverts `e2b609d` and `9d71016` (the community-glyph divider, which went up with it by mistake under a "mock, not pushed" message): the community section is back to the version before them (thick rule above, Community glyph above the heading, one-paragraph intro). The `e2b609d` entry above is kept as written; both changes are held as a local mock for review.
- Why: Dat, Nov 4: pushed before he had approved it; "yeah undo".

### 2026-11-04 · Lanes homepage: phases section rebuilt to the mock-up (`home-04-lanes` only)
- "REALISATION AS A FITNESS" is one line, sitting just above the phases and starting at the glyph column. It keeps the section-headline size unless that would cross the right margin, then shrinks just enough to fit (full size at 1440 × 800; about 4% smaller at 1440 × 900, 14% at 1920 wide). Phones wrap it.
- The rows are 120 units apart (tops 1040 and 1160, was 1200): the green and blue lanes in `bands-lower.svg` turn into row 2 forty units earlier (vertical ends 1180 → 1140, same arcs). The hero stage is 50 units shorter (1320).
- "beyond the cushion": "the" and "cushion" are joined by a no-break space so "the" never ends a line.
- Why: Dat, Nov 4 (mock-up of the section).

### 2026-11-04 · Lanes homepage: community glyph transition (`home-04-lanes` only)
- Between "Ways to train" and the community section, the thick black rule is replaced by a transition: hairline, the Community glyph (40 px, 32 px on phones), hairline. The Community glyph above "You've found the maps" is removed. The heading and intro are unchanged (their rework is still a mock).
- Why: Dat, Nov 4: "push the border change first".

### 2026-11-04 · Lanes homepage: all six participant stories (`home-04-lanes` only)
- The homepage stories now show all six from the Bootcamp page: Kristen, Ryan and James as before, plus Adrian (mineral blue), Tom (clay) and John (marigold), with the same quotes as on Bootcamp. Two rows of three on desktop, stacked on phones; each plays in place. Their 1280 × 720 covers are added to `public/brand/stories/` (noted in its README).
- Why: Dat, Nov 4.

### 2026-11-04 · Lanes homepage: community heading and intro reworked (`home-04-lanes` only)
- The community heading sets on three lines with no full stops: "YOU'VE FOUND" / "THE MAPS" / "FIND YOUR PEOPLE", the last line in clay.
- The intro is a lead-in, "CC is a community for serious contemplative training:", followed by a list with clay square bullets: guidance from teachers, structured daily practice, study that sharpens understanding, people who train alongside you. The block sits beside the heading, top-aligned, with its text left-aligned and its longest line ending on the right margin; on phones it drops below the heading.
- The clay line "You bring the willingness. The training gives it somewhere to go." is removed.
- Why: Dat, Nov 4, approved the mock ("push it yes").

### 2026-11-04 · Lanes homepage: American spelling, no "More participant stories", top-aligned sign-up (`home-04-lanes` only)
- "Realisation as a fitness" is now "Realization as a fitness" (American English, matching John's quote). A sweep of the homepage's rendered text, labels and metadata found no other British spellings.
- The "More participant stories ↗" link under the stories is removed (all six stories are on the homepage now).
- The footer sign-up band is top-aligned: "STAY CLOSE TO THE PRACTICE." and the form start at the same height (was bottom-aligned).
- Why: Dat, Nov 4.

### 2026-11-04 · Lanes homepage: card buttons on the left (`home-04-lanes` only)
- "Ways to train": "Explore" now sits on the left of the Illumination Bootcamp card's footer with "Starts January 25, 2027" on the right; "Save a spot" sits bottom-left on the Mini Bootcamp card (still the clay secondary button).
- Why: Dat, Nov 4.

### 2026-11-04 · Brand v1 style on every field-guide page (`home-04-lanes` only)
- The homepage's chrome now runs across Programs, Bootcamp, Mini Bootcamp, Resources, Media, Transmission 101, the Articles index and each article, and the Terms, Privacy and Refund pages: the floating thin header with the lockup, 19 px nav and "Join the Bootcamp" button; flat bone background; kit ink; the ink mailing-list footer.
- Their text follows the CC Website Typography Guide (Claude Docs) through `app/brand-v1.css`: one display headline per page (ExtraBold caps; smaller for article and legal titles), section headlines ExtraBold caps 56 px, card titles and subheads SemiBold sentence case (30 / 44 px), lede 22 px, body 18–19 px (17 px in cards), quotes Archivo Medium Italic 21 px, eyebrows Plex Medium caps 14 px, data Plex 15 px, captions and labels Plex caps 13 px, fine print 13 px; nothing below 13 px. Buttons are the primary ink button (19 px, 18 × 28); text links are underlined Plex. Card accents use the kit lane colours (mineral blue, marigold, clay, sage). Headline halves are no longer orange.
- Checked at 1440 × 900 and 390 × 844: no sideways scroll, no heading overflow, no text under 13 px, no page errors.
- Not yet restyled: the older pages built on the previous site (Team, Coaching, Embodiment, course library and lessons, Videos, Essays, Cohort, Spotlight, View), which keep their own body styles under the new header and footer.
- Why: Dat, Nov 4.

### 2026-11-04 · Every remaining page rebuilt on brand v1 (`home-04-lanes` only)
- The pages still built on the previous site now sit in the same shell as the rest (floating header, ink footer) and wear the kit: Team and each initiate page, Coaching, Embodiment, Cohort, Spotlight, View, Essays, Videos, the course library, Illumination 101 and its lessons, the Transmission 101 course, its lessons and debrief, the video library, each video and each playlist, article topic pages, and the lab page.
- How: `SiteShell` renders them inside the field-guide wrapper (marked `legacy-page`; the old dark-mode theme toggle is gone from the footer), and `app/brand-v1-legacy.css` maps the old design tokens and utility classes onto the kit: bone and ink instead of charcoal and gold, Archivo and Plex Mono instead of Rubik and Courier Prime, square corners; filled accent buttons become the primary ink button and outlined ones (including the old `.btn-primary`) the clay secondary; small uppercase labels become Plex eyebrows; group labels (Browse, Search, Collections, Watch next, Lessons, video groups) are eyebrows rather than headlines; section headlines are 44 px on these denser pages; the sticky section tab bars sit under the 73 / 62 px header. The three section navs that forced a 10 px button size no longer do.
- Footer sign-up heading: "Stay close to the practice" and "Get the free course" without the full stop.
- Checked all 32 routes at 1440 × 900 and 390 × 844: no sideways scroll, no heading overflow, no text under 13 px, no page errors; public-site, Kit form and video-manifest checks pass.
- Why: Dat, Nov 4 ("rebuild every page"; remove the full stop).

### 2026-11-04 · Other pages sized like the homepage; no full stops in headings; Resources in one column (`home-04-lanes` only)
- Every page now uses the homepage's size unit (`--ln-u`, which scales with screen width and, on desktop, height), so type matches the homepage at any screen size: page titles and section headlines are the size of "Realization as a fitness" / "Ways to train" (56 units: 53 px at 1440 × 900, 46 px at 1440 × 800), subheads 30 units (28 px), body 17 units (16 px, never under 15), ledes 22 units; on phones the homepage's 35 px headlines, 24 px subheads, 17 px body. Before, other pages had 72–80 px titles, 56 px headlines and 18 px body at every size.
- Full stops removed from all 25 h1–h3 headings that had them (e.g. "Ways to train", "Illumination Bootcamp", "You've found the maps / Find your people", "Common questions", "Notes from practice").
- The footer's "Join the mailing list" is the homepage's bone button on every page (other pages were turning it ink on ink).
- Resources: the Transmission 101 card runs the full content width (image and copy side by side); "Notes from practice" sits under it with the six essays three across (two on tablets, one on phones). "Free courses" and "Notes from practice" are section headlines.
- Checked all 32 routes at 1440 × 900 and 390 × 844: no sideways scroll, heading overflow, sub-13 px text or page errors.
- Why: Dat, Nov 4.

### 2026-11-04 · Every page on the header's edges; outlined header button; tidier Resources and Articles (`home-04-lanes` only)
- Every page's content now lines up with the header: 1200 px wide inside 40 px side margins (20 px on phones), the same frame as the homepage. Before, the field-guide pages sat in a 1024 px column and the older pages in Tailwind columns from 608 to 1024 px, centred. On the older pages the outer column fills the frame, narrower inner columns start at the left edge, and centred text is left-aligned. Legal pages keep a 46 rem reading column, left-aligned. Topic pages (/articles/topics/…) are treated as older pages. Lesson infographics no longer bleed 10 px past the edges. Checked all 32 routes at 1440 and 390 wide.
- Header "Join the Bootcamp" is a secondary button: ink outline, ink text, no fill (fills ink on hover), so page buttons keep the top of the hierarchy.
- The "Ready to train?" band is removed from Resources, Media, Articles and every article (the header carries the CTA).
- Articles: each essay image fills its frame (cover crop, no grey bands); the "Read the article" links are gone (the card is the link); the "23 essays to explore" count is hidden (kept for screen readers, which announce it when filtering).
- Resources: "Free courses" and "Notes from practice" drop a level, to card titles (SemiBold, sentence case, 44 units; 32 px on phones), under the page title.
- Why: Dat, Nov 4.

### 2026-11-04 · FAQ title and question size (`home-04-lanes` only)
- Bootcamp's "Common questions" heading is now "FAQ".
- FAQ questions drop one level: Archivo SemiBold, sentence case, 20 units (about 19 px at 1440 × 900; 17 px on phones), down from the 28 px subhead size; answers are body text with a 68-character measure. Applies to every page that uses the FAQ accordion.
- Why: Dat, Nov 4.

### 2026-11-05 · Mini Bootcamp hero copy (`home-04-lanes` only)
- Title "A taste of the training" → "MINI BOOTCAMP"; the small "Mini Bootcamp" line under it is removed.
- Description is now "A free introduction to the practice and the community, whether you later join the Bootcamp or simply want to explore." (was "Meet CC by practicing with us…").
- Date line is "Next run: December 14–18, 2026" with the date in clay red (was "December 14–18, 2026 · Live online").
- Why: Dat, Nov 5.

### 2026-11-05 · Course pages: left-aligned, three heading levels (`home-04-lanes` only)
- Course pages (Transmission 101 course, lessons and debrief; Illumination 101 and its lessons; course videos) are marked `course-page`. Their reading text (`.prose`) now starts at the left page edge instead of sitting in a centred column.
- Heading levels: 1 the page title ("STAYING PRESENT"); 2 section headings ("Before you begin", "The five lessons", "Reading material", "Go back through it", "So how does this survive your day?") in Archivo SemiBold, sentence case, 44 units (41 px at 1440 × 900, 30 px on phones); 3 headings inside the lesson text ("Welcome", "What Is Transmission?") SemiBold 26 units (24 px; 21 px on phones). Those page-level section headings were changed to sentence case in the code; headings inside the lesson MDX keep their original wording.
- Why: Dat, Nov 5.

### 2026-11-05 · Spacing restored on older components; Plex breadcrumbs (`home-04-lanes` only)
- A base field-guide reset (`h1, h2, h3, p, figure { margin: 0 }`) was overriding the Tailwind spacing classes (`mt-3`, `mb-6`, …) on every page rebuilt from the previous site, so titles, subtitles, section intros and paragraphs sat flush against each other (e.g. the lesson subtitle under "THE ACT OF LEAVING", the intro under "Discussion"). The reset no longer applies on those pages, and on the other pages it skips elements that carry their own margin classes (fixes Mini Bootcamp's "Watch next" titles touching their meta line).
- Video and discussion row titles (text-sm/base) are 20 units (≈19 px at 1440 × 900).
- Breadcrumbs are IBM Plex Mono throughout (the current page and the "/" separators were Archivo).
- Checked all 32 routes at 1440 and 390 wide for headings sitting under 6 px from the text below and for overlapping text (closed accordions excluded): none left except the intentional name/role pair on Team cards.
- Why: Dat, Nov 5.

### 2026-11-05 · Mini Bootcamp: clips section removed (`home-04-lanes` only)
- "A taste of the practice" (the Transmission 101 clip player and "Watch next" row) is removed from the Mini Bootcamp page; those clips belong to the email-walled Transmission 101 course. The component file stays in the repo, unused.
- Why: Dat, Nov 5.

### 2026-11-05 · Mini Bootcamp: duplicate intro removed (`home-04-lanes` only)
- The "Enter together" section no longer repeats "A free introduction to the practice and the community…"; the sentence stays as the hero description.
- Why: Dat, Nov 5.

### 2026-11-05 · Mini Bootcamp: "Five days of training" with leaves (`home-04-lanes` only)
- The "Enter together" section on /mini-bootcamp is now "FIVE DAYS OF TRAINING": three items, each led by an upright leaf in its colour with a small Plex label above the title. Live meditation sessions (blue soft-lance leaf, "Daily"; was "Live daily sits", same body), Mentor-led discussions (marigold soft-lance leaf, "Daily"; was "Mentor breakouts", new body: "Share your meditation experience and be mirrored by CC mentors and other practitioners."), Community campfire (clay nested leaf, "Closing", same body). Three across on desktop, stacked on phones; the coloured top rules are gone.
- Why: Dat, Nov 5, approved the mock.

### 2026-11-05 · Mini Bootcamp: section headings one level down (`home-04-lanes` only)
- "Five days of training" and the closing heading sit one level under "MINI BOOTCAMP": Archivo SemiBold, sentence case, 44 units (41 px at 1440 × 900; 32 px on phones), was ExtraBold caps at the title size.
- "Begin exploring now" is now "Can't wait? Begin exploring now".
- Why: Dat, Nov 5.

### 2026-11-05 · Participant headshots; Tyson and Ryan join the stories (`home-04-lanes` only)
- The story cards on the homepage and /bootcamp now use real headshots for Adrian, Tyson, Tom, John and Ryan instead of YouTube covers, each cropped with the face centered (4:3 on the homepage, 16:9 on Bootcamp).
- Tyson replaces Kristen (video `tHBd3sCOjWk`, quote from the original testimonials). Ryan (`zcrvJoSpfYs`, stream-entry story) replaces James. The other Ryan (`NrObMSAiNQQ`) is now labelled "Ryan M." and keeps his YouTube cover.
- Why: Dat, Nov 5, supplied the headshots.

### 2026-11-05 · Stories: Taylor replaces Ryan M.; story photos in full colour (`home-04-lanes` only)
- The "Ryan M." card on the homepage and /bootcamp is now Taylor, with his headshot (face centered), video `M4tPoR5-n40` and the quote "True realization is not the destruction of intelligence. It is the liberation and embodiment of intelligence."
- Why: Dat, Nov 5.
- The homepage story photos now show in full colour: the grayscale + colour-tint treatment is removed from the six story cards.
- Why: Dat, Nov 5.

### 2026-11-06 · Lanes homepage: story play button and lighter quotes (`home-04-lanes` only)
- The play button on the participant story photos moves off the face: a small bone disc (40 px) with an ink triangle in the bottom-right corner, turning ink on hover. Was a brown 46 px disc in the centre, which covered the nose.
- Story quotes are Archivo Regular 400 italic (was Medium 500 italic), 21 px on desktop and 19 px on phones (was 21 px everywhere), as in the typography guide.
- Why: Dat, Nov 6: picked option B of three play buttons and Regular italic of two quote weights.

### 2026-11-06 · Bootcamp hero: date line, wider video, no Phases shortcut (`home-04-lanes` only)
- The hero now reads "Next cohort: January 25, 2027 · 12 weeks" under the description, with the date in clay, matching Mini Bootcamp's "Next run" line. The date strip under the video is gone.
- "See the schedule" and the caption under the video are removed. On desktop the video is wider (about 616 px at 1440, was about 500) and its top lines up with the "Paid program" line.
- The section shortcuts drop "Phases", since phases sit inside Course details.
- Why: Dat, Nov 6.

### 2026-11-06 · Homepage: one body-text size; community list removed (`home-04-lanes` only)
- Body text on the homepage now matches the hero line "Build a practice that can meet your life…": 22 units (about 21 px at 1440 × 900), 18 px on phones. This covers the two "Ways to train" card descriptions (were 20 px and 19 px) and the "Stay close to the practice" sign-up text in the footer (was 20 px; the footer is shared, so every page gets it).
- Removed "CC is a community for serious contemplative training:" and its four-item list next to "You've found the maps / Find your people".
- Provisional: the four phase descriptions under "Realization as a fitness" stay at 17 units. At the larger size they collide with the next row at 1024 px, because each row is pinned to where its colored line ends. Story quotes, fine print, labels and footer small print are unchanged. Waiting on Dat for both.
- Why: Dat, Nov 6.

### 2026-11-06 · Homepage: story quotes at the body-text size (`home-04-lanes` only)
- The italic quotes under the participant photos now use the same size as the rest of the homepage body text: 22 units (21 px at 1440 × 900, about 17.5 px in a 1440 × 780 window), 18 px on phones. They were a fixed 21 px (19 px on phones), so they looked bigger than the body text in shorter windows.
- Why: Dat, Nov 6.

### 2026-11-06 · Homepage: lower band turns one 90° corner; no rule above "Ways to train" (`home-04-lanes` only)
- The lower band (blue, sage, clay, marigold) now runs level under the figure and turns a single rounded right-angle corner, then drops straight down beside the phases. The lanes end flat and staggered, marigold shortest and blue longest. The old U-fold, the S-bend and the turns into each phase row are gone.
- "Realization as a fitness" and its four phases move up. The gap from the band down to the title equals the gap from the end of the phase text down to "Ways to train" (100 units, 94 px at 1440 × 900). The black rule between the hero and "Ways to train" is removed.
- The four phases now sit in a normal 2 × 2 grid, so a description that wraps to three lines pushes the second row down instead of running into it.
- Why: Dat, Nov 6, with a mock-up of the corner.

### 2026-11-06 · Homepage hero: one band (`home-04-lanes` only)
- The hero has a single band. The second band that crossed behind "Explore the Bootcamp" and the figure is gone.
- The band comes in from the upper right and sweeps down behind the figure, whose glow fades it as it passes. It runs level under the figure and turns one rounded right-angle corner at the left. Blue's outer edge lines up with the left edge of "LIVE IN PRACTICE".
- The lanes keep an even spacing through every bend.
- "Realization as a fitness" and the four phases move left to sit beside the lanes, with the title and glyphs starting 84 units right of the marigold lane, and run to the right margin. The 100-unit gaps above the title and above "Ways to train" are kept.
- "04 Integration" no longer sits lower than "03 Recognition" when the description beside it wraps.
- Why: Dat, Nov 6, with a rough sketch ("don't follow exactly") and a crop of the corner.

### 2026-11-06 · Homepage phases: Mini Bootcamp row format, body-size text (`home-04-lanes` only)
- Each of the four phases now uses the Mini Bootcamp row layout.
  - The glyph sits in its own column, centered vertically on the text block (Mini Bootcamp's leaves sit at the top).
  - A small colored Plex number ("01") sits above the title, then the description.
- The descriptions use the page's body size: 22 units (21 px at 1440 × 900), 18 px on phones. They were 17 units.
- The rows are 44 units apart.
- On phones the colored rule down the left of each phase is gone, matching Mini Bootcamp.
- The band's vertical lanes are 88 units longer, so blue still ends level with the bottom of the phases.
- Why: Dat, Nov 6.

### 2026-11-06 · Homepage: band lanes run further down (`home-04-lanes` only)
- The four vertical lanes beside the phases are 60 units longer. Blue now stops 40 units (about 38 px at 1440 × 900) above "Ways to train", and the others step up from it in 30-unit stages, marigold shortest.
- Why: Dat, Nov 6, after the phases grew taller.

### 2026-11-06 · Bootcamp stories: same treatment as the homepage (`home-04-lanes` only)
- The six participant cards on /bootcamp now match the homepage's:
  - a bone play disc in the bottom-right corner of each photo (ink on hover), not a brown one over the face;
  - quotes in Archivo Regular italic at the body size (21 px at 1440 × 900, 18 px on phones);
  - names in Plex caps, directly under each quote (they used to drop to the bottom of the row).
- The Bootcamp photos keep their 16:9 frame.
- Why: Dat, Nov 6.

### 2026-11-06 · Homepage: new Purification line (`home-04-lanes` only)
- The "02 Purification" phase on the homepage now reads "Patterns met fully begin to unwind, freeing you to choose anew." (was "Learn to meet your patterns as you hold and become them.").
- Why: Dat, Nov 6.

### 2026-11-07 · Homepage: worn-ink texture on the lines (`home-04-lanes` only)
- The four colored hero lanes and the horizontal community divider now have irregular printed edges and fine paper flecks, echoing the Mini Bootcamp card frame in Dat's reference.
- The hero paths, colors, spacing, and staggered ends are unchanged. Text, buttons, and the figure remain untouched.
- Why: Dat, Nov 7, supplied the textured card reference and asked to use that texture for the lines too.
- Provisional: none.

### 2026-11-07 · Programs points to Ways to train (`home-04-lanes` only)
- Clicking Programs now goes straight to the homepage's Ways to train section, including from other pages and the mobile menu. Individual Bootcamp submenu links are unchanged.
- The old /programs URL permanently redirects to that section rather than showing a separate overview. It is no longer listed in the sitemap.
- The section heading clears the floating header when reached by its anchor.
- Why: Dat, Nov 7, asked not to keep Programs as a separate page.
- Provisional: none.

### 2026-11-07 · Lines use running-track grain (`home-04-lanes` only)
- The colored hero lanes have fine rubber-like tonal grain and clean, solid edges, replacing the rough printed edges and paper holes. Their paths, colors, widths, spacing, and staggered ends are unchanged.
- The horizontal divider also switches to fine tonal grain. The Mini Bootcamp card's frame stays unchanged.
- Uses procedural SVG noise and blending, without bitmap textures or extra lane stripes.
- Why: Dat, Nov 7, supplied the running-track noise/blend treatment and preferred it over the frame's style.
- Provisional: none.

### 2026-11-07 · Track ends taper into stripes (`home-04-lanes` only)
- Each lower colored lane ends in eight separated bars, thinning progressively toward its tip, inspired by the striped ends in Dat's Seoul 1988 reference.
- The four colors, running-track grain, curves, lane spacing, and staggered tip positions stay unchanged. No spiral, Olympic rings, or new layout is added.
- Phone artwork keeps its existing crop; desktop shows the new terminals beside the phases.
- Why: Dat, Nov 7, asked to make the end of the track similar to the supplied Olympic logo.
- Provisional: none.

### 2026-11-07 · Numbered finish-line tips replace stripes (`home-04-lanes` only)
- The lower lane tips are solid again, with light 1–4 lane numbers, a cross-line above, and a short underline, following Dat's follow-up finish-line photo.
- Replaces the immediately preceding striped-terminal interpretation. Lane colors, grain, widths, curves, spacing, and staggered endpoints stay unchanged.
- Why: Dat, Nov 7, supplied a close-up of numbered running-track finish boxes.
- Provisional: none.

### 2026-11-07 · Combine numbers and striped track ends (`home-04-lanes` only)
- Keeps both requested reference details: 1–4 finish markings on the solid lanes, followed by the progressively thinning stripes.
- The colors, running-track grain, curves, lane widths, and overall staggered endpoint positions stay unchanged.
- Why: Dat, Nov 7, clarified to add the numbered treatment as well, not replace the striped treatment.
- Provisional: none.

### 2026-11-07 · Track numbers follow phase colors (`home-04-lanes` only)
- Track labels now map yellow to 1, red to 2, green to 3, and blue to 4. Numbered finish markings and tapering stripes both remain.
- Removed the duplicate 01–04 labels above Absorption, Purification, Recognition, and Integration on the homepage. Names, icons, and descriptions are unchanged.
- Why: Dat, Nov 7, specified the color-number order and asked to remove numbers from the elements.
- Provisional: none.

### 2026-11-07 · Keep phase numbers as well (`home-04-lanes` only)
- Restored 01–04 above Absorption, Purification, Recognition, and Integration, following Dat's correction to leave those numbers in place.
- Track numbering remains yellow 1, red 2, green 3, blue 4; numbered finish markings and tapering stripes stay combined.
- Original phase layout and clearance below the track are retained.
- Why: Dat, Nov 7, corrected the request to keep numbers on the phase elements.
- Provisional: none.

### 2026-11-07 · Connect Cohort 11 application (`home-04-lanes` only)
- The Bootcamp hero, tuition card, and application section now offer Apply for Cohort 11 and open Dat's Zoom application, replacing the newsletter placeholder.
- Application instructions match the verified destination: ten questions, about 30 uninterrupted minutes, followed by an invitation to schedule a brief Zoom introduction.
- Stores the exact supplied link in lib/cohort.ts. Mini Bootcamp registration and newsletter signup stay unchanged.
- Why: Dat, Nov 7, supplied https://s.zoom.us/m/bPlPelXHc as the Cohort 11 registration link.
- Provisional: none. No application was filled or submitted during verification.

### 2026-11-07 · Solid track ends, lane 1 on the outside (`home-04-lanes` only)
- Removed the Olympic-inspired stripe tails; solid numbered finish boxes remain.
- Reordered the lanes from outer/leftmost to inner/rightmost: yellow 1, red 2, green 3, blue 4. The outer yellow lane is longest, blue shortest.
- Keeps running-track grain, curve geometry, widths, spacing, and the 01–04 phase labels. Cohort 11 application links stay unchanged.
- Why: Dat, Nov 7, preferred the version without the Olympic element and specified lane 1 on the outside/left.
- Provisional: none.

### 2026-11-07 · Programs menu: track grain and red dates (`home-04-lanes` only)
- The desktop Programs dropdown uses a tiny procedural running-track grain overlay on bone instead of the paper photograph.
- January 25, 2027 and December 14–18 are highlighted in the brand's clay red; duration and Free labels stay muted. Phone menu retains its existing flat layout and also highlights dates.
- Why: Dat, Nov 7, asked for track texture in the dropdown and red dates.
- Provisional: none.

### 2026-11-07 · Mini Bootcamp leaves use track grain (`home-04-lanes` only)
- The blue, marigold, and clay leaf icons under Five days of training now use the same fine procedural running-track texture as the hero lanes.
- Shapes, colors, transparent veins/cutouts, icon sizes, text, and layout stay unchanged. No bitmap textures added.
- Why: Dat, Nov 7, supplied the three-icon section and asked to make these track texture.
- Provisional: none.

### 2026-11-07 · Shared track-grain brand treatment (`home-04-lanes` only)
- Brand-colored text, numbers, dates, glyphs, and interactive color changes now share fine running-track grain across the site's modern and legacy pages.
- Colored backgrounds and button hover fills use the procedural overlay; type uses a gentler alpha-clipped version to retain clean letterforms. Includes all four brand colors.
- Photos, videos, neutral body copy, and already-textured hero lanes/leaves stay unchanged; decorative grain is disabled for printing/forced colors.
- Why: Dat, Nov 7, asked to extend track grain to all primary colors, including text and hover.
- Provisional: none.

### 2026-11-07 · Bootcamp phase 04 is Integration (`home-04-lanes` only)
- Renamed the fourth phase under Twelve weeks / Four phases on /bootcamp from Realization to Integration, matching the homepage. Its description is unchanged.
- Why: Dat, Nov 7, selected Integration to resolve the audit's naming mismatch.
- Provisional: none.

### 2026-11-07 · Clear Mini CTA, Escape dismissal, matching phase colors (`home-04-lanes` only)
- The homepage Mini Bootcamp action now says Explore Mini Bootcamp, accurately describing its destination while registration is closed.
- Escape closes the expanded mobile navigation and returns focus to Menu. Normal toggle/link dismissal remains unchanged.
- Bootcamp phase colors now match home and the numbered track: Absorption yellow, Purification red, Recognition green, Integration blue. Fit-card colors are unchanged; the existing darker yellow text variant is retained.
- Why: Dat, Nov 7, authorized fixes to QA findings 2 and 3 and selected the homepage phase-color mapping for Bootcamp too.
- Provisional: the separate contrast finding is not addressed by this change.

### 2026-11-07 · Remove track starting numbers and marks (`home-04-lanes` only)
- Removed lane numbers 1–4 and the white starting/underline marks from the homepage track. Colored lanes, curve geometry, endpoint lengths and rubber grain are unchanged. Phase labels 01–04 remain.
- Why: Dat, Nov 7, requested a temporary Netlify review and clarified removal of both the numbers and lines.
- Provisional: this is the temporary preview only; canonical production is not changed.

### 2026-11-09 · Sync from cc `main` (`home-04-lanes` only)
- Brought over the one change `mindtraining-cc/cc` had that this branch didn't: the three "Apply for Cohort 11" buttons on /bootcamp open the application survey in a new tab (`target="_blank" rel="noopener noreferrer"`, from cc PR #30).
- Restored `public/images/cc-emblem.png` (CC's author photo in `content/team/cc.mdx`) and `public/brand/cc-logo-guide.svg`, which cc kept and this branch had dropped. The newer `scripts/check-public-site.py` from cc now passes here (34 pages, 23 articles).
- Kept as they are on purpose: this preview's Netlify and `noindex` settings (`netlify.toml`, `next.config.ts`, `app/layout.tsx`); the docs (ledger, handoff, design notes, decisions); "Crossfit" with a lowercase f in four docs where cc still has "CrossFit".
- After this commit the website code and assets match cc `main` (`2dce30d`) apart from those items. New work continues here and Dat ports it to cc.
- Why: Dat, Nov 9: "cont to work in datvt. ill do the porting."

### 2026-11-09 · Bootcamp hero eyebrow: drop "12 weeks" (`home-04-lanes` only)
- The line above "ILLUMINATION BOOTCAMP" now reads "PAID PROGRAM · LIVE ONLINE" (was "… · 12 WEEKS"). The length still appears in the "Next cohort: January 25, 2027 · 12 weeks" line below it.
- Why: Dat, Nov 9.

### 2026-11-09 · Homepage: Bootcamp card in clay red with a light grain (`home-04-lanes` only)
- The "Illumination Bootcamp" card under "Ways to train" is now clay red (`--clay` #A63A2E) instead of ink. It has a minimal print grain (`public/brand/home/card-grain.svg`: a soft dark grain plus sparse pale specks), drawn over the flat color so the brand red stays the base. It follows Dat's reference card, without the bands.
- The eyebrow "PAID · 12 WEEKS · LIVE ONLINE" is bone (marigold on clay would be 2.4:1). The description is bone too, and the rule above "Explore" is a faint bone line. Bone on clay is 5.4:1.
- The "Explore" button stays bone with ink text and still turns marigold on hover.
- Why: Dat, Nov 9.

### 2026-11-12 · Homepage cards: side column, dates under the text; heading; Bootcamp hero play button (`home-04-lanes` only)
- **Clay Bootcamp card: side column.** The right 30% now carries two bone track lanes with a thin clay gap. They come in from the right edge, turn one rounded corner and run down off the bottom, with grain printed into them (`public/brand/home/card-side-track.svg`), after Dat's "Middle of the day" track card. The text, rule and button keep to the left of the column. On phones (≤ 900 px) the column is hidden.
- **Card dates.** Both cards now show their date in Plex under the body text, as on the Bootcamp and Mini Bootcamp pages.
  - Bootcamp: "Next cohort: January 25, 2027 · 12 weeks" in bone. The "Starts January 25, 2027" beside the button is gone, and the eyebrow is now "PAID · LIVE ONLINE".
  - Mini Bootcamp: the text is "Mini Bootcamp: five free days of live practice." followed by "Next run: December 14–18, 2026", with the date in clay.
  - A date never splits across lines.
- **Community heading.** It now reads "YOU'VE FOUND THE MAPS / FIND YOUR PEOPLE" on two lines (was three). The heading block is a single column now that the list beside it is gone.
- **Bootcamp hero video.** The play button is the bone corner disc used on the story cards (40 px, bottom-right, ink on hover); it was a brown disc over the middle face.
- Why: Dat, Nov 12.

### 2026-11-12 · "12 weeks" back in the eyebrows (`home-04-lanes` only)
- Bootcamp hero eyebrow: "PAID PROGRAM · LIVE ONLINE · 12 WEEKS". Homepage Bootcamp card eyebrow: "PAID · LIVE ONLINE · 12 WEEKS".
- The next-cohort lines below them now carry only the date: "Next cohort: January 25, 2027".
- This reverses the Nov 9 and Nov 12 moves of "12 weeks" into the date line.
- Why: Dat, Nov 12.

### 2026-11-12 · Clay Bootcamp card: the key column replaces the track graphic (`home-04-lanes` only)
- The side column on the homepage Bootcamp card is now the CC key column: Dat's O4 key unit stacked down the right side in bone.
  - Size: 26 px wide and 36 px in from the top, right and bottom edges; 20 px wide on phones, where it now stays.
  - Spacing: units sit on the 9-unit pitch of Dat's ×4 file and are never cut off; any spare height is spread evenly between them.
- It replaces the bone track graphic from earlier on Nov 12, which was a misreading of "side column"; that file is deleted.
- Files:
  - Dat's sources: `public/brand/key-column/CC_key-column-O4-unit_clay_v1.svg` and `CC_key-column-O4-x4_clay_v1.svg`.
  - Repeat tile: `CC_key-column-O4-tile_bone.svg`, the same unit in bone, padded to that pitch.
- The text keeps 112 px clear on the right (72 px on phones). "12 weeks" in the eyebrow no longer splits across lines.
- Why: Dat, Nov 12: "this is the key column unit".

### 2026-11-12 · One type system for the whole site (`home-04-lanes` only)
- New `app/type.css` defines every text role once and maps the site's elements onto those roles (`docs/type-system.md`). Distinct text styles across 11 key pages went from 47 to 20 on desktop and from 47 to 19 on phones (`scripts/check-type.mjs`).
- Changes visitors will notice:
  - Page titles on every page except the homepage are bigger than section headlines: 64 px at 1440 × 900 (was 52 px), 39 px on phones.
  - Body text is one size everywhere: about 18 px at 1440 × 900, 17 px on phones. Homepage body comes down from 21 px; other pages go up from 16 px.
  - Story quotes match body text.
  - FAQ questions, essay titles, lesson headings and legal headings share one minor-title size.
  - The homepage card titles now scale with the window like everything else.
  - Plex labels settle on eyebrow 14 px (13 px on phones), data 15 px and caption 13 px. Article dates and tags are data.
  - Footer small print and the phone "Menu" button come up to 13 px.
  - Bold inside article and lesson text is regular weight; the Bootcamp schedule times are SemiBold.
  - Long headings break into balanced lines.
- `!important` was dropped from the older size rules in `brand-v1.css` and `brand-v1-legacy.css` that `type.css` now owns.
- Why: Dat, Nov 12, after the hierarchy audit; decisions: page-title role ("make sure the sizing isn't too large"), minor-title role, one body size, eyebrow 14 / data 15.

### 2026-11-12 · Media title without the forced break (`home-04-lanes` only)
- The /media title is now one line, "MEDIA IN CONVERSATION", at 1440 × 900 and two lines on phones. The hard line break after "Media" is gone; it had been splitting the title into "MEDIA / IN / CONVERSATION" on phones.
- Why: Dat, Nov 12.

### 2026-11-12 · Coaching stats; Media section titles as subsections (`home-04-lanes` only)
- **Coaching stats** (/coaching, Stories tab):
  - The numbers in the stats banner are now large ExtraBold figures in clay, the same treatment as the "$2,450" tuition price (52 px at 1440 × 900, 35 px on phones). They were 13 px. The labels under them are Plex captions.
  - The banner is three even columns on phones, so nothing runs off the box.
  - "8 Cohorts Completed" is now "9".
  - These stats are hard-coded in `components/bootcamp/Testimonials.tsx`, not tied to `lib/cohort.ts`.
  - Provisional: "Lives Transformed" stays until Dat picks wording. The writing guide rules out "transform" language; suggested "300+ practitioners trained", which needs the 300+ figure confirmed.
- **Media section titles:** "The BDSM show", "Past media" and "On Instagram" on /media are now subsections, matching "Free courses" on /resources: Archivo SemiBold, sentence case, 41 px (32 px on phones). They were caps ExtraBold section headlines.
- Why: Dat, Nov 12.

### 2026-11-12 · Bootcamp: sticky section tabs, like Coaching's (`home-04-lanes` only)
- The row of section links on /bootcamp is now a tab bar (`components/field-guide/BootcampTabs.tsx`) modeled on the Coaching page's.
  - It sticks under the header while you scroll (73 px on desktop, 62 px on phones), on a translucent bone strip with a hairline above and below.
  - Tabs: STORIES · COURSE DETAILS · SCHEDULE · TUITION · FAQ, evenly spaced across the content width in the eyebrow role (Plex Medium 14 px caps). The current section's tab turns clay with a 2 px underline as you scroll.
  - "Apply" moved out of the tabs into an outlined clay button on the right, like Coaching's "Get Notified". It jumps to the application section and fills clay on hover.
  - Each tab lands its section just below the bar. On phones the bar scrolls sideways, as on Coaching.
  - "Participant stories" is shortened to "Stories" to match Coaching.
- The Coaching, Embodiment and other sticky tab bars also use the eyebrow role now: Coaching's were Plex Regular 13 px.
- The Coaching page stays unlinked from the site navigation, as Dat asked.
- Why: Dat, Nov 12.

### 2026-11-13 · Bootcamp course details in the Mini Bootcamp row format (`home-04-lanes` only)
- The three items under "When insight meets the rest of your life" on /bootcamp now use the leaf rows from Mini Bootcamp's "Five days of training". Each has a textured leaf on the left, a small Plex label in its color above the title, then the description. The colored top rules are gone.
  - Direct transmission: blue soft-lance leaf, "Daily".
  - Live reflection: marigold soft-lance leaf, "Daily".
  - Many-on-one support: clay nested leaf, "Ongoing".
- Both sections now share one set of row styles (`:is(.mini-week,.course-details)` in `lanes-home.css` and `type.css`).
- Provisional: the labels "Daily / Daily / Ongoing" are mine, following Mini's "Daily / Closing"; Dat to confirm.
- Why: Dat, Nov 13.

### 2026-11-14 · Ink Bootcamp card with a worn clay key column (`home-04-lanes` only)
- The homepage Bootcamp card ("Ways to train") is now ink with the same light grain, replacing clay. The Mini Bootcamp card is unchanged.
  - Eyebrow and the cohort date are marigold; body text is bone; "Next cohort:" is bone at 75%. The faint rule above the button is gone.
- The side column moves to the left and becomes a worn clay key column: 54 px wide, 44 px in from the left edge, running the full height of the card and cut off by its top and bottom edges. Text starts 144 px in.
  - Phones: 30 px wide, 16 px in; text starts 64 px in.
  - New file: `public/brand/home/card-key-column-worn.png`, 8 linked pairs of the O4 key in worn clay, repeating seamlessly. The bone key-column tile is no longer used here.
- Why: Dat, Nov 14. Red as the base read as danger, and the paid card needed to stay first in the hierarchy next to the bone Mini Bootcamp card; picked from mockups (ink, worn column, left, full height, 54 px).

### 2026-11-14 · Bootcamp: section order after the stories (`home-04-lanes` only)
- On /bootcamp, after "You've found the maps", the three blocks now run in this order:
  1. "Sophisticated on the cushion / Reactive by noon"
  2. "Twelve weeks / Four phases"
  3. "When insight meets the rest of your life"
- They used to run 3, 2, 1. Schedule, tuition, application and FAQ follow as before.
- The "Course details" tab still jumps to "When insight meets…".
- Why: Dat, Nov 14.
