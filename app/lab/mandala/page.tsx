import type { Metadata } from 'next'
import { MandalaField } from './MandalaField'

export const metadata: Metadata = {
  title: 'Mandala field (lab)',
  robots: { index: false, follow: false },
}

export default function MandalaLabPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl">
        <p className="mb-3 font-[var(--font-heading)] text-xs uppercase tracking-[0.2em] text-accent max-md:hidden">
          Lab · proximity field
        </p>
        {/* MandalaField owns its own box: framed at the gif's aspect on desktop,
            full-bleed fixed canvas below md. Sizing lives on the field's root so the
            absolute canvas fills it directly (no fragile percentage-height chain). */}
        <MandalaField />
        <p className="mt-4 text-sm text-text-muted max-md:hidden">
          Move your cursor across the field. Each node is a participant from a bootcamp
          session; glowing edges reach toward the nearest as you move, and fade when you
          rest.
        </p>
      </div>
    </main>
  )
}
