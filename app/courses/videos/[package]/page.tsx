import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMediaPackages, getMediaPackage, getAllVideos, packageLessonCount, resolveMediaRef } from '@/lib/media'
import { getAllCourses } from '@/lib/content'
import { VideoBrowser } from '@/components/content/VideoBrowser'
import { Breadcrumb } from '@/components/content/Breadcrumb'

export function generateStaticParams() {
  return getMediaPackages().map(p => ({ package: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ package: string }> }): Promise<Metadata> {
  const { package: id } = await params
  const pkg = getMediaPackage(id)
  if (!pkg) return { title: 'Not Found' }
  return {
    title: `${pkg.title} — Course Videos`,
    description: `Videos from ${pkg.title}.`,
    robots: { index: false, follow: false },
  }
}

export default async function PackagePage({ params }: { params: Promise<{ package: string }> }) {
  const { package: id } = await params
  const pkg = getMediaPackage(id)
  if (!pkg) notFound()

  const videos = getAllVideos().filter(v => v.packageId === id)
  const lessonCount = packageLessonCount(pkg)
  const relatedMedia = (pkg.relatedMedia ?? [])
    .map(resolveMediaRef)
    .filter((r): r is { href: string; title: string; kind: 'article' | 'video' } => r !== null)

  // The public videos index is hidden; a package is reached through its course,
  // so "back" returns to that course (course packages have id === course slug).
  const course = getAllCourses().find(c => c.slug === pkg.id)

  return (
    <div className="animate-fade-in">
      <div className="max-w-[940px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <Breadcrumb
          items={course
            ? [
                { label: 'Courses', href: '/courses' },
                { label: course.collection || course.title, href: `/courses/${course.slug}` },
                { label: 'Videos' },
              ]
            : [{ label: 'Videos' }]}
          right={course ? { label: 'Course', href: `/courses/${course.slug}` } : undefined}
        />
        <header className="mt-6 mb-10">
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">{pkg.title}</h1>
        </header>
        {(pkg.lessons?.length ?? 0) > 0 && (
          <section className="mb-14">
            <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">Playlists</h2>
            <div className="border border-border rounded-sm divide-y divide-border-subtle">
              {pkg.lessons!.map(l => {
                const count = pkg.videos.filter(v => v.lesson === l.day).length
                return (
                  <Link
                    key={l.day}
                    href={`/courses/videos/${pkg.id}/playlists/lesson-${l.day}`}
                    className="group flex items-center justify-between gap-4 px-4 py-3 hover:bg-bg-secondary/30 transition-colors"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="font-heading text-sm text-accent shrink-0">{String(l.day).padStart(2, '0')}</span>
                      <span className="font-heading text-sm uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors truncate">
                        {l.title}
                      </span>
                    </span>
                    <span className="font-heading text-[11px] uppercase tracking-wider text-text-muted shrink-0">
                      {count > 0 ? `${count} ${count === 1 ? 'video' : 'videos'}` : 'Coming soon'}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">Browse</h2>
          <VideoBrowser videos={videos} groupByLesson={lessonCount > 0} lessons={pkg.lessons} />
        </section>

        {relatedMedia.length > 0 && (
          <div className="mt-14 pt-10 border-t border-border-subtle">
            <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-4">Related reading &amp; watching</h2>
            <ul className="flex flex-col gap-2">
              {relatedMedia.map(r => (
                <li key={r.href}>
                  <Link href={r.href} className="font-body text-sm text-accent hover:text-text-primary transition-colors">
                    {r.title} <span className="text-text-muted">· {r.kind}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
