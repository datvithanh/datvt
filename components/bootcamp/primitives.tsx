import type { ReactNode } from 'react'

// EXPIRED — this Zoom application survey now shows "Expired" (checked 2026-09-23).
// Cohort 11 priority registration is open through Dec 13, but nothing imports this until
// a fresh application link replaces it; /bootcamp CTAs point at the footer newsletter form.
export const APPLICATION_URL = 'https://s.zoom.us/m/bPFbnJCHq'

export const Badge = ({ children }: { children: ReactNode }) => (
  <span className="inline-block px-3 py-1 text-xs font-heading uppercase tracking-[0.2em] text-accent border border-accent/30 rounded-sm mb-6">
    {children}
  </span>
)

export const AccentLine = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
  </div>
)
