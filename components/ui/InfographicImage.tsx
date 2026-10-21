'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export function InfographicImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      {/* Inline — full width, breaks out of prose margins.
          Rendered as a block <span> (not <figure>) because markdown wraps
          standalone images in <p>, and block elements can't nest inside <p>. */}
      <span
        className="infographic-bleed relative block my-8 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-24 cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt || 'Infographic'}
          className="w-full rounded-sm"
        />
        {/* Tap-to-enlarge affordance — makes the lightbox discoverable on touch */}
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-white/85 backdrop-blur-sm sm:bottom-4 sm:right-4">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span className="text-[10px] font-heading uppercase tracking-wider sm:text-xs">Tap to enlarge</span>
        </span>
      </span>

      {/* Lightbox overlay — portaled to <body> so it isn't a <p> descendant */}
      {mounted && open && createPortal(
        <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  )
}

const MIN_SCALE = 1
const MAX_SCALE = 5

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [animate, setAnimate] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  // Live view state, read synchronously inside gesture handlers (avoids stale closures)
  const view = useRef({ scale: 1, tx: 0, ty: 0 })
  const gesture = useRef({
    mode: 'none' as 'none' | 'pan' | 'pinch',
    startX: 0, startY: 0,
    startTx: 0, startTy: 0,
    startDist: 0, startScale: 1,
    focalX: 0, focalY: 0,
    lastTap: 0,
  })

  useEffect(() => { view.current = { scale, tx, ty } }, [scale, tx, ty])

  // Lock background scroll while the lightbox is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

  // Focal point relative to the container's center (transform-origin is center)
  const focalOf = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return { x: clientX - rect.left - rect.width / 2, y: clientY - rect.top - rect.height / 2 }
  }, [])

  const clampTranslation = useCallback((s: number, x: number, y: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    const w = rect?.width ?? window.innerWidth
    const h = rect?.height ?? window.innerHeight
    const maxX = ((s - 1) * w) / 2 + w * 0.15
    const maxY = ((s - 1) * h) / 2 + h * 0.15
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) }
  }, [])

  const apply = useCallback((s: number, x: number, y: number, withAnim = false) => {
    const c = clampTranslation(s, x, y)
    setAnimate(withAnim)
    setScale(s); setTx(c.x); setTy(c.y)
  }, [clampTranslation])

  const doubleTapZoom = useCallback((clientX: number, clientY: number) => {
    if (view.current.scale > 1.01) {
      apply(1, 0, 0, true)
    } else {
      const f = focalOf(clientX, clientY)
      const target = 2.5
      apply(target, f.x * (1 - target), f.y * (1 - target), true)
    }
  }, [apply, focalOf])

  // Native touch listeners (passive:false) so we can preventDefault during pinch/pan
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const dist = (a: Touch, b: Touch) =>
      Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)

    const onStart = (e: TouchEvent) => {
      const g = gesture.current
      if (e.touches.length === 2) {
        const [a, b] = [e.touches[0], e.touches[1]]
        g.mode = 'pinch'
        g.startDist = dist(a, b)
        g.startScale = view.current.scale
        g.startTx = view.current.tx
        g.startTy = view.current.ty
        const f = focalOf((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2)
        g.focalX = f.x
        g.focalY = f.y
      } else if (e.touches.length === 1) {
        const t = e.touches[0]
        const now = Date.now()
        if (now - g.lastTap < 300) {
          g.mode = 'none'
          g.lastTap = 0
          doubleTapZoom(t.clientX, t.clientY)
          return
        }
        g.lastTap = now
        g.mode = 'pan'
        g.startX = t.clientX
        g.startY = t.clientY
        g.startTx = view.current.tx
        g.startTy = view.current.ty
      }
    }

    const onMove = (e: TouchEvent) => {
      const g = gesture.current
      if (g.mode === 'pinch' && e.touches.length === 2) {
        e.preventDefault()
        const ratio = dist(e.touches[0], e.touches[1]) / g.startDist
        const newScale = clamp(g.startScale * ratio, MIN_SCALE, MAX_SCALE)
        const r = newScale / g.startScale
        apply(
          newScale,
          g.focalX - r * (g.focalX - g.startTx),
          g.focalY - r * (g.focalY - g.startTy),
        )
      } else if (g.mode === 'pan' && e.touches.length === 1) {
        if (view.current.scale <= 1) return // nothing to pan when fit-to-screen
        e.preventDefault()
        const t = e.touches[0]
        apply(
          view.current.scale,
          g.startTx + (t.clientX - g.startX),
          g.startTy + (t.clientY - g.startY),
        )
      }
    }

    const onEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) gesture.current.mode = 'none'
      if (view.current.scale <= 1 && (view.current.tx !== 0 || view.current.ty !== 0)) {
        apply(1, 0, 0, true)
      }
    }

    el.addEventListener('touchstart', onStart, { passive: false })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
    }
  }, [apply, focalOf, doubleTapZoom])

  // Desktop: wheel / trackpad to zoom toward the cursor
  const onWheel = (e: React.WheelEvent) => {
    const f = focalOf(e.clientX, e.clientY)
    const startScale = view.current.scale
    const newScale = clamp(startScale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), MIN_SCALE, MAX_SCALE)
    const r = newScale / startScale
    apply(newScale, f.x - r * (f.x - view.current.tx), f.y - r * (f.y - view.current.ty))
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden overscroll-none bg-black/95"
      style={{ touchAction: 'none' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onWheel={onWheel}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="fixed top-4 right-4 z-[110] w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-black/50 rounded-full"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <img
        src={src}
        alt={alt || 'Infographic'}
        draggable={false}
        className="max-w-[94vw] max-h-[90vh] w-auto h-auto select-none rounded-sm"
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: animate ? 'transform 0.25s ease-out' : 'none',
          touchAction: 'none',
          willChange: 'transform',
        }}
        onDoubleClick={(e) => { e.stopPropagation(); doubleTapZoom(e.clientX, e.clientY) }}
      />

      {/* Zoom hint */}
      <span className="pointer-events-none fixed bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/45 px-3 py-1 text-[11px] text-white/55 font-heading uppercase tracking-wider backdrop-blur-sm">
        Pinch or double-tap to zoom
      </span>
    </div>
  )
}
