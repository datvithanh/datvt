# CC type system

Source of truth in code: `app/type.css`, loaded last in `app/layout.tsx`. It defines every text role once as a
token, then maps elements to roles. To change a role, change its token. Brand reference: the CC Website
Typography Guide (Claude Doc `Siz3j9CgKUEk1EWjNNTfzm`); this file records where the site now differs from it.

Desktop sizes are in units of the homepage stage (`--ln-u`, about 0.94 px at 1440 × 900), so they scale with the
window, and they never go below the phone size. Phones (≤ 900 px) are fixed. Nothing is below 13 px.

| Role | Desktop | Phone | Font | Used for |
|---|---|---|---|---|
| Display | 108u | 55 px | Archivo 800 caps | Homepage hero only ("LIVE IN PRACTICE") |
| Page title | 68u (64 px at 1440) | clamp(36, 10vw, 56) | Archivo 800 caps | The `h1` of every other page |
| Section headline | 56u | clamp(34, 9vw, 48) | Archivo 800 caps | Section titles |
| Card title / subsection | 44u | 32 px | Archivo 600 | Feature card titles, subsections (Five days of training, Free courses, the Media page sections) |
| Subhead | 30u | 24 px | Archivo 600 | Item and phase titles |
| Minor title | 22u (min 19) | 19 px | Archivo 600 | FAQ questions, essay titles, lesson headings, legal headings |
| Lede | 22u (min 18) | 18 px | Archivo 400 | The intro paragraph under a title |
| Body | 19u (min 17) | 17 px | Archivo 400 | All running text, homepage included |
| Quote | = body | = body | Archivo 400 italic | Participant quotes |
| Button / nav | 19u | 17 px | Archivo 600 | Buttons, header nav, section shortcuts |
| Eyebrow | 14 px | 13 px | Plex 500 caps, +12% | Labels above titles, phase numbers |
| Data | 15 px | 15 px | Plex 400 | Dates, numbers, text links, article date and tags |
| Caption / meta | 13 px | 13 px | Plex 400 caps, +8% | Names under quotes, form labels, breadcrumbs |
| Fine print | 13 px | 13 px | Archivo 400 | Consent lines, footer small print |

New markup can use the role classes (`t-page`, `t-section`, `t-card`, `t-subhead`, `t-minor`, `t-lede`, `t-body`,
`t-quote`, `t-eyebrow`, `t-data`, `t-caption`, `t-fine`) instead of setting a size.

Differences from the Typography Guide (Nov 12, Dat):
- Added the **page title** and **minor title** roles.
- Body is one size everywhere: 19u desktop, 17 px phone. Quotes match body.
- Sizes scale with the window, with the phone size as the floor (the guide says fixed px).
- Eyebrows are 13 px on phones (the guide says 12 px, below its own 13 px floor).
- Weights are limited to 400, 400 italic, 600 and 800: bold inside article and lesson text is now regular,
  and the Bootcamp schedule times are 600.
- Footer small print comes up to 13 px.
- Kept as exceptions: the tuition price ("$2,450") and the Coaching stat figures (section size, ExtraBold), course outline numbers (data).

Check: `node scripts/check-type.mjs` with the site running. It lists every distinct text style per width.
Nov 12 after this change: 20 at 1440 px, 19 at 390 px (was 47 / 47).
