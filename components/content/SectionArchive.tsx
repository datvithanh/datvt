import Link from 'next/link'
import { getArticlesBySection, toFeedItem, SECTION_LABELS, type Section } from '@/lib/content'
import { SectionCard } from '@/components/content/SectionCard'

// Full archive of one section. Reused by the four section route files.
export function SectionArchive({ section }: { section: Section }) {
  const items = getArticlesBySection(section).map(toFeedItem)
  const label = SECTION_LABELS[section]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 animate-fade-in">
      <Link href="/" className="text-sm text-text-muted hover:text-accent transition-colors uppercase tracking-wide">
        &larr; Home
      </Link>
      <h1 className="font-heading uppercase tracking-wide text-3xl sm:text-4xl text-text-primary mt-6">{label}</h1>
      <p className="font-body text-text-secondary mt-2">{items.length} post{items.length !== 1 ? 's' : ''}</p>

      {items.length > 0 ? (
        <div className="flex flex-col gap-3 mt-10">
          {items.map(it => (
            <SectionCard key={it.article.slug} article={it.article} byline={it.byline} size="compact" />
          ))}
        </div>
      ) : (
        <p className="font-body text-text-muted py-12">Nothing here yet.</p>
      )}
    </div>
  )
}
