'use client'

import Link from 'next/link'
import { useState } from 'react'

// Basecamp joins this list when it is announced.
const programs = [{ href: '/bootcamp', label: 'Illumination Bootcamp' }, { href: '/mini-bootcamp', label: 'Mini Bootcamp' }]

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
          <Link href="/programs" onClick={close}>Programs</Link>
          <div className="nav-submenu">{programs.map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>)}</div>
        </div>
        {['Resources','Media'].map(label => <Link key={label} href={`/${label.toLowerCase()}`} onClick={close}>{label}</Link>)}
      </nav>
    </header>
  </>
}
