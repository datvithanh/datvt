'use client'

import { useEffect, useRef } from 'react'

// A transparent canvas overlay for a thumbnail. While the pointer hovers, the
// image dims under a veil and amber pulses ignite at the perimeter and glow
// inward to the cursor — the lab MandalaField effect, ported as a hover overlay.
// The canvas is pointer-events:none so the underlying link still clicks through;
// hover is tracked on the host element. Reduced motion -> nothing renders.

const ACCENT = '196, 163, 90' // --accent #c4a35a
const TAU = Math.PI * 2

const NEIGHBOR_F = 0.24 // node<->node link distance, fraction of width
const EDGE_OFFSET = 0.08 // how far beyond the box the perimeter nodes sit
const VEIL_ALPHA = 0.55 // how dark the photo gets at full hover
const ENTRY_POOL = 3 // first jump goes to a random one of the N closest nodes
const SOURCE_COUNT = 3 // pulses launched per beat
const BEAT_MS = 150 // how often new pulses are launched while hovering
const GROW_MS = 350 // a pulse glows inward over this long
const FADE_MS = 450 // then the whole line fades over this long
const PERI_COOLDOWN_MS = 550 // a perimeter node is un-targetable this long after it fires
const BEAM_T = 0.85 // beam width/glow factor
const LINE_ALPHA = 0.6 // base line translucency
const HOLD_MS = 120 // keep animating this long after the last movement
const RISE = 0.16 // how fast it ramps up while moving
const FALL = 0.1 // how fast it fades once the cursor stops or leaves

type FieldNode = { x: number; y: number; edge: boolean }

// A clean 6×4 grid of nodes plus a ring of off-box perimeter nodes.
const NODES: FieldNode[] = (() => {
  const COLS = 6
  const ROWS = 4
  const xs = Array.from({ length: COLS }, (_, i) => (i + 0.5) / COLS)
  const ys = Array.from({ length: ROWS }, (_, i) => (i + 0.5) / ROWS)
  const o = EDGE_OFFSET
  const out: FieldNode[] = []
  for (const x of xs) for (const y of ys) out.push({ x, y, edge: false })
  for (const x of xs) {
    out.push({ x, y: -o, edge: true })
    out.push({ x, y: 1 + o, edge: true })
  }
  for (const y of ys) {
    out.push({ x: -o, y, edge: true })
    out.push({ x: 1 + o, y, edge: true })
  }
  return out
})()

