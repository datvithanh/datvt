'use client'

import { usePathname } from 'next/navigation'
import { KitEmailForm } from '@/components/ui/KitEmailForm'

// Pages with their own email capture — suppress the footer newsletter there
// so visitors don't get asked twice on one page.
const SUPPRESSED_ROUTES: string[] = []

export function FooterNewsletter() {
  const pathname = usePathname()
  if (SUPPRESSED_ROUTES.includes(pathname)) return null
  return (
    // id lets page CTAs ("Get notified ↓") jump to this form.
    <section id="footer-newsletter" className="scroll-mt-24 border-t border-border-subtle bg-bg-secondary/20">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <KitEmailForm />
      </div>
    </section>
  )
}
