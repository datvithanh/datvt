import Link from 'next/link'
import type { InitiateMeta } from '@/lib/content'

// One entry in the /lineage roster. Lighter than MentorCard (no booking action) —
// the whole row links into the initiate's hub. Photo or monogram, role label,
// name, specialty, blurb.
export function InitiateRosterItem({ initiate }: { initiate: InitiateMeta }) {
  return (
    <Link
      href={`/team/${initiate.slug}`}
      className="group flex gap-5 p-5 border border-border/60 rounded-sm bg-bg-secondary/20 hover:border-accent/30 transition-colors"
    >
      <div className="w-20 sm:w-24 aspect-[3/4] flex-shrink-0 rounded-sm overflow-hidden bg-bg-tertiary flex items-center justify-center">
        {initiate.photo ? (
          <img
            src={initiate.photo}
            alt={initiate.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <span className="font-heading text-3xl text-accent/40 uppercase">{initiate.name.charAt(0)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-heading text-[0.6rem] uppercase tracking-[0.2em] text-accent">{initiate.role}</span>
        <h3 className="font-heading text-lg sm:text-xl text-text-primary uppercase tracking-wide mt-1 group-hover:text-accent transition-colors">
          {initiate.name}
        </h3>
        {initiate.specialty && (
          <p className="font-body text-text-muted text-xs mt-1">{initiate.specialty}</p>
        )}
        {initiate.blurb && (
          <p className="font-body text-text-secondary text-sm leading-relaxed mt-2 line-clamp-2">{initiate.blurb}</p>
        )}
      </div>
    </Link>
  )
}
