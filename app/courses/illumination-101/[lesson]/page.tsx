import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseLessons, getLessonBySlug } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { InfographicImage } from '@/components/ui/InfographicImage'

const mdxComponents = {
  img: (props: React.ComponentProps<'img'>) => {
    const src = typeof props.src === 'string' ? props.src : ''
    if (src.includes('/infographics/')) {
      return <InfographicImage src={src} alt={String(props.alt || '')} />
    }
    return <img {...props} />
  },
}

export function generateStaticParams() {
  return getCourseLessons('illumination-101').map(l => ({ lesson: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: lessonSlug } = await params
  const lesson = getLessonBySlug('illumination-101', lessonSlug)
  if (!lesson) return { title: 'Not Found' }
  const siteUrl = 'https://mindtraining.cc'
  return {
    title: `Day ${lesson.meta.day}: ${lesson.meta.title} — Illumination 101`,
    description: lesson.meta.subtitle,
    openGraph: {
      title: `Day ${lesson.meta.day}: ${lesson.meta.title}`,
      description: lesson.meta.subtitle,
      type: 'article',
      siteName: 'Contemplative CrossFit',
      images: lesson.meta.image ? [{
        url: `${siteUrl}${lesson.meta.image}`,
        width: 1200,
        height: 630,
        alt: lesson.meta.title,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Day ${lesson.meta.day}: ${lesson.meta.title}`,
      description: lesson.meta.subtitle,
    },
  }
}

export default async function LessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: lessonSlug } = await params
  const lesson = getLessonBySlug('illumination-101', lessonSlug)
  if (!lesson) notFound()

  const allLessons = getCourseLessons('illumination-101')
  const currentIndex = allLessons.findIndex(l => l.slug === lessonSlug)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return (
    <div className="animate-fade-in">
      {/* Hero image */}
      <div className="w-full h-40 sm:h-56 lg:h-64 overflow-hidden">
        {lesson.meta.image ? (
          <img src={lesson.meta.image} alt={lesson.meta.title} className="w-full h-full object-cover" />
        ) : (
          <div className="hero-placeholder w-full h-full" />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link href="/courses/illumination-101" className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.15em]">
          &larr; Illumination 101
        </Link>

        <header className="mt-6 mb-10">
          {/* Day label flanked by lesson-to-lesson jumps (same design as the
              playlist pager); the first day's back arrow returns to the course */}
          <div className="flex items-center gap-4 font-heading text-xs uppercase">
            <Link
              href={prevLesson ? `/courses/illumination-101/${prevLesson.slug}` : '/courses/illumination-101'}
              title={prevLesson ? `Day ${prevLesson.day}` : 'Course Overview'}
              className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
            >
              &larr;
            </Link>
            <p className="tracking-[0.2em] text-accent">Day {lesson.meta.day}</p>
            {nextLesson && (
              <Link
                href={`/courses/illumination-101/${nextLesson.slug}`}
                title={`Day ${nextLesson.day}`}
                className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
              >
                &rarr;
              </Link>
            )}
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary mt-2 uppercase tracking-wide">
            {lesson.meta.title}
          </h1>
          {lesson.meta.subtitle && (
            <p className="font-body text-text-secondary mt-3 italic">
              {lesson.meta.subtitle}
            </p>
          )}
        </header>

        <div className="prose">
          <MDXRemote source={lesson.content} components={mdxComponents} />
        </div>

        {/* Lesson navigation */}
        <nav className="mt-12 pt-8 border-t border-border flex justify-between items-center">
          {prevLesson ? (
            <Link
              href={`/courses/illumination-101/${prevLesson.slug}`}
              className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]"
            >
              &larr; Day {prevLesson.day}
            </Link>
          ) : <span />}
          {nextLesson ? (
            <Link
              href={`/courses/illumination-101/${nextLesson.slug}`}
              className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]"
            >
              Day {nextLesson.day} &rarr;
            </Link>
          ) : (
            <Link
              href="/bootcamp"
              className="font-heading text-xs text-accent hover:text-accent-hover transition-colors uppercase tracking-[0.1em]"
            >
              Ready to train? &rarr;
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}
