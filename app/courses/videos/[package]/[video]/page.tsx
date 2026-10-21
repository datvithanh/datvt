import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed'
import { getAllVideos, getVideo, getPlaylist, getLessonSources, getLessonClips, resolveMediaRef, getMediaPackage } from '@/lib/media'
import { getAllCourses, getCourseLessons } from '@/lib/content'
import { Breadcrumb } from '@/components/content/Breadcrumb'
import { VideoQueuePanel } from '@/components/content/VideoQueuePanel'

// `lesson-<n>` slugs are the old playlist URLs — playlists now live under
// /courses/videos/<package>/playlists/<slug>, so those redirect there. The
// slug stays a reserved namespace a video id can never shadow.
const PLAYLIST_SLUG = /^lesson-\d+$/

export function generateStaticParams() {
  return getAllVideos()
    .filter(v => !PLAYLIST_SLUG.test(v.id))
    .map(v => ({ package: v.packageId, video: v.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ package: string; video: string }> }): Promise<Metadata> {
  const { package: pkg, video: id } = await params
  const video = PLAYLIST_SLUG.test(id) ? null : getVideo(pkg, id)
  if (!video) return { title: 'Not Found' }
  return {
    title: `${video.title} — Course Videos`,
    description: video.summary.length > 160 ? `${video.summary.slice(0, 157)}…` : video.summary,
    robots: { index: false, follow: false },
  }
}

export default async function WatchPage({ params }: { params: Promise<{ package: string; video: string }> }) {
  const { package: pkg, video: id } = await params
  if (PLAYLIST_SLUG.test(id)) permanentRedirect(`/courses/videos/${pkg}/playlists/${id}`)
  const video = getVideo(pkg, id)
  if (!video) notFound()

  // Watch Next: the core course only (transmission + discussion rooms, no
  // clips) — 4 max per lesson. Clips get their own section below.
  const sources = (video.lesson != null ? getLessonSources(video.packageId, video.lesson) : getPlaylist(video)).slice(0, 4)
  const clips = video.lesson != null ? getLessonClips(video.packageId, video.lesson) : []
  const relatedMedia = (video.relatedMedia ?? [])
    .map(resolveMediaRef)
    .filter((r): r is { href: string; title: string; kind: 'article' | 'video' } => r !== null)

  // Breadcrumb: for a course package (id === course slug), offer both the course
  // and this course's videos (the package page). The public videos index
  // is hidden, so we never link up to /videos.
  const course = getAllCourses().find(c => c.slug === video.packageId)
  const courseLesson = course && video.lesson != null
    ? getCourseLessons(course.slug).find(l => l.day === video.lesson)
    : undefined
  const lessonSlug = courseLesson?.slug
  // Transmission recordings carry their lesson's practice callout.
  const practice = video.kind === 'lesson' ? courseLesson?.practice : undefined

  // Neighboring lesson playlists for the prev/next arrows (same shape as the
  // playlist and lesson pages).
  const mediaPkg = getMediaPackage(video.packageId)
  const days = mediaPkg
    ? Array.from(new Set([
        ...(mediaPkg.lessons ?? []).map(l => l.day),
        ...mediaPkg.videos.filter(v => v.lesson != null).map(v => v.lesson as number),
      ])).sort((a, b) => a - b)
    : []
  const dayIndex = video.lesson != null ? days.indexOf(video.lesson) : -1
  const prevDay = dayIndex > 0 ? days[dayIndex - 1] : null
  const nextDay = dayIndex >= 0 && dayIndex < days.length - 1 ? days[dayIndex + 1] : null

  // Every lesson in the package, in day order, shown as expandable playlists
  // inside Watch Next — the current lesson starts expanded.
  const lessonTitles = new Map((mediaPkg?.lessons ?? []).map(l => [l.day, l.title]))
  const lessonSections = video.lesson != null
    ? days.map(day => ({
        day,
        title: lessonTitles.get(day),
        videos: getLessonSources(video.packageId, day).slice(0, 4),
      })).filter(l => l.videos.length > 0)
    : []

  // Playlist-to-playlist jumps flanking the playlist label; the first
  // playlist's back arrow returns to Videos. Rendered above the crumb's right
  // link on mobile, below the crumbs from sm up.
  const pager = video.lesson == null ? null : (
    <>
      <Link
        href={prevDay != null
          ? `/courses/videos/${video.packageId}/playlists/lesson-${prevDay}`
          : `/courses/videos/${video.packageId}`}
        title={prevDay != null ? `Playlist ${prevDay}` : 'Videos'}
        className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
      >
        &larr;
      </Link>
      <p className="tracking-[0.2em] text-accent">Playlist {String(video.lesson).padStart(2, '0')}</p>
      {nextDay != null && (
        <Link
          href={`/courses/videos/${video.packageId}/playlists/lesson-${nextDay}`}
          title={`Playlist ${nextDay}`}
          className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
        >
          &rarr;
        </Link>
      )}
    </>
  )

  return (
    <div className="animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <Breadcrumb
          items={[
            ...(course
              ? [
                  { label: 'Courses', href: '/courses' },
                  { label: course.collection || course.title, href: `/courses/${course.slug}` },
                ]
              : []),
            { label: 'Videos', href: `/courses/videos/${video.packageId}` },
            ...(video.lesson != null
              ? [{ label: video.lessonTitle ?? `Lesson ${video.lesson}`, href: `/courses/videos/${video.packageId}/playlists/lesson-${video.lesson}` }]
              : []),
            { label: video.title },
          ]}
          right={course && lessonSlug
            ? { label: 'Lesson', href: `/courses/${course.slug}/${lessonSlug}` }
            : undefined}
          aboveRight={pager && (
            <div className="flex items-center justify-center gap-4 font-heading text-xs uppercase border-t border-border-subtle pt-3 mt-1 sm:hidden">
              {pager}
            </div>
          )}
        />

        {pager && (
          <div className="mt-6 hidden sm:flex items-center gap-4 font-heading text-xs uppercase">
            {pager}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10">
          {/* Main column: player → title → summary → related reading/watching */}
          <div>
            <YouTubeEmbed videoId={video.youtubeId} title={video.title} start={video.start} />
            <h1 className="font-heading text-xl sm:text-2xl text-text-primary mt-5 uppercase tracking-wide">
              {video.title}
            </h1>
            <p className="font-body text-text-secondary leading-relaxed mt-6">{video.summary}</p>

            {course && lessonSlug && (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href={`/courses/${course.slug}/${lessonSlug}#reading`}
                  className="font-heading text-xs uppercase tracking-[0.15em] text-accent hover:text-text-primary transition-colors"
                >
                  Reading Material for Lesson {video.lesson} &rarr;
                </Link>
              </div>
            )}

            {practice && (
              <div className="mt-8 p-6 border border-accent/20 rounded-sm bg-accent-muted">
                <h3 className="font-heading text-xs uppercase tracking-wider text-accent">Practice This Week</h3>
                <p className="mt-3 font-body text-text-secondary leading-relaxed">{practice}</p>
              </div>
            )}

            {relatedMedia.length > 0 && (
              <div className="mt-10 pt-6 border-t border-border-subtle">
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

          {/* Right rail: playlist (lesson siblings or whole package), then related-by-tag */}
          <aside>
            <h2 className="font-heading text-sm uppercase tracking-[0.15em] text-text-primary pb-3 mb-5 border-b border-border">
              Watch Next
            </h2>
            {lessonSections.length === 0 && (
              <h3 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-4">
                {video.packageTitle}
              </h3>
            )}
            {lessonSections.length > 0 ? (
              <VideoQueuePanel
                currentId={video.id}
                sections={lessonSections.map(l => ({
                  key: `lesson-${l.day}`,
                  label: l.title ? `Lesson ${l.day} — ${l.title}` : `Lesson ${l.day}`,
                  videos: l.videos,
                  defaultOpen: l.day === video.lesson,
                }))}
              />
            ) : (
              <VideoQueuePanel videos={sources} currentId={video.id} />
            )}

            {clips.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-sm uppercase tracking-[0.15em] text-text-primary pb-3 mb-5 border-b border-border">
                  Clips
                </h2>
                <VideoQueuePanel videos={clips} currentId={video.id} maxHeightClass="max-h-[420px]" />
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  )
}
