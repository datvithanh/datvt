'use client'

import { useEffect, useState } from 'react'

type HoverAnimatedImageProps = {
  src: string
  animatedSrc?: string
  alt: string
  className?: string
  autoPlay?: boolean // also pulse the animation on a timer, not just on hover/focus
}

const PLAY_MS = 3000 // animation runs this long each cycle
const REST_MS = 2000 // then the still shows this long before the next play

export function HoverAnimatedImage({
  src,
  animatedSrc,
  alt,
  className,
  autoPlay = false,
}: HoverAnimatedImageProps) {
  const [hovered, setHovered] = useState(false)
  const [pulsing, setPulsing] = useState(false)

  // Auto-play cycle (opt-in, e.g. the article hero). Skipped under reduced motion.
  useEffect(() => {
    if (!autoPlay || !animatedSrc) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let timer: ReturnType<typeof setTimeout>
    const tick = (on: boolean) => {
      setPulsing(on)
      timer = setTimeout(() => tick(!on), on ? PLAY_MS : REST_MS)
    }
    tick(false) // show the still first, then start playing
    return () => clearTimeout(timer)
  }, [autoPlay, animatedSrc])

  const showAnimated = Boolean(animatedSrc) && (hovered || pulsing)
  const activeSrc = showAnimated ? animatedSrc! : src

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    />
  )
}
