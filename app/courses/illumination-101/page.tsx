import type { Metadata } from 'next'
import Link from 'next/link'
import { getCourseLessons } from '@/lib/content'
import { LessonCard } from '@/components/content/LessonCard'

export const metadata: Metadata = {
  title: 'Illumination 101',
  description: 'A 10-Day Course in Illumination Practice. For practitioners who have the maps but haven\'t yet inhabited the territory.',
}

export default function Illumination101Page() {
  const lessons = getCourseLessons('illumination-101')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 animate-fade-in">
      <Link href="/courses" className="font-heading text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-[0.15em]">
        &larr; Courses
      </Link>

      <div className="mt-6">
        <span className="text-xs font-heading uppercase tracking-[0.2em] text-accent">Free Course &middot; 10 Lessons</span>
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-text-primary mt-3 uppercase tracking-wide">
          Illumination 101
        </h1>
        <p className="font-body text-text-secondary mt-4 leading-relaxed">
          For practitioners who have the maps but haven&apos;t yet inhabited the territory.
          For those exhausted by the effort of trying to wake up.
        </p>
      </div>

      {/* Course intro */}
      <div className="mt-8 p-6 border border-border rounded-sm bg-bg-secondary/30">
        <p className="font-body text-text-secondary leading-relaxed text-sm">
          This curriculum is for a specific kind of practitioner: someone who has read widely,
          meditated consistently and inconsistently, and arrived at a quiet suspicion that all
          paths lead to dead ends. They are not beginners. They are the exhausted seekers.
        </p>
        <div className="mt-4 font-body text-sm text-text-muted space-y-1.5">
          <p><strong className="text-text-secondary">Days 1&ndash;2:</strong> Recognition &mdash; naming the exhaustion and the traps that sustain it</p>
          <p><strong className="text-text-secondary">Days 3&ndash;5:</strong> Re-sensitization &mdash; building the voltage to actually feel</p>
          <p><strong className="text-text-secondary">Days 6&ndash;7:</strong> Terrain &mdash; mapping the flinch and learning to stay in the muck</p>
          <p><strong className="text-text-secondary">Days 8&ndash;9:</strong> Transition &mdash; from fixing to flowing, from observer to resident</p>
          <p><strong className="text-text-secondary">Day 10:</strong> Arrival &mdash; not a state but a decision</p>
        </div>
      </div>

      {/* Lesson list */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xs font-heading uppercase tracking-[0.2em] text-text-muted mb-4">
          Lessons
        </h2>
        {lessons.map(lesson => (
          <LessonCard key={lesson.slug} lesson={lesson} courseSlug="illumination-101" />
        ))}

        {lessons.length === 0 && (
          <p className="font-body text-text-muted py-8">Lessons coming soon.</p>
        )}
      </div>

      <div className="mt-10 text-center font-body text-xs text-text-muted">
        <p>Mind training for those who&apos;ve stopped seeking comfort.</p>
        <p className="mt-2">Enter your email to access lesson content. Free, no commitment.</p>
      </div>
    </div>
  )
}
