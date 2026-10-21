import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllCourses, getCourseLessons, getCoursePrimer } from '@/lib/content'
import { getAllVideos, pickPreview } from '@/lib/media'
import { BootcampCTA } from '@/components/content/BootcampCTA'
import { MediaRows } from '@/components/content/MediaRows'
import { Breadcrumb } from '@/components/content/Breadcrumb'
import { TAYLOR_SNAKE_TOOLTIP } from '@/lib/easterEggs'
import { SHOW_COACHING_CALL } from '@/lib/flags'

const COURSE_SLUG = 'transmission-101-staying-present'

export const metadata: Metadata = {
  title: 'Transmission 101: Staying Present',
  description: 'A self-paced course — five teachings on the small, constant act of leaving the present, and what it takes to stay.',
}

export default function PPWProjectLanding() {
  const course = getAllCourses().find(c => c.slug === COURSE_SLUG)
  const lessons = getCourseLessons(COURSE_SLUG)
  const primer = getCoursePrimer(COURSE_SLUG)
  // Teaser: priority-marked clips first, capped at 3; the browse link carries the rest.
  const videos = pickPreview(getAllVideos().filter(v => v.packageId === COURSE_SLUG), 3)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="animate-fade-in">
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Courses', href: '/courses' },
              { label: course?.collection || course?.title || 'Transmission 101' },
            ]}
            right={[
              { label: 'Videos', href: `/courses/videos/${COURSE_SLUG}` },
              { label: 'Lessons', href: '#lessons', arrow: 'down', color: 'grey' },
            ]}
          />

          {/* Header */}
          {course?.collection && (
            <p className="text-xs font-heading uppercase tracking-[0.2em] text-accent mt-6">{course.collection}</p>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-3 uppercase tracking-wide leading-tight">
            {course?.title || 'Staying Present'}
          </h1>
          <span className="mt-2 inline-block text-xs font-heading uppercase tracking-[0.2em] text-text-muted">A Self-Paced Course</span>
          {course?.description && (
            <p className="font-body text-text-secondary text-lg mt-4 italic">{course.description}</p>
          )}

          {/* Hero banner (placeholder until supplied) */}
          {course?.hero ? (
            <img src={course.hero} alt={course.title} title={TAYLOR_SNAKE_TOOLTIP} className="mt-10 w-full rounded-sm border border-border" />
          ) : (
            <div className="mt-10 hero-placeholder w-full aspect-[21/9] rounded-sm border border-border" />
          )}

          {/* Welcome */}
          {course?.welcome && (
            <div className="prose mt-12">
              <h2>Welcome</h2>
              <p>{course.welcome}</p>
            </div>
          )}

          {/* Before You Begin — primer */}
          {primer && (
            <div className="mt-16 pt-12 border-t border-border-subtle">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">Before You Begin</h2>
              <div className="prose mt-6">
                <MDXRemote source={primer.content} />
              </div>
            </div>
          )}

          {/* The Five Lessons */}
          <div id="lessons" className="mt-16 pt-12 border-t border-border-subtle scroll-mt-24">
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">The Five Lessons</h2>
            <div className="mt-8 space-y-4">
              {lessons.map(lesson => (
                <Link
                  key={lesson.slug}
                  href={`/courses/${COURSE_SLUG}/${lesson.slug}`}
                  className="group flex items-start gap-4 p-5 border border-border rounded-sm hover:border-accent/30 hover:bg-bg-secondary/30 transition-all"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-sm bg-accent-muted text-accent flex items-center justify-center font-heading text-sm">
                    {pad(lesson.day)}
                  </span>
                  <div>
                    <h3 className="font-heading text-base uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors">{lesson.title}</h3>
                    {lesson.subtitle && (
                      <p className="font-body text-sm text-text-secondary mt-1.5">{lesson.subtitle}</p>
                    )}
                  </div>
                </Link>
              ))}
              {lessons.length === 0 && (
                <p className="font-body text-text-muted py-8">Lessons coming soon.</p>
              )}
            </div>

            {/* Debrief — after the five lessons: review pedagogy + free coaching call. */}
            <Link
              href={`/courses/${COURSE_SLUG}/debrief`}
              className="group block mt-8 p-5 border border-[#7d9aa8]/30 rounded-sm bg-[#7d9aa8]/5 hover:border-[#7d9aa8]/60 transition-all"
            >
              <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-[#7d9aa8]">
                After the five lessons
              </p>
              <h3 className="font-heading text-base uppercase tracking-wide text-text-primary mt-3 group-hover:text-[#7d9aa8] transition-colors">
                The Debrief
              </h3>
              <p className="font-body text-sm text-text-secondary mt-1.5">
                {SHOW_COACHING_CALL
                  ? 'Where the course goes next: how to return to the material, a free coaching call with the core team, and the community where practice continues.'
                  : 'Where the course goes next: how to return to the material, and the community where practice continues.'}
              </p>
            </Link>
          </div>

          {/* From the Discussions */}
          {videos.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border-subtle">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">Videos</h2>
              <p className="font-body text-text-secondary mt-4">
                Clips and full recordings from the live sessions, organized by lesson.
              </p>
              <div className="mt-8">
                <MediaRows videos={videos} browseHref={`/courses/videos/${COURSE_SLUG}`} browseLabel="Browse Videos" />
              </div>
            </div>
          )}

          {/* Bootcamp CTA */}
          <div className="mt-20 pt-12 border-t border-border-subtle">
            <BootcampCTA intro="Staying Present is a taste of what's available inside the CC 90-Day Bootcamp — direct guidance, a sincere community, and a systematic path from foundation to realization." />
            <div className="mt-10 text-center">
              <Link href="/bootcamp" className="btn-primary px-8 py-3 inline-block">&rarr; Full Bootcamp Details</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
