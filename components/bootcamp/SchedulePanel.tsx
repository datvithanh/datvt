import { Badge } from '@/components/bootcamp/primitives'
import {
  COHORT_NEXT_LABEL,
  COHORT_NEXT_START_DISPLAY,
  COHORT_NEXT_END_DISPLAY,
  COHORT_NEXT_YEAR,
  COHORT_PRIORITY_REG_DUE_DISPLAY,
} from '@/lib/cohort'

export function SchedulePanel() {
  return (
    <section className="py-16 sm:py-20 bg-bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge>Schedule &amp; Structure</Badge>
        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
          {COHORT_NEXT_LABEL}
        </h2>
        <p className="font-body text-text-secondary mt-3">12 weeks. 25 seats. {COHORT_NEXT_START_DISPLAY} &ndash; {COHORT_NEXT_END_DISPLAY}, {COHORT_NEXT_YEAR}</p>

        {/* Daily Sessions */}
        <div className="mt-12">
          <h3 className="font-heading text-xs uppercase tracking-[0.15em] text-accent mb-4">Daily Sessions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Session 1', time: '7:00am – 9:30am EDT' },
              { label: 'Session 2', time: '3:00pm – 5:30pm EDT' },
              { label: 'Session 3', time: '10:00pm – 12:30am EDT' },
            ].map((s, i) => (
              <div key={i} className="p-5 border border-border/40 rounded-sm text-center hover:border-accent/20 transition-colors">
                <span className="font-heading text-xs uppercase tracking-wider text-accent">{s.label}</span>
                <p className="font-body text-text-primary text-sm mt-2">{s.time}</p>
                <p className="font-body text-text-muted text-xs mt-1">Monday &ndash; Friday</p>
              </div>
            ))}
          </div>
          <p className="font-body text-text-muted text-xs mt-6 leading-relaxed">
            Attend any daily session that fits your schedule &mdash; you&apos;re welcome to join more than one,
            but we only ask that you fully commit to one session per day.
          </p>
        </div>

        {/* Weekly Community Events */}
        <div className="mt-12">
          <h3 className="font-heading text-xs uppercase tracking-[0.15em] text-accent mb-4">Weekly Community Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Weekly Review', time: '10:00am EDT', day: 'Saturday' },
              { label: 'BFF Weekly Talkshow', time: '6:00pm EDT', day: 'Friday' },
              { label: 'Community Events', time: 'Various', day: 'Throughout the program' },
            ].map((s, i) => (
              <div key={i} className="p-5 border border-border/40 rounded-sm text-center hover:border-accent/20 transition-colors">
                <span className="font-heading text-xs uppercase tracking-wider text-accent">{s.label}</span>
                <p className="font-body text-text-primary text-sm mt-2">{s.time}</p>
                <p className="font-body text-text-muted text-xs mt-1">{s.day}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-text-muted text-xs mt-4 italic">
            Plus 24/7 community through our Discord channel.
          </p>
        </div>

        {/* Next Cohort */}
        <div className="mt-12">
          <h3 className="font-heading text-xs uppercase tracking-[0.15em] text-accent mb-4">Next Cohort</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-border/40 rounded-sm">
              <p className="font-heading text-sm uppercase tracking-wider text-text-primary">
                {COHORT_NEXT_LABEL}
              </p>
              <p className="font-heading text-base text-accent mt-2">{COHORT_NEXT_START_DISPLAY} &ndash; {COHORT_NEXT_END_DISPLAY}, {COHORT_NEXT_YEAR}</p>
              <p className="font-body text-text-secondary mt-4 leading-relaxed text-sm">
                90 minutes daily, Monday through Friday. Three Eastern session times &mdash; pick the one that fits.
                Recordings cover the rest.
              </p>
            </div>

            <div className="p-6 border border-border/40 rounded-sm">
              <p className="font-heading text-sm uppercase tracking-wider text-text-primary">
                Or defer to the following cohort
              </p>
              <p className="font-heading text-base text-accent mt-2">Date TBD</p>
              <p className="font-body text-text-secondary mt-4 leading-relaxed text-sm">
                Priority registration for {COHORT_NEXT_LABEL} closes {COHORT_PRIORITY_REG_DUE_DISPLAY}. If the following cohort is your timing,{' '}
                <a href="#footer-newsletter" className="text-accent hover:underline transition-colors">join the newsletter</a>{' '}
                and start with the{' '}
                <a href="/courses" className="text-accent hover:underline transition-colors">free courses</a>.
              </p>
            </div>
          </div>

          <p className="font-body text-text-muted text-sm mt-6 italic">
            Spots are limited. There&rsquo;s a reason we don&rsquo;t take hundreds of people in &mdash; we&rsquo;re
            keeping the sanctity of the space.
          </p>
        </div>
      </div>
    </section>
  )
}
