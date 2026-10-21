import fs from 'fs'
import path from 'path'
import { getArticleBySlug } from '@/lib/content'

// ===== Media Library =====
// The site's video library — talks, workshops, full lessons, and clips.
// One JSON manifest per package under content/media/. A MediaPackage holds a
// flat list of videos; `kind` distinguishes their role. `topic` is package-level
// and drives the "Subjects" grouping on the library front. NOTE: the field/URL
// name is `topic`; the front-facing UI label is "Subjects".
// For COURSE packages the id must match the course slug (content/courses/<id>/)
// so course lesson pages can look up their videos by day.
//
// NOTE: this module reads the filesystem. Client components may import TYPES
// (`import type { ... }`) but never runtime values.

const mediaDir = path.join(process.cwd(), 'content', 'media')

// NOTE: the video library currently lives under /courses/videos/<package> — it's
// only reached through a course, so there is no top-level /videos index yet. The
// getTopics/getTopicPackages/getTopicVideos helpers below are the ready infra for
// when the library graduates into its own top-level product.

export type MediaRef =
  | { type: 'article'; slug: string }
  | { type: 'video'; packageId: string; id: string }

export interface MediaLesson {
  day: number
  title: string
}

export interface Video {
  id: string
  title: string
  summary: string
  youtubeId: string
  kind?: string            // 'lesson' | 'discussion' | 'clip' | … (absent = 'discussion')
  ledBy?: string           // facilitator name (discussion rooms)
  lesson?: number          // course-day pointer into MediaPackage.lessons
  clipOf?: string          // id of the source video this was cut from (absent = full source recording)
  priority?: boolean       // hand-picked "best of" clip — surfaces first in teasers, capped by pickPreview
  sub?: string             // explicit sub-label — overrides the derived one in getVideoSubLabel
  group?: string           // display group on the /videos index (library.json direct videos only)
  start?: number           // playback start offset in seconds
  tags?: string[]
  relatedMedia?: MediaRef[]
  duration?: number
}

// Reference from the master manifest (library.json) to another package.
// subPrefix labels the referenced videos on the /videos index ("T101: Led by …").
export interface PackageRef {
  id: string
  subPrefix?: string
}

export interface MediaPackage {
  id: string               // slug-format
  title: string
  topic: string            // Subject slug — the only source of topic
  tags?: string[]
  lessons?: MediaLesson[]  // day→title table (course packages only)
  packages?: PackageRef[]  // master manifest only — refs to every other manifest
  relatedMedia?: MediaRef[]
  videos: Video[]
}

// A video hydrated with its package location + resolved lesson title.
export type PackageVideo = Video & {
  packageId: string
  packageTitle: string
  topic: string
  lessonTitle?: string
  subPrefix?: string       // stamped by getLibraryVideos from the package ref
}

export interface Topic {
  title: string
  description?: string
}

export const TOPICS: Record<string, Topic> = {
  transmission: {
    title: 'Transmission',
    description: 'Live transmission-based practice — staying present, seeing your exits, and the structures that keep you leaving the moment.',
  },
  embodiment: {
    title: 'Embodiment',
    description: 'Coming back into the body — posture, breath, and how attention settles into stable absorption.',
  },
}

export function getMediaPackages(): MediaPackage[] {
  if (!fs.existsSync(mediaDir)) return []
  return fs.readdirSync(mediaDir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(mediaDir, f), 'utf8')) as MediaPackage)
}

