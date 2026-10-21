import type { Metadata } from 'next'
import Link from 'next/link'
import { getLibraryManifest, getLibraryVideos, getMediaPackage, packageVideoCount, LIBRARY_ID, type PackageVideo } from '@/lib/media'
import { VideoBrowser } from '@/components/content/VideoBrowser'
import { VideoList } from '@/components/content/VideoList'

// Unlisted site-wide video index, driven by the master manifest
// (content/media/library.json): search across every video on the site,
// collection cards for packages with their own manifest, and inline sections
// for the manifest-less videos (grouped by their `group` field).

export const metadata: Metadata = {
  title: 'Video Library',
  description: 'Every video on the site — courses, workshops, and testimonials.',
  robots: { index: false, follow: false },
}

export default function VideosPage() {
  const lib = getLibraryManifest()
  const all = getLibraryVideos()

  const collections = (lib?.packages ?? [])
    .map(ref => getMediaPackage(ref.id))
    .filter((p): p is NonNullable<typeof p> => p !== null)

  const direct = all.filter(v => v.packageId === LIBRARY_ID)
  const groups = new Map<string, PackageVideo[]>()
  direct.forEach(v => {
    const key = v.group ?? 'Library'
    groups.set(key, [...(groups.get(key) ?? []), v])
  })

  return (
    <div className="animate-fade-in">
      <div className="max-w-[940px] mx-auto px-4 sm:px-6 lg:px-[52px] py-10 sm:py-14">
        <header className="mb-10">
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">Video Library</h1>
          <p className="font-heading text-[11px] uppercase tracking-wider text-text-muted mt-2">
            {all.length} videos
          </p>
        </header>

        <section className="mb-14">
          <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">Search</h2>
          <VideoBrowser videos={all} showAllWhenEmpty={false} />
        </section>

        {collections.length > 0 && (
          <section className="mb-14">
            <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">Collections</h2>
            <div className="border border-border rounded-sm divide-y divide-border-subtle">
              {collections.map(pkg => (
                <Link
                  key={pkg.id}
                  href={`/courses/videos/${pkg.id}`}
                  className="group flex items-center justify-between gap-4 px-4 py-3 hover:bg-bg-secondary/30 transition-colors"
                >
                  <span className="font-heading text-sm uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors truncate">
                    {pkg.title}
                  </span>
                  <span className="font-heading text-[11px] uppercase tracking-wider text-text-muted shrink-0">
                    {packageVideoCount(pkg)} videos
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {Array.from(groups.entries()).map(([group, videos]) => (
          <section key={group} className="mb-14">
            <h2 className="font-heading text-xs uppercase tracking-[0.15em] text-text-muted mb-5">{group}</h2>
            <VideoList videos={videos} />
          </section>
        ))}
      </div>
    </div>
  )
}
