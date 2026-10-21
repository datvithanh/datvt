'use client'

import { Fragment, useMemo, useState, type ReactNode } from 'react'
import type { FeedItem } from '@/lib/content'
import { SectionCard } from '@/components/content/SectionCard'

// Insert the inline CTA after this many articles (mid-scroll, only in the default
// unfiltered view and only when the feed is longer than this).
const INLINE_CTA_AFTER = 4

// The true feed: all news items by date, with client-side search.
// Items arrive with bylines already resolved on the server.
// `inlineCta` (optional) is rendered once, partway down the default feed.
export function LatestFeed({ items, inlineCta }: { items: FeedItem[]; inlineCta?: ReactNode }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(({ article }) => {
      const hay = `${article.title} ${article.bodyPreview ?? ''} ${article.subtype ?? ''} ${article.cohort ?? ''} ${(article.tags || []).join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [items, query])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-accent">Latest</h2>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search…"
          aria-label="Search the feed"
          className="flex-1 min-w-[160px] bg-bg-secondary/40 border border-border/60 rounded-sm px-3 py-2 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((it, i) => (
            <Fragment key={it.article.slug}>
              <SectionCard article={it.article} byline={it.byline} size="compact" />
              {inlineCta && !query && i === INLINE_CTA_AFTER - 1 && filtered.length > INLINE_CTA_AFTER && (
                <div>{inlineCta}</div>
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <p className="font-body text-text-muted py-10 text-center">
          {items.length === 0 ? 'Nothing published yet — subscribe above to be first.' : 'No matches.'}
        </p>
      )}
    </div>
  )
}
