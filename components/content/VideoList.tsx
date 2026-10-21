import Link from 'next/link'
import type { PackageVideo } from '@/lib/media'
import { getVideoSubLabel } from '@/lib/videoLabels'
import { VideoThumb } from '@/components/ui/VideoThumb'

// YouTube-style result rows. On mobile: thumbnail + title/meta share the top
// row, and the summary drops to its own full-width row below. On sm+: thumbnail
// on the left with title, meta, and summary stacked in the right column.
// The package label is trimmed to the text before ":" (e.g. "Transmission 101"),
// dropping the course subtitle to keep the meta line short.
// No hooks — server-safe, also rendered from the client VideoBrowser.
export function VideoList({ videos }: { videos: PackageVideo[] }) {
  if (!videos.length) return null
  return (
    <div className="flex flex-col gap-6">
      {videos.map(v => (
        <Link
          key={`${v.packageId}/${v.id}`}
          href={`/courses/videos/${v.packageId}/${v.id}`}
          className="group grid grid-cols-[9rem_minmax(0,1fr)] gap-x-4 gap-y-3 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-x-5"
        >
          <div className="relative col-start-1 row-start-1 self-start w-full rounded-sm overflow-hidden border border-border/40 sm:row-span-2">
            <VideoThumb
              youtubeId={v.youtubeId}
              alt={v.title}
              quality="hq"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <svg className="w-10 h-10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="col-start-2 row-start-1 min-w-0 self-center sm:self-start">
            <h3 className="font-heading text-sm sm:text-base uppercase tracking-wide text-text-primary leading-snug group-hover:text-accent transition-colors">
              {v.title}
            </h3>
            <p className="font-heading text-[11px] uppercase tracking-wider text-text-muted mt-1.5">
              {getVideoSubLabel(v)}
            </p>
          </div>
          <p className="col-span-2 row-start-2 min-w-0 font-body text-text-muted text-sm leading-relaxed line-clamp-4 sm:col-start-2 sm:col-span-1 sm:line-clamp-3">
            {v.summary}
          </p>
        </Link>
      ))}
    </div>
  )
}
