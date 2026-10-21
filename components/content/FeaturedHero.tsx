import type { ReactNode } from 'react'
import type { FeedItem } from '@/lib/content'
import { SectionCard } from '@/components/content/SectionCard'

// The homepage featured zone, all in one section: a large hero article on the left
// (~60%) with the newsletter CTA filling the column beneath it (so the hero sizes to
// its content — no trailing dead space), and two stacked curated cards on the right
// (~40%). The right column holds the latest Spotlight and Essay.
export function FeaturedHero({
  hero,
  cards,
  newsletter,
}: {
  hero: FeedItem | null
  cards: FeedItem[]
  newsletter?: ReactNode
}) {
  if (!hero && cards.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        {hero && (
          <div className="lg:col-span-3 flex flex-col gap-6">
            <SectionCard article={hero.article} byline={hero.byline} size="hero" />
            {newsletter && (
              <div className="flex-1 w-full flex items-center">{newsletter}</div>
            )}
          </div>
        )}
        {cards.length > 0 && (
          <div className={`grid gap-6 auto-rows-fr ${hero ? 'lg:col-span-2' : 'lg:col-span-5 sm:grid-cols-2'}`}>
            {cards.map(c => (
              <SectionCard key={c.article.slug} article={c.article} byline={c.byline} size="feature" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
