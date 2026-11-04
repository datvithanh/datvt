'use client'

import { useState, type ReactNode } from 'react'

// Click-to-play YouTube: the poster (children) sits in a button; clicking swaps it for the embed in the same box,
// so videos play on the page instead of opening YouTube. youtube-nocookie keeps tracking off until play.
export function InlineVideo({ videoId, title, className, ratio = '16 / 9', children }: { videoId: string; title: string; className?: string; ratio?: string; children: ReactNode }) {
  const [playing, setPlaying] = useState(false)
  if (playing) return <div className={`inline-video is-playing ${className ?? ''}`} style={{ position: 'relative', aspectRatio: ratio }}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
    />
  </div>
  return <button type="button" className={`inline-video ${className ?? ''}`} onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>{children}</button>
}
