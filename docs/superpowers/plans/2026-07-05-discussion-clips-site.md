# Clips Library Site Experience — Implementation Plan

> **Product scope (revised 2026-07-05, post-implementation):** the clips library is a broad product — all video on the site (discussion/Q&A, teaching segments, guided practice, standalone excerpts, full lessons) — NOT a discussion-only feature. "Discussion clips" below is historical wording from the original framing; the shipped code uses neutral naming (`Clip`, `/clips`, "Clips" headings), an optional `kind` field on each clip, and discussion-free user-facing copy. See the scope note atop the design spec.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the on-site discussion-clip library: a `/clips` index, per-package browse pages, YouTube-style watch pages, and lesson-page integration — replacing the Zoom-linkout model for course clips.

**Architecture:** Static Next.js 16 App Router pages fed by one JSON file per package (`content/clips/<package>.json`). A new focused loader (`lib/clips.ts`) reads the JSON at build time; browse/index pages do client-side search+tag filtering; watch pages embed unlisted YouTube videos via the existing `YouTubeEmbed` component with a lesson-playlist right rail. `LessonView` gains an **additive** clips section sourced from the JSON — the existing `discussions:` frontmatter path, `DiscussionGrid` component, `lib/content.ts`, and ppw page are all **untouched** (revised 2026-07-05: original plan retired the frontmatter path; user decided nothing DiscussionGrid-related gets touched).

