import type { Metadata } from 'next'
import { ProductionAnalytics } from '@/components/ui/ProductionAnalytics'
import { SOCIAL_PREVIEW_IMAGE } from '@/lib/social-preview'
import { Providers } from './providers'
import { SiteShell } from '@/components/field-guide/SiteShell'
import './globals.css'
import './legacy-fonts.css'
import './field-guide.css'
import './field-guide-desktop.css'
import './field-guide-material.css'

const siteUrl = 'https://mindtraining.cc'
// Temporary-host asset URLs may differ; canonical and schema URLs remain CC's.
const assetOrigin = process.env.CC_ASSET_ORIGIN || siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(assetOrigin),
  icons: { icon: [{ url: '/brand/cc-logo-guide.svg', type: 'image/svg+xml' }] },
  title: {
    default: 'Contemplative CrossFit',
    // Keep the approved browser identity; H1, Open Graph and schema remain contextual.
    template: 'Contemplative CrossFit',
  },
  description: 'Rigorous mind training for serious practitioners. Free teachings, courses, and resources for those who\'ve exhausted the solo path.',
  keywords: ['meditation', 'mind training', 'contemplative practice', 'dharma', 'bootcamp', 'samadhi', 'purification', 'realization'],
  authors: [{ name: 'Contemplative CrossFit' }],
  openGraph: {
    type: 'website',
    siteName: 'Contemplative CrossFit',
    url: siteUrl,
    title: 'Contemplative CrossFit — Rigorous Mind Training',
    description: 'Rigorous mind training for serious practitioners. Free teachings, courses, and resources for those who\'ve exhausted the solo path.',
    images: [SOCIAL_PREVIEW_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [SOCIAL_PREVIEW_IMAGE.url],
    title: 'Contemplative CrossFit',
    description: 'Rigorous mind training for serious practitioners.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                      document.documentElement.setAttribute('data-theme', 'light');
                    } else {
                      document.documentElement.setAttribute('data-theme', 'dark');
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ProductionAnalytics />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  )
}
