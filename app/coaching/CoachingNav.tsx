'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Floating in-page nav for the coaching landing page, modeled on EmbodimentNav.
// Placed after the hero so it only sticks once scrolled to. Smooth-scroll comes
// from `scroll-behavior: smooth` in globals.css; the offset under the sticky
// header comes from `scroll-mt-*` on each target.
const SECTIONS = [
  { id: 'call', label: 'The Call' },
  { id: 'team', label: 'Team' },
  { id: 'bootcamp', label: 'What Next' },
  { id: 'testimonials', label: 'Stories' },
]

export function CoachingNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Of the sections crossing the trigger band just below the bar, the topmost wins.
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          )
          setActive(topmost.target.id)
        }
      },
      // Shrink the viewport so a section is "active" only while its top sits in the
      // band just under the header+nav (~120px) and the upper third of the screen.
      { rootMargin: '-120px 0px -68% 0px', threshold: 0 },
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sticky top-16 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle">
      <nav
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-8 overflow-x-auto overflow-y-hidden no-scrollbar"
        aria-label="Coaching sections"
      >
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? 'true' : undefined}
            className={cn(
              'py-4 font-heading text-[0.65rem] sm:text-sm uppercase tracking-[0.05em] sm:tracking-[0.15em] border-b-2 -mb-px transition-colors whitespace-nowrap',
              active === s.id
                ? 'text-accent border-accent'
                : 'text-text-muted border-transparent hover:text-text-primary',
            )}
          >
            {s.label}
          </a>
        ))}
        {/* The season is between runs — scroll back up to the hero email capture. */}
        <a
          href="#newsletter"
          className="btn-primary px-3 sm:px-5 py-1.5 text-[0.65rem]! sm:text-xs! whitespace-nowrap shrink-0"
        >
          Get Notified
        </a>
      </nav>
    </div>
  )
}
