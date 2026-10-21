'use client'

import { useEffect, useState } from 'react'

// Standard YouTube thumbnail with graceful degradation — the site-wide way to
// render video thumbs. YouTube serves no maxresdefault.jpg for many uploads
// (404 → broken gray frame), so the chain steps maxres → hqdefault → CC emblem
// on a muted panel with a gray overlay.
export function VideoThumb({
  youtubeId,
  alt,
  className = '',
  quality = 'maxres',
}: {
  youtubeId: string
  alt: string
  className?: string // sizing/positioning classes; applied to the <img> and to the fallback panel
  quality?: 'maxres' | 'hq' // starting rung of the fallback chain
}) {
  const sources =
    quality === 'maxres'
      ? [
          `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
          `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        ]
      : [`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`]
  const [step, setStep] = useState(0)

  // A new video restarts the chain (e.g. rotating playlists reuse one mount).
  useEffect(() => setStep(0), [youtubeId])

  if (step >= sources.length) {
    return (
      <div className={`bg-bg-secondary ${className}`} role="img" aria-label={alt}>
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/images/cc-emblem.png"
            alt=""
            className="w-1/5 min-w-12 max-w-20 opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
    )
  }

  return (
    <img
      src={sources[step]}
      alt={alt}
      className={className}
      // YouTube serves missing thumbs as a tiny 120x90 gray placeholder that
      // loads "successfully" — onError alone never fires. Treat it as a miss.
      onLoad={e => {
        if (e.currentTarget.naturalWidth < 200) setStep(s => s + 1)
      }}
      onError={() => setStep(s => s + 1)}
    />
  )
}
