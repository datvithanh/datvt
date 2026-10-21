'use client'

import { useMemo, useState } from 'react'
import type { InitiateFeedItem } from '@/lib/content'
import { type Section, SECTION_LABELS } from '@/lib/sections'
import { SectionCard } from '@/components/content/SectionCard'

type RelFilter = 'all' | 'author' | 'features'
type SortDir = 'newest' | 'oldest'

// The initiate hub's merged feed: every news article authored by or featuring this
// person, with client-side section + relationship filters and a date sort. Items
// arrive with bylines and `relation` resolved on the server (plain serializable data).
export function InitiateFeed({ items, name }: { items: InitiateFeedItem[]; name: string }) {
  const [section, setSection] = useState<Section | 'all'>('all')
  const [rel, setRel] = useState<RelFilter>('all')
  const [sort, setSort] = useState<SortDir>('newest')

  // Only offer chips that actually match something.
  const presentSections = useMemo(
    () => Array.from(new Set(items.map(i => i.article.section).filter(Boolean))) as Section[],
    [items],
  )
  const hasBoth = useMemo(
    () => items.some(i => i.relation === 'author') && items.some(i => i.relation === 'features'),
    [items],
  )

  const filtered = useMemo(() => {
    const out = items.filter(i => {
      if (section !== 'all' && i.article.section !== section) return false
      if (rel !== 'all' && i.relation !== rel) return false
      return true
    })
    out.sort((a, b) => {
      const ta = new Date(a.article.date).getTime()
      const tb = new Date(b.article.date).getTime()
      return sort === 'newest' ? tb - ta : ta - tb
    })
    return out
  }, [items, section, rel, sort])

  if (items.length === 0) return null

  const chip = (active: boolean, label: string, onClick: () => void) => (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`font-heading text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1 rounded-full border transition-colors ${
        active
          ? 'border-accent/50 text-accent bg-accent-muted'
          : 'border-border/60 text-text-muted hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  )

  return (
    <section className="mt-16 pt-10 border-t border-border-subtle">
      <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-accent mb-6">{name} in the feed</h2>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {chip(section === 'all', 'All', () => setSection('all'))}
        {presentSections.map(s => chip(section === s, SECTION_LABELS[s], () => setSection(s)))}

        {hasBoth && <span className="mx-1 h-4 w-px bg-border/60" aria-hidden />}
        {hasBoth && chip(rel === 'all', 'All sources', () => setRel('all'))}
        {hasBoth && chip(rel === 'author', `By ${name}`, () => setRel('author'))}
        {hasBoth && chip(rel === 'features', 'Features', () => setRel('features'))}

        <button
          onClick={() => setSort(s => (s === 'newest' ? 'oldest' : 'newest'))}
          aria-label="Toggle sort order"
          className="ml-auto font-heading text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1 rounded-full border border-border/60 text-text-muted hover:text-text-primary transition-colors"
        >
          {sort === 'newest' ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map(it => (
            <SectionCard key={it.article.slug} article={it.article} byline={it.byline} size="compact" />
          ))}
        </div>
      ) : (
        <p className="font-body text-text-muted py-10 text-center">No matches.</p>
      )}
    </section>
  )
}
