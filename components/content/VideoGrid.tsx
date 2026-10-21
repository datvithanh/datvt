import Link from 'next/link'
import type { PackageVideo } from '@/lib/media'
import { VideoThumb } from '@/components/ui/VideoThumb'

// Grid of video cards linking to on-site watch pages.
// No hooks — usable from server components and from the client VideoBrowser.
export function VideoGrid({ videos }: { videos: PackageVideo[] }) {
  if (!videos.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {videos.map(v => (
        <Link key={`${v.packageId}/${v.id}`} href={`/courses/videos/${v.packageId}/${v.id}`} className="group block">
          <div className="relative rounded-sm overflow-hidden border border-border/40">
            <VideoThumb
              youtubeId={v.youtubeId}
              alt={v.title}
              quality="hq"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <svg className="w-14 h-14 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <h3 className="font-heading text-sm uppercase tracking-wide text-text-primary mt-3 leading-snug group-hover:text-accent transition-colors">
            {v.title}
          </h3>
          <p className="mt-2 font-body text-text-muted text-sm leading-relaxed line-clamp-3">{v.summary}</p>
        </Link>
      ))}
    </div>
  )
}
