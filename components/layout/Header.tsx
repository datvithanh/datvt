'use client'

import Link from 'next/link'
import { useState } from 'react'
import { COHORT_NEXT_START_DISPLAY, COHORT_NEXT_YEAR, MINI_BOOTCAMP_NEXT_DISPLAY } from '@/lib/cohort'

// Basecamp joins this list when it is announced. Dates come from lib/cohort so the menu rolls with each cohort.
const programs = [
  { href: '/bootcamp', label: 'Illumination Bootcamp', meta: `12 weeks · starts ${COHORT_NEXT_START_DISPLAY}, ${COHORT_NEXT_YEAR}` },
  { href: '/mini-bootcamp', label: 'Mini Bootcamp', meta: `Free · ${MINI_BOOTCAMP_NEXT_DISPLAY}` },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header wrap">
      <Link href="/" className="brand" aria-label="Contemplative CrossFit home" onClick={close}>
        <img className="brand-mark" src="/brand/cc-logo-guide.svg" width="66" height="68" alt="" />
        <span className="brand-name">CONTEMPLATIVE<br />CROSSFIT</span>
      </Link>
      <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>Menu <span aria-hidden="true">+</span></button>
      <nav id="navigation" className={open ? 'is-open' : ''} aria-label="Main navigation">
        <div className="nav-group">
          <Link className="nav-parent" href="/programs" onClick={close}>Programs<svg className="nav-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
          <div className="nav-submenu">{programs.map(item => <Link key={item.href} href={item.href} onClick={close}><span className="nav-item-name">{item.label}</span><span className="nav-item-meta">{item.meta}</span></Link>)}</div>
        </div>
        {['Resources','Media'].map(label => <Link key={label} href={`/${label.toLowerCase()}`} onClick={close}>{label}</Link>)}
      </nav>
    </header>
  </>
}
