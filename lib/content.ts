import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { type Section, SECTIONS, SECTION_LABELS } from '@/lib/sections'
import { SHOW_INITIATES } from '@/lib/flags'

// Re-export so existing callers that import from '@/lib/content' keep working.
export type { Section }
export { SECTIONS, SECTION_LABELS }

const contentDir = path.join(process.cwd(), 'content')

const SECTION_SLUGS: string[] = SECTIONS.map(s => s.slug)

// Plain-text snippet of an MDX body for card/feed previews: strips images, links,
// and markdown symbols, collapses whitespace, and truncates. CSS line-clamp handles
// the final visual trim; this just keeps the payload small and tag-free.
function mdPreview(md: string, max = 320): string {
  const text = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')      // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')   // links → label
    .replace(/[*_`>#~]/g, '')                  // emphasis / heading / quote markers
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

export interface ArticleMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  image?: string
  animatedImage?: string
  youtubeUrl?: string
  slug: string
  section?: Section          // presence gates inclusion in the news system
  featured?: boolean         // legacy flag; homepage placement now uses `rank`
  rank?: number              // homepage featured slot: 1=hero, 2-3 right column, 4-5 bottom row
  author?: string            // who wrote/edited it — mentor slug (essays) or an editor name
  person?: string            // spotlight: who is honored
  features?: string[]        // initiate slugs this piece is about — powers the lineage hub feed
  showFooter?: boolean       // per-post: false suppresses the signature footer (default true)
  subtype?: string           // the "series" within a section — editorial(view): view refinement|karmic profiling; cohort: discussion|training log|quality post; spotlight(recognitions): gold star|member milestone|community initiative; essays: Dissertation|Reflection
  cohort?: string            // universal cohort facet, e.g. '9A'
  bodyPreview?: string       // plain-text snippet of the MDX body, for feed/card previews
}

export interface DiscussionClip {
  title: string
  url: string
  thumbnail: string
  analysis?: string
}

// A curated in-page nav entry: `heading` is the exact H2 text in the lesson
// body (slugified into the anchor id), `label` is the short nav-bar word.
export interface LessonChapter {
  heading: string
  label: string
}

export interface LessonMeta {
  title: string
  day: number                 // canonical numeric order (populated from `lesson` ?? `day` ?? 0)
  subtitle: string
  image?: string
  slug: string
  video?: string              // inline embed URL (YouTube/Vimeo)
  discussions?: DiscussionClip[]
  practice?: string           // practice callout copy
  chapters?: LessonChapter[]  // 3-5 key chapters for the sticky lesson nav
}

export interface CourseMeta {
  title: string
  slug: string
  description: string
  lessons: number
  collection?: string         // parent anthology/series label, e.g. "Taylor's Transmissions"
  unitLabel?: string          // badge word on lesson pages, default "Lesson"
  hero?: string               // landing hero banner image
  welcome?: string            // landing welcome copy
  hidden?: boolean            // excluded from the public /courses catalog (still reachable by direct URL)
}

// A team member. "Initiate" is the base entity. Shared by /team and
// /team/[initiate]. (The /mentorship card grid was removed Sept 2026.)
export interface InitiateMeta {
  name: string
  role: string           // team title shown as a label, e.g. "Mentor", "The Desk"
  specialty: string
  blurb: string
  ctaURL: string         // generic CTA link — powers the profile CTA button
  offerTerms?: string
  price?: string         // kept for later; hidden on the card for now
  showCTA: boolean            // show the CTA button on the profile + author card (needs ctaURL)
  profilePublished: boolean   // hub is live → /team roster + /team/[initiate]
  badge?: string              // optional label chip shown next to the role in the profile header
  photo?: string
  tags?: string[]             // hand-picked display labels for the author card
  signatureText?: string      // post-footer signature body (markdown)
  signatureImage?: string     // optional post-footer banner image
  ctaLabel?: string           // CTA button label; defaults to "Work with {name}"
  instagram?: string          // social links shown on the author card
  youtube?: string
  x?: string
  website?: string
  slug: string
}

// ===== Articles =====

// Recursively collect every .mdx under content/articles (organized into section folders
// such as editorials/, cohort9/<subtype>/, spotlights/, with optional author/<slug>/
// subfolders). The walk is fully recursive, so the folder layout is free to change;
// the URL slug is always the filename and section/authorship come from frontmatter.
function walkArticleFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkArticleFiles(full)
    return entry.name.endsWith('.mdx') ? [full] : []
  })
}

// Parse one article file into meta + body. Returns null for files with no title (empty
// placeholders), so half-written drafts never surface as broken, dateless cards.
function parseArticleFile(filePath: string): { meta: ArticleMeta; content: string } | null {
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  if (!data.title) return null
  return {
    meta: {
      title: data.title,
      date: data.date ? String(data.date) : '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      image: data.image,
      animatedImage: data.animatedImage,
      youtubeUrl: data.youtubeUrl,
      slug: path.basename(filePath, '.mdx'),
      section: SECTION_SLUGS.includes(data.section) ? (data.section as Section) : undefined,
      featured: data.featured === true,
      rank: typeof data.rank === 'number' ? data.rank : undefined,
      author: data.author,
      person: data.person,
      features: Array.isArray(data.features) ? data.features : [],
      showFooter: data.showFooter !== false,
      subtype: data.subtype,
      cohort: data.cohort,
      bodyPreview: mdPreview(content),
    },
    content,
  }
}

export function getAllArticles(): ArticleMeta[] {
  return walkArticleFiles(path.join(contentDir, 'articles'))
    .map(parseArticleFile)
    .filter((a): a is { meta: ArticleMeta; content: string } => a !== null)
    .map(a => a.meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
  const match = walkArticleFiles(path.join(contentDir, 'articles')).find(
    f => path.basename(f, '.mdx') === slug,
  )
  return match ? parseArticleFile(match) : null
}

export function getAllTags(): string[] {
  const articles = getAllArticles()
  const counts = new Map<string, number>()
  articles.forEach(a => a.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1)))
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticles().filter(a => a.tags.includes(tag))
}

// ===== News sections =====
// An article becomes "news" when it has a `section`. Articles without one (the
// legacy placeholders) never appear on the homepage or section pages — they stay
// only on /articles via getAllArticles().

export function getNewsArticles(): ArticleMeta[] {
  // getAllArticles is already sorted newest-first.
  return getAllArticles().filter(a => a.section)
}

export function getArticlesBySection(section: Section, limit?: number): ArticleMeta[] {
  const items = getAllArticles().filter(a => a.section === section)
  return typeof limit === 'number' ? items.slice(0, limit) : items
}

// The most recent "Dissertation" — an essays-section article whose subtype is
// "Dissertation" (case-insensitive). Powers the /home2 curated rail's Dissertation
// slot. Returns null when none has been published yet.
export function getLatestDissertation(): ArticleMeta | null {
  return (
    getNewsArticles().find(
      a => a.section === 'essays' && (a.subtype || '').toLowerCase() === 'dissertation',
    ) ?? null
  )
}

// The homepage hero article: the most recent news article flagged `featured: true`.
// Hand-picked, meant to sit for ~a month. Returns null when nothing is flagged.
export function getFeaturedArticle(): ArticleMeta | null {
  return getNewsArticles().find(a => a.featured) ?? null
}

export type Byline = { name: string; href: string | null; avatar: string | null }

// Byline for any article. When `author` matches an initiate slug, use the initiate's
// canonical name + avatar (photo); link to the /lineage hub only once the bio is
// published (so e.g. "Albert" links once live, "Contemplative CrossFit" never does).
// A free-text author (no matching record) shows as written, with no avatar and no link.
export function resolveByline(author?: string): Byline | null {
  if (!author) return null
  const initiate = getAllInitiates().find(i => i.slug === author.toLowerCase())
  if (!initiate) return { name: author, href: null, avatar: null }
  return {
    name: initiate.name,
    avatar: initiate.photo || null,
    href: SHOW_INITIATES && initiate.profilePublished ? `/team/${initiate.slug}` : null,
  }
}

// A news item with its byline pre-resolved on the server, so it can be passed to
// the client LatestFeed (plain serializable data).
export type FeedItem = {
  article: ArticleMeta
  byline: Byline | null
}

export function toFeedItem(article: ArticleMeta): FeedItem {
  return { article, byline: resolveByline(article.author) }
}

// ===== Courses =====

export function getAllCourses(): CourseMeta[] {
  const coursesDir = path.join(contentDir, 'courses')
  if (!fs.existsSync(coursesDir)) return []

  const dirs = fs.readdirSync(coursesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())

  return dirs.map(dir => {
    const metaPath = path.join(coursesDir, dir.name, 'course.json')
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
      return { ...meta, slug: dir.name }
    }
    return { title: dir.name, slug: dir.name, description: '', lessons: 0 }
  })
}

export function getCourseLessons(courseSlug: string): LessonMeta[] {
  const courseDir = path.join(contentDir, 'courses', courseSlug)
  if (!fs.existsSync(courseDir)) return []

  const files = fs.readdirSync(courseDir)
    .filter(f => f.endsWith('.mdx') && !f.startsWith('_'))

  return files
    .map(filename => {
      const filePath = path.join(courseDir, filename)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(source)
      return {
        title: data.title || '',
        day: data.lesson ?? data.day ?? 0,
        subtitle: data.subtitle || '',
        image: data.image,
        slug: filename.replace(/\.mdx$/, ''),
        video: data.video,
        discussions: Array.isArray(data.discussions) ? data.discussions : undefined,
        practice: data.practice,
        chapters: Array.isArray(data.chapters) ? data.chapters : undefined,
      }
    })
    .sort((a, b) => a.day - b.day)
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string): { meta: LessonMeta; content: string } | null {
  const filePath = path.join(contentDir, 'courses', courseSlug, `${lessonSlug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    meta: {
      title: data.title || '',
      day: data.lesson ?? data.day ?? 0,
      subtitle: data.subtitle || '',
      image: data.image,
      slug: lessonSlug,
      video: data.video,
      discussions: Array.isArray(data.discussions) ? data.discussions : undefined,
      practice: data.practice,
      chapters: Array.isArray(data.chapters) ? data.chapters : undefined,
    },
    content,
  }
}

export function getCoursePrimer(courseSlug: string): { content: string } | null {
  const filePath = path.join(contentDir, 'courses', courseSlug, '_primer.mdx')
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(source)
  return { content }
}

// ===== Initiates (team members) =====
// Single source of truth shared by /team and /team/[initiate].
// Visibility:
//   profilePublished  → hub is live → /team roster + /team/[initiate]

export function getAllInitiates(): InitiateMeta[] {
  const dir = path.join(contentDir, 'team')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const filePath = path.join(dir, filename)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(source)
      return {
        name: data.name || '',
        role: data.role || '',
        specialty: data.specialty || '',
        blurb: data.blurb || '',
        ctaURL: data.ctaURL || '',
        offerTerms: data.offerTerms || '',
        price: data.price || '',
        showCTA: data.showCTA === true,
        profilePublished: data.profilePublished === true,
        badge: data.badge || '',
        photo: data.photo,
        tags: Array.isArray(data.tags) ? data.tags : [],
        signatureText: data.signatureText || '',
        signatureImage: data.signatureImage || '',
        ctaLabel: data.ctaLabel || '',
        instagram: data.instagram || '',
        youtube: data.youtube || '',
        x: data.x || '',
        website: data.website || '',
        slug: filename.replace(/\.mdx$/, ''),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

// Initiates whose bio hub is live — the /team roster + the hub's static params.
export function getPublishedInitiates(): InitiateMeta[] {
  return getAllInitiates().filter(i => i.profilePublished)
}

// One initiate with the MDX body (the bio), for /lineage/[initiate]. Mirrors
// getArticleBySlug. Returns null when the record doesn't exist.
export function getInitiateBySlug(slug: string): { meta: InitiateMeta; content: string } | null {
  const filePath = path.join(contentDir, 'team', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    meta: {
      name: data.name || '',
      role: data.role || '',
      specialty: data.specialty || '',
      blurb: data.blurb || '',
      ctaURL: data.ctaURL || '',
      offerTerms: data.offerTerms || '',
      price: data.price || '',
      showCTA: data.showCTA === true,
      profilePublished: data.profilePublished === true,
      badge: data.badge || '',
      photo: data.photo,
      tags: Array.isArray(data.tags) ? data.tags : [],
      signatureText: data.signatureText || '',
      signatureImage: data.signatureImage || '',
      ctaLabel: data.ctaLabel || '',
      slug,
    },
    content,
  }
}

// A hub feed item: a news article with its byline pre-resolved (server-side) plus a
// `relation` marker so the client feed can label and filter by relationship.
export type InitiateFeedItem = FeedItem & { relation: 'author' | 'features' }

// Every news article authored by OR featuring this initiate, newest first.
// `author` wins when a piece both is authored by and features the slug.
export function getInitiateFeed(slug: string): InitiateFeedItem[] {
  const s = slug.toLowerCase()
  return getNewsArticles()
    .filter(a => {
      const authored = a.author?.toLowerCase() === s
      const featured = (a.features || []).some(f => f.toLowerCase() === s)
      return authored || featured
    })
    .map(article => ({
      ...toFeedItem(article),
      relation: article.author?.toLowerCase() === s ? ('author' as const) : ('features' as const),
    }))
}

// The full initiate profile behind an article's `author` byline — powers the
// article-page author card. Null when the author is a free-text name (no record).
export function getAuthorProfile(author?: string): InitiateMeta | null {
  if (!author) return null
  return getAllInitiates().find(i => i.slug === author.toLowerCase()) ?? null
}

// The post-footer signature: the primary featured initiate's signature (the FIRST slug
// in `features`). Null when nothing is featured, the footer is suppressed, the slug has
// no record, or that initiate has no signature. `href` links the hub only when published.
export type PostFooterData = {
  name: string
  href: string | null
  signatureText: string
  signatureImage: string
}

export function getArticleFooter(article: ArticleMeta): PostFooterData | null {
  if (article.showFooter === false) return null
  const slug = (article.features || [])[0]
  if (!slug) return null
  const initiate = getAllInitiates().find(i => i.slug === slug.toLowerCase())
  if (!initiate) return null
  const signatureText = initiate.signatureText || ''
  const signatureImage = initiate.signatureImage || ''
  if (!signatureText && !signatureImage) return null
  return {
    name: initiate.name,
    href: SHOW_INITIATES && initiate.profilePublished ? `/team/${initiate.slug}` : null,
    signatureText,
    signatureImage,
  }
}
