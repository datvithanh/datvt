const BENEFITS = [
  { title: 'Direct Guidance', body: 'Real-time personalized instruction from an experienced teacher who can guide you through challenges.' },
  { title: 'Real Community', body: 'Honest, committed co-practitioners who stay with you through the hard parts.' },
  { title: 'Personalized Instruction', body: 'Tailored guidance based on your unique karma, lifestyle, and needs.' },
  { title: 'Systematic Path', body: 'Complete, sequential progression from foundation to realization.' },
]

export function BootcampCTA({
  heading = 'So How Does This Survive Your Day?',
  intro,
}: {
  heading?: string
  intro?: string
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl text-text-primary uppercase tracking-wide">
        {heading}
      </h2>
      {intro && (
        <p className="mt-6 font-body text-text-secondary leading-relaxed">{intro}</p>
      )}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {BENEFITS.map(b => (
          <div key={b.title} className="p-6 border border-border/40 rounded-sm">
            <h3 className="font-heading text-sm uppercase tracking-wider text-accent">{b.title}</h3>
            <p className="font-body text-text-secondary mt-3 text-sm leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
