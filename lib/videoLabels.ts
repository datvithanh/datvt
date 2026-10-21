import type { PackageVideo } from '@/lib/media'

// Filesystem-free by design: imported at runtime from client components
// (VideoList, VideoQueuePanel), unlike lib/media.ts which reads the disk.
//
// Display label for a video row: an explicit `sub` wins; otherwise clips
// reference their source room (more useful to a viewer than the facilitator's
// name), discussion room sources name their facilitator, lessons/transmissions
// fall back to their lesson title. `subPrefix` (stamped by getLibraryVideos)
// scopes the label to its package on the site-wide /videos index.
export function getVideoSubLabel(v: PackageVideo): string {
  const base = baseSubLabel(v)
  return v.subPrefix ? `${v.subPrefix}: ${base}` : base
}

function baseSubLabel(v: PackageVideo): string {
  if (v.sub) return v.sub
  if (v.clipOf) {
    const m = v.clipOf.match(/^discussion-(\d+)-room-(\d+)$/)
    if (m) return `From Discussion ${m[1]}, Room ${m[2]}`
  }
  if (v.ledBy) return `Led by ${v.ledBy}`
  return v.lessonTitle ?? (v.lesson != null ? `Lesson ${v.lesson}` : v.packageTitle.split(':')[0])
}
