import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  devIndicators: false,
  // SSR mode (no static export) — required for auth API routes
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    // Netlify serves Next responses through its runtime; apply staging SEO here too.
    return process.env.CC_ASSET_ORIGIN ? [{
      source: '/:path*',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
    }] : []
  },
  async redirects() {
    return [
      { source: '/field-guide/journal/:path*', destination: '/articles/:path*', permanent: true },
      { source: '/field-guide/conversation', destination: '/media', permanent: true },
      { source: '/field-guide/:path*', destination: '/:path*', permanent: true },
      { source: '/journal/:path*', destination: '/articles/:path*', permanent: true },
      { source: '/conversation', destination: '/media', permanent: true },
      { source: '/courses', destination: '/resources', permanent: true },
      {
        source: '/pricing',
        destination: '/bootcamp?tab=pricing',
        permanent: true,
      },
      {
        source: '/clips/:path*',
        destination: '/courses/videos/:path*',
        permanent: true,
      },
      // Public Practice Week was renamed Mini Bootcamp (Aug 2026).
      {
        source: '/ppw',
        destination: '/mini-bootcamp',
        permanent: true,
      },
      // The PPW April 2026 package page was superseded by Transmission 101.
      {
        source: '/ppw-package-april-2026',
        destination: '/courses/transmission-101-staying-present',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
