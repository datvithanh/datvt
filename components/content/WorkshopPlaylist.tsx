'use client'

import { useEffect, useState } from 'react'
import { VideoThumb } from '@/components/ui/VideoThumb'

// Standalone player + horizontal "Watch Next" strip for marketing pages
// (e.g. /embodiment). Fits a single text column: player on top, queue cards
// in a horizontally scrollable row underneath. Clicking a card swaps the
// video in place instead of routing into /courses/videos/**.
export type PlaylistVideo = {
  youtubeId: string
  title: string
  sub: string // byline under the title, e.g. "Frank Yang"
  description?: string // shown under the title in the main column
  start?: number // optional start offset in seconds
  duration?: number // optional, shown as a badge when present
}

function formatDuration(seconds?: number) {
  if (!seconds) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

export function WorkshopPlaylist({
  videos,
  queueTitle,
  autoRotateMs,
  queueLayout = 'row',
}: {
  videos: PlaylistVideo[]
  queueTitle: string
  autoRotateMs?: number // cycle the featured video while idle; stops on first interaction
  queueLayout?: 'row' | 'grid' // 'row' = horizontal scroll strip; 'grid' = wrapped grid showing every entry
}) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const current = videos[index]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!autoRotateMs || interacted || playing || paused || reducedMotion || videos.length < 2) return
    const id = setInterval(() => setIndex(i => (i + 1) % videos.length), autoRotateMs)
    return () => clearInterval(id)
  }, [autoRotateMs, interacted, playing, paused, reducedMotion, videos.length])

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Player */}
      {playing ? (
        <div className="relative aspect-video">
          <iframe
            key={current.youtubeId}
            src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0${current.start ? `&start=${current.start}` : ''}`}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      ) : (
        <button
          onClick={() => {
            setInteracted(true)
            setPlaying(true)
          }}
          className="relative aspect-video w-full group cursor-pointer overflow-hidden"
          aria-label={`Play video: ${current.title}`}
        >
          <VideoThumb
            youtubeId={current.youtubeId}
            alt={current.title}
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
      )}

      {/* Title + description */}
      <h3 className="font-heading text-xl sm:text-2xl text-text-primary mt-5 uppercase tracking-wide">
        {current.title}
      </h3>
      <p className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mt-2">{current.sub}</p>
      {current.description && (
        <p className="font-body text-text-secondary leading-relaxed mt-5">{current.description}</p>
      )}

      {/* Queue — scroll strip or wrapped grid */}
      {videos.length > 1 && (
        <div className="mt-10">
          <div className="flex items-baseline justify-between pb-3 mb-5 border-b border-border">
            <h3 className="font-heading text-sm uppercase tracking-[0.15em] text-text-primary">Watch Next</h3>
            <p className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted">{queueTitle}</p>
          </div>
          <div
            className={
              queueLayout === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 gap-4'
                : 'flex gap-4 overflow-x-auto pb-2'
            }
          >
            {videos.map((v, i) => {
              const isCurrent = i === index
              const duration = formatDuration(v.duration)
              return (
                <button
                  key={v.youtubeId}
                  onClick={() => {
                    setInteracted(true)
                    setIndex(i)
                    setPlaying(true)
                  }}
                  aria-current={isCurrent || undefined}
                  className={`${queueLayout === 'grid' ? 'w-full' : 'w-52 shrink-0'} text-left rounded-sm border transition-colors group ${
                    isCurrent
                      ? 'border-accent/40 bg-accent-muted'
                      : 'border-border-subtle hover:border-accent/30 hover:bg-bg-secondary'
                  }`}
                >
                  <div className="relative rounded-t-sm overflow-hidden">
                    <VideoThumb
                      youtubeId={v.youtubeId}
                      alt={v.title}
                      quality="hq"
                      className="w-full aspect-video object-cover"
                    />
                    {isCurrent && <div className="absolute inset-0 bg-accent/20" />}
                    {duration && (
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1 rounded-sm leading-tight">
                        {duration}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p
                      className={`font-heading text-xs tracking-wide leading-snug line-clamp-2 ${
                        isCurrent ? 'text-accent' : 'text-text-primary group-hover:text-accent transition-colors'
                      }`}
                    >
                      {isCurrent ? '▶ ' : ''}
                      {v.title}
                    </p>
                    <p className="font-heading text-[10px] tracking-wider text-text-muted mt-1.5">{v.sub}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
