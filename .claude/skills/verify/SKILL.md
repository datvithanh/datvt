---
name: verify
description: How to run and verify changes to the CC content site (Next.js) — build, launch, and drive the key flows in a browser.
---

# Verifying cc-content-site changes

## Build check
```bash
npx tsc --noEmit && npm run build
```
Build output lists every statically generated route — useful for confirming
`generateStaticParams` changes (e.g. new `/courses/library/...` paths).

## Run it
A dev server is often already running on port 3000 (`next dev` refuses to
start twice and prints the existing PID — use the running one, don't kill it).
Otherwise: `npm run dev -- --port 3111`.

## Flows worth driving (Chrome tools)
- Library watch page: `/courses/library/transmission-101-staying-present/<video-id>`
- Lesson playlist page: `/courses/library/transmission-101-staying-present/lesson-1`
  (interactive: search box, Recommended toggle pill, scope dropdown — drive in a browser)
- Course page: `/courses/transmission-101-staying-present` ("From the Discussions" grid)
- Lesson page: `/courses/transmission-101-staying-present/01-the-act-of-leaving` (Clips section)

## Gotchas
- Media data lives in `content/media/*.json`; video ids matching `lesson-<n>`
  are reserved for playlist slugs and filtered out of static params.
- The site is server-rendered from filesystem JSON — after editing manifests,
  the dev server picks changes up on next request (no restart needed).
