'use client'

import { useEffect, useState } from 'react'

// Sticky section tabs for the Bootcamp page (Dat, Nov 12), following the Coaching page's bar: evenly spaced Plex
// labels that stay under the header while you scroll, the current section in clay with an underline, and the
// Apply jump on the right as an outlined button. Styles live in app/brand-v1.css (.program-tabs); the label font is
// the eyebrow role in app/type.css.
const SECTIONS = [
  { id: 'stories', label: 'Stories' },
  { id: 'details', label: 'Course details' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'tuition', label: 'Tuition' },
  { id: 'faq', label: 'FAQ' },
]

export function BootcampTabs() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = [...SECTIONS.map(s => s.id), 'application']
    const observer = new IntersectionObserver(
      entries => {
        // Of the sections crossing the band just under the header and this bar, the topmost wins.
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) {
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActive(top.target.id)
        }
      },
      { rootMargin: '-140px 0px -60% 0px', threshold: 0 },
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="program-tabs">
      <nav className="program-tabs-inner wrap" aria-label="Bootcamp sections">
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>{s.label}</a>
        ))}
        <a className="program-tabs-cta" href="#application" aria-current={active === 'application' ? 'true' : undefined}>Apply</a>
      </nav>
    </div>
  )
}