export function getMediaPackage(id: string): MediaPackage | null {
  // id comes from the URL — reject anything that isn't a plain slug before
  // touching the filesystem (blocks path traversal like ..%2F).
  if (!/^[a-z0-9-]+$/.test(id)) return null
  const filePath = path.join(mediaDir, `${id}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as MediaPackage
}

export function packageVideoCount(pkg: MediaPackage): number {
  return pkg.videos.length
}

// Distinct lesson days present on a package's videos (for the "N lessons" count).
export function packageLessonCount(pkg: MediaPackage): number {
  return new Set(pkg.videos.filter(v => v.lesson != null).map(v => v.lesson)).size
}

// Pipeline titles repeat the lesson title ("Transmission 1 - The Act of
// Leaving"); the lesson context is always shown alongside in the library, so
// drop the redundant suffix ("Transmission 1").
function stripLessonSuffix(title: string, lessonTitle?: string): string {
  if (!lessonTitle) return title
  const lower = title.toLowerCase()
  const suffix = lessonTitle.toLowerCase()
  if (!lower.endsWith(suffix) || lower.length === suffix.length) return title
  const stripped = title.slice(0, title.length - lessonTitle.length).replace(/[\s\-–—:·]+$/, '')
  return stripped || title
}

function hydrate(pkg: MediaPackage): PackageVideo[] {
  const lessonTitles = new Map((pkg.lessons ?? []).map(l => [l.day, l.title]))
  return pkg.videos.map(v => {
    const lessonTitle = v.lesson != null ? lessonTitles.get(v.lesson) : undefined
    return {
      ...v,
      title: stripLessonSuffix(v.title, lessonTitle),
      packageId: pkg.id,
      packageTitle: pkg.title,
      topic: pkg.topic,
      lessonTitle,
    }
  })
}

// Every video across every package — the global search index.
export function getAllVideos(): PackageVideo[] {
  return getMediaPackages().flatMap(hydrate)
}

// ===== Master manifest =====
// content/media/library.json is itself a MediaPackage (so its direct videos get
// watch pages at /courses/videos/library/<id> for free) plus a `packages` list
// referencing every other manifest. Every video on the site is reachable from it.

export const LIBRARY_ID = 'library'

export function getLibraryManifest(): MediaPackage | null {
  return getMediaPackage(LIBRARY_ID)
}

// The full site-wide video list: the manifest's own (manifest-less) videos plus
// every video from each referenced package, stamped with that ref's subPrefix.
export function getLibraryVideos(): PackageVideo[] {
  const lib = getLibraryManifest()
  if (!lib) return []
  const referenced = (lib.packages ?? []).flatMap(ref => {
    const pkg = getMediaPackage(ref.id)
    if (!pkg) return []
    return hydrate(pkg).map(v => ({ ...v, subPrefix: ref.subPrefix }))
  })
  return [...hydrate(lib), ...referenced]
}

export function getVideo(packageId: string, id: string): PackageVideo | null {
  const pkg = getMediaPackage(packageId)
  if (!pkg) return null
  return hydrate(pkg).find(v => v.id === id) ?? null
}

export function getLessonVideos(packageId: string, day: number): PackageVideo[] {
  const pkg = getMediaPackage(packageId)
  if (!pkg) return []
  return hydrate(pkg).filter(v => v.lesson === day)
}

// Source recordings (full lesson + full discussions) vs the clips cut from them.
export function isClip(v: Video): boolean {
  return v.clipOf != null
}

export function getLessonSources(packageId: string, day: number): PackageVideo[] {
  return getLessonVideos(packageId, day).filter(v => !isClip(v))
}

export function getLessonClips(packageId: string, day: number): PackageVideo[] {
  return getLessonVideos(packageId, day).filter(isClip)
}

// Every clip in a package, across all lessons — the "full course library" pool.
export function getPackageClips(packageId: string): PackageVideo[] {
  const pkg = getMediaPackage(packageId)
  if (!pkg) return []
  return hydrate(pkg).filter(isClip)
}

// Teaser selection for lesson pages and course overviews: priority-flagged
// videos (hand-picked "best of" clips) surface first, in source order; the
// rest fill any remaining slots, up to `limit`.
export function pickPreview<T extends { priority?: boolean }>(videos: T[], limit = 3): T[] {
  const priority = videos.filter(v => v.priority)
  const rest = videos.filter(v => !v.priority)
  return [...priority, ...rest].slice(0, limit)
}

// The watch-page playlist: sibling videos in the same lesson, or the whole
// package when the video has no lesson (e.g. workshops).
export function getPlaylist(video: PackageVideo): PackageVideo[] {
  const pkg = getMediaPackage(video.packageId)
  if (!pkg) return []
  const all = hydrate(pkg)
  if (video.lesson == null) return all
  return all.filter(v => v.lesson === video.lesson)
}

// Subjects actually present in the data, with metadata + package count.
export function getTopics(): Array<{ slug: string; title: string; description?: string; packageCount: number }> {
  const counts = new Map<string, number>()
  getMediaPackages().forEach(p => counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1))
  return Array.from(counts.entries()).map(([slug, packageCount]) => ({
    slug,
    title: TOPICS[slug]?.title ?? slug,
    description: TOPICS[slug]?.description,
    packageCount,
  }))
}

export function getTopicPackages(topic: string): MediaPackage[] {
  return getMediaPackages().filter(p => p.topic === topic)
}

export function getTopicVideos(topic: string): PackageVideo[] {
  return getAllVideos().filter(v => v.topic === topic)
}

// Resolve a MediaRef to a link + label for "Related" UI. Returns null for refs
// that don't resolve (caller skips them).
export function resolveMediaRef(ref: MediaRef): { href: string; title: string; kind: 'article' | 'video' } | null {
  if (ref.type === 'article') {
    const article = getArticleBySlug(ref.slug)
    if (!article) return null
    return { href: `/articles/${ref.slug}`, title: article.meta.title, kind: 'article' }
  }
  const video = getVideo(ref.packageId, ref.id)
  if (!video) return null
  return { href: `/courses/videos/${ref.packageId}/${ref.id}`, title: video.title, kind: 'video' }
}
