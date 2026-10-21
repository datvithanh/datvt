// Live-cohort progress for the homepage daily tracker.
// Pure logic — no fs, no React — safe to import anywhere and to verify in isolation.

// ─── Edit per cohort ────────────────────────────────────────────────
// This block drives only the homepage tracker. The bootcamp/cohort pages
// (app/bootcamp, app/cohort, components/bootcamp/*) carry their own cohort
// strings — update those too when rolling to the next cohort.
export const COHORT_LABEL = 'Cohort 10'
export const COHORT_START = '2026-09-21' // Monday of week 1 (local time)
export const COHORT_START_DISPLAY = 'September 21' // human-facing start, used for the pre-start label
export const COHORT_NEXT_LABEL = 'Cohort 11' // the next cohort, for the CTA
export const COHORT_NEXT_START_DISPLAY = 'January 25' // next cohort start, for the CTA
export const COHORT_NEXT_END_DISPLAY = 'April 17' // next cohort last day (Saturday of week 12, same shape as Cohorts 9 and 10 — confirm with Khan)
export const COHORT_NEXT_YEAR = '2027' // year of the next cohort, for full date ranges
export const COHORT_NEXT_APP_DUE_DISPLAY = '' // next cohort general application deadline; not set yet — blank hides it on the status band and /programs
export const COHORT_PRIORITY_REG_DUE_DISPLAY = 'December 13' // Cohort 11 priority registration deadline (2026) — blank hides it when the window closes
export const MINI_BOOTCAMP_LABEL = 'Mini Bootcamp' // the next Mini Bootcamp (formerly Public Practice Week)
export const MINI_BOOTCAMP_DATES_DISPLAY = 'Dec 14–18'       // next run's dates (2026); shown on /mini-bootcamp title, meta, and week header
export const MINI_BOOTCAMP_NEXT_DISPLAY = 'December 14–18' // next run, for the homepage rail, programs list, FAQ, and /embodiment
export const MINI_BOOTCAMP_REGISTRATION_URL = 'https://us06web.zoom.us/meeting/register/29leBgRVTiOnMlKZ9IezlQ#/registration' // Mini Bootcamp Zoom registration; update per run
export const EMBODIMENT_LABEL = 'Free Embodiment Training' // one-off workshop shown in the status band; blank the date to hide
export const EMBODIMENT_DATE_DISPLAY = ''          // Workshop II (Aug 1, 2026) completed — blank hides the status-band entry
export const COACHING_SEASON_LABEL = 'Coaching Season' // shown in the status band; blank the dates to hide
export const COACHING_SEASON_DATES_DISPLAY = 'Nov 23 – Dec 13' // next season (2026), for the status band and /coaching; blank hides the status-band entry
export const COHORT_WEEKS = 12
export const DAYS_PER_WEEK = 5 // Mon–Fri training days. Structural — the week math assumes a 7-day calendar week; don't change without revising getCohortProgress.
// ────────────────────────────────────────────────────────────────────

export type WeekState = 'past' | 'current' | 'future'

export type CohortWeek = {
  week: number // 1-based
  filled: number // 0..DAYS_PER_WEEK
  state: WeekState
}

export type CohortPhase = 'before' | 'active' | 'complete'

export type CohortProgress = {
  phase: CohortPhase
  currentWeek: number // 1..COHORT_WEEKS (0 before start)
  currentDay: number // 1..DAYS_PER_WEEK (0 before start)
  elapsedTrainingDays: number // 0..COHORT_WEEKS*DAYS_PER_WEEK
  weeks: CohortWeek[]
}

const DAY_MS = 24 * 60 * 60 * 1000

// Parse 'YYYY-MM-DD' as local midnight (avoids UTC offset surprises).
function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function getCohortProgress(now: Date): CohortProgress {
  const startMidnight = parseLocalDate(COHORT_START)
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.floor((nowMidnight.getTime() - startMidnight.getTime()) / DAY_MS)

  const makeWeeks = (fill: (week0: number) => CohortWeek) =>
    Array.from({ length: COHORT_WEEKS }, (_, i) => fill(i))

  // Before the cohort begins.
  if (diffDays < 0) {
    return {
      phase: 'before',
      currentWeek: 0,
      currentDay: 0,
      elapsedTrainingDays: 0,
      weeks: makeWeeks(i => ({ week: i + 1, filled: 0, state: 'future' })),
    }
  }

  const weekIndex = Math.floor(diffDays / 7) // 0-based

  // After the cohort completes.
  if (weekIndex >= COHORT_WEEKS) {
    return {
      phase: 'complete',
      currentWeek: COHORT_WEEKS,
      currentDay: DAYS_PER_WEEK,
      elapsedTrainingDays: COHORT_WEEKS * DAYS_PER_WEEK,
      weeks: makeWeeks(i => ({ week: i + 1, filled: DAYS_PER_WEEK, state: 'past' })),
    }
  }

  // Active. dayInWeek: 0=Mon … 6=Sun. Weekends pin the current bar at DAYS_PER_WEEK.
  const dayInWeek = diffDays % 7
  const currentFilled = Math.min(dayInWeek + 1, DAYS_PER_WEEK)

  const weeks = makeWeeks(i => {
    if (i < weekIndex) return { week: i + 1, filled: DAYS_PER_WEEK, state: 'past' as const }
    if (i === weekIndex) return { week: i + 1, filled: currentFilled, state: 'current' as const }
    return { week: i + 1, filled: 0, state: 'future' as const }
  })

  return {
    phase: 'active',
    currentWeek: weekIndex + 1,
    currentDay: currentFilled,
    elapsedTrainingDays: weekIndex * DAYS_PER_WEEK + currentFilled,
    weeks,
  }
}
