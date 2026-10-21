import Link from 'next/link'

// Consistent top-of-page breadcrumb — inline crumbs, muted, uppercase, "/"
// separators. Matches the watch page nav (Course / Videos / …). Items with an
// href render as links; the last item (the current page) is plain text.
// Optional `right` renders accent link(s) on the far right of the crumb row —
// the jump across the course/videos boundary (e.g. "Videos →" / "Lesson →"),
// or an in-page anchor (arrow: 'down').
type RightLink = { label: string; href: string; arrow?: 'right' | 'down'; color?: 'accent' | 'white' | 'grey' }

export function Breadcrumb({
  items,
  right,
  aboveRight,
}: {
  items: Array<{ label: string; href?: string }>
  right?: RightLink | RightLink[]
  // Slot rendered between the crumbs and the right-link row. Used by the lesson
  // page to sit its pager above that row on mobile; pass mobile-only classes.
  aboveRight?: React.ReactNode
}) {
  const rightLinks = right ? (Array.isArray(right) ? right : [right]) : []
  // Mobile rules bracket the nav block. With a slot above, that slot draws the
  // top rule, so the row only closes the bottom.
  const mobileRules = aboveRight
    ? 'border-b border-border-subtle pb-3'
    : 'border-y border-border-subtle py-3 mt-1'
  return (
    <div>
      {/* Mobile: crumbs on top, right links below in their own ruled row.
          sm+: inline crumb row with "/" separators and the right link on the far right. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-row flex-wrap items-center gap-x-2 gap-y-1 font-heading text-xs uppercase tracking-[0.15em] text-text-muted"
        >
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-text-secondary">{item.label}</span>
              )}
              {i < items.length - 1 && <span aria-hidden>/</span>}
            </span>
          ))}
        </nav>
        {aboveRight}
        {rightLinks.length > 0 && (
          <div className={`flex flex-row-reverse w-full justify-between gap-x-4 shrink-0 self-start ${mobileRules} sm:w-auto sm:flex-col sm:justify-start sm:gap-1.5 sm:items-end sm:border-0 sm:py-0 sm:pb-0 sm:mt-0`}>
            {rightLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.color === 'white'
                    ? 'font-heading text-xs uppercase tracking-[0.15em] text-text-primary hover:text-accent transition-colors'
                    : link.color === 'grey'
                    ? 'font-heading text-xs uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors'
                    : 'font-heading text-xs uppercase tracking-[0.15em] text-accent hover:text-text-primary transition-colors'
                }
              >
                {link.label} {link.arrow === 'down' ? <>&darr;</> : <>&rarr;</>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
