import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { InfographicImage } from '@/components/ui/InfographicImage'
import { LessonVideo } from '@/components/content/LessonVideo'
import { MediaRows } from '@/components/content/MediaRows'
import { VideoList } from '@/components/content/VideoList'
import type { LessonMeta } from '@/lib/content'
import type { PackageVideo } from '@/lib/media'
import { slugifyHeading } from '@/lib/utils'
import { Breadcrumb } from '@/components/content/Breadcrumb'

// Flatten MDX heading children (strings, <em>, etc.) into plain text for anchor ids.
function nodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return nodeText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children)
  }
  return ''
}

const mdxComponents = {
  img: (props: React.ComponentProps<'img'>) => {
    const src = typeof props.src === 'string' ? props.src : ''
    if (src.includes('/infographics/') || src.includes('/slides/')) {
      return <InfographicImage src={src} alt={String(props.alt || '')} />
    }
    return <img {...props} />
  },
  // Every H2 gets an anchor id so the chapter nav can jump to it; scroll-mt
  // clears the sticky header + lesson nav.
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 id={slugifyHeading(nodeText(props.children))} className="scroll-mt-32" {...props} />
  ),
}

type Neighbor = { slug: string; day: number } | null

export function LessonView({
  lesson,
  content,
  courseSlug,
  courseTitle,
  courseCrumbLabel,
  unitLabel = 'Lesson',
  prev,
  next,
  clips,
  discussions,
  clipsBrowseHref,
}: {
  lesson: LessonMeta
  content: string
  courseSlug: string
  courseTitle: string
  courseCrumbLabel?: string
  unitLabel?: string
  prev: Neighbor
  next: Neighbor
  clips?: PackageVideo[]
  discussions?: PackageVideo[]
  clipsBrowseHref?: string
}) {
  const pad = (n: number) => String(n).padStart(2, '0')

  const hasClips = Boolean(clips?.length && clipsBrowseHref)

  // Lesson-to-lesson jumps flanking the lesson label (same design as the
  // playlist pager); the first lesson's back arrow returns to the course.
  // Rendered twice: above the Readings/Videos row on mobile, in the header
  // from sm up.
  const pager = (
    <>
      <Link
        href={prev ? `/courses/${courseSlug}/${prev.slug}` : `/courses/${courseSlug}`}
        title={prev ? `${unitLabel} ${pad(prev.day)}` : 'Course Overview'}
        className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
      >
        &larr;
      </Link>
      <p className="tracking-[0.2em] text-accent">{unitLabel} {pad(lesson.day)}</p>
      {next && (
        <Link
          href={`/courses/${courseSlug}/${next.slug}`}
          title={`${unitLabel} ${pad(next.day)}`}
          className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
        >
          &rarr;
        </Link>
      )}
    </>
  )

  return (
    <div className="animate-fade-in">
      <div className="lesson-content max-w-[940px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <Breadcrumb
          items={[
            { label: 'Courses', href: '/courses' },
            { label: courseCrumbLabel || courseTitle, href: `/courses/${courseSlug}` },
            { label: lesson.title },
          ]}
          right={[
            ...(clipsBrowseHref ? [{ label: 'Videos', href: clipsBrowseHref }] : []),
            { label: 'Readings', href: '#reading', arrow: 'down' as const, color: 'grey' as const },
          ]}
          aboveRight={
            <div className="flex items-center justify-center gap-4 font-heading text-xs uppercase border-t border-border-subtle pt-3 mt-1 sm:hidden">
              {pager}
            </div>
          }
        />

        <header id="lesson" className="mt-6 mb-8 scroll-mt-32">
          <div className="hidden sm:flex items-center gap-4 font-heading text-xs uppercase">
            {pager}
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary mt-2 uppercase tracking-wide">{lesson.title}</h1>
          {lesson.subtitle && (
            <p className="font-body text-text-secondary mt-3 italic">{lesson.subtitle}</p>
          )}
        </header>

        {lesson.video && (
          <div className="mb-10">
            <LessonVideo src={lesson.video} title={lesson.title} />
          </div>
        )}

        {lesson.practice && (
          <div className="mb-10 p-6 border border-accent/20 rounded-sm bg-accent-muted">
            <h3 className="font-heading text-xs uppercase tracking-wider text-accent">Practice This Week</h3>
            <p className="mt-3 font-body text-text-secondary leading-relaxed">{lesson.practice}</p>
          </div>
        )}

        {discussions?.length ? (
          <div id="discussion" className="mb-10 scroll-mt-32">
            <h2 className="font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide">Discussion</h2>
            <p className="font-body text-text-secondary mt-3 mb-6">
              The live discussion room from this lesson. Watch it as another transmission — feel into
              the others as they ask questions and speak, and stay open to direct relating.
            </p>
            <VideoList videos={discussions} />
          </div>
        ) : null}

        <div id="reading" className="mt-16 pt-10 border-t border-border-subtle scroll-mt-32">
          <h2 className="font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide mb-6">Reading Material</h2>
          <div className="prose">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>

        {clips?.length && clipsBrowseHref ? (
          <div id="clips" className="mt-16 pt-10 border-t border-border-subtle scroll-mt-32">
            <h2 className="font-heading text-xl sm:text-2xl text-text-primary uppercase tracking-wide mb-6">Clips</h2>
            <MediaRows videos={clips} browseHref={clipsBrowseHref} browseLabel="View the Full Playlist" />
          </div>
        ) : null}

        <nav className="mt-12 pt-8 border-t border-border flex justify-between items-center">
          {prev ? (
            <Link href={`/courses/${courseSlug}/${prev.slug}`} className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]">
              &larr; {unitLabel} {pad(prev.day)}
            </Link>
          ) : (
            <Link href={`/courses/${courseSlug}`} className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]">
              &larr; Course Overview
            </Link>
          )}
          {next ? (
            <Link href={`/courses/${courseSlug}/${next.slug}`} className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]">
              {unitLabel} {pad(next.day)} &rarr;
            </Link>
          ) : (
            <Link href={`/courses/${courseSlug}`} className="font-heading text-xs text-accent hover:text-accent-hover transition-colors uppercase tracking-[0.1em]">
              Back to Course Overview &rarr;
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}
