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
