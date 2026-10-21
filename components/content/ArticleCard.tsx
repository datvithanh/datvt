import Link from 'next/link'
import type { ArticleMeta } from '@/lib/content'
import { HoverAnimatedImage } from './HoverAnimatedImage'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="group py-8 border-b border-border-subtle last:border-b-0">
      <Link href={`/articles/${article.slug}`} className="flex flex-col sm:flex-row gap-5 sm:gap-8">
        <div className="w-full sm:w-44 h-44 sm:h-32 flex-shrink-0 overflow-hidden rounded-sm">
          {article.image ? (
            <HoverAnimatedImage
              src={article.image}
              animatedSrc={article.animatedImage}
              alt={article.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="hero-placeholder w-full h-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading uppercase text-lg sm:text-xl text-text-primary group-hover:text-accent transition-colors tracking-wide">
            {article.title}
          </h3>
          <time className="block text-xs text-text-muted mt-2 font-body">{formattedDate}</time>
          {article.excerpt && (
            <p className="text-text-secondary mt-3 line-clamp-2 text-sm leading-relaxed font-body">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
