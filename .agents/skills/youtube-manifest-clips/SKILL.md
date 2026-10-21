---
name: youtube-manifest-clips
description: Add, audit, and wire YouTube videos or clips through the cc-content-site media manifests. Use when adding clips from YouTube, publishing course discussion clips, updating content/media/*.json, checking whether website video routes will build, or surfacing manifest videos on landing pages like /embodiment, /ppw, /coaching, or course pages.
---

# YouTube Manifest Clips

## Source of Truth

Treat `content/media/*.json` as the source of truth for website videos. `lib/media.ts` hydrates those manifests into:

- `/videos` via `getLibraryVideos()`
- `/courses/videos/<package>` via `getMediaPackages()` and `getAllVideos()`
- `/courses/videos/<package>/<video>` via `getAllVideos()`
- `/courses/videos/<package>/playlists/lesson-<day>` via package `lessons` plus video `lesson`

Run the manifest audit before and after changes:

```bash
node scripts/audit-video-manifests.mjs
```

## Add Clips From YouTube

1. Identify whether the clip belongs in `content/media/library.json` or a package manifest.
   - Use `library.json` for standalone public videos, interviews, testimonials, and landing-page videos.
   - Use a package manifest such as `content/media/transmission-101-staying-present.json` for course lessons, discussion rooms, and clips cut from a course source.
2. Add or update one video object. Required fields are `id`, `title`, `summary`, and `youtubeId`.
3. For clips, add `kind: "clip"` and `clipOf` pointing at the source recording id in the same package.
4. For course clips, add `lesson`, `tags`, `duration` when known, and `priority: true` only for hand-picked teasers.
5. For landing-page grouping, add `tags` such as `["embodiment"]` and optionally `group`/`sub` in `library.json`.
6. Run `node scripts/audit-video-manifests.mjs`.
7. Wire the page by reading from manifests instead of hardcoding when practical:
   - `getLibraryVideos().filter(v => v.group === 'Embodiment' || v.tags?.includes('embodiment'))`
   - `getPackageClips('<package-id>')`
   - `pickPreview(getPackageClips('<package-id>'), 3)`
8. Run the smallest relevant validation: `npm run lint`, `npx tsc --noEmit`, or `npm run build`.

## Add Clips To YouTube

This repo does not upload videos. Prepare the metadata the upload workflow needs:

- Title: match the website `title`.
- Description: start from the website `summary`; include the relevant page URL.
- Visibility: confirm with the user before assuming public, unlisted, or scheduled.
- After upload, copy only the YouTube video id into `youtubeId`, not the full URL.

If a separate upload pipeline or signed-in browser is available, use that tool directly, then return to the manifest workflow above.

## Manifest Shape

```json
{
  "id": "d4-r3-c4-embodiment-of-the-problem",
  "title": "Embodiment of the Problem",
  "summary": "One concise viewer-facing paragraph.",
  "youtubeId": "ZBbwJ-z9Rdw",
  "kind": "clip",
  "lesson": 4,
  "clipOf": "discussion-4-room-3",
  "tags": ["embodiment", "problem"],
  "duration": 75,
  "priority": true
}
```

Do not use ids matching `lesson-<number>`; those are reserved playlist slugs.

## Verification

After editing manifests, check:

- `node scripts/audit-video-manifests.mjs`
- Search for the clip id and YouTube id with `rg`.
- For landing pages, confirm the page imports from `lib/media.ts` only in server components.
- For client components, import only media types or filesystem-free helpers such as `getVideoSubLabel`.
