import Link from 'next/link'

// A curated-rail promo card for a destination that isn't an article (Bootcamp, PPW).
// Thumbnail + title + one-line description, linking to `href`. An optional uppercase
// `label` (kicker) renders above the title when provided; an optional `badge` renders
// as a small bordered chip next to the title (e.g. "Free"); an optional `subtitle`
// renders as a subheader under the title (e.g. the program date).
// `thumbnailPlaceholder` renders the image dimmed and contained (logo placeholder)
// instead of a full-bleed crop, with an optional `thumbnailTeaser` overlaid — for
// programs without creative yet (mirrors EventRow's placeholder treatment).
// `thumbnailTooltip` sets a native hover title on the thumbnail (easter eggs).
// `thumbnailPosition` overrides the crop's object-position (default center) — for
// creative where the focal point isn't the middle of the image.
// `thumbnailTeaser` also works without the placeholder: it darkens the real image and
// sets the teaser over it (e.g. "Coming Soon" on a course that has artwork).
// `thumbnailDim` lays a dark overlay over a real thumbnail (eases on hover) — for bright
// creative that overpowers the card.
// `href` may be internal (Next <Link>) — all current uses are internal routes.
export function RailCard({
  href,
  thumbnail,
  thumbnailPlaceholder,
  thumbnailTeaser,
  thumbnailDim,
  thumbnailTooltip,
  thumbnailPosition,
  label,
  badge,
  title,
  subtitle,
  description,
}: {
  href: string
  thumbnail: string
  thumbnailPlaceholder?: boolean
  thumbnailTeaser?: string
  thumbnailDim?: boolean
  thumbnailTooltip?: string
  thumbnailPosition?: string
  label?: string
  badge?: string
  title: string
  subtitle?: string
  description: string
}) {
  return (
    <article className="group border border-border/60 rounded-sm overflow-hidden bg-bg-secondary/20 hover:border-accent/30 transition-colors">
      <Link href={href} className="flex flex-col">
        <div className="relative overflow-hidden aspect-[16/9]" title={thumbnailTooltip}>
          {thumbnailPlaceholder ? (
            <div className="relative w-full h-full flex items-center justify-center bg-bg-secondary/60 p-6">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-contain opacity-25 group-hover:opacity-40 transition-opacity"
              />
              {thumbnailTeaser && (
                <span className="absolute inset-0 flex items-center justify-center font-heading text-lg uppercase tracking-[0.15em] text-text-primary/80 group-hover:text-accent transition-colors">
                  {thumbnailTeaser}
                </span>
              )}
            </div>
          ) : (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              style={thumbnailPosition ? { objectPosition: thumbnailPosition } : undefined}
            />
          )}
          {thumbnailDim && !thumbnailPlaceholder && !thumbnailTeaser && (
            <span className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          )}
          {/* Teaser over a real (non-placeholder) thumbnail: darken the image and set
              the teaser on top, e.g. "Coming Soon" over a course's artwork. */}
          {thumbnailTeaser && !thumbnailPlaceholder && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/60 font-heading text-lg uppercase tracking-[0.15em] text-white/90 group-hover:text-accent transition-colors">
              {thumbnailTeaser}
            </span>
          )}
        </div>
        <div className="p-5">
          {label && (
            <span className="block font-heading text-[0.6rem] uppercase tracking-[0.18em] text-accent leading-none mb-1">
              {label}
            </span>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors text-lg">
              {title}
            </h3>
            {badge && (
              <span className="font-heading text-[0.55rem] uppercase tracking-[0.15em] text-accent border border-accent/40 rounded-sm px-1.5 py-0.5">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.14em] text-accent mt-1">
              {subtitle}
            </p>
          )}
          <p className="font-body text-text-secondary text-sm leading-relaxed mt-2 line-clamp-4">
            {description}
          </p>
        </div>
      </Link>
    </article>
  )
}
