import type { DiscussionClip } from '@/lib/content'

export function DiscussionGrid({ clips }: { clips: DiscussionClip[] }) {
  if (!clips?.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {clips.map((c, i) => (
        <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
          <div className="relative rounded-sm overflow-hidden border border-border/40">
            <img src={c.thumbnail} alt={c.title} className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <svg className="w-14 h-14 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <h3 className="font-heading text-sm uppercase tracking-wide text-text-primary mt-3 leading-snug group-hover:text-accent transition-colors">
            {c.title}
          </h3>
          {c.analysis && (
            <p className="mt-2 font-body text-text-muted text-sm leading-relaxed">{c.analysis}</p>
          )}
        </a>
      ))}
    </div>
  )
}
