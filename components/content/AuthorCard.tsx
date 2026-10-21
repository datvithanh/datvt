import Link from 'next/link'
import type { InitiateMeta } from '@/lib/content'
import { SHOW_INITIATES } from '@/lib/flags'

// The handle (last path segment) of a social URL, e.g.
// https://www.instagram.com/intuitivetyson/ → "intuitivetyson".
function handleFromUrl(url: string): string {
  try {
    const u = new URL(url)
    return u.pathname.split('/').filter(Boolean).pop() || u.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.06 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.43.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.17-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.8-.25-2.23-.42a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.17-.43-.36-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.06-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.17 1.06-.36 2.23-.42C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.36.89-.42.42-.67.81-.89 1.36-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.89 1.36.42.42.81.67 1.36.89.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.36-.89.42-.42.67-.81.89-1.36.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.66 3.66 0 0 0-.89-1.36 3.66 3.66 0 0 0-1.36-.89c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.5-2.86a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48Z" />
    </svg>
  )
}

// The article-page author rail: round avatar, name, role label, short bio, social
// links, an optional CTA, and hand-picked display tags. The identity block links to the
// author's /lineage hub only when the lineage section is public AND the bio is
// published; otherwise it renders as a static panel. The CTA and social links sit
// OUTSIDE the identity link (no nested anchors).
export function AuthorCard({ profile }: { profile: InitiateMeta }) {
  const href = SHOW_INITIATES && profile.profilePublished ? `/team/${profile.slug}` : null
  // Drop any tag that just repeats the role label (e.g. role "Mentor" + a "Mentor" tag).
  const tags = (profile.tags ?? []).filter(t => t.toLowerCase() !== profile.role.toLowerCase())
  const socials = [
    profile.instagram && { url: profile.instagram, label: handleFromUrl(profile.instagram), icon: 'instagram' as const },
    profile.youtube && { url: profile.youtube, label: 'YouTube', icon: null },
    profile.x && { url: profile.x, label: handleFromUrl(profile.x), icon: null },
    profile.website && { url: profile.website, label: handleFromUrl(profile.website), icon: null },
  ].filter(Boolean) as { url: string; label: string; icon: 'instagram' | null }[]

  const identity = (
    <>
      {/* Avatar on its own row, centered */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden bg-bg-tertiary flex items-center justify-center ring-1 ring-accent/30">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-heading text-4xl text-accent/40 uppercase">{profile.name.charAt(0)}</span>
        )}
      </div>

      <div className="mt-4">
        {profile.role && (
          <span className="block font-heading text-[0.6rem] uppercase tracking-[0.18em] text-accent">{profile.role}</span>
        )}
        {/* Full name wraps — no truncation */}
        <span className="block font-heading text-lg leading-tight text-text-primary uppercase tracking-wide break-words mt-1">{profile.name}</span>
      </div>

      {/* Full biography — box grows to fit */}
      {profile.blurb && (
        <p className="font-body text-text-secondary text-sm leading-relaxed mt-4 break-words">{profile.blurb}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map(t => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 font-heading text-[0.55rem] uppercase tracking-[0.12em] text-text-muted border border-border/60 rounded-sm px-2 py-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  )

  return (
    <div className="border border-border/60 rounded-sm bg-bg-secondary/20 p-5 -mx-1.5">
      {href ? (
        <Link href={href} className="block hover:opacity-90 transition-opacity">{identity}</Link>
      ) : (
        <div>{identity}</div>
      )}

      {socials.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
          {socials.map(s => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-xs lowercase text-text-muted hover:text-accent transition-colors"
            >
              {s.icon === 'instagram' && <InstagramIcon />}
              {s.label}
            </a>
          ))}
        </div>
      )}

      {profile.showCTA && profile.ctaURL && (
        <a
          href={profile.ctaURL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary block w-full text-center px-4 py-2.5 text-sm mt-4"
        >
          {profile.ctaLabel || `Work with ${profile.name}`}
        </a>
      )}
    </div>
  )
}
