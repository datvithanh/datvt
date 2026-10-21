import Link from 'next/link'

// A slim row for the master events list — roughly half the height of the
// featured EventCard above it. Wide article-card-style thumbnail (full-width
// on mobile, left column on sm+), title, date, and a link to the event's
// landing page. `href` can be an internal route or an external signup URL —
// external links open in a new tab.
// `tone="silver"` renders the row low-key: smaller, muted monochrome hover
// instead of the gold accent — for quiet entries like self-paced courses.
export function EventRow({
  href,
  image,
  imagePlaceholder,
  imageTeaser,
  imageTooltip,
  eventDate,
  length,
  title,
  tone,
  kicker,
  badge,
  author,
  description,
}: {
  href: string
  image: string
  imagePlaceholder?: boolean
  imageTeaser?: string
  imageTooltip?: string
  eventDate: string
  length?: string
  title: string
  tone?: 'silver'
  kicker?: string
  badge?: string
  author?: string
  description?: string
}) {
  const external = /^https?:\/\//.test(href)
  const silver = tone === 'silver'
  const accentText = silver ? 'group-hover:text-text-primary' : 'group-hover:text-accent'
  const className = silver
    ? 'group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border border-text-muted/40 rounded-sm bg-bg-secondary/10 hover:border-text-muted/70 transition-colors'
    : 'group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 border border-border rounded-sm bg-bg-secondary/20 hover:border-accent/50 transition-colors'
  const body = (
    <>
      {/* Thumbnail — wide 16:9 like the article cards: full-width on mobile,
          fixed-width left column on sm+. Dimmed contained logo for events
          without creative yet. */}
      <div
        className={`w-full ${silver ? 'sm:w-40' : 'sm:w-44'} shrink-0 aspect-video self-center rounded-sm overflow-hidden`}
        title={imageTooltip}
      >
        {imagePlaceholder ? (
          <div className="relative w-full h-full flex items-center justify-center bg-bg-secondary/60 p-2.5">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain opacity-25 group-hover:opacity-40 transition-opacity"
            />
            {imageTeaser && (
              <span className={`absolute inset-0 flex items-center justify-center font-heading text-xs uppercase tracking-[0.15em] text-text-primary/80 ${accentText} transition-colors`}>
                {imageTeaser}
              </span>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover ${silver ? 'opacity-75 group-hover:opacity-90' : 'opacity-90 group-hover:opacity-100'} transition-opacity`}
            />
            {imageTeaser && (
              <span className={`absolute inset-0 flex items-center justify-center bg-bg-primary/65 font-heading text-2xl sm:text-3xl text-text-primary/90 ${accentText} transition-colors`}>
                {imageTeaser}
              </span>
            )}
          </div>
        )}
      </div>
      {/* Single text column — title wraps on mobile, truncates on sm+. */}
      <div className="min-w-0 flex-1">
        {/* Article-card-style meta header: KICKER [CHIP] · by AUTHOR */}
        {(kicker || badge || author) && (
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {kicker && (
              <span className="font-heading text-[0.6rem] uppercase tracking-[0.18em] text-accent">{kicker}</span>
            )}
            {badge && (
              <span className="font-heading text-[0.55rem] uppercase tracking-[0.15em] text-accent/80 border border-accent/40 rounded-sm px-1.5 py-0.5">
                {badge}
              </span>
            )}
            {author && (
              <>
                <span className="text-text-muted/40 select-none">&middot;</span>
                <span className="font-heading text-[0.6rem] uppercase tracking-[0.12em] text-text-muted">by {author}</span>
              </>
            )}
          </div>
        )}
        <h3 className={`font-serif ${silver ? 'text-sm sm:text-base text-text-secondary' : 'text-base sm:text-lg text-text-primary'} leading-tight ${accentText} transition-colors sm:truncate`}>
          {title}
        </h3>
        <span className={`block font-heading ${silver ? 'text-[0.65rem] sm:text-xs text-text-muted' : 'text-xs sm:text-sm text-accent'} uppercase tracking-[0.12em] mt-1`}>
          {eventDate}
        </span>
        {length && (
          <span className="block font-heading text-[0.65rem] uppercase tracking-[0.15em] text-text-muted mt-1">
            {length}
          </span>
        )}
        {description && (
          <p className="font-body text-text-secondary text-sm leading-relaxed mt-1.5 line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} className={className}>
      {body}
    </Link>
  )
}
