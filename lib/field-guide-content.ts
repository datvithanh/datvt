import { cache } from 'react'
import { getAllArticles, getArticleBySlug, type ArticleMeta } from './content'

export type JournalArticle = ArticleMeta & { readingTime: number }
export const getFieldGuideArticles = cache((): JournalArticle[] => getAllArticles().map(article => ({
  ...article, readingTime: Math.max(1, Math.ceil((getArticleBySlug(article.slug)?.content.split(/\s+/).length || 0) / 200)),
})))
