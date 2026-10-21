import Link from 'next/link'
import type { FeedItem } from '@/lib/content'
import { RailCard } from './RailCard'
import { SectionCard } from './SectionCard'
import { TAYLOR_SNAKE_TOOLTIP } from '@/lib/easterEggs'
import { MINI_BOOTCAMP_NEXT_DISPLAY, COHORT_NEXT_START_DISPLAY, COHORT_NEXT_END_DISPLAY } from '@/lib/cohort'

// The /home2 right rail: Programs (every live program with its next date),
// Courses (self-paced), then the latest Dissertation (or a quiet "Coming soon"
// placeholder so the rail keeps its rhythm).
export function CuratedRail({ dissertation }: { dissertation: FeedItem | null }) {
  return (
    <aside className="flex flex-col gap-6">
      <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-accent border-b border-border-subtle pb-3">
        <Link href="/programs" className="hover:text-text-primary transition-colors">Programs</Link>
      </h2>
      {/* The coaching call now runs as "Coaching Season" in the Events section. */}
      <RailCard
        href="/bootcamp"
        thumbnail="/images/bootcamp-session-still.png"
        title="The 12-Week Bootcamp"
        subtitle={`Next: ${COHORT_NEXT_START_DISPLAY} – ${COHORT_NEXT_END_DISPLAY}`}
        description="12 weeks, 5 days a week, 3 sessions a day. Rigorous, supervised mind training with a community and mentors."
      />
      <RailCard
        href="/embodiment"
        thumbnail="/images/embodiment-workshop-ad.jpg"
        thumbnailPosition="center calc(50% - 50px)"
        title="Embodiment Training"
        badge="Free"
        subtitle="Next Workshop: TBD"
        description="You can sit for a decade and never be shown the fundamentals: honest posture, how the breath actually works, how attention syncs into stable absorption. That's what this workshop resolves."
      />
      <RailCard
        href="/mini-bootcamp"
        thumbnail="/images/mini-bootcamp-ad.jpg"
        thumbnailPosition="center 68%"
        title="Mini Bootcamp"
        badge="Free"
        subtitle={`Next: ${MINI_BOOTCAMP_NEXT_DISPLAY}`}
        description="The open, no-cost way in. A week of live transmission and practice that surfaces the bypassing patterns most practice hides."
      />

      <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-accent border-b border-border-subtle pb-3 mt-4">
        <Link href="/courses" className="hover:text-text-primary transition-colors">Courses</Link>
      </h2>
      <RailCard
        href="/transmission-101"
        thumbnail="/images/ppw-hero.jpg"
        thumbnailTooltip={TAYLOR_SNAKE_TOOLTIP}
        label="New"
        title="Transmission 101"
        badge="Free"
        subtitle="Staying Present · Self-Paced"
        description="Five short lessons on why you keep leaving the present moment, and what finally lets you stay. An introduction to transmission-based practice with Taylor."
      />

      <div>
        <span className="font-heading text-[0.6rem] uppercase tracking-[0.18em] text-accent block mb-3">
          Dissertations
        </span>
        {dissertation ? (
          <SectionCard
            article={dissertation.article}
            byline={dissertation.byline}
            size="feature"
          />
        ) : (
          <div className="border border-dashed border-border/60 rounded-sm bg-bg-secondary/10 p-6 text-center">
            <p className="font-body text-text-muted text-sm leading-relaxed">
              Long-form dissertations are coming soon.
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
