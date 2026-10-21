'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Both conditions matter: production builds also run on local and deploy-preview origins.
export function ProductionAnalytics() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window.location.origin === 'https://mindtraining.cc') {
      setEnabled(true)
    }
  }, [])

  if (!enabled) return null
  return <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-9FMFZFSPFB" strategy="afterInteractive" />
    <Script id="gtag-init" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9FMFZFSPFB');
    `}</Script>
  </>
}
