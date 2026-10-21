'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type LessonNavSection = { id: string; label: string }

// Floating in-page nav for lesson pages, modeled on BootcampNav. Each item
// scrolls to the start of its section (smooth-scroll comes from
// `scroll-behavior: smooth` in globals.css; the offset under the sticky header
// comes from `scroll-mt-*` on each target section). Scroll-spy highlights
// whichever section is currently under the bar.
export function LessonNav({
  sections,
  widthClass = 'max-w-3xl',
}: {
  sections: LessonNavSection[]
  widthClass?: string
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')

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
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="sticky top-16 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle">
      <nav
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8 flex justify-between gap-2 sm:gap-8 overflow-x-auto overflow-y-hidden no-scrollbar',
          widthClass,
        )}
        aria-label="Lesson sections"
      >
        {sections.map(s => (
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
      </nav>
    </div>
  )
}
