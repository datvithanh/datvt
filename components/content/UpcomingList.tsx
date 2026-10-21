import Link from 'next/link'

export type UpcomingItem = {
  title: string
  date: string
  time?: string // start time, shown after the date (e.g. '2PM EDT')
  by?: string // who runs it (e.g. 'John Le')
  frequency?: string // cadence/type label (e.g. 'Seasonal', 'Limited', 'Deadline')
  href: string
}

// Full-width calendar table of upcoming events/deadlines. Columns: event,
// date (+ start time), who leads it, and frequency (seasonal vs limited-run).
// Every row links to its landing page. On mobile the Led By and Frequency
// columns drop out and rows keep title + date on one line.
const ROW_GRID =
  'grid grid-cols-[minmax(0,1fr)_auto_1.25rem] sm:grid-cols-[minmax(0,2.2fr)_minmax(0,1.6fr)_minmax(0,1.1fr)_minmax(0,1fr)_1.25rem] gap-x-4 items-baseline px-5'

export function UpcomingList({ items }: { items: UpcomingItem[] }) {
  return (
    <div className="border border-border rounded-sm overflow-hidden">
      {/* Header row — desktop only */}
      <div className={`${ROW_GRID} hidden sm:grid py-3 border-b border-border bg-bg-secondary/30`}>
        <span className="font-heading text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">Event</span>
        <span className="font-heading text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">Date</span>
        <span className="font-heading text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">Led By</span>
        <span className="font-heading text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">Frequency</span>
        <span aria-hidden="true" />
      </div>
      <div className="divide-y divide-border-subtle">
        {items.map(item => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className={`${ROW_GRID} py-3.5 hover:bg-bg-secondary/30 transition-colors group`}
          >
            <span className="font-heading text-sm uppercase tracking-wide text-text-primary group-hover:text-accent transition-colors truncate">
              {item.title}
            </span>
            <span className="font-heading text-xs uppercase tracking-wider text-text-muted whitespace-nowrap">
              {item.date}
              {item.time && <> &middot; {item.time}</>}
            </span>
            <span className="hidden sm:block font-heading text-xs uppercase tracking-wider text-text-muted truncate">
              {item.by ?? '—'}
            </span>
            <span className="hidden sm:block font-heading text-xs uppercase tracking-wider text-text-muted">
              {item.frequency ?? '—'}
            </span>
            <span aria-hidden="true" className="font-heading text-sm text-text-muted group-hover:text-accent transition-colors justify-self-end">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
