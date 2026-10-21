// Course number set inside the CC emblem, overlaid on an image — the site-wide
// way to label a hero or thumbnail with its course mark (T101, T102, ...).
//
// Drop it inside a `relative` container that holds the image:
//
//   <div className="relative rounded-sm overflow-hidden">
//     <img src="/images/ppw-hero.jpg" alt="..." />
//     <CourseMark label="T101" position="top-left" />
//   </div>
//
// `center` darkens the whole frame behind the mark so it reads over busy
// footage; `top-left` sits quietly in the corner and leaves the image alone.
export function CourseMark({
  label,
  position = 'center',
  scrim,
}: {
  label: string
  position?: 'center' | 'top-left'
  scrim?: boolean // overrides the per-position default
}) {
  const centered = position === 'center'
  const showScrim = scrim ?? centered

  const emblem = centered ? 'w-32 sm:w-40 lg:w-48' : 'w-16 sm:w-20'
  const text = centered ? 'text-2xl sm:text-3xl' : 'text-[0.7rem] sm:text-xs'

  return (
    <>
      {/* Emblem sits under the scrim so the darkening lands on it too. */}
      <div
        className={`absolute pointer-events-none ${
          centered ? 'inset-0 flex items-center justify-center' : 'top-3 left-3 sm:top-4 sm:left-4'
        }`}
        aria-hidden="true"
      >
        <img src="/images/cc-emblem.png" alt="" className={`${emblem} ${showScrim ? '' : 'opacity-90'}`} />
      </div>

      {showScrim && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden="true" />
      )}

      <div
        className={`absolute pointer-events-none ${
          centered
            ? 'inset-0 flex items-center justify-center'
            : `top-3 left-3 sm:top-4 sm:left-4 flex items-center justify-center ${emblem} aspect-square`
        }`}
        aria-hidden="true"
      >
        <span
          className={`font-heading ${text} uppercase tracking-[0.15em] text-text-primary`}
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
        >
          {label}
        </span>
      </div>
    </>
  )
}
