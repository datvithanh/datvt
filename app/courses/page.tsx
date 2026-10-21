import type { Metadata } from 'next'
import { Badge } from '@/components/bootcamp/primitives'
import { RailCard } from '@/components/content/RailCard'
import { CourseLibraryOptIn } from '@/components/content/CourseLibraryOptIn'
import { TAYLOR_SNAKE_TOOLTIP } from '@/lib/easterEggs'

// Public courses landing page. Hero mirrors /embodiment's shape: copy + email CTA on
// the left, the Transmission 101 card on the right. Course cards follow.
// Everything links to each course's landing page, not the course itself — the full
// courses sit behind the email wall at /courses/library (unlisted; the link is
// delivered by the Kit welcome email).

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Free, self-paced courses that train yogic capacity through two distinct means: embodiment and transmission.',
}

export default function CoursesPage() {
  return (
    <div className="animate-fade-in">
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px]">
          {/* Hero — copy + email wall on the left, Transmission 101 tile on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,460px)] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge>Free Courses</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl text-text-primary uppercase tracking-wide leading-tight">
                Welcome to the CC Course Library
              </h1>
              <p className="font-body text-text-muted mt-4 text-xs uppercase tracking-[0.15em]">
                Self-Paced &middot; Free &middot; From Inside the CC Bootcamp
              </p>
              <p className="font-body text-text-secondary text-lg mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Inside the bootcamp, two trainings do the most to build yogic capacity: embodiment
                and transmission. One yokes the mind through the body. The other yokes the mind
                through its own view. These courses are designed to develop your capacity to practice.
              </p>

              {/* Email wall — signup delivers access to the full course library. */}
              <div id="access" className="mt-10 scroll-mt-32">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-accent">
                  Get the Full Course Library
                </p>
                <p className="font-body text-text-muted text-sm mt-3 mb-5 max-w-xl mx-auto lg:mx-0">
                  Join the CC newsletter and we&rsquo;ll email you access to the complete CC
                  course library.
                </p>
                <CourseLibraryOptIn heading="" subheading="" align="left" buttonOnNewRow={false} />
              </div>
            </div>

            {/* Transmission 101 — the featured course, at hero size */}
            <div className="max-w-md mx-auto lg:max-w-none w-full">
              <RailCard
                href="/transmission-101"
                thumbnail="/images/ppw-hero.jpg"
                thumbnailDim
                thumbnailTooltip={TAYLOR_SNAKE_TOOLTIP}
                label="Featured"
                title="Transmission 101"
                badge="Free"
                subtitle="Staying Present · Self-Paced"
                description="Five short lessons on why you keep leaving the present moment, and what finally lets you stay. An introduction to transmission-based practice with Taylor."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[52px]">
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-accent border-b border-border-subtle pb-3">
            Free Courses
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <RailCard
              href="/transmission-101"
              thumbnail="/images/ppw-hero.jpg"
              thumbnailDim
              thumbnailTooltip={TAYLOR_SNAKE_TOOLTIP}
              title="Transmission 101"
              badge="Free"
              subtitle="Staying Present · Self-Paced"
              description="Five short lessons on why you keep leaving the present moment, and what finally lets you stay. An introduction to transmission-based practice with Taylor."
            />
            <RailCard
              href="/embodiment"
              thumbnail="/images/embodiment-workshop.jpg"
              thumbnailTeaser="Coming Soon"
              label="Coming Soon"
              title="Embodiment 101"
              subtitle="Self-Paced"
              description="The fundamentals most practitioners are never shown: honest posture, how the breath actually works, how attention settles into stable absorption. The Embodiment Training workshops, as a self-paced course."
            />
          </div>
        </div>
      </section>
    </div>
  )
}
