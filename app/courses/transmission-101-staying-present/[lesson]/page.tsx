import { notFound } from 'next/navigation'
import { getAllCourses, getCourseLessons, getLessonBySlug } from '@/lib/content'
import { LessonView } from '@/components/content/LessonView'
import { getLessonClips, getLessonVideos, pickPreview } from '@/lib/media'

const COURSE_SLUG = 'transmission-101-staying-present'

export function generateStaticParams() {
  return getCourseLessons(COURSE_SLUG).map(l => ({ lesson: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: lessonSlug } = await params
  const lesson = getLessonBySlug(COURSE_SLUG, lessonSlug)
  if (!lesson) return { title: 'Not Found' }
  return {
    title: `${lesson.meta.title} — Staying Present`,
    description: lesson.meta.subtitle,
  }
}

export default async function PPWProjectLessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: lessonSlug } = await params
  const lesson = getLessonBySlug(COURSE_SLUG, lessonSlug)
  if (!lesson) notFound()

  const course = getAllCourses().find(c => c.slug === COURSE_SLUG)
  const all = getCourseLessons(COURSE_SLUG)
  const i = all.findIndex(l => l.slug === lessonSlug)
  const prev = i > 0 ? { slug: all[i - 1].slug, day: all[i - 1].day } : null
  const next = i < all.length - 1 ? { slug: all[i + 1].slug, day: all[i + 1].day } : null
  // Lesson pages tease priority-marked clips first, capped at 3; the playlist page has the full set.
  const clips = pickPreview(getLessonClips(COURSE_SLUG, lesson.meta.day), 3)
  const discussions = getLessonVideos(COURSE_SLUG, lesson.meta.day).filter(v => v.kind === 'discussion')

  return (
    <LessonView
      lesson={lesson.meta}
      content={lesson.content}
      courseSlug={COURSE_SLUG}
      courseTitle={course?.collection ? `${course.collection}: ${course?.title || 'Staying Present'}` : (course?.title || 'Staying Present')}
      courseCrumbLabel={course?.collection || course?.title}
      unitLabel={course?.unitLabel || 'Lesson'}
      prev={prev}
      next={next}
      clips={clips}
      discussions={discussions}
      clipsBrowseHref={`/courses/videos/${COURSE_SLUG}/playlists/lesson-${lesson.meta.day}`}
    />
  )
}