**Tech Stack:** Next.js 16 (App Router, static generation), React 19, Tailwind v4, TypeScript. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-05-discussion-clips-design.md`

---

## Plan-level decisions (refinements of the spec)

1. **Package slug = course slug.** The spec's example used `transmission-101`; the actual course slug is `transmission-101-staying-present`. Lesson pages find their clips by course slug, so the package file is `content/clips/transmission-101-staying-present.json` with `"package": "transmission-101-staying-present"`, and URLs are `/clips/transmission-101-staying-present/...`.
2. **Loader lives in a new `lib/clips.ts`**, not `lib/content.ts` (already 450 lines; new subsystem gets its own focused file). `lib/content.ts` is **not touched at all** (revised: the `discussions` field stays in `LessonMeta`).
3. **New type is named `Clip`** — the existing `DiscussionClip` interface stays exported untouched (the ppw page imports it).
4. **No TDD / no test framework.** This repo has zero test infrastructure (`package.json` has no test runner; no `*.test.*` files exist). Per repo convention and CLAUDE.md's "simplicity above all," verification is `npm run build` (which type-checks) plus dev-server spot checks. Do NOT add a test framework.
5. **Client/server boundary:** `lib/clips.ts` imports `fs`, so client components may only import **types** from it (`import type { ... }`). `ClipGrid` and `ClipBrowser` inline the thumbnail URL and href templates instead of importing runtime helpers.
6. **Seed data uses stand-in `youtubeId`s** (real, playable course-video IDs) so every page works end-to-end now. Task 5 includes the swap checklist for when the real unlisted clip uploads exist. Titles/summaries are real, taken from the ppw page's hardcoded clips.
7. **Sitemap needs no change.** `app/sitemap.ts` is an allowlist (homepage, /articles, /bootcamp, sections, articles) — clips routes are excluded by simply not adding them. Header nav likewise: no change. Each clips page sets `robots: { index: false, follow: false }` in its own metadata.

## File structure

| File | Action | Responsibility |
|---|---|---|
| `content/clips/transmission-101-staying-present.json` | Create | Seed package data (the data contract, made real) |
| `lib/clips.ts` | Create | Types + JSON loader + query functions |
| `components/content/ClipGrid.tsx` | Create | Presentational grid of clip cards → watch-page links (server-safe, no hooks) |
| `components/content/ClipBrowser.tsx` | Create | Client component: search box + tag chips + filtered ClipGrid (optionally lesson-grouped) |
| `app/clips/page.tsx` | Create | Library index: package cards + global search |
| `app/clips/[package]/page.tsx` | Create | Package browse: lesson-grouped clips + scoped filter |
| `app/clips/[package]/[clip]/page.tsx` | Create | YouTube-style watch page |
| `components/content/LessonView.tsx` | Modify | ADD `ClipGrid` section fed by new `clips` prop (existing `discussions` block stays as-is) |
| `app/courses/transmission-101-staying-present/[lesson]/page.tsx` | Modify | Pass `clips` + `clipsBrowseHref` into `LessonView` |
| `app/courses/illumination-101/[lesson]/page.tsx` | Modify | Same (defensive: returns `[]` when no clip file exists) |

**Not touched:** `lib/content.ts`, `components/content/DiscussionGrid.tsx`, `app/ppw-package-april-2026/page.tsx`, `app/sitemap.ts`, `components/layout/Header.tsx`.

---

### Task 1: Clip data contract, loader, and seed data

**Goal:** The package JSON exists with real content, and `lib/clips.ts` can load and query it.

**Files:**
- Create: `content/clips/transmission-101-staying-present.json`
- Create: `lib/clips.ts`

**Acceptance Criteria:**
- [ ] `content/clips/transmission-101-staying-present.json` parses as JSON and matches the `ClipPackage` shape
- [ ] `lib/clips.ts` compiles with no type errors (`npm run build` passes)
- [ ] Loader returns 4 clips for lesson 1 and an empty array for a nonexistent package

**Verify:** `npm run build` → "✓ Compiled successfully". Then `node -e "const c=require('./content/clips/transmission-101-staying-present.json'); console.log(c.package, c.lessons[0].clips.length)"` → `transmission-101-staying-present 4`

**Steps:**

- [ ] **Step 1: Create the seed package JSON**

Titles and summaries are real (from the April-2026 discussion set). The `youtubeId` values are **stand-ins** — real, playable course-video IDs — so the whole experience works before the actual clips are uploaded to YouTube (swapped in Task 5).

Create `content/clips/transmission-101-staying-present.json`:

```json
{
  "package": "transmission-101-staying-present",
  "title": "Transmission 101: Staying Present",
  "lessons": [
    {
      "lesson": 1,
      "title": "The Act of Leaving",
      "clips": [
        {
          "id": "group-practice-hopelessness",
          "title": "How Group Practice Helps with Hopelessness",
          "summary": "Hopelessness exposes the limits of individual control. The group container introduces co-regulation and shared normalization, reducing the perceived threat of experience and allowing continued contact.",
          "youtubeId": "uJE9khutg3c",
          "tags": ["container", "hopelessness"]
        },
        {
          "id": "bad-sit-good-day",
          "title": "How a \"Bad Sit\" Can Lead to a Good Day",
          "summary": "Training quality is non-linear. A difficult sit builds latent sensitivity, which later expresses as increased awareness in daily life.",
          "youtubeId": "uJE9khutg3c",
          "tags": ["training", "sensitivity"]
        },
        {
          "id": "boredom-avoidance",
          "title": "How Boredom Shows Up as an Avoidance Strategy",
          "summary": "Boredom is not neutral — it often encodes low-grade anxiety or threat signaling. The mind escalates minor sensations into urgency.",
          "youtubeId": "uJE9khutg3c",
          "tags": ["boredom", "avoidance"]
        },
        {
          "id": "i-am-exit",
          "title": "How Insisting on \"I Am\" Is an Exit Strategy",
          "summary": "Even advanced practices can become exits. \"I am\"-ness can reinforce control (insisting), buffering (distancing), and dissolution (fading).",
          "youtubeId": "uJE9khutg3c",
          "tags": ["identity", "exits"]
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Create the loader**

Create `lib/clips.ts`:

```ts
import fs from 'fs'
import path from 'path'

// ===== Discussion clips =====
// One JSON file per package under content/clips/. The package slug MUST match the
// course slug (content/courses/<slug>/) so lesson pages can look up their clips.
// This file is the data contract with the ingest pipeline: the pipeline emits these
// JSON files; the site consumes them. See docs/superpowers/specs/2026-07-05-discussion-clips-design.md.
//
// NOTE: this module reads the filesystem. Client components may import TYPES from it
// (`import type { ... }`) but never runtime values.

const clipsDir = path.join(process.cwd(), 'content', 'clips')

export interface Clip {
  id: string          // stable slug, unique within the package, e.g. "boredom-avoidance"
  title: string       // from the Zoom doc
  summary: string     // detailed summary from the Zoom doc
  youtubeId: string   // unlisted YouTube video ID
  tags?: string[]     // own vocabulary (not the 6 article tags)
  duration?: number   // optional, seconds
}

export interface ClipLesson {
  lesson: number      // matches LessonMeta.day
  title?: string      // display label for the lesson group
  clips: Clip[]
}

export interface ClipPackage {
  package: string     // slug == course slug
  title: string       // display name, e.g. "Transmission 101: Staying Present"
  lessons: ClipLesson[]
}

// A clip with its location attached — for watch pages, search indexes, related lists.
export type ClipRef = Clip & { package: string; packageTitle: string; lesson: number; lessonTitle?: string }

export function getClipPackages(): ClipPackage[] {
  if (!fs.existsSync(clipsDir)) return []
  return fs.readdirSync(clipsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(clipsDir, f), 'utf8')) as ClipPackage)
}

export function getClipPackage(slug: string): ClipPackage | null {
  const filePath = path.join(clipsDir, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as ClipPackage
}

export function packageClipCount(pkg: ClipPackage): number {
  return pkg.lessons.reduce((n, l) => n + l.clips.length, 0)
}

function flatten(pkg: ClipPackage): ClipRef[] {
  return pkg.lessons.flatMap(l =>
    l.clips.map(c => ({
      ...c,
      package: pkg.package,
      packageTitle: pkg.title,
      lesson: l.lesson,
      lessonTitle: l.title,
    })),
  )
}

// Every clip across every package — the global search index.
export function getAllClips(): ClipRef[] {
  return getClipPackages().flatMap(flatten)
}

export function getClip(pkgSlug: string, id: string): ClipRef | null {
  const pkg = getClipPackage(pkgSlug)
  if (!pkg) return null
  return flatten(pkg).find(c => c.id === id) ?? null
}

// The watch-page playlist / lesson-page grid: every clip in one lesson, in order.
export function getLessonClips(pkgSlug: string, lesson: number): ClipRef[] {
  const pkg = getClipPackage(pkgSlug)
  if (!pkg) return []
  return flatten(pkg).filter(c => c.lesson === lesson)
}

// Cross-lesson discovery: clips sharing a tag with this one, excluding its own lesson.
export function getRelatedClips(clip: ClipRef, limit = 6): ClipRef[] {
  const tags = clip.tags ?? []
  if (!tags.length) return []
  return getAllClips()
    .filter(c => !(c.package === clip.package && c.lesson === clip.lesson))
    .filter(c => (c.tags ?? []).some(t => tags.includes(t)))
    .slice(0, limit)
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: "✓ Compiled successfully" (no type errors; nothing imports the loader yet, but TS checks it).

Run: `node -e "const c=require('./content/clips/transmission-101-staying-present.json'); console.log(c.package, c.lessons[0].clips.length)"`
Expected: `transmission-101-staying-present 4`

- [ ] **Step 4: Commit**

```bash
git add content/clips/ lib/clips.ts
git commit -m "feat(clips): clip data contract, loader, and seed package data"
```

---

### Task 2: Watch page (`/clips/[package]/[clip]`)

**Goal:** A YouTube-style watch page: player, title, tags, summary, lesson playlist in the right rail, related-by-tag list below it.

**Files:**
- Create: `app/clips/[package]/[clip]/page.tsx`

**Acceptance Criteria:**
- [ ] `/clips/transmission-101-staying-present/boredom-avoidance` renders: player, title, tag chips, summary
- [ ] Right rail lists all 4 lesson-1 clips with the current one visually highlighted and non-linked
- [ ] Unknown package or clip id → 404
- [ ] Page metadata sets `robots: { index: false, follow: false }`
- [ ] Mobile (single column): rail content appears below the summary

**Verify:** `npm run build` → route `/clips/[package]/[clip]` listed as SSG with 4 paths. Then `npm run dev` and load the URL above.

**Steps:**

- [ ] **Step 1: Create the watch page**

Create `app/clips/[package]/[clip]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed'
import { getAllClips, getClip, getLessonClips, getRelatedClips } from '@/lib/clips'

export function generateStaticParams() {
  return getAllClips().map(c => ({ package: c.package, clip: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ package: string; clip: string }> }): Promise<Metadata> {
  const { package: pkg, clip: id } = await params
  const clip = getClip(pkg, id)
  if (!clip) return { title: 'Not Found' }
  return {
    title: `${clip.title} — Clips`,
    description: clip.summary.length > 160 ? `${clip.summary.slice(0, 157)}…` : clip.summary,
    robots: { index: false, follow: false },
  }
}

export default async function ClipWatchPage({ params }: { params: Promise<{ package: string; clip: string }> }) {
  const { package: pkg, clip: id } = await params
  const clip = getClip(pkg, id)
  if (!clip) notFound()

  const playlist = getLessonClips(pkg, clip.lesson)
  const related = getRelatedClips(clip)

  return (
    <div className="animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <Link
          href={`/clips/${pkg}`}
          className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.15em]"
        >
          &larr; {clip.packageTitle}
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10">
          {/* Main column: player → title → tags → summary */}
          <div>
            <YouTubeEmbed videoId={clip.youtubeId} title={clip.title} />
            <h1 className="font-heading text-xl sm:text-2xl text-text-primary mt-5 uppercase tracking-wide">
              {clip.title}
            </h1>
            {clip.tags?.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {clip.tags.map(t => (
                  <span
                    key={t}
                    className="font-heading text-[11px] uppercase tracking-wider text-text-muted border border-border/60 rounded-sm px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="font-body text-text-secondary leading-relaxed mt-6">{clip.summary}</p>
          </div>

          {/* Right rail: lesson playlist, then related-by-tag */}
          <aside>
            <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-4">
              {clip.lessonTitle ? `Lesson ${clip.lesson} — ${clip.lessonTitle}` : `Lesson ${clip.lesson}`}
            </h2>
            <div className="flex flex-col gap-3">
              {playlist.map(c => {
                const isCurrent = c.id === clip.id
                const row = (
                  <div className={`flex gap-3 items-start ${isCurrent ? '' : 'group'}`}>
                    <div className="relative w-32 shrink-0 rounded-sm overflow-hidden border border-border/40">
                      <img
                        src={`https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`}
                        alt={c.title}
                        className="w-full aspect-video object-cover"
                      />
                      {isCurrent && <div className="absolute inset-0 bg-accent/20" />}
                    </div>
                    <p
                      className={`font-heading text-xs uppercase tracking-wide leading-snug ${
                        isCurrent ? 'text-accent' : 'text-text-primary group-hover:text-accent transition-colors'
                      }`}
                    >
                      {c.title}
                    </p>
                  </div>
                )
                return isCurrent ? (
                  <div key={c.id} aria-current="true">{row}</div>
                ) : (
                  <Link key={c.id} href={`/clips/${c.package}/${c.id}`} className="block">{row}</Link>
                )
              })}
            </div>

            {related.length > 0 && (
              <div className="mt-10 pt-6 border-t border-border-subtle">
                <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-4">Related</h2>
                <div className="flex flex-col gap-3">
                  {related.map(c => (
                    <Link key={`${c.package}/${c.id}`} href={`/clips/${c.package}/${c.id}`} className="block group">
                      <div className="flex gap-3 items-start">
                        <div className="relative w-32 shrink-0 rounded-sm overflow-hidden border border-border/40">
                          <img
                            src={`https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`}
                            alt={c.title}
                            className="w-full aspect-video object-cover"
                          />
                        </div>
                        <p className="font-heading text-xs uppercase tracking-wide leading-snug text-text-primary group-hover:text-accent transition-colors">
                          {c.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build + routes**

Run: `npm run build`
Expected: "✓ Compiled successfully"; route table shows `● /clips/[package]/[clip]` with 4 generated paths.

- [ ] **Step 3: Spot-check in dev**

Run: `npm run dev`, open `http://localhost:3000/clips/transmission-101-staying-present/boredom-avoidance`
Expected: player thumbnail renders and plays on click; title/tags/summary below; right rail shows all 4 clips with "How Boredom Shows Up…" highlighted (amber, not a link); other rows navigate. `http://localhost:3000/clips/nope/nope` → 404.

- [ ] **Step 4: Commit**

```bash
git add app/clips
git commit -m "feat(clips): YouTube-style watch page with lesson playlist rail"
```

---

### Task 3: ClipGrid, ClipBrowser, browse page, and index

**Goal:** `/clips` (package cards + global search) and `/clips/[package]` (lesson-grouped grid + scoped filter), with client-side search and tag filtering.

**Files:**
- Create: `components/content/ClipGrid.tsx`
- Create: `components/content/ClipBrowser.tsx`
- Create: `app/clips/[package]/page.tsx`
- Create: `app/clips/page.tsx`

**Acceptance Criteria:**
- [ ] `/clips` shows a card per package (title + clip count) linking to `/clips/[package]`, plus a search box; results appear only when a query/tag is active
- [ ] `/clips/[package]` shows clips grouped under "Lesson N" headings; cards link to watch pages
- [ ] Typing in the search box filters by title/summary text (case-insensitive); clicking a tag chip filters by tag; clicking the active chip clears it
- [ ] Both pages set `robots: { index: false, follow: false }`; unknown package → 404
- [ ] No client component imports runtime values from `lib/clips.ts` (types only)

**Verify:** `npm run build` → routes `/clips` and `/clips/[package]` listed. Dev-server check of search + tag filtering.

**Steps:**

- [ ] **Step 1: Create ClipGrid (presentational, server-safe)**

Create `components/content/ClipGrid.tsx`:

```tsx
import Link from 'next/link'
import type { ClipRef } from '@/lib/clips'

// Grid of clip cards linking to on-site watch pages. Visual language mirrors
// DiscussionGrid (which stays untouched for the Zoom-linkout ppw page).
// No hooks — usable from server components and from the client ClipBrowser.
export function ClipGrid({ clips }: { clips: ClipRef[] }) {
  if (!clips.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {clips.map(c => (
        <Link key={`${c.package}/${c.id}`} href={`/clips/${c.package}/${c.id}`} className="group block">
          <div className="relative rounded-sm overflow-hidden border border-border/40">
            <img
              src={`https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`}
              alt={c.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <svg
                className="w-14 h-14 text-white/80 group-hover:text-white group-hover:scale-110 transition-all"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <h3 className="font-heading text-sm uppercase tracking-wide text-text-primary mt-3 leading-snug group-hover:text-accent transition-colors">
            {c.title}
          </h3>
          <p className="mt-2 font-body text-text-muted text-sm leading-relaxed line-clamp-3">{c.summary}</p>
        </Link>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create ClipBrowser (client search + tag filter)**

Create `components/content/ClipBrowser.tsx`:

```tsx
'use client'

import { useMemo, useState } from 'react'
import type { ClipRef } from '@/lib/clips'
import { ClipGrid } from '@/components/content/ClipGrid'

// Client-side search + tag filtering over a pre-loaded clip list. The whole
// library is small JSON, so no backend search is needed.
// - groupByLesson: render "Lesson N" sections (package browse page)
// - showAllWhenEmpty=false: render nothing until a query/tag is active (/clips index)
export function ClipBrowser({
  clips,
  groupByLesson = false,
  showAllWhenEmpty = true,
}: {
  clips: ClipRef[]
  groupByLesson?: boolean
  showAllWhenEmpty?: boolean
}) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  // Tag chips, most-used first.
  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    clips.forEach(c => (c.tags ?? []).forEach(t => counts.set(t, (counts.get(t) || 0) + 1)))
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([t]) => t)
  }, [clips])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clips.filter(c => {
      if (tag && !(c.tags ?? []).includes(tag)) return false
      if (!q) return true
      return c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)
    })
  }, [clips, query, tag])

  const active = query.trim() !== '' || tag !== null
  const showResults = active || showAllWhenEmpty

  // Lesson groups, in order, only for the groups that survived the filter.
  const groups = useMemo(() => {
    if (!groupByLesson) return []
    const byLesson = new Map<number, { lessonTitle?: string; clips: ClipRef[] }>()
    filtered.forEach(c => {
      const g = byLesson.get(c.lesson) ?? { lessonTitle: c.lessonTitle, clips: [] }
      g.clips.push(c)
      byLesson.set(c.lesson, g)
    })
    return Array.from(byLesson.entries()).sort((a, b) => a[0] - b[0])
  }, [filtered, groupByLesson])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search clips…"
          className="w-full sm:max-w-sm bg-transparent border border-border/60 rounded-sm px-3 py-2 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setTag(tag === t ? null : t)}
                className={`font-heading text-[11px] uppercase tracking-wider rounded-sm px-2 py-1 border transition-colors cursor-pointer ${
                  tag === t
                    ? 'border-accent text-accent'
                    : 'border-border/60 text-text-muted hover:text-text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {showResults && (
        <div className="mt-8">
          {filtered.length === 0 ? (
            <p className="font-body text-text-muted text-sm">No clips match.</p>
          ) : groupByLesson ? (
            <div className="flex flex-col gap-12">
              {groups.map(([lesson, g]) => (
                <section key={lesson}>
                  <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">
                    {g.lessonTitle ? `Lesson ${lesson} — ${g.lessonTitle}` : `Lesson ${lesson}`}
                  </h2>
                  <ClipGrid clips={g.clips} />
                </section>
              ))}
            </div>
          ) : (
            <ClipGrid clips={filtered} />
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create the package browse page**

Create `app/clips/[package]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClipPackages, getClipPackage, getAllClips, packageClipCount } from '@/lib/clips'
import { ClipBrowser } from '@/components/content/ClipBrowser'

export function generateStaticParams() {
  return getClipPackages().map(p => ({ package: p.package }))
}

export async function generateMetadata({ params }: { params: Promise<{ package: string }> }): Promise<Metadata> {
  const { package: slug } = await params
  const pkg = getClipPackage(slug)
  if (!pkg) return { title: 'Not Found' }
  return {
    title: `${pkg.title} — Clips`,
    description: `Discussion clips from ${pkg.title}.`,
    robots: { index: false, follow: false },
  }
}

export default async function ClipPackagePage({ params }: { params: Promise<{ package: string }> }) {
  const { package: slug } = await params
  const pkg = getClipPackage(slug)
  if (!pkg) notFound()

  const clips = getAllClips().filter(c => c.package === slug)

  return (
    <div className="animate-fade-in">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <Link
          href="/clips"
          className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.15em]"
        >
          &larr; All Clips
        </Link>
        <header className="mt-6 mb-10">
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">{pkg.title}</h1>
          <p className="font-body text-text-muted mt-2 text-sm">
            {packageClipCount(pkg)} discussion clips across {pkg.lessons.length} lessons
          </p>
        </header>
        <ClipBrowser clips={clips} groupByLesson />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create the library index**

Create `app/clips/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getClipPackages, getAllClips, packageClipCount } from '@/lib/clips'
import { ClipBrowser } from '@/components/content/ClipBrowser'

export const metadata: Metadata = {
  title: 'Clips',
  description: 'Discussion clips from live sessions.',
  robots: { index: false, follow: false },
}

export default function ClipsIndexPage() {
  const packages = getClipPackages()
  const clips = getAllClips()

  return (
    <div className="animate-fade-in">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <header className="mb-10">
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">Clips</h1>
          <p className="font-body text-text-secondary mt-3">
            Discussion clips from live sessions — moments where the teaching meets a real practitioner&apos;s question.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {packages.map(p => (
            <Link
              key={p.package}
              href={`/clips/${p.package}`}
              className="group block border border-border/40 rounded-sm p-6 hover:border-accent/60 transition-colors"
            >
              <h2 className="font-heading text-base uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors">
                {p.title}
              </h2>
              <p className="font-body text-text-muted text-sm mt-2">{packageClipCount(p)} clips</p>
            </Link>
          ))}
        </div>

        <div className="pt-10 border-t border-border-subtle">
          <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-6">Search all clips</h2>
          <ClipBrowser clips={clips} showAllWhenEmpty={false} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify build + behavior**

Run: `npm run build`
Expected: "✓ Compiled successfully"; routes `/clips`, `/clips/[package]`, `/clips/[package]/[clip]` all present.

Run: `npm run dev`, then check:
- `http://localhost:3000/clips` → one package card ("Transmission 101: Staying Present", "4 clips"); search box shows no grid until you type; typing "boredom" surfaces one card
- `http://localhost:3000/clips/transmission-101-staying-present` → "Lesson 1 — The Act of Leaving" heading with 4 cards; clicking tag chip `identity` filters to 1; clicking it again clears
- Cards navigate to watch pages

- [ ] **Step 6: Commit**

```bash
git add components/content/ClipGrid.tsx components/content/ClipBrowser.tsx app/clips
git commit -m "feat(clips): library index and package browse with client-side search"
```

---

### Task 4: Lesson-page integration (additive clips section)

> **Revised 2026-07-05:** the original task also retired the `discussions:` frontmatter path. Per user decision, nothing related to `DiscussionGrid` or the frontmatter path is touched — `lib/content.ts` and LessonView's existing `lesson.discussions` block stay exactly as they are. The clips section is purely additive.

**Goal:** Course lesson pages show their clips via `ClipGrid` (from the package JSON) with a "Browse all clips" link. All existing code paths stay intact.

**Files:**
- Modify: `components/content/LessonView.tsx` (add imports, two props, and a new clips section — nothing removed)
- Modify: `app/courses/transmission-101-staying-present/[lesson]/page.tsx`
- Modify: `app/courses/illumination-101/[lesson]/page.tsx`

**Acceptance Criteria:**
- [ ] Lesson 1 of Staying Present shows a "Discussion" section with the 4 clip cards linking to watch pages, plus a "Browse all clips →" link to `/clips/transmission-101-staying-present`
- [ ] Illumination-101 lessons (no clip file) render with no Discussion section and no errors
- [ ] `lib/content.ts`, `DiscussionGrid.tsx`, `app/ppw-package-april-2026/page.tsx`, and LessonView's existing `lesson.discussions` block have zero diff / are unchanged
- [ ] LessonView keeps its `DiscussionGrid` import and `lesson.discussions` rendering path fully intact

**Verify:** `npm run build` passes; `git diff --stat lib/content.ts components/content/DiscussionGrid.tsx app/ppw-package-april-2026/page.tsx` is empty; dev-server check of a lesson page.

**Steps:**

- [ ] **Step 1: Update LessonView (additive only)**

In `components/content/LessonView.tsx`:

Keep the existing `DiscussionGrid` import. ADD two imports:

```tsx
import { ClipGrid } from '@/components/content/ClipGrid'
import type { ClipRef } from '@/lib/clips'
```

Add two props (after `next` in both the destructure and the type):

```tsx
export function LessonView({
  lesson,
  content,
  courseSlug,
  courseTitle,
  unitLabel = 'Lesson',
  prev,
  next,
  clips,
  clipsBrowseHref,
}: {
  lesson: LessonMeta
  content: string
  courseSlug: string
  courseTitle: string
  unitLabel?: string
  prev: Neighbor
  next: Neighbor
  clips?: ClipRef[]
  clipsBrowseHref?: string
}) {
```

Leave the existing `lesson.discussions` block (lines 64–69) exactly as-is, and insert this new block **immediately after it** (before the `lesson.practice` block):

```tsx
        {clips?.length ? (
          <div className="mt-16 pt-10 border-t border-border-subtle">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide">Discussion</h2>
              {clipsBrowseHref && (
                <Link
                  href={clipsBrowseHref}
                  className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]"
                >
                  Browse all clips &rarr;
                </Link>
              )}
            </div>
            <ClipGrid clips={clips} />
          </div>
        ) : null}
```

(No MDX lesson currently sets `discussions:` frontmatter, so in practice only one "Discussion" section renders. If both were ever populated, both would render — acceptable; the frontmatter path is legacy.)

- [ ] **Step 2: Pass clips from the Staying Present lesson page**

In `app/courses/transmission-101-staying-present/[lesson]/page.tsx`, add the import:

```tsx
import { getLessonClips } from '@/lib/clips'
```

and in the page component, before the return:

```tsx
  const clips = getLessonClips(COURSE_SLUG, lesson.meta.day)
```

then add to the `LessonView` call:

```tsx
      clips={clips}
      clipsBrowseHref={`/clips/${COURSE_SLUG}`}
```

- [ ] **Step 3: Same change for illumination-101**

Read `app/courses/illumination-101/[lesson]/page.tsx` first — it mirrors the Staying Present page with its own `COURSE_SLUG`. Apply the identical three additions (import, `const clips = getLessonClips(COURSE_SLUG, lesson.meta.day)`, the two props). There is no `content/clips/illumination-101.json`, so `getLessonClips` returns `[]` and the section stays hidden — that's the intended behavior, and it means the moment a clip file lands for any course, its lessons light up with no code change.

> **As-built note:** the plan's assumption was wrong — this page does NOT use `LessonView` (it renders bespoke JSX via `MDXRemote` directly). An equivalent block was briefly inlined (commit `3f59ea5`), then **reverted to match `main`** per user decision 2026-07-05: illumination-101 and other pre-existing surfaces are out of scope for the clips integration. When illumination-101 clips are wanted, migrate that page to `LessonView` or re-add the block then.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: "✓ Compiled successfully".

Run: `git diff --stat lib/content.ts components/content/DiscussionGrid.tsx app/ppw-package-april-2026/page.tsx`
Expected: empty output (all untouched).

Run: `npm run dev`, open `http://localhost:3000/courses/transmission-101-staying-present/01-the-act-of-leaving`
Expected: Discussion section with 4 cards → watch pages; "Browse all clips →" → `/clips/transmission-101-staying-present`. Open an illumination-101 lesson: no Discussion section, no errors.

- [ ] **Step 5: Commit**

```bash
git add components/content/LessonView.tsx app/courses/transmission-101-staying-present/\[lesson\]/page.tsx app/courses/illumination-101/\[lesson\]/page.tsx
git commit -m "feat(clips): lesson pages source discussion clips from package JSON"
```

---

### Task 5: Final verification + real-clip swap checklist

**Goal:** Whole feature verified end-to-end; obscurity confirmed; a documented path for swapping in the real unlisted YouTube IDs.

**Files:**
- Modify: `content/clips/transmission-101-staying-present.json` (youtubeId swap — user-dependent, may be deferred)

**Acceptance Criteria:**
- [ ] `npm run build` clean; `npm run lint` introduces no NEW errors (repo has pre-existing lint issues; compare against `main`)
- [ ] Generated sitemap contains no `/clips` URLs; Header nav unchanged
- [ ] All three clips routes respond with noindex metadata
- [ ] Swap checklist recorded for the user (upload → replace IDs → rebuild)

**Verify:** commands in steps below.

**Steps:**

- [ ] **Step 1: Full build + lint**

Run: `npm run build` → "✓ Compiled successfully"
Run: `npm run lint` → no errors in any file created/modified by this plan (`lib/clips.ts`, `components/content/Clip*.tsx`, `app/clips/**`, `LessonView.tsx`, the two lesson pages).

- [ ] **Step 2: Obscurity checks**

Run: `grep -ri "clips" app/sitemap.ts components/layout/Header.tsx`
Expected: no matches.

Run: `curl -s http://localhost:3000/clips | grep -o 'noindex'` (with dev server running)
Expected: `noindex` (from the robots meta tag). Repeat for `/clips/transmission-101-staying-present` and one watch page.

- [ ] **Step 3: Record the real-clip swap checklist**

This step is user-dependent (requires the Zoom→YouTube uploads). Post it to the user verbatim:

> **To go live with real clips:**
> 1. Download the 4 lesson-1 discussion clips with `tools/zoom_clip_downloader`
> 2. Upload each to YouTube as **Unlisted**
> 3. Replace the four stand-in `youtubeId` values in `content/clips/transmission-101-staying-present.json` with the real IDs
> 4. `npm run build` + push — Netlify redeploys
>
> Until then the pages are fully functional with stand-in videos.

- [ ] **Step 4: Final commit + push (ask the user first per repo convention)**

```bash
git add -A projects/cc-content-site/content/clips
git commit -m "feat(clips): discussion clips library — verification pass"
```

Confirm with the user before pushing; the site auto-deploys from `main` and this branch is `feat/clipslibrary`.

---

## Self-review notes

- **Spec coverage:** data model (Task 1), watch page + playlist + related (Task 2), index/browse/search/tags (Task 3), additive lesson integration (Task 4 — `discussions:` retirement dropped per user decision 2026-07-05), noindex/sitemap/nav + seed-swap (Tasks 2–5). `DiscussionGrid`/ppw/`lib/content.ts` untouched (explicit checks in Task 4). Loader functions match the spec list (packages, grouped clips, single clip, siblings, related, flat index).
- **Type consistency:** `Clip`/`ClipRef`/`ClipPackage` defined once in Task 1; all later imports type-only in client components; `ClipGrid` prop is `ClipRef[]` everywhere; `lesson.meta.day` (existing `LessonMeta.day`) is the lesson-number join key, matching `ClipLesson.lesson`.
- **Deviation from TDD:** intentional; repo has no test infrastructure (decision #4).
