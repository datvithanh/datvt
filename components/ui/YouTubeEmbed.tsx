'use client'

import { useState } from 'react'
import { VideoThumb } from '@/components/ui/VideoThumb'

export function YouTubeEmbed({ videoId, title, start, variant }: { videoId: string; title: string; start?: number; variant?: 'field-guide' }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative aspect-video">
        <iframe
          src={`https://www.${variant === 'field-guide' ? 'youtube-nocookie' : 'youtube'}.com/embed/${videoId}?autoplay=1&rel=0${variant === 'field-guide' ? '&playsinline=1' : ''}${start ? `&start=${start}` : ''}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  if (variant === 'field-guide') return <button onClick={() => setPlaying(true)} className="video-poster" type="button" aria-label={`Play ${title}`}>
    <img className="video-thumbnail" src={`/brand/video/${videoId}.jpg`} width="1280" height="720" alt="" loading="lazy" />
    <span className="video-play" aria-hidden="true">▶</span>
  </button>

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative aspect-video w-full group cursor-pointer overflow-hidden"
      aria-label={`Play video: ${title}`}
    >
      <VideoThumb
        youtubeId={videoId}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-accent/90 group-hover:bg-accent flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
          <svg className="w-6 h-6 text-bg-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
