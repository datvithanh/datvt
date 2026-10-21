import Link from 'next/link'
import type { LessonMeta } from '@/lib/content'

export function LessonCard({ lesson, courseSlug }: { lesson: LessonMeta; courseSlug: string }) {
  return (
    <Link
      href={`/courses/${courseSlug}/${lesson.slug}`}
      className="group block p-5 border border-border rounded-sm hover:border-accent/30 hover:bg-bg-secondary/30 transition-all"
    >
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-10 h-10 rounded-sm bg-accent-muted text-accent flex items-center justify-center font-heading text-sm">
          {lesson.day}
        </span>
        <div>
          <h3 className="font-heading text-base uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors">
            {lesson.title}
          </h3>
          {lesson.subtitle && (
            <p className="font-body text-sm text-text-secondary mt-1.5">{lesson.subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
