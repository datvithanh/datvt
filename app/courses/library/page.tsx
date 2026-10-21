import type { Metadata } from 'next'
import { RailCard } from '@/components/content/RailCard'
import { TAYLOR_SNAKE_TOOLTIP } from '@/lib/easterEggs'

// Unlisted course library — the destination behind the email wall. Not in the
// nav or sitemap; the link is delivered by the Kit welcome email after a
// newsletter signup (see components/content/CourseLibraryOptIn.tsx). Cards here
// link to the full courses, unlike /courses which links to landing pages.

export const metadata: Metadata = {
  title: 'Course Library',
  description: 'The full CC course library.',
  robots: { index: false, follow: false },
}

export default function CourseLibraryPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary uppercase tracking-wide leading-tight text-center">
            Course Library
          </h1>
          <p className="font-body text-text-secondary mt-6 max-w-xl mx-auto text-center leading-relaxed">
            Everything here is yours to work through at your own pace. New courses are added
            to this page as they are released.
          </p>

          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-accent border-b border-border-subtle pb-3 mt-16">
            Courses
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <RailCard
              href="/courses/transmission-101-staying-present"
              thumbnail="/images/ppw-hero.jpg"
              thumbnailTooltip={TAYLOR_SNAKE_TOOLTIP}
              label="Full Course"
              title="Transmission 101"
              subtitle="Staying Present · 5 Lessons"
              description="All five lessons, the primer, and the debrief. Why you keep leaving the present moment, and what finally lets you stay."
            />
          </div>
        </div>
      </section>
    </div>
  )
}
