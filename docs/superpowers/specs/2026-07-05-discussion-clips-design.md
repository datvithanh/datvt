# Clips Library — Site Experience Design

**Date:** 2026-07-05
**Status:** Approved design, pending implementation plan
**Scope:** The *site experience* sub-project only. The ingest pipeline is a separate project (see "Out of scope").

> **Product scope (revised 2026-07-05):** the clips library is a BROAD product — the home for all video on the site: discussion/Q&A moments, teaching segments, guided practice, standalone/workshop excerpts, and full lessons. Discussion clips are only the *first content kind*, not the product. Where this document says "discussion clips," read "clips." The data contract carries an optional `kind` field (`'discussion' | 'teaching' | 'practice' | 'lesson' | …`, open vocabulary) to distinguish content kinds; `tags` stay reserved for themes. User-facing copy must not describe the library as discussion-only.

---

## Context

Discussion clips are short video moments pulled from live CC sessions. Today they exist as **Zoom share links** rendered in a 2-column thumbnail grid (`DiscussionGrid`) that opens Zoom in a new tab. They appear in two places: per-lesson (via a `discussions:` MDX frontmatter array in `LessonView`) and on the `ppw-package-april-2026` marketing page.

This project reimagines discussion clips as a first-class, on-site experience.

## Goals

1. **Teaching asset** — clips woven into course lessons for *enrolled* students.
2. **Browsable library** — a standalone destination students can graze through by package, lesson, and theme.

Not a goal: marketing/proof for prospects (that's the existing ppw page's job).

## Key decisions

| Decision | Choice | Rationale |
|---|---|---|
| Playback | **Inline, on-site** via unlisted YouTube embeds | Kills the Zoom off-site bounce that breaks both teaching flow and library grazing. |
| Hosting | **YouTube (unlisted)** | Reuses the existing `YouTubeEmbed` component and the `zoom_clip_downloader` tool. Not self-hosting (over-engineering) or direct Zoom embed (Zoom blocks iframing). |
| Volume | ~75–100 clips/package, ~300–400/year | Drives the need for structure + search, and for an automated ingest pipeline (separate project). |
| Metadata source | The existing **Zoom doc** (human-written title + detailed summary per clip), parsed by the pipeline | Higher quality than AI-generated; no AI needed for metadata. |
| Access | **Obscured, no auth** (model 2) | Unlinked `noindex` URL shared with enrolled students. No auth subsystem to build. |
| Watch UX | **YouTube-style watch page** (not a lightbox) | Reinforces "a place you spend time"; deep-links become free. |
| Sequencing | **Approach A**: contract-first, UI-first, pipeline-last | Shape the UX cheaply against seed data; automate only once the data target is validated. |

---

## Data model

The evolved clip shape (replaces the current `DiscussionClip`):

```ts
interface DiscussionClip {
  id: string          // stable slug, e.g. "the-flinch"
  title: string       // from the Zoom doc
  summary: string     // detailed summary from the Zoom doc (was `analysis`)
  youtubeId: string   // unlisted YouTube video ID — replaces both `url` and `thumbnail`
  tags?: string[]     // own vocabulary (NOT the 6 article tags), for cross-cutting search
  duration?: number   // optional, seconds — runtime badge
}
```

Simplifications vs. today:
- **No `thumbnail`** — derived from `youtubeId` (`img.youtube.com/vi/{id}/hqdefault.jpg`).
- **No `url`** — `youtubeId` is the reference.
- `tags` has its **own vocabulary** (e.g. `resistance`, `the-flinch`), not the 6 article tags — 6 buckets are too coarse for 300+ clips.

### Storage

One JSON file per package. Package/lesson placement comes from file structure, so clips don't repeat it.

```
content/clips/transmission-101.json
{
  "package": "transmission-101",
  "lessons": [
    { "lesson": 1, "clips": [ { id, title, summary, youtubeId, tags, duration }, … ] },
    { "lesson": 2, "clips": [ … ] }
  ]
}
```

This file **is** the data contract between this project and the future ingest pipeline: the pipeline emits it; the site consumes it. Note: the `discussions:` MDX frontmatter field is **retired** — lesson clips now come from this JSON.

---

## Routes & pages

All three routes are **`noindex`**, **excluded from `sitemap.ts`**, and **absent from Header nav** (access model 2).

### `/clips` — index
- Package cards (title + clip count).
- **Global search box + tag filter** across all clips (cross-package grazing).

### `/clips/[package]` — package browse
- Clips grouped into **lesson sections** (Lesson 1, Lesson 2…), each a `ClipGrid`.
- Search + tag filter (scoped or global).

### `/clips/[package]/[clip]` — watch page (YouTube-style)
- **Main column:** `YouTubeEmbed` player → title → tag chips → detailed **summary** (YouTube's video→title→description stack).
- **Right rail:** a **playlist of the same lesson's clips** in order, current one highlighted (primary "up next"); optional smaller **related-by-tag** list below.
- **Mobile:** rail collapses to a list below the summary.
- The watch-page URL **is** the shareable per-clip deep link (no `?clip=` param needed).

Search/filter is **entirely client-side** — package JSON is small enough to load and filter in the browser. No backend, no search service.

---

## Components

- **`DiscussionGrid` — UNTOUCHED.** Left exactly as-is; still used by the `ppw-package-april-2026` page (Zoom linkout).
- **New `ClipGrid`** — grid of clip cards; thumbnail from `youtubeId`, cards link to the watch page (not Zoom).
- **New watch-page layout** — player + title + tags + summary + right-rail playlist.
- **New package browse page** — lesson sections + search/tag filter.
- **New `/clips` index** — package cards + global search.
- **New search/tag filter** — client-side, type-to-filter on title/summary + clickable tag chips.
- **`LessonView`** — switches from `DiscussionGrid` to `ClipGrid`, sourced from the package JSON by lesson number. Adds a "Discussion clips from this lesson" heading and a "Browse all clips →" link to `/clips/[package]`.

### Loader (`lib/content.ts`)

Functions over the package JSON:
- list packages
- get a package's clips grouped by lesson
- get one clip by `package + id`
- get a clip's lesson-siblings (the playlist)
- get related clips by tag
- a flattened index for global search

---

## Out of scope (explicit)

- **The ingest pipeline** — separate project. Parses the Zoom doc, downloads clips (`zoom_clip_downloader`), batch-uploads to unlisted YouTube (YouTube Data API), and emits the package JSON. This project only *consumes* that JSON.
- **The `ppw-package-april-2026` page** — a public *marketing* surface with its own hardcoded Zoom clips and a different audience. Left untouched; revisit later.
- **Auth** — not built (access model 2).

---

## Seed data (makes Approach A work)

Before the pipeline exists, hand-seed the site experience:
1. Hand-upload **3–5 real clips** from one Transmission 101 lesson to unlisted YouTube.
2. Hand-write `content/clips/transmission-101.json` with them.

Everything gets built and demoed against this sample. When the pipeline lands later, it produces this same file at scale.

---

## Success criteria

- A student can open `/clips/transmission-101/<clip>`, watch inline (no Zoom bounce), read the summary, and click through the lesson's playlist in the right rail.
- `/clips` and `/clips/[package]` let a student browse by package/lesson and filter by tag / search text, client-side.
- A course lesson page shows its clips via `ClipGrid`, linking to watch pages, with a "browse all" link into the library.
- `DiscussionGrid` and the ppw page are unchanged.
- All `/clips` routes are `noindex` and unlinked from nav/sitemap.