export function MandalaOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvEl = canvasRef.current
    const host = cvEl?.parentElement
    if (!cvEl || !host) return
    const c = cvEl.getContext('2d')
    if (!c) return
    const cv = cvEl
    const ctx = c

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cssW = 0
    let cssH = 0
    let nodePx: { x: number; y: number }[] = []
    let neighbors: number[][] = []
    let perimeter: number[] = []
    let periReadyAt = new Float32Array(0)
    let pulses: { sx: number; sy: number; path: number[]; age: number }[] = []
    let beatAt = 0
    let lastT = 0
    let lastMove = -1e9
    let intensity = 0 // eased 0..1 movement strength
    let raf = 0
    let running = false
    const pointer = { x: 0, y: 0, inside: false }

    function resize() {
      const rect = cv.getBoundingClientRect()
      cssW = rect.width
      cssH = rect.height
      if (cssW === 0 || cssH === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cssW * dpr)
      cv.height = Math.round(cssH * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodePx = NODES.map((n) => ({ x: n.x * cssW, y: n.y * cssH }))
      const nd = cssW * NEIGHBOR_F
      neighbors = nodePx.map((p, i) => {
        const list: number[] = []
        for (let j = 0; j < nodePx.length; j++) {
          if (j === i) continue
          if (NODES[i].edge && NODES[j].edge) continue
          if (Math.hypot(nodePx[j].x - p.x, nodePx[j].y - p.y) < nd) list.push(j)
        }
        return list
      })
      perimeter = NODES.map((_, i) => i).filter((i) => NODES[i].edge)
      periReadyAt = new Float32Array(NODES.length)
    }

    function beam(x1: number, y1: number, x2: number, y2: number, a: number, t: number) {
      ctx.shadowColor = `rgba(${ACCENT}, ${a})`
      ctx.shadowBlur = 22 * t
      ctx.strokeStyle = `rgba(${ACCENT}, ${0.55 * a})`
      ctx.lineWidth = 3 * t + 0.6
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.shadowBlur = 10 * t
      ctx.strokeStyle = `rgba(255, 252, 242, ${Math.min(1, a * 1.25)})`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    function spawnPulses(t: number) {
      const N = nodePx.length
      const cand: { i: number; d2: number }[] = []
      for (let i = 0; i < N; i++) {
        if (NODES[i].edge) continue
        const dx = nodePx[i].x - pointer.x
        const dy = nodePx[i].y - pointer.y
        cand.push({ i, d2: dx * dx + dy * dy })
      }
      if (!cand.length) return
      cand.sort((a, b) => a.d2 - b.d2)
      const closest = cand.slice(0, ENTRY_POOL).map((c) => c.i)

      const cache = new Map<number, { prev: Int16Array; seen: Uint8Array }>()
      const bfs = (entry: number) => {
        const hit = cache.get(entry)
        if (hit) return hit
        const prev = new Int16Array(N).fill(-1)
        const seen = new Uint8Array(N)
        const queue: number[] = [entry]
        seen[entry] = 1
        for (let h = 0; h < queue.length; h++) {
          const u = queue[h]
          for (const v of neighbors[u]) {
            if (seen[v]) continue
            seen[v] = 1
            prev[v] = u
            queue.push(v)
          }
        }
        const res = { prev, seen }
        cache.set(entry, res)
        return res
      }

      for (let s = 0; s < SOURCE_COUNT; s++) {
        const entry = closest[(Math.random() * closest.length) | 0]
        const { prev, seen } = bfs(entry)
        const eligible = perimeter.filter((i) => seen[i] && t >= periReadyAt[i])
        if (!eligible.length) continue
        const target = eligible[(Math.random() * eligible.length) | 0]
        const path: number[] = []
        let u = target
        while (u !== -1) {
          path.push(u)
          if (u === entry) break
          u = prev[u]
        }
        path.reverse()
        pulses.push({ sx: pointer.x, sy: pointer.y, path, age: 0 })
        periReadyAt[target] = t + GROW_MS + PERI_COOLDOWN_MS
      }
    }

    function drawPulses(dt: number) {
      ctx.save()
      ctx.lineCap = 'round'
      const alive: typeof pulses = []
      for (const p of pulses) {
        p.age += dt * 1000
        if (p.age >= GROW_MS + FADE_MS) continue
        alive.push(p)
        const alpha = p.age < GROW_MS ? 1 : Math.max(0, 1 - (p.age - GROW_MS) / FADE_MS)
        if (alpha <= 0) continue
        const progress = Math.min(1, p.age / GROW_MS)

        // perimeter target -> ... -> entry -> mouse (glow travels inward)
        const pts: { x: number; y: number }[] = []
        const ptNode: number[] = []
        for (let ii = p.path.length - 1; ii >= 0; ii--) {
          pts.push(nodePx[p.path[ii]])
          ptNode.push(p.path[ii])
        }
        pts.push({ x: p.sx, y: p.sy })
        ptNode.push(-1)

        const seg: number[] = []
        let total = 0
        for (let kk = 1; kk < pts.length; kk++) {
          const l = Math.hypot(pts[kk].x - pts[kk - 1].x, pts[kk].y - pts[kk - 1].y)
          seg.push(l)
          total += l
        }
        const front = progress * total
        let remain = front
        for (let kk = 1; kk < pts.length && remain > 0; kk++) {
          const a = pts[kk - 1]
          const b = pts[kk]
          const l = seg[kk - 1]
          if (l <= 0) continue
          if (remain >= l) {
            beam(a.x, a.y, b.x, b.y, alpha * LINE_ALPHA, BEAM_T)
            remain -= l
          } else {
            const f = remain / l
            beam(a.x, a.y, a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, alpha * LINE_ALPHA, BEAM_T)
            remain = 0
          }
        }
        ctx.shadowColor = `rgba(${ACCENT}, ${alpha})`
        let acc = 0
        for (let kk = 0; kk < pts.length; kk++) {
          if (kk > 0) acc += seg[kk - 1]
          if (acc > front) break
          const ni = ptNode[kk]
          if (ni < 0) continue
          ctx.shadowBlur = 10
          ctx.fillStyle = `rgba(255, 252, 245, ${Math.min(1, alpha * 1.3)})`
          ctx.beginPath()
          ctx.arc(nodePx[ni].x, nodePx[ni].y, 1.8, 0, TAU)
          ctx.fill()
        }
      }
      ctx.restore()
      pulses = alive
    }

    function loop() {
      const t = performance.now()
      const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0.016
      lastT = t
      const moving = pointer.inside && t - lastMove < HOLD_MS
      // the shade (veil) persists while the cursor is over the thumbnail; the
      // pulses only fire while it's actually moving
      intensity += ((pointer.inside ? 1 : 0) - intensity) * (pointer.inside ? RISE : FALL)

      ctx.clearRect(0, 0, cssW, cssH)
      if (intensity > 0.004) {
        ctx.fillStyle = `rgba(12, 12, 14, ${VEIL_ALPHA * intensity})`
        ctx.fillRect(0, 0, cssW, cssH)
      }
      if (moving && t - beatAt >= BEAT_MS) {
        beatAt = t
        spawnPulses(t)
      }
      drawPulses(dt)
      // mouse node — only while actually moving (the shade alone persists at rest)
      if (moving) {
        ctx.save()
        ctx.shadowColor = `rgba(${ACCENT}, ${intensity})`
        ctx.shadowBlur = 14
        ctx.fillStyle = `rgba(255, 253, 248, ${Math.min(1, intensity * 1.4)})`
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 3.4, 0, TAU)
        ctx.fill()
        ctx.restore()
      }

      // keep running until fully idle, then stop to spare the CPU
      if (pointer.inside || intensity > 0.01 || pulses.length > 0) {
        raf = requestAnimationFrame(loop)
      } else {
        ctx.clearRect(0, 0, cssW, cssH)
        running = false
      }
    }

    function ensureRunning() {
      if (running) return
      running = true
      lastT = 0
      raf = requestAnimationFrame(loop)
    }

    function onMove(e: PointerEvent) {
      const rect = cv.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.inside = true
      lastMove = performance.now()
      ensureRunning()
    }
    function onEnter() {
      pointer.inside = true
      ensureRunning() // start the loop so the shade fades in even without movement
    }
    function onLeave() {
      pointer.inside = false
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
