import { notFound } from 'next/navigation'
import { SOCIAL_PREVIEW_IMAGE } from '@/lib/social-preview'
import Link from 'next/link'
import { getAllArticles, getArticleBySlug, getAuthorProfile, getArticleFooter } from '@/lib/content'
import { AuthorCard } from '@/components/content/AuthorCard'
import { PostFooter } from '@/components/content/PostFooter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { InfographicImage } from '@/components/ui/InfographicImage'
import { HoverAnimatedImage } from '@/components/content/HoverAnimatedImage'
import { headingId, headingText, articleHeadings } from '@/lib/article-headings'

const mdxComponents = {
  h2: ({ children, ...props }: React.ComponentProps<'h2'>) => <h2 {...props} id={headingId(headingText(children))}>{children}</h2>,
  img: (props: React.ComponentProps<'img'>) => {
    const src = typeof props.src === 'string' ? props.src : ''
    if (src.includes('/infographics/')) {
      return <InfographicImage src={src} alt={String(props.alt || '')} />
    }
    return <img {...props} />
  },
}

export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Not Found' }
  const siteUrl = 'https://mindtraining.cc'
  return {
    title: { absolute: 'Contemplative CrossFit' },
    description: article.meta.excerpt,
    openGraph: {
      title: article.meta.title,
      description: article.meta.excerpt,
      type: 'article',
      publishedTime: article.meta.date,
      url: `${siteUrl}/articles/${slug}`,
      siteName: 'Contemplative CrossFit',
      images: article.meta.image ? [{
        url: `${siteUrl}${article.meta.image}`,
        width: 1200,
        height: 630,
        alt: article.meta.title,
      }] : [SOCIAL_PREVIEW_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.excerpt,
      images: article.meta.image ? [`${siteUrl}${article.meta.image}`] : [SOCIAL_PREVIEW_IMAGE.url],
    },
    alternates: {
      canonical: `${siteUrl}/articles/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  // CC house byline has no author profile rail for now — render the body full-width.
  const authorProfile =
    article.meta.author?.toLowerCase() === 'cc' ? null : getAuthorProfile(article.meta.author)
  const footer = getArticleFooter(article.meta)
  const contents = articleHeadings(article.content)

  const formattedDate = new Date(article.meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const siteUrl = 'https://mindtraining.cc'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.excerpt,
    datePublished: article.meta.date,
    author: {
      '@type': 'Organization',
      name: 'Contemplative CrossFit',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Contemplative CrossFit',
      url: siteUrl,
    },
    ...(article.meta.image && {
      image: `${siteUrl}${article.meta.image}`,
    }),
    url: `${siteUrl}/articles/${slug}`,
  }

  // Title block — rendered at the very top of the page, above the picture banner,
  // so the article reads title → image → body.
  const articleHeader = (
    <header className="article-heading wrap">
      <Link href="/articles" className="text-link">
        ← All essays
      </Link>
      <h1 className="fg-article-title">
        {article.meta.title}
      </h1>
      <p className="article-deck">{article.meta.excerpt}</p>
      <time dateTime={article.meta.date} className="block font-body text-xs text-text-muted mt-4">{formattedDate}</time>
      {article.meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {article.meta.tags.map(tag => (
            <Link
              key={tag}
              href={`/articles/topics/${encodeURIComponent(tag)}`}
              className="px-2 py-1 text-xs font-body border border-border-subtle rounded-sm text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  )

  // Article body — prose, optional video link, and the signature footer.
  const body = (
    <div className="min-w-0">
      <div className="prose">
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>

      {article.meta.youtubeUrl && (
        <div className="mt-12 pt-8 border-t border-border-subtle text-center">
          <p className="font-body text-text-muted text-xs mb-3">Prefer to watch?</p>
          <a
            href={article.meta.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-accent hover:text-accent-hover text-xs uppercase tracking-[0.15em] transition-colors"
          >
            Watch this talk on YouTube &rarr;
          </a>
        </div>
      )}

      {/* Course CTA — hidden until email gating is ready
      <div className="mt-12 p-6 border border-border rounded-sm bg-bg-secondary/30 text-center">
        <span className="text-xs font-heading uppercase tracking-[0.2em] text-accent">Free Course</span>
        <h3 className="font-heading text-lg text-text-primary mt-2 uppercase tracking-wide">Continue learning: Illumination 101</h3>
        <p className="font-body text-sm text-text-secondary mt-2">A 10-day course for practitioners who have the maps but haven&apos;t yet inhabited the territory.</p>
        <Link href="/courses/illumination-101" className="inline-block mt-4 font-heading text-accent hover:text-accent-hover text-xs uppercase tracking-[0.15em] transition-colors">
          Start the course &rarr;
        </Link>
      </div>
      */}

      {footer && <PostFooter footer={footer} />}
    </div>
  )

  // Picture — shown whole (no crop), aligned to the body column width and capped in
  // height so tall images don't blow up. Lives inside the body column, so it matches
  // the paragraph width to the right of the bio card.
  const heroBanner = (
    <div className="mb-8 flex justify-center">
      {article.meta.image ? (
        <HoverAnimatedImage
          src={article.meta.image}
          animatedSrc={article.meta.animatedImage}
          alt={article.meta.title}
          autoPlay
          className="w-auto h-auto max-w-full max-h-[70vh] sm:max-w-[48rem] rounded-sm"
        />
      ) : (
        <div className="hero-placeholder w-full max-w-[48rem] aspect-[16/9] rounded-sm" />
      )}
    </div>
  )

  return <article className="article-reader fg-native-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    {articleHeader}
    <div className="article-cover wrap">{heroBanner}</div>
    <div className="article-layout wrap">
      <aside className="article-toc"><p className="eyebrow">IN THIS ESSAY</p><nav aria-label="Article contents">{contents.map(item => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}</nav><Link className="text-link" href="/transmission-101">Try the free course ↗</Link>
        {authorProfile && <div className="fg-author-rail"><AuthorCard profile={authorProfile} /></div>}
      </aside>
      <div className="article-prose">{body}</div>
    </div>
  </article>
}
