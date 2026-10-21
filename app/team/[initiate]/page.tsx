import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPublishedInitiates, getInitiateBySlug, getInitiateFeed } from '@/lib/content'
import { InitiateFeed } from '@/components/team/InitiateFeed'

const siteUrl = 'https://mindtraining.cc'

// Routes stay live: build hub pages for published initiates; unpublished/unknown slugs
// 404. SHOW_INITIATES only controls whether the rest of the site links into them.
export function generateStaticParams() {
  return getPublishedInitiates().map(i => ({ initiate: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ initiate: string }> }): Promise<Metadata> {
  const { initiate } = await params
  const found = getInitiateBySlug(initiate)
  if (!found || !found.meta.profilePublished) return { title: 'Not Found' }
  const { meta } = found
  return {
    title: meta.name,
    description: meta.blurb || `${meta.name} — ${meta.role} at Contemplative CrossFit.`,
    openGraph: {
      title: meta.name,
      description: meta.blurb || `${meta.name} — ${meta.role} at Contemplative CrossFit.`,
      type: 'profile',
      url: `${siteUrl}/team/${meta.slug}`,
      siteName: 'Contemplative CrossFit',
      images: meta.photo ? [{ url: `${siteUrl}${meta.photo}`, alt: meta.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.name,
      description: meta.blurb || `${meta.name} — ${meta.role} at Contemplative CrossFit.`,
      images: meta.photo ? [`${siteUrl}${meta.photo}`] : undefined,
    },
    alternates: { canonical: `${siteUrl}/team/${meta.slug}` },
  }
}

export default async function InitiatePage({ params }: { params: Promise<{ initiate: string }> }) {
  const { initiate } = await params
  const found = getInitiateBySlug(initiate)
  if (!found || !found.meta.profilePublished) notFound()
  const { meta, content } = found
  const feed = getInitiateFeed(meta.slug)
  const canBook = meta.showCTA && !!meta.ctaURL
  const ctaText = meta.ctaLabel || `Work with ${meta.name}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: meta.name,
      jobTitle: meta.role,
      ...(meta.photo && { image: `${siteUrl}${meta.photo}` }),
      url: `${siteUrl}/team/${meta.slug}`,
    },
  }

  return (
    <article className="animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Link
          href="/team"
          className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.15em]"
        >
          &larr; Team
        </Link>

        {/* Header */}
        <header className="mt-8 flex flex-col sm:flex-row sm:items-end gap-6">
          <div className="w-28 sm:w-36 aspect-[3/4] flex-shrink-0 rounded-sm overflow-hidden bg-bg-tertiary flex items-center justify-center">
            {meta.photo ? (
              <img src={meta.photo} alt={meta.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-heading text-5xl text-accent/40 uppercase">{meta.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading text-[0.65rem] uppercase tracking-[0.2em] text-accent">{meta.role}</span>
              {meta.badge && (
                <span className="font-heading text-[0.55rem] uppercase tracking-[0.15em] text-accent/80 border border-accent/40 rounded-sm px-1.5 py-0.5">
                  {meta.badge}
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-text-primary uppercase tracking-wide mt-2">{meta.name}</h1>
            {meta.specialty && <p className="font-body text-text-muted text-sm mt-2">{meta.specialty}</p>}
          </div>
        </header>

        {/* Quiet CTA anchor — only when bookable */}
        {canBook && (
          <div className="mt-8 flex flex-wrap items-center gap-4 p-4 border border-border/60 rounded-sm bg-bg-secondary/20">
            <p className="font-body text-text-secondary text-sm flex-1 min-w-[180px]">
              {/* PLACEHOLDER microcopy — refine via cc-voice */}
              Work one-to-one with {meta.name}.{meta.offerTerms ? ` ${meta.offerTerms}.` : ''}
            </p>
            <a href={meta.ctaURL} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2.5 text-sm">
              {ctaText}
            </a>
          </div>
        )}

        {/* Bio */}
        <div className="prose mt-12">
          <MDXRemote source={content} />
        </div>

        {/* Merged feed (hidden when empty) */}
        <InitiateFeed items={feed} name={meta.name} />

        {/* Closing CTA — only when bookable */}
        {canBook ? (
          <div className="mt-16 pt-10 border-t border-border-subtle text-center">
            <h2 className="font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide">Sit with {meta.name}</h2>
            {meta.offerTerms && <p className="font-body text-text-muted text-sm mt-3">{meta.offerTerms}</p>}
            <div className="mt-6">
              <a href={meta.ctaURL} target="_blank" rel="noopener noreferrer" className="btn-primary px-10 py-3.5">
                {ctaText}
              </a>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
              <Link
                href="/team"
                className="font-heading text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
              >
                &larr; All initiates
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-16 pt-10 border-t border-border-subtle text-center">
            <Link
              href="/team"
              className="font-heading text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
            >
              &larr; All initiates
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
