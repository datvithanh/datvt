'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { PackageVideo } from '@/lib/media'
import { VideoList } from '@/components/content/VideoList'

// Client-side search + kind filtering over a pre-loaded video list, YouTube-style:
// search box on top, kind filter pills (All | Lesson | Discussion | Clip) below,
// results as rows. The whole video set is small JSON, so no backend search is needed.
// Pills are multi-select and toggleable: any number can be on at once (OR logic),
// and "All" clears the selection. Theme tags exist in the data but are hidden for now.
// - groupByLesson: render "Lesson N" sections (course package browse page)
// - showAllWhenEmpty=false: render nothing until a query/kind is active (/videos index)
// - lessons: when provided, adds a scope dropdown (per lesson + "Full course")
//   that narrows the pool before the kind/search filters apply.

// Canonical pill order; kinds present in the data but not listed here append after.
const KIND_ORDER = ['lesson', 'discussion', 'clip', 'talk', 'testimonial']
// The 'lesson' kind is a full teaching — shown as "Transmission" in this course.
const kindLabel = (k: string) =>
  k === 'lesson' ? 'Transmission' : k === 'clip' ? 'Clips' : k.charAt(0).toUpperCase() + k.slice(1)

export function VideoBrowser({
  videos,
  groupByLesson = false,
  showAllWhenEmpty = true,
  lessons,
}: {
  videos: PackageVideo[]
  groupByLesson?: boolean
  showAllWhenEmpty?: boolean
  lessons?: { day: number; title?: string }[]
}) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [scope, setScope] = useState<number | 'package'>('package')

  const toggleKind = (k: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })

  const scoped = scope === 'package' ? videos : videos.filter(v => v.lesson === scope)

  const kindFilters = useMemo(() => {
    const present = new Set(videos.map(v => v.kind ?? 'discussion'))
    return [
      ...KIND_ORDER.filter(k => present.has(k)),
      ...[...present].filter(k => !KIND_ORDER.includes(k)).sort(),
    ]
  }, [videos])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scoped.filter(v => {
      if (selected.size && !selected.has(v.kind ?? 'discussion')) return false
      if (!q) return true
      return v.title.toLowerCase().includes(q) || v.summary.toLowerCase().includes(q)
    })
  }, [scoped, query, selected])

  const active = query.trim() !== '' || selected.size > 0 || scope !== 'package'
  const showResults = active || showAllWhenEmpty

  const groups = useMemo(() => {
    if (!groupByLesson) return []
    const byLesson = new Map<number, { lessonTitle?: string; videos: PackageVideo[] }>()
    filtered.forEach(v => {
      const day = v.lesson ?? 0
      const g = byLesson.get(day) ?? { lessonTitle: v.lessonTitle, videos: [] }
      g.videos.push(v)
      byLesson.set(day, g)
    })
    return Array.from(byLesson.entries()).sort((a, b) => a[0] - b[0])
  }, [filtered, groupByLesson])

  const pillClass = (isActive: boolean) =>
    `font-heading text-[11px] uppercase tracking-wider rounded-sm px-3 py-1.5 border transition-colors cursor-pointer ${
      isActive
        ? 'bg-accent border-accent text-bg-primary'
        : 'border-border/60 text-text-muted hover:text-text-primary'
    }`

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search videos…"
          aria-label="Search videos"
          className="w-full sm:w-auto sm:flex-1 sm:max-w-md bg-transparent border border-border/60 rounded-sm px-3 py-2 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setSelected(new Set())} className={pillClass(selected.size === 0)}>
            All
          </button>
          {kindFilters.map(k => (
            <button key={k} onClick={() => toggleKind(k)} className={pillClass(selected.has(k))}>
              {kindLabel(k)}
            </button>
          ))}
        </div>
        {lessons?.length ? (
          <select
            value={scope}
            onChange={e => setScope(e.target.value === 'package' ? 'package' : Number(e.target.value))}
            aria-label="Lesson scope"
            className="bg-transparent border border-border/60 rounded-sm px-3 py-1.5 font-heading text-[11px] uppercase tracking-wider text-text-secondary focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="package">Full course</option>
            {lessons.map(l => (
              <option key={l.day} value={l.day}>{l.title ? `Lesson ${l.day} — ${l.title}` : `Lesson ${l.day}`}</option>
            ))}
          </select>
        ) : null}
      </div>

      {showResults && (
        <div className="mt-8">
          {filtered.length === 0 ? (
            <p className="font-body text-text-muted text-sm">No videos match.</p>
          ) : groupByLesson ? (
            <div className="flex flex-col gap-12">
              {groups.map(([day, g]) => {
                const packageId = g.videos[0]?.packageId
                return (
                  <section key={day}>
                    <div className="flex items-baseline justify-between gap-4 mb-5">
                      <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted">
                        {g.lessonTitle ? `Lesson ${day} — ${g.lessonTitle}` : `Lesson ${day}`}
                      </h2>
                      {day > 0 && packageId && (
                        <Link
                          href={`/courses/videos/${packageId}/playlists/lesson-${day}`}
                          className="shrink-0 font-heading text-[11px] uppercase tracking-wider text-accent hover:text-text-primary transition-colors"
                        >
                          Full playlist &rarr;
                        </Link>
                      )}
                    </div>
                    <VideoList videos={g.videos} />
                  </section>
                )
              })}
            </div>
          ) : (
            <VideoList videos={filtered} />
          )}
        </div>
      )}
    </div>
  )
}
