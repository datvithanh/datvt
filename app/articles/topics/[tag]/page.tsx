import { notFound } from 'next/navigation'
import { fieldGuideMetadata } from '@/lib/field-guide'
import { getAllTags, getArticlesByTag } from '@/lib/content'
import { ArticleCard } from '@/components/content/ArticleCard'
import Link from 'next/link'

export function generateStaticParams() {
  return getAllTags().map(tag => ({ tag }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return fieldGuideMetadata(`/articles/topics/${encodeURIComponent(decoded)}`, `${decoded} — Articles`, `Articles about ${decoded}.`)
}

export default async function TopicPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const articles = getArticlesByTag(decoded)

  if (articles.length === 0) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 animate-fade-in">
      <Link href="/articles" className="text-sm text-text-muted hover:text-accent transition-colors uppercase tracking-wide">
        &larr; All articles
      </Link>
      <h1 className="font-serif text-3xl sm:text-4xl text-text-primary mt-6">
        {decoded}
      </h1>
      <p className="text-text-secondary mt-2">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>

      <div className="mt-10">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
