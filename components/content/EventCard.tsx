// A compact card for a one-off live event (e.g. the Embodiment Workshop),
// pinned to the top of the Events section. A CSS grid drives two layouts:
// - mobile: image + header (title/author/date) share the top row, then the
//   description and reserve link sit full-width on their own rows below, so the
//   text isn't squeezed into a narrow column beside the flyer.
// - sm+: the flyer spans all three rows on the left, with title/date/description/
//   reserve stacked in the right column — the original horizontal layout.
// `href` can be an internal route or an external signup URL — external links
// open in a new tab.
// `imagePlaceholder` renders the image dimmed and contained (logo placeholder)
// with an optional `imageTeaser` overlaid — for events without creative yet
// (mirrors EventRow's placeholder treatment).
export function EventCard({
  href,
  image,
  imagePlaceholder,
  imageTeaser,
  eventDate,
  title,
  author,
  description,
}: {
  href: string
  image: string
  imagePlaceholder?: boolean
  imageTeaser?: string
  eventDate: string
  title: string
  author?: string
  description: string
}) {
  const external = /^https?:\/\//.test(href)
  return (
    <article className="group border border-accent/40 rounded-sm overflow-hidden bg-bg-secondary/30 hover:border-accent/70 transition-colors ring-1 ring-accent/10">
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="grid grid-cols-[8rem_minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] gap-x-4 sm:gap-x-5 p-5 sm:p-6"
      >
        {/* Ad flyer thumbnail — portrait. One row on mobile, spans all rows on sm+. */}
        <div className="col-start-1 row-start-1 sm:row-span-3 self-start aspect-[3/4] rounded-sm overflow-hidden">
          {imagePlaceholder ? (
            <div className="relative w-full h-full flex items-center justify-center bg-bg-secondary/60 p-4">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain opacity-25 group-hover:opacity-40 transition-opacity"
              />
              {imageTeaser && (
                <span className="absolute inset-0 flex items-center justify-center font-heading text-sm uppercase tracking-[0.15em] text-text-primary/80 group-hover:text-accent transition-colors">
                  {imageTeaser}
                </span>
              )}
            </div>
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
          )}
        </div>
        {/* Header — title, author, date. Beside the image on both layouts. */}
        <div className="col-start-2 row-start-1 self-start min-w-0">
          {/* Title — unique serif title font */}
          <h3 className="font-serif text-xl sm:text-2xl leading-tight text-text-primary group-hover:text-accent transition-colors break-words">
            {title}
          </h3>
          {author && (
            <span className="block font-heading text-[0.6rem] uppercase tracking-[0.12em] text-text-muted">
              By {author}
            </span>
          )}
          {/* Full date + time */}
          <span className="block font-heading text-sm sm:text-base uppercase tracking-[0.12em] text-accent">
            {eventDate}
          </span>
        </div>
        {/* Description — full width under the image on mobile, right column on sm+. */}
        <p className="row-start-2 col-span-2 sm:col-span-1 sm:col-start-2 min-w-0 font-body text-text-secondary text-xs leading-relaxed mt-4 line-clamp-6">
          {description}
        </p>
        <span className="row-start-3 col-span-2 sm:col-span-1 sm:col-start-2 inline-block font-heading text-[0.7rem] uppercase tracking-[0.18em] text-accent mt-4 group-hover:text-text-primary transition-colors">
          Learn more &rarr;
        </span>
      </a>
    </article>
  )
}
