import { getAllArticles, getCourseLessons } from '@/lib/content'
import { SECTIONS } from '@/lib/sections'

const siteUrl = 'https://mindtraining.cc'

export default function sitemap() {
  const articles = getAllArticles()

  const articleEntries = articles.map(article => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const sectionEntries = SECTIONS.map(s => ({
    url: `${siteUrl}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const courseSlug = 'transmission-101-staying-present'
  const lessonEntries = getCourseLessons(courseSlug).map(lesson => ({
    url: `${siteUrl}/courses/${courseSlug}/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/bootcamp`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/embodiment`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/coaching`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/courses/${courseSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/courses/${courseSlug}/debrief`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...['programs', 'media', 'transmission-101'].map(slug => ({ url: `${siteUrl}/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...lessonEntries,
    ...sectionEntries,
    ...articleEntries,
  ]
}
