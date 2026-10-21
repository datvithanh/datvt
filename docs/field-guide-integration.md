# Field Guide integration into the existing website

The deployable result is `projects/cc-content-site`, the existing Next.js app.
The approved presentation is native React, with server content loaders and client
interactions. There is no static-site generator, iframe wrapper, runtime dependency
on a prototype, or additional deployment project in the final change.

## Preserved production behavior

- GA4 remains in the root layout with measurement ID `G-9FMFZFSPFB`, its existing
  afterInteractive loader, initialization and configuration. No extra tracker or
  attribution model was introduced. The existing form has no custom signup-success
  GA4 event; this integration does not claim to add one.
- Transmission 101 places its single course form directly in the hero, replacing the
  CTA at that spot. It has no separate full-width signup section; the lesson outline
  follows the hero. Explanation, confirmation and privacy stay with the form.
- The shared `KitEmailForm` keeps its original submission handler and default form
  `9576210`, which triggers the welcome sequence/course-library delivery. It retains
  `email_address`, optional `fields[first_name]`, override support, duplicate-submit
  protection, success/error states, and confirmation messaging. The obsolete form
  `9257598` is not substituted. A presentation variant uses that same handler.
- All 23 article MDX files and all course/content/media source files are unchanged.
  Resources selects six current article previews; the searchable archive contains
  all 23. `/articles` and `/articles/[slug]` remain canonical. MDX rendering, author
  profiles, animated hero images, infographic enlargement, post footers, and schema
  remain connected to the original components and loaders.
- All 31 existing page-route modules remain; Resources and Media add two modules.
  Existing full courses, lessons, debrief, videos, queues, playlists, team hubs,
  coaching and embodiment pages remain live. The media manifest still has 114
  videos, two package pages and five lesson playlists. The Mini Bootcamp retains its
  original selected-clip browser. Bootcamp retains the FAQ interaction with factual
  commitment questions; superseded outcome/deadline sales copy is not restored.
- `/courses/library` remains unlisted, `noindex,nofollow`, and absent from navigation
  and sitemap. No server authentication gate exists in the source app; none is
  invented here. The email-delivered access pattern is retained.
- `SHOW_INITIATES=false` and `SHOW_COACHING_CALL=false`, and their consumers, remain
  unchanged. Team routes stay live without being added to the public navigation.
- Next SSR mode, unoptimized image handling, Turbopack root, dependency versions,
  locks, Netlify build/base/plugin/runtime configuration, robots domain, v2 domain
  redirect, and security headers are retained. The security headers are platform
  configuration and are not simulated by the local Next dev server.
- The original `/pricing`, `/clips/*`, `/ppw`, and `/ppw-package-april-2026`
  redirects are retained. The pricing query lands on the new tuition anchor.
  `/journal/*` aliases existing article URLs; `/field-guide/*`, `/conversation`,
  and the old `/courses` catalog lead to their matching new public destinations.
  `/courses/library` and other child routes are unaffected by the exact catalog alias.
- The same approved Header/Footer components serve every route. Deep course bodies
  retain their existing styling surface to protect the established widgets and theme
  controls. Terms, Privacy, and Refund Policy use the full warm-paper Field Guide
  surface, Archivo body/headings, and IBM Plex date labels. Their policy wording,
  heading/list structure, dates, and links are unchanged; footer legal links stay
  on the current origin.
- Public Resources/Media canonical URLs and sitemap entries use `mindtraining.cc`.
  Article canonical/OG/Twitter/schema data and course structured data are retained.
  Mini Bootcamp Event schema retains the free scheduled event and omits the old
  InStock claim while registration is marked closed. Browser titles use the
  approved Contemplative CrossFit identity; visible headings and social metadata
  provide page context.

## Approved experience retained

Compact homepage, real participant imagery and exact quote excerpts, Programs /
Resources / Media header, separate course discovery and landing page, inline hero course
signup, no resource tabs or breadcrumbs on the primary public pages, main/side
columns, separate BDSM-show section, approved mark/fonts/paper/artifact, original
company/legal footer, hidden Basecamp, and final Bootcamp tuition section.

## Validation

- TypeScript and the real Next production build pass. The build prerenders 200 pages.
- The HTTP audit checks 34 pages, including all 23 articles: one H1, unique IDs,
  live article contents anchors, local images, form fields/counts, GA4 presence,
  canonical URLs, sitemap/robots, seven aliases and representative 404 handling.
- The Kit test executes the actual handler against mocked fetch for correct payload,
  optional names, success, API/network errors, non-JSON responses, and duplicate
  submits. No requests leave the process.
- The existing video-manifest audit passes for 114 videos. Its pre-existing duplicate
  YouTube-ID warning for `gxBNB0X86GA` is unchanged.
- Original course route bodies, content/media loaders and manifests, flags,
  deployment configuration, dependency locks, and original public assets remain
  byte-identical. The three legal route files change styling classes only; a
  before/after HTTP comparison confirms exact normalized rendered policy wording,
  dates, heading/list structure, and links are preserved.
- Browser checks cover discovery → course, inline hero signup and native validation,
  unlisted library → course → lesson → playlist/search → watch, playback iframe
  creation, theme control, return home, Media, article search/contents/lightbox,
  legal pages, and desktop/phone layout. No real subscriptions are submitted.

## Limits and local reference

The initial unmodified build failed in Next's Google-font loader. The same legacy
font families are now self-hosted from official sources with licenses, alongside
the approved local fonts; no dependency versions or deployment scripts changed.
External email delivery/GA4 ingestion and complete remote video playback are not
claimed by these checks. Participant stories use the original 1280×720 YouTube thumbnails, displayed
uncropped in equal 16:9 frames.

The independent prototype remains intact locally at
`/Users/datvithanh/Project/cc/projects/cc-design-variations` as a visual/source
reference. Its source, private PDF/VTT references, recovery copies, Git identity,
and hosting identity are preserved there and are not part of this delivery.
