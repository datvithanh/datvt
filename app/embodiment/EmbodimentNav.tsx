'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Floating in-page nav for the embodiment workshop landing page, modeled on
// BootcampNav. Placed after the hero so it only sticks once scrolled to.
// Smooth-scroll comes from `scroll-behavior: smooth` in globals.css; the
// offset under the sticky header comes from `scroll-mt-*` on each target.
const SECTIONS = [
  { id: 'videos', label: 'Videos' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'pedagogy', label: 'Pedagogy' },
  { id: 'faq', label: 'FAQ' },
]

export function EmbodimentNav() {
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
        aria-label="Workshop sections"
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
        {/* Register button suppressed while no workshop is scheduled — restore
            the EMBODIMENT_SIGNUP_URL link here when Workshop III opens. */}
      </nav>
    </div>
  )
}
