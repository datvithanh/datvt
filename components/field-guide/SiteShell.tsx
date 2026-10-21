'use client'

import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const legalRoutes = new Set(['/terms', '/privacy', '/refund-policy'])
const publicRoutes = new Set([...legalRoutes, '/', '/programs', '/bootcamp', '/mini-bootcamp', '/resources', '/transmission-101', '/media', '/articles'])

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname().replace(/\/$/, '') || '/'
  const fieldGuide = publicRoutes.has(pathname) || pathname.startsWith('/articles/')
  useEffect(() => {
    // Keep the existing /pricing → /bootcamp?tab=pricing entry point useful.
    if (pathname === '/bootcamp' && new URLSearchParams(window.location.search).get('tab') === 'pricing' && !window.location.hash) {
      const frame = requestAnimationFrame(() => document.getElementById('pricing')?.scrollIntoView())
      return () => cancelAnimationFrame(frame)
    }
  }, [pathname])
  if (!fieldGuide) return <>
    <div className="field-guide fg-legacy-chrome"><Header /></div>
    <main id="main" className="flex-1 fg-legacy-body">{children}</main>
    <div className="field-guide fg-legacy-chrome"><Footer legacyTheme /></div>
  </>
  const pageClass = legalRoutes.has(pathname) ? 'legal-page' : pathname === '/' ? 'updated-page home-page' : ['/programs','/bootcamp','/mini-bootcamp'].includes(pathname) ? 'updated-page program-page' : 'resource-page'
  return <div className={`field-guide ${pageClass}`}><Header /><main id="main">{children}</main><Footer course={pathname === '/transmission-101'} /></div>
}
