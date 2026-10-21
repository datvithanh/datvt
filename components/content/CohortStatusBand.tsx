import Link from 'next/link'
import {
  EMBODIMENT_LABEL,
  EMBODIMENT_DATE_DISPLAY,
  COHORT_NEXT_LABEL,
  COHORT_NEXT_START_DISPLAY,
  COHORT_NEXT_APP_DUE_DISPLAY,
  COHORT_PRIORITY_REG_DUE_DISPLAY,
} from '@/lib/cohort'

// Full-width status strip atop /home2: what's live and upcoming right now.
// All strings are constants in lib/cohort.ts (the per-cohort edit hub).
// The cohort application deadline leads; drop an item by clearing its
// date constant. The Mini Bootcamp entry returns via the next run's dates.
// Coaching Season is deliberately not listed here — it lives on /coaching and in the FAQ.
export function CohortStatusBand() {
  const items = [
    COHORT_NEXT_APP_DUE_DISPLAY
      ? { text: `${COHORT_NEXT_LABEL} Application Deadline · ${COHORT_NEXT_APP_DUE_DISPLAY}`, href: '/bootcamp' }
      : null,
    COHORT_PRIORITY_REG_DUE_DISPLAY
      ? { text: `${COHORT_NEXT_LABEL} Priority Registration · Through ${COHORT_PRIORITY_REG_DUE_DISPLAY}`, href: '/bootcamp' }
      : null,
    { text: `${COHORT_NEXT_LABEL} Begins · ${COHORT_NEXT_START_DISPLAY}`, href: '/bootcamp' },
    EMBODIMENT_DATE_DISPLAY
      ? { text: `${EMBODIMENT_LABEL} · ${EMBODIMENT_DATE_DISPLAY}`, href: '/embodiment' }
      : null,
  ].filter(Boolean) as { text: string; href: string }[]

  return (
    <section className="border-b border-border-subtle bg-bg-secondary/30">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[120px] py-3 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-0.5 sm:gap-x-6 sm:gap-y-1 text-center">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-x-6">
            {i > 0 && (
              <span aria-hidden className="hidden sm:inline text-border select-none">|</span>
            )}
            <Link
              href={item.href}
              className="font-heading text-[0.65rem] uppercase tracking-[0.14em] text-text-muted hover:text-accent transition-colors whitespace-nowrap"
            >
              {item.text}
            </Link>
          </span>
        ))}
      </div>
    </section>
  )
}
