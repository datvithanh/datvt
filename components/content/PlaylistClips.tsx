'use client'

import { useMemo, useState } from 'react'
import type { PackageVideo } from '@/lib/media'
import { VideoList } from '@/components/content/VideoList'

// Clips module for a lesson playlist page.
// - One mutually-exclusive view pill is active at a time (default "Clip"):
//   - All: everything in scope, manifest order.
//   - Lesson / Discussion / Clip: filter to that kind, manifest order.
//   Manifest order is hand-curated, so no separate ranking exists.
// - Search queries the current view's set.
// - Scope dropdown: lists every lesson plus "Full course"; defaults to the
//   current lesson.

type View = 'all' | 'lesson' | 'discussion' | 'clip'

const VIEWS: { key: View; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'lesson', label: 'Transmission' },
  { key: 'discussion', label: 'Discussion' },
  { key: 'clip', label: 'Clips' },
]

export function PlaylistClips({
  packageVideos,
  lessons,
  currentDay,
}: {
  packageVideos: PackageVideo[]
  lessons: { day: number; title?: string }[]
  currentDay: number
}) {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>('clip')
  const [scope, setScope] = useState<number | 'package'>(currentDay)

  const pool = scope === 'package' ? packageVideos : packageVideos.filter(v => v.lesson === scope)

  const shown = useMemo(() => {
    // A kind view narrows the pool by type; All keeps the whole pool.
    const base = view === 'all' ? pool : pool.filter(v => (v.kind ?? 'discussion') === view)
    const q = query.trim().toLowerCase()
    if (q) {
      return base.filter(v => v.title.toLowerCase().includes(q) || v.summary.toLowerCase().includes(q))
    }
    return base
  }, [pool, query, view])

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
          {VIEWS.map(v => (
            <button key={v.key} type="button" onClick={() => setView(v.key)} className={pillClass(view === v.key)}>
              {v.label}
            </button>
          ))}
        </div>
        <select
          value={scope}
          onChange={e => setScope(e.target.value === 'package' ? 'package' : Number(e.target.value))}
          aria-label="Clip scope"
          className="bg-transparent border border-border/60 rounded-sm px-3 py-1.5 font-heading text-[11px] uppercase tracking-wider text-text-secondary focus:outline-none focus:border-accent cursor-pointer"
        >
          {lessons.map(l => (
            <option key={l.day} value={l.day}>{l.title ? `Lesson ${l.day} — ${l.title}` : `Lesson ${l.day}`}</option>
          ))}
          <option value="package">Full course</option>
        </select>
      </div>

      <div className="mt-8">
        {shown.length === 0 ? (
          <p className="font-body text-text-muted text-sm">No clips match.</p>
        ) : (
          <VideoList videos={shown} />
        )}
      </div>
    </div>
  )
}
