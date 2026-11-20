'use client'

import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { BrandTrackGrain } from '@/components/ui/BrandTrackGrain'
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
  // Every route now sits in the field-guide shell (brand v1, Nov 4). Pages built on the previous site's components
  // are marked legacy-page so app/brand-v1-legacy.css can map their old tokens and utility classes onto the kit.
  const legacyLayout = !fieldGuide || pathname.startsWith('/articles/topics/')
  const pageClass = legacyLayout ? `resource-page legacy-page${pathname.startsWith('/courses/') ? ' course-page' : ''}` : legalRoutes.has(pathname) ? 'legal-page' : pathname === '/' ? 'updated-page home-page' : ['/programs','/bootcamp','/mini-bootcamp'].includes(pathname) ? 'updated-page program-page' : 'resource-page'
  return <div className={`field-guide ${pageClass}`}><BrandTrackGrain /><Header /><main id="main">{children}</main><Footer course={pathname === '/transmission-101'} /></div>
}
