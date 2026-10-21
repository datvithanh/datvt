'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { PackageVideo } from '@/lib/media'
import { getVideoSubLabel } from '@/lib/videoLabels'
import { VideoThumb } from '@/components/ui/VideoThumb'

// YouTube-style video queue panel — used for both "Watch Next" (core lesson
// sources) and "Clips" (cut from the discussion rooms). Fixed-height
// scrollable list inside a rounded container (the container clips the
// native scrollbar to match its corners), numbered rows, duration badges,
// and the active row auto-scrolled to the top of the visible area on mount —
// list order is untouched. Optional `sections` render after the main list,
// inside the same scroll area, as collapsed lesson groups that expand inline.
function formatDuration(seconds?: number) {
  if (!seconds) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

export type QueueSection = {
  key: string
  label: string
  videos: PackageVideo[]
  defaultOpen?: boolean
}

function QueueRow({
  video,
  index,
  currentId,
  activeRef,
}: {
  video: PackageVideo
  index: number
  currentId: string
  activeRef?: React.RefObject<HTMLDivElement | null>
}) {
  const isCurrent = video.id === currentId
  const duration = formatDuration(video.duration)
  const row = (
    <div
      ref={isCurrent ? activeRef : undefined}
      className={`flex gap-2.5 items-start px-3 py-3 transition-colors ${
        isCurrent ? 'bg-accent-muted' : 'hover:bg-bg-secondary'
      }`}
    >
      <span
        className={`w-4 shrink-0 pt-1 font-heading text-[11px] text-center ${
          isCurrent ? 'text-accent' : 'text-text-muted'
        }`}
      >
        {isCurrent ? '▶' : index + 1}
      </span>
      <div className="relative w-24 shrink-0 rounded-sm overflow-hidden border border-border/40">
        <VideoThumb
          youtubeId={video.youtubeId}
          alt={video.title}
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
      <div className="min-w-0">
        <p
          className={`font-heading text-xs tracking-wide leading-snug line-clamp-2 ${
            isCurrent ? 'text-accent' : 'text-text-primary group-hover:text-accent transition-colors'
          }`}
        >
          {video.title}
        </p>
        <p className="font-heading text-[10px] tracking-wider text-text-muted mt-1">
          {getVideoSubLabel(video)}
        </p>
      </div>
    </div>
  )
  return isCurrent ? (
    <div aria-current="true">{row}</div>
  ) : (
    <Link href={`/courses/videos/${video.packageId}/${video.id}`} className="block group">
      {row}
    </Link>
  )
}

export function VideoQueuePanel({
  videos = [],
  currentId,
  maxHeightClass = 'max-h-[70vh]',
  sections,
}: {
  videos?: PackageVideo[]
  currentId: string
  maxHeightClass?: string
  sections?: QueueSection[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const active = activeRef.current
    if (!container || !active) return
    const containerRect = container.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    container.scrollTop += activeRect.top - containerRect.top
  }, [currentId])

  return (
    <div className="rounded-md border border-border-subtle overflow-hidden">
      <div ref={containerRef} className={`${maxHeightClass} overflow-y-auto divide-y divide-border-subtle`}>
        {videos.map((v, i) => (
          <QueueRow key={v.id} video={v} index={i} currentId={currentId} activeRef={activeRef} />
        ))}
        {sections?.map(section => (
          <details key={section.key} className="group/section" open={section.defaultOpen}>
            <summary className="flex items-center gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-3 py-3 font-heading text-xs uppercase tracking-[0.15em] text-text-muted hover:text-accent hover:bg-bg-secondary transition-colors">
              <span className="inline-block transition-transform duration-200 group-open/section:rotate-90">&#9656;</span>
              {section.label}
            </summary>
            <div className="divide-y divide-border-subtle border-t border-border-subtle">
              {section.videos.map((v, i) => (
                <QueueRow key={v.id} video={v} index={i} currentId={currentId} activeRef={activeRef} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
