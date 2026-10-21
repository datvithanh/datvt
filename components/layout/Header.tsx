'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header wrap">
      <Link href="/" className="brand" aria-label="Contemplative CrossFit home" onClick={() => setOpen(false)}>
        <img className="brand-mark" src="/brand/cc-logo-guide.svg" width="66" height="68" alt="" />
        <span className="brand-name">CONTEMPLATIVE<br />CROSSFIT</span>
      </Link>
      <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>Menu <span aria-hidden="true">+</span></button>
      <nav id="navigation" className={open ? 'is-open' : ''} aria-label="Main navigation">
        {['Programs','Resources','Media'].map(label => <Link key={label} href={`/${label.toLowerCase()}`} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </header>
  </>
}
