'use client'

import { useState } from 'react'
import { VideoThumb } from '@/components/ui/VideoThumb'
import type { PlaylistVideo } from './WorkshopPlaylist'

// Every video on the page at once, as full-width rows: a small click-to-play
// video on the left, title/byline/description on the right. The wide-layout
// alternative to WorkshopPlaylist's single player + queue. Mobile stacks the
// video above its text.
export function PlaylistRows({ videos }: { videos: PlaylistVideo[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {videos.map(v => (
        <div
          key={v.youtubeId}
          className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 sm:gap-8 items-start"
        >
          {playingId === v.youtubeId ? (
            <div className="relative aspect-video rounded-sm overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0${v.start ? `&start=${v.start}` : ''}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <button
              onClick={() => setPlayingId(v.youtubeId)}
              className="relative aspect-video w-full group cursor-pointer overflow-hidden rounded-sm"
              aria-label={`Play video: ${v.title}`}
            >
              <VideoThumb
                youtubeId={v.youtubeId}
                alt={v.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-accent/90 group-hover:bg-accent flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                  <svg className="w-5 h-5 text-bg-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
          <div>
            <h3 className="font-heading text-lg sm:text-xl text-text-primary uppercase tracking-wide">
              {v.title}
            </h3>
            <p className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mt-1.5">{v.sub}</p>
            {v.description && (
              <p className="font-body text-sm text-text-secondary leading-relaxed mt-4">{v.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
