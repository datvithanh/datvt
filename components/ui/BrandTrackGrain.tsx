/** Shared, alpha-clipped rubber grain for brand-colored type and glyphs. */
export function BrandTrackGrain() {
  return <svg className="brand-grain-defs" aria-hidden="true" focusable="false" width="0" height="0">
    <defs>
      <filter id="cc-track-type" x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="17" stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
        <feComponentTransfer in="gray" result="rubber">
          <feFuncR type="linear" slope="0.55" intercept="0.225" />
          <feFuncG type="linear" slope="0.55" intercept="0.225" />
          <feFuncB type="linear" slope="0.55" intercept="0.225" />
          <feFuncA type="linear" slope="0" intercept="1" />
        </feComponentTransfer>
        <feComposite in="rubber" in2="SourceAlpha" operator="in" result="grain" />
        <feBlend in="grain" in2="SourceGraphic" mode="overlay" />
      </filter>
    </defs>
  </svg>
}
