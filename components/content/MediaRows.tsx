import Link from 'next/link'
import { VideoList } from '@/components/content/VideoList'
import type { PackageVideo } from '@/lib/media'

// The standard video-rows module: playlist-style rows with a mandatory CTA into
// the videos. Course pages point browseHref at the package (/courses/videos/<package>);
// lesson pages point it at a playlist (/courses/videos/<package>/playlists/<playlist>).
export function MediaRows({
  videos,
  browseHref,
  browseLabel = 'Browse Videos',
}: {
  videos: PackageVideo[]
  browseHref: string
  browseLabel?: string
}) {
  if (!videos.length) return null
  return (
    <div>
      <VideoList videos={videos} />
      <div className="mt-10 text-center">
        <Link href={browseHref} className="btn-primary px-8 py-3 inline-block">
          &rarr; {browseLabel}
        </Link>
      </div>
    </div>
  )
}
