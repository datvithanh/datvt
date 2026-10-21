import type { Metadata } from 'next'
import { getPublishedInitiates } from '@/lib/content'
import { InitiateRosterItem } from '@/components/team/InitiateRosterItem'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'The people who carry Contemplative CrossFit — the initiates and transmission holders who teach, mentor, and hold the practice.',
}

export default function TeamPage() {
  const initiates = getPublishedInitiates()

  return (
    <div className="animate-fade-in">
      <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary uppercase tracking-wide leading-tight">
            Team
          </h1>
          {/* PLACEHOLDER statement — replace via cc-voice */}
          <p className="font-body text-text-secondary mt-6 leading-relaxed max-w-xl mx-auto">
            The people who carry the practice — those who teach inside it, and those still training under it.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {initiates.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {initiates.map(i => (
                <InitiateRosterItem key={i.slug} initiate={i} />
              ))}
            </div>
          ) : (
            // PLACEHOLDER empty-state copy — replace via cc-voice
            <p className="font-body text-text-muted py-10 text-center">Profiles are going live soon.</p>
          )}
        </div>
      </section>
    </div>
  )
}
