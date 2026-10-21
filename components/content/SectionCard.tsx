import Link from 'next/link'
import type { ArticleMeta, Byline } from '@/lib/content'
import { SECTION_LABELS } from '@/lib/sections'
import { HoverAnimatedImage } from './HoverAnimatedImage'
import { MandalaOverlay } from './MandalaOverlay'

type Size = 'compact' | 'feature' | 'hero'

function fmtDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Header meta line shown on every card: SECTION · [spotlight tag] · date · by {author}.
// Rendered as plain text (the whole card is a single link, so the byline can't be a
// nested anchor; lineage linking lives on the article/lineage pages).
function MetaRow({ article, byline }: { article: ArticleMeta; byline: Byline | null }) {
  const label = article.section ? SECTION_LABELS[article.section] : ''
  const date = fmtDate(article.date)
  const dot = <span className="text-text-muted/40 select-none">&middot;</span>
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-heading text-[0.6rem] uppercase tracking-[0.18em] text-accent">{label}</span>
      {article.subtype && (
        <span className="font-heading text-[0.55rem] uppercase tracking-[0.15em] text-accent/80 border border-accent/40 rounded-sm px-1.5 py-0.5">
          {article.subtype}
        </span>
      )}
      {/* cohort chip hidden for now — `cohort` is still stored on each article and searchable */}
      {date && (<>{dot}<time dateTime={article.date} className="font-body text-[0.65rem] text-text-muted">{date}</time></>)}
      {byline && (
        <>
          {dot}
          <span className="inline-flex items-center gap-1.5 font-heading text-[0.6rem] uppercase tracking-[0.12em] text-text-muted">
            {byline.avatar && (
              <img src={byline.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
            )}
            by {byline.name}
          </span>
        </>
      )}
    </div>
  )
}

// One card for every section. Sizes: `compact` = full-width horizontal row (the
// Latest feed); `feature` = upsized vertical card (the curated/right column);
// `hero` = large featured card (the homepage hero, left). Every card shows the
// author in its header and a snippet of the body.
export function SectionCard({
  article,
  size = 'compact',
  byline = null,
}: {
  article: ArticleMeta
  size?: Size
  byline?: Byline | null
}) {
  // ===== COMPACT — full-width horizontal row (Latest feed) =====
  if (size === 'compact') {
    return (
      <article className="group border border-border/60 rounded-sm bg-bg-secondary/20 hover:border-accent/30 transition-colors overflow-hidden">
        <Link href={`/articles/${article.slug}`} className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-5">
          {article.image && (
            <div className="w-full sm:w-44 aspect-video flex-shrink-0 self-center rounded-sm overflow-hidden">
              <HoverAnimatedImage src={article.image} animatedSrc={article.animatedImage} alt={article.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <MetaRow article={article} byline={byline} />
            <h3 className="font-heading uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors mt-2 text-base sm:text-lg line-clamp-2 break-words">
              {article.title}
            </h3>
            {article.bodyPreview && (
              <p className="font-body text-text-secondary text-sm leading-relaxed mt-2 line-clamp-2">
                {article.bodyPreview}
              </p>
            )}
          </div>
        </Link>
      </article>
    )
  }

  // ===== FEATURE / HERO — vertical, image-topped card; always has a thumbnail =====
  const isHero = size === 'hero'
  return (
    <article className={`group flex flex-col border border-border/60 rounded-sm overflow-hidden bg-bg-secondary/20 hover:border-accent/30 transition-colors ${isHero ? '' : 'h-full'}`}>
      <Link href={`/articles/${article.slug}`} className="flex flex-col flex-1">
        <div className="relative overflow-hidden aspect-[16/9]">
          {article.image ? (
            <HoverAnimatedImage src={article.image} animatedSrc={article.animatedImage} alt={article.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="hero-placeholder w-full h-full" />
          )}
          {isHero && <MandalaOverlay />}
        </div>
        <div className={`flex flex-col flex-1 ${isHero ? 'p-6 sm:p-8' : 'p-6'}`}>
          <MetaRow article={article} byline={byline} />
          <h3 className={`font-heading uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors mt-2 break-words ${isHero ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {article.title}
          </h3>
          {article.bodyPreview && (
            <p className={`font-body text-text-secondary leading-relaxed mt-2 ${isHero ? 'line-clamp-5 text-sm sm:text-base' : 'line-clamp-4 text-sm'}`}>
              {article.bodyPreview}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
