import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMediaPackages, getMediaPackage, getLessonVideos, getAllVideos } from '@/lib/media'
import { getAllCourses, getCourseLessons } from '@/lib/content'
import { VideoList } from '@/components/content/VideoList'
import { PlaylistClips } from '@/components/content/PlaylistClips'
import { Breadcrumb } from '@/components/content/Breadcrumb'

// Lesson playlists: /courses/videos/<package>/playlists/lesson-<day>.
// A playlist is valid for any day in the package's lessons table (so it exists
// before its videos land) or any day that already has videos. Layout: the full
// Transmission and Discussion recordings featured up top, then a VideoBrowser
// over all of the lesson's videos (same browser + pills as the package page).
function getPlaylistPage(pkgId: string, slug: string) {
  const m = /^lesson-(\d+)$/.exec(slug)
  if (!m) return null
  const day = Number(m[1])
  const pkg = getMediaPackage(pkgId)
  if (!pkg) return null
  const videos = getLessonVideos(pkgId, day)
  const lesson = pkg.lessons?.find(l => l.day === day)
  if (!videos.length && !lesson) return null
  // Neighboring playlists for the prev/next arrows (same shape as lesson pages).
  const days = Array.from(new Set([
    ...(pkg.lessons ?? []).map(l => l.day),
    ...pkg.videos.filter(v => v.lesson != null).map(v => v.lesson as number),
  ])).sort((a, b) => a - b)
  const i = days.indexOf(day)
  return {
    day,
    lessonTitle: lesson?.title,
    packageTitle: pkg.title,
    videos,
    transmissions: videos.filter(v => v.kind === 'lesson'),
    discussions: videos.filter(v => v.kind === 'discussion'),
    prevDay: i > 0 ? days[i - 1] : null,
    nextDay: i >= 0 && i < days.length - 1 ? days[i + 1] : null,
    lessons: days.map(d => ({ day: d, title: pkg.lessons?.find(l => l.day === d)?.title })),
  }
}

export function generateStaticParams() {
  return getMediaPackages().flatMap(p => {
    const days = new Set<number>((p.lessons ?? []).map(l => l.day))
    p.videos.forEach(v => { if (v.lesson != null) days.add(v.lesson) })
    return Array.from(days).map(day => ({ package: p.id, playlist: `lesson-${day}` }))
  })
}

export async function generateMetadata({ params }: { params: Promise<{ package: string; playlist: string }> }): Promise<Metadata> {
  const { package: pkg, playlist: slug } = await params
  const playlist = getPlaylistPage(pkg, slug)
  if (!playlist) return { title: 'Not Found' }
  return {
    title: `Lesson ${playlist.day}${playlist.lessonTitle ? ` — ${playlist.lessonTitle}` : ''} — ${playlist.packageTitle}`,
    robots: { index: false, follow: false },
  }
}

export default async function PlaylistPage({ params }: { params: Promise<{ package: string; playlist: string }> }) {
  const { package: pkg, playlist: slug } = await params
  const playlistPage = getPlaylistPage(pkg, slug)
  if (!playlistPage) notFound()

  const course = getAllCourses().find(c => c.slug === pkg)
  const hasSources = playlistPage.transmissions.length > 0 || playlistPage.discussions.length > 0
  const packageVideos = getAllVideos().filter(v => v.packageId === pkg)
  const lessonSlug = course ? getCourseLessons(course.slug).find(l => l.day === playlistPage.day)?.slug : undefined

  // Playlist label flanked by playlist-to-playlist jumps; the first playlist's
  // back arrow returns to Videos. Rendered above the crumb's right link on
  // mobile, below the crumbs from sm up.
  const pager = (
    <>
      <Link
        href={playlistPage.prevDay != null
          ? `/courses/videos/${pkg}/playlists/lesson-${playlistPage.prevDay}`
          : `/courses/videos/${pkg}`}
        title={playlistPage.prevDay != null ? `Playlist ${playlistPage.prevDay}` : 'Videos'}
        className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
      >
        &larr;
      </Link>
      <p className="tracking-[0.2em] text-accent">Playlist {playlistPage.day}</p>
      {playlistPage.nextDay != null && (
        <Link
          href={`/courses/videos/${pkg}/playlists/lesson-${playlistPage.nextDay}`}
          title={`Playlist ${playlistPage.nextDay}`}
          className="text-text-muted hover:text-accent transition-colors tracking-[0.15em]"
        >
          &rarr;
        </Link>
      )}
    </>
  )

  return (
    <div className="animate-fade-in">
      <div className="max-w-[940px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <Breadcrumb
          items={[
            ...(course
              ? [
                  { label: 'Courses', href: '/courses' },
                  { label: course.collection || course.title, href: `/courses/${course.slug}` },
                ]
              : []),
            { label: 'Videos', href: `/courses/videos/${pkg}` },
            { label: playlistPage.lessonTitle ?? `Lesson ${playlistPage.day}` },
          ]}
          right={course && lessonSlug
            ? { label: 'Lesson', href: `/courses/${course.slug}/${lessonSlug}` }
            : undefined}
          aboveRight={
            <div className="flex items-center justify-center gap-4 font-heading text-xs uppercase border-t border-border-subtle pt-3 mt-1 sm:hidden">
              {pager}
            </div>
          }
        />

        <div className="mt-6 hidden sm:flex items-center gap-4 font-heading text-xs uppercase">
          {pager}
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl text-text-primary mt-2 uppercase tracking-wide">
          {playlistPage.lessonTitle ?? `Lesson ${playlistPage.day}`}
        </h1>

        {playlistPage.videos.length === 0 && (
          <p className="mt-8 font-body text-text-muted text-sm">Videos for this lesson are coming soon.</p>
        )}

        {/* Featured full recordings, row-style like the rest of Videos */}
        {hasSources && (
          <section className="mt-10">
            <VideoList videos={[...playlistPage.transmissions, ...playlistPage.discussions]} />
          </section>
        )}

        {/* All the lesson's videos — same browser + pills as the package page */}
        {playlistPage.videos.length > 0 && (
          <section className={hasSources ? 'mt-14 pt-10 border-t border-border-subtle' : 'mt-10'}>
            <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">Videos</h2>
            <PlaylistClips
              packageVideos={packageVideos}
              lessons={playlistPage.lessons}
              currentDay={playlistPage.day}
            />
          </section>
        )}
      </div>
    </div>
  )
}
