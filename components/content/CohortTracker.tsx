'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  COHORT_LABEL,
  COHORT_START_DISPLAY,
  COHORT_NEXT_LABEL,
  COHORT_NEXT_START_DISPLAY,
  COHORT_WEEKS,
  DAYS_PER_WEEK,
  getCohortProgress,
  type CohortProgress,
} from '@/lib/cohort'

// All-dim initial state: matches server render, so no hydration mismatch.
const FALLBACK: CohortProgress = {
  phase: 'before',
  currentWeek: 0,
  currentDay: 0,
  elapsedTrainingDays: 0,
  weeks: Array.from({ length: COHORT_WEEKS }, (_, i) => ({
    week: i + 1,
    filled: 0,
    state: 'future' as const,
  })),
}

export function CohortTracker() {
  // Compute on the client so the bar is correct every load, not just on deploy.
  // Render dim bars first (FALLBACK), then fill in after mount.
  const [progress, setProgress] = useState<CohortProgress>(FALLBACK)

  useEffect(() => {
    setProgress(getCohortProgress(new Date()))
  }, [])

  // getCohortProgress always returns a fresh object, so identity != FALLBACK means mounted.
  const mounted = progress !== FALLBACK

  const status = !mounted
    ? null
    : progress.phase === 'before'
      ? `Begins ${COHORT_START_DISPLAY}`
      : progress.phase === 'complete'
        ? 'Cohort complete'
        : `Week ${progress.currentWeek} / ${COHORT_WEEKS} · Day ${progress.currentDay}`

  const badgeText =
    mounted && progress.phase === 'active' ? `${COHORT_LABEL} · In Progress` : COHORT_LABEL

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="border border-border/40 rounded-sm bg-bg-secondary/20 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-heading uppercase tracking-[0.2em] text-accent border border-accent/30 rounded-sm">
              {badgeText}
            </span>
            <h2 className="font-heading text-lg sm:text-xl text-text-primary uppercase tracking-wide mt-4">
              The Work, In Motion
            </h2>
          </div>
          <div className="text-right">
            <div className="font-heading text-sm uppercase tracking-[0.15em] text-accent">
              {status}
            </div>
            <div className="font-body text-text-muted text-xs mt-1">
              each bar = days trained that week, of {DAYS_PER_WEEK}
            </div>
          </div>
        </div>

        {/* Bars (purely visual; status text above carries the same info for a11y) */}
        <div className="mt-8 flex items-end gap-1.5 sm:gap-2 h-28 sm:h-32" aria-hidden="true">
          {progress.weeks.map(w => {
            const pct = (w.filled / DAYS_PER_WEEK) * 100
            const fillClass =
              w.state === 'current'
                ? 'bg-accent shadow-[0_0_16px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]'
                : w.state === 'past'
                  ? 'bg-accent/60'
                  : 'bg-transparent'
            return (
              <div
                key={w.week}
                className="flex-1 h-full bg-border/10 rounded-sm relative overflow-hidden"
              >
                <div
                  className={`absolute inset-x-0 bottom-0 rounded-sm transition-[height] duration-700 ease-out ${fillClass}`}
                  style={{ height: mounted ? `${pct}%` : '0%' }}
                />
              </div>
            )
          })}
        </div>

        {/* X-axis week numbers */}
        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {progress.weeks.map(w => (
            <div
              key={w.week}
              className={`flex-1 text-center font-heading text-[0.55rem] sm:text-[0.6rem] tracking-wider ${
                w.state === 'current' ? 'text-accent' : 'text-text-muted'
              }`}
            >
              {w.week}
            </div>
          ))}
        </div>

        {/* Legend + CTA */}
        <div className="mt-6 pt-5 border-t border-border/30 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 font-heading text-[0.6rem] uppercase tracking-wider text-text-muted">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent/60" />Past</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent" />Current</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-border/10 border border-border/60" />Upcoming</span>
          </div>
          <Link
            href="/bootcamp"
            className="font-heading text-xs uppercase tracking-[0.15em] text-accent border border-accent/30 rounded-sm px-4 py-2 hover:bg-accent-muted transition-colors"
          >
            {COHORT_NEXT_LABEL} begins {COHORT_NEXT_START_DISPLAY} →
          </Link>
        </div>
      </div>
    </section>
  )
}
