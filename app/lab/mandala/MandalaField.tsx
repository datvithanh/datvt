'use client'

import { useEffect, useRef, useState } from 'react'
import { MANDALA_NODES, FRAME_ASPECT } from './nodes'

const LOOP_SRC = '/images/bootcamp-session-loop.gif' // last ~second, loops forever
const STILL_SRC = '/images/bootcamp-session-still.png' // reduced-motion fallback
const ACCENT = '196, 163, 90' // --accent #c4a35a
const TAU = Math.PI * 2

// Tuning knobs
const DIM_ALPHA = 0.16 // ambient brightness of the looping grid
const NEIGHBOR_F = 0.2 // node<->node link distance, fraction of width
const EDGE_OFFSET = 0.06 // how far beyond the frame the perimeter nodes sit (0..1 units)
const SOURCE_COUNT = 3 // pulses launched per beat
const BEAT_MS = 150 // how often new pulses are launched
const GROW_MS = 350 // a pulse glows out from the mouse to the perimeter over this long
const FADE_MS = 450 // then the whole line fades to nothing over this long
const PERI_COOLDOWN_MS = 550 // a perimeter node is un-targetable this long after it's reached
const BEAM_T = 0.85 // beam width/glow factor
const LINE_ALPHA = 0.6 // base line translucency (1 = opaque)
const ENTRY_POOL = 3 // first jump goes to a random one of the N closest nodes
const HOLD_MS = 120 // keep launching pulses this long after the last movement
const RISE = 0.5 // how fast the mouse node appears on movement
const FALL = 0.2 // how fast it fades once idle
const EDGE_ARC_MIN_DEG = 0
const EDGE_ARC_MAX_DEG = 60 // max arc per edge. each edge picks a random value in [min,max], with random sign.
const DISTRIBUTION_TYPE: 'uniform' | 'normal' = 'normal' // 'uniform' = flat across the range; 'normal' = bell-curved around the midpoint (σ = range/6, clamped)
const EDGE_ARC_FILTER = 0.2 // fraction of edges that actually get curved (0 = all straight, 1 = all curved)
const ARC_STEPS = 10 // polyline samples per curved edge (higher = smoother)
const GRID_JITTER_MIN = 0 // min displacement per participant node (fraction of frame width)
const GRID_JITTER_MAX = 0.1 // max displacement; set > 0 to randomize the grid. 0 = canonical mandala layout.
const GRID_JITTER_DIST: 'uniform' | 'normal' = 'uniform' // 'uniform' = flat; 'normal' = bell-curved around the midpoint
const CLICK_HOLD_MS = 2500 // when clicked, the nearest pulse stays fully lit this long before fading

// Contemplative dwell breath — stillness triggers a single inhale → exhale →
// burst, then a sparse idle cadence until the cursor moves again.
const DWELL_THRESHOLD_MS = 700 // cursor still this long → enter DWELL_BREATH
const BREATH_INHALE_MS = 1400 // ring grows (easeOutCubic)
const BREATH_EXHALE_MS = 900 // ring contracts (easeInQuad)
const BREATH_GROW_MS = 700 // burst pulse travel time, cursor → perimeter
const BREATH_FADE_MS = 450 // burst pulse fade after arrival
const BREATH_RING_R_FRAC = 0.18 // ring peak radius, fraction of cssW
const BREATH_RING_ALPHA = 0.35 // ring stroke alpha at peak
const BREATH_BEAM_T = 0.55 // burst pulse intensity (vs 0.85 active)
const BREATH_LINE_ALPHA = 0.35 // burst pulse base alpha (vs 0.60 active)
const BREATH_RING_FADE_MS = 150 // ring fade-out when a breath is interrupted by motion
const BREATH_BURST_ENTRIES = 3 // breath-out explodes from this many nearby nodes (was 1)
const BREATH_ENTRY_POOL = 6 // ...drawn at random from the N closest participant nodes

// Idle ambient breaths — same lifecycle as the dwell breath, quieter. The four
// values below are authoritative targets (tuned by feel, not derived).
const IDLE_PERIOD_MS = 10000 // ms between ambient breaths (from last burst)
const IDLE_RING_SCALE = 0.55 // ring peak radius vs dwell (~10% of width)
const IDLE_RING_ALPHA = 0.2 // ring stroke alpha at peak (vs 0.35 dwell)
const IDLE_BEAM_T = 0.4 // burst intensity (vs 0.55 dwell)
const IDLE_LINE_ALPHA = 0.22 // burst line alpha (vs 0.35 dwell)
const IDLE_PERI_FRACTION = 0.33 // share of reachable perimeters lit per ambient burst

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInQuad = (x: number) => x * x

type BreathParams = {
  ringRFrac: number // ring peak radius as a fraction of cssW
  ringAlpha: number // ring stroke alpha at peak
  beamT: number // burst beam intensity
  lineAlpha: number // burst line alpha
  periFraction: number // share of reachable perimeters lit (1 = all)
}
const DWELL_PARAMS: BreathParams = {
  ringRFrac: BREATH_RING_R_FRAC,
  ringAlpha: BREATH_RING_ALPHA,
  beamT: BREATH_BEAM_T,
  lineAlpha: BREATH_LINE_ALPHA,
  periFraction: 1,
}
const IDLE_PARAMS: BreathParams = {
  ringRFrac: BREATH_RING_R_FRAC * IDLE_RING_SCALE,
  ringAlpha: IDLE_RING_ALPHA,
  beamT: IDLE_BEAM_T,
  lineAlpha: IDLE_LINE_ALPHA,
  periFraction: IDLE_PERI_FRACTION,
}

// Sample one value in [lo, hi]. 'uniform' is flat; 'normal' is Box-Muller
// centred at the midpoint with σ = range/6 so ≈99.7% lands inside before clamping.
function sampleInRange(lo: number, hi: number, dist: 'uniform' | 'normal'): number {
  if (hi <= lo) return lo
  if (dist === 'normal') {
    const mean = (lo + hi) / 2
    const sd = (hi - lo) / 6
    const u1 = Math.random() || 1e-9
    const u2 = Math.random()
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(TAU * u2)
    return Math.max(lo, Math.min(hi, mean + z * sd))
  }
  return lo + Math.random() * (hi - lo)
}

type FieldNode = { x: number; y: number; edge: boolean }

// Participant nodes (from the gif) plus a ring of off-frame "exit" nodes aligned
// to the grid columns/rows, so outward-propagating light can travel past the
// gallery and clip at the screen edge.
const ALL_NODES: FieldNode[] = (() => {
  const uniq = (vals: number[]) => [...new Set(vals)].sort((a, b) => a - b)
  const xs = uniq(MANDALA_NODES.map((n) => n.x))
  const ys = uniq(MANDALA_NODES.map((n) => n.y))
  const o = EDGE_OFFSET
  // canonical positions — runtime jitter (if any) is applied per-mount inside
  // the component so the Randomize / Straighten buttons can mutate it live.
  const out: FieldNode[] = MANDALA_NODES.map((n) => ({ x: n.x, y: n.y, edge: false }))
  for (const x of xs) {
    out.push({ x, y: -o, edge: true }) // top
    out.push({ x, y: 1 + o, edge: true }) // bottom
  }
  for (const y of ys) {
    out.push({ x: -o, y, edge: true }) // left
    out.push({ x: 1 + o, y, edge: true }) // right
  }
  return out
})()

/**
 * On a slow beat (while the cursor moves), pulses ignite at random perimeter
 * (off-frame) nodes and glow inward along grid paths to a node rendered at the
 * mouse over ~0.35s, then the whole line fades over ~0.45s. A perimeter node is
 * un-targetable for ~0.55s after it fires. Reduced motion -> still frame.
 */
export function MandalaField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  // imperative hooks the toolbar buttons reach into the canvas effect with
  const randomizeRef = useRef<() => void>(() => {})
  const straightenRef = useRef<() => void>(() => {})
  const [showNodes, setShowNodes] = useState(false) // bright-grid debug toggle
  const showNodesRef = useRef(false)
  useEffect(() => { showNodesRef.current = showNodes }, [showNodes])
  const [showTools, setShowTools] = useState(true) // collapses the slider + button panels

  // live-tunable knobs (defaults seeded from the module constants). Refs mirror
  // state so the canvas RAF reads current values without restarting the effect.
  const [filterRate, setFilterRate] = useState(EDGE_ARC_FILTER)
  const [arcMin, setArcMin] = useState(EDGE_ARC_MIN_DEG)
  const [arcMax, setArcMax] = useState(EDGE_ARC_MAX_DEG)
  const filterRateRef = useRef(EDGE_ARC_FILTER)
  const arcMinRef = useRef(EDGE_ARC_MIN_DEG)
  const arcMaxRef = useRef(EDGE_ARC_MAX_DEG)
  useEffect(() => { filterRateRef.current = filterRate }, [filterRate])
  useEffect(() => { arcMinRef.current = arcMin }, [arcMin])
  useEffect(() => { arcMaxRef.current = arcMax }, [arcMax])

  useEffect(() => {
    const canvas = canvasRef.current
    const image = imgRef.current
    if (!canvas || !image) return
    const c = canvas.getContext('2d')
    if (!c) return
    // non-null aliases — narrowing isn't preserved inside the closures below
    const cv = canvas
    const img = image
    const ctx = c

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // reduced-motion suppresses *autonomous* motion only — the looping gif and the
    // idle/dwell ambient breaths. Touch/pointer interaction and the render loop stay
    // live so tapping and dragging still light pulses. (Gating interaction on
    // `reduced` previously left the field completely dead for reduce-motion users.)
    const animateBg = !reduced

    img.src = animateBg ? LOOP_SRC : STILL_SRC

    let ready = false
    let raf = 0
    let cssW = 0
    let cssH = 0
    // content box: a FRAME_ASPECT region scaled to *cover* the canvas, centered.
    // the gif + node grid live in here so they keep proportions at any viewport
    // aspect (e.g. full-bleed on a portrait phone). offX/offY go negative when
    // the box overflows and is cropped. On desktop the box == the canvas.
    let contentW = 0
    let contentH = 0
    let offX = 0
    let offY = 0
    let nodePx: { x: number; y: number }[] = []
    let neighbors: number[][] = []
    let perimeter: number[] = [] // perimeter (off-frame) target nodes
    let periReadyAt = new Float32Array(0) // ms when each node becomes targetable again
    // arcs[k] is the signed arc (radians) for the edge between path[k] and path[k+1].
    // poly/ptNode/seg/total are precomputed at spawn so drawPulses + click hit-testing
    // share the same geometry. holdMs is set by clicks to pause the fade.
    type Pulse = {
      path: number[]
      arcs: number[]
      poly: { x: number; y: number }[]
      ptNode: number[]
      seg: number[]
      total: number
      age: number
      holdMs: number
    }
    let pulses: Pulse[] = []
    let beatAt = 0 // ms of the last pulse launch
    const pointer = { x: 0, y: 0, inside: false }
    let lastMove = -1e9
    let lastT = 0 // ms of previous frame, for dt
    let intensity = 0 // eased 0..1 mouse-node visibility
    // Contemplative dwell breath state. The field rewards stillness with one
    // inhale → exhale → burst, then a sparse idle cadence until movement.
    let mode: 'active' | 'breath' | 'idle' = 'active'
    let breathStartAt = 0 // performance.now() when the current breath began
    let lastBreathBurstAt = -1e9 // performance.now() of the most recent burst
    let burstFired = false // has this breath's burst already launched?
    let breathCx = 0 // ring centre (cursor position captured at breath start)
    let breathCy = 0
    let breathParams: BreathParams = DWELL_PARAMS // dwell vs idle amplitude set
    let breathPulses: Pulse[] = [] // burst pulses (cursor → perimeter), drawn separately
    let breathLit = new Uint8Array(0) // per-node: lit by the inhale wavefront this breath
    let breathLitAt = new Float32Array(0) // ms when each node was lit
    // a ring left fading after a motion interrupt (no burst follows it)
    const ringFade = { active: false, startAt: 0, r: 0, a: 0 }
    // normalized per-node offsets applied when building nodePx; mutated by the
    // Randomize / Straighten buttons. Perimeter nodes stay on the canonical grid.
    let jitter: { dx: number; dy: number }[] = ALL_NODES.map(() => ({ dx: 0, dy: 0 }))

    function buildJitter(min: number, max: number, dist: 'uniform' | 'normal') {
      if (max <= 0) {
        jitter = ALL_NODES.map(() => ({ dx: 0, dy: 0 }))
        return
      }
      jitter = ALL_NODES.map((n) => {
        if (n.edge) return { dx: 0, dy: 0 }
        const r = sampleInRange(min, max, dist)
        const a = Math.random() * TAU
        return { dx: Math.cos(a) * r, dy: Math.sin(a) * r }
      })
    }
    buildJitter(GRID_JITTER_MIN, GRID_JITTER_MAX, GRID_JITTER_DIST)

    function resize() {
      const rect = cv.getBoundingClientRect()
      cssW = rect.width
      cssH = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cssW * dpr)
      cv.height = Math.round(cssH * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // cover-fit the FRAME_ASPECT content box to the canvas, centered. The box
      // always keeps aspect = FRAME_ASPECT, so the grid never distorts; on a
      // portrait viewport it just overflows left/right and is cropped.
      if (cssW / cssH > FRAME_ASPECT) {
        contentW = cssW
        contentH = cssW / FRAME_ASPECT
      } else {
        contentH = cssH
        contentW = cssH * FRAME_ASPECT
      }
      offX = (cssW - contentW) / 2
      offY = (cssH - contentH) / 2
      // node pixel positions (with live jitter) + neighbor graph (for path-finding)
      nodePx = ALL_NODES.map((n, i) => ({
        x: offX + (n.x + jitter[i].dx) * contentW,
        y: offY + (n.y + jitter[i].dy) * contentH,
      }))
      const nd = contentW * NEIGHBOR_F
      neighbors = nodePx.map((p, i) => {
        const list: number[] = []
        for (let j = 0; j < nodePx.length; j++) {
          if (j === i) continue
          if (ALL_NODES[i].edge && ALL_NODES[j].edge) continue // perimeter nodes don't interlink
          if (Math.hypot(nodePx[j].x - p.x, nodePx[j].y - p.y) < nd) list.push(j)
        }
        return list
      })
      // perimeter (off-frame) nodes are the pulse targets
      perimeter = ALL_NODES.map((_, i) => i).filter((i) => ALL_NODES[i].edge)
      periReadyAt = new Float32Array(ALL_NODES.length)
      pulses = []
      // breath geometry is pixel-dependent — reset it on resize
      breathLit = new Uint8Array(ALL_NODES.length)
      breathLitAt = new Float32Array(ALL_NODES.length)
      breathPulses = []
      mode = 'active'
      burstFired = false
      ringFade.active = false
      if (!animateBg) drawStatic()
    }

    function drawBgDim() {
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.fillStyle = '#111114'
      ctx.fillRect(0, 0, cssW, cssH)
      ctx.globalAlpha = DIM_ALPHA
      ctx.drawImage(img, offX, offY, contentW, contentH) // current gif frame, cover-fit
      ctx.globalAlpha = 1
    }

    function drawNodesFaint() {
      const bright = showNodesRef.current
      ctx.fillStyle = bright ? `rgba(${ACCENT}, 0.85)` : `rgba(${ACCENT}, 0.14)`
      const r = bright ? 2.6 : 1.5
      if (bright) {
        ctx.shadowColor = `rgba(${ACCENT}, 0.55)`
        ctx.shadowBlur = 8
      }
      for (let i = 0; i < ALL_NODES.length; i++) {
        if (ALL_NODES[i].edge) continue // perimeter sits off-frame
        ctx.beginPath()
        ctx.arc(nodePx[i].x, nodePx[i].y, r, 0, TAU)
        ctx.fill()
      }
      if (bright) ctx.shadowBlur = 0
    }

    // One intense beam: a wide amber bloom under a white-hot core. Strokes the
    // whole polyline in a single path so each pulse costs two shadow-blur strokes
    // total, not two per segment.
    function beamPath(pts: { x: number; y: number }[], a: number, t: number) {
      if (pts.length < 2) return
      ctx.shadowColor = `rgba(${ACCENT}, ${a})`
      ctx.shadowBlur = 26 * t
      ctx.strokeStyle = `rgba(${ACCENT}, ${0.55 * a})`
      ctx.lineWidth = 3.6 * t + 0.6
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
      ctx.stroke()

      ctx.shadowBlur = 12 * t
      ctx.strokeStyle = `rgba(255, 252, 242, ${Math.min(1, a * 1.25)})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
      ctx.stroke()
    }

    // Launch up to SOURCE_COUNT pulses from the mouse, each toward a random
    // off-cooldown perimeter node, along the shortest grid path.
    function spawnPulses(t: number) {
      const N = nodePx.length
      // the ENTRY_POOL closest participant nodes to the mouse — each pulse picks
      // one at random as its first jump (so it's not always the single nearest)
      const cand: { i: number; d2: number }[] = []
      for (let i = 0; i < N; i++) {
        if (ALL_NODES[i].edge) continue
        const dx = nodePx[i].x - pointer.x
        const dy = nodePx[i].y - pointer.y
        cand.push({ i, d2: dx * dx + dy * dy })
      }
      if (!cand.length) return
      cand.sort((a, b) => a.d2 - b.d2)
      const closest = cand.slice(0, ENTRY_POOL).map((c) => c.i)

      // BFS from a given entry, cached so a repeated entry isn't recomputed
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
        path.reverse() // [entry, ..., target]
        // one random arc per edge in the path (signed degrees -> radians)
        const arcs = new Array(Math.max(0, path.length - 1))
        for (let k = 0; k < arcs.length; k++) {
          if (Math.random() >= filterRateRef.current) {
            arcs[k] = 0 // edge stays straight
            continue
          }
          const deg = sampleInRange(arcMinRef.current, arcMaxRef.current, DISTRIBUTION_TYPE)
          arcs[k] = (Math.random() < 0.5 ? -1 : 1) * (deg * Math.PI) / 180
        }
        // build the full polyline once: perimeter target -> ... -> entry -> mouse.
        // curved edges are sampled as quadratic Beziers so straight-line front/length
        // math stays valid and click hit-testing has stable geometry.
        const poly: { x: number; y: number }[] = []
        const ptNode: number[] = []
        for (let ii = path.length - 1; ii >= 0; ii--) {
          poly.push(nodePx[path[ii]])
          ptNode.push(path[ii])
          if (ii > 0) {
            const theta = arcs[ii - 1]
            const a = nodePx[path[ii]]
            const b = nodePx[path[ii - 1]]
            if (Math.abs(theta) > 1e-4) {
              const dx = b.x - a.x
              const dy = b.y - a.y
              const L = Math.hypot(dx, dy)
              if (L > 0) {
                const ctrlOffset = L * Math.tan(theta / 4)
                const nx = -dy / L
                const ny = dx / L
                const cx = (a.x + b.x) / 2 + nx * ctrlOffset
                const cy = (a.y + b.y) / 2 + ny * ctrlOffset
                for (let st = 1; st < ARC_STEPS; st++) {
                  const u = st / ARC_STEPS
                  const omu = 1 - u
                  const x = omu * omu * a.x + 2 * omu * u * cx + u * u * b.x
                  const y = omu * omu * a.y + 2 * omu * u * cy + u * u * b.y
                  poly.push({ x, y })
                  ptNode.push(-1)
                }
              }
            }
          }
        }
        poly.push({ x: pointer.x, y: pointer.y })
        ptNode.push(-1)
        const seg: number[] = []
        let total = 0
        for (let kk = 1; kk < poly.length; kk++) {
          const l = Math.hypot(poly[kk].x - poly[kk - 1].x, poly[kk].y - poly[kk - 1].y)
          seg.push(l)
          total += l
        }
        pulses.push({ path, arcs, poly, ptNode, seg, total, age: 0, holdMs: 0 })
        // un-targetable while en route, plus PERI_COOLDOWN_MS after it's reached
        periReadyAt[target] = t + GROW_MS + PERI_COOLDOWN_MS
      }
    }

    // Advance every pulse in `arr`: glow grows over growMs, optionally holds at
    // full alpha for holdMs (set by clicks), then fades over fadeMs. Returns the
    // survivors. Shared by ACTIVE pulses and the breath burst — the burst passes
    // its own (softer, slower) constants and a cursor → perimeter polyline.
    function drawPulses(
      dt: number,
      arr: Pulse[],
      growMs: number,
      fadeMs: number,
      beamT: number,
      lineAlpha: number,
    ): Pulse[] {
      ctx.save()
      ctx.lineCap = 'round'
      const alive: Pulse[] = []
      for (const p of arr) {
        p.age += dt * 1000
        const lifespan = growMs + p.holdMs + fadeMs
        if (p.age >= lifespan) continue
        alive.push(p)
        const alpha =
          p.age < growMs + p.holdMs
            ? 1
            : Math.max(0, 1 - (p.age - growMs - p.holdMs) / fadeMs)
        if (alpha <= 0) continue
        const progress = Math.min(1, p.age / growMs)
        const front = progress * p.total

        // truncated polyline up to the travelling front, batched into one stroke
        const drawn: { x: number; y: number }[] = [p.poly[0]]
        let remain = front
        for (let kk = 1; kk < p.poly.length && remain > 0; kk++) {
          const a = p.poly[kk - 1]
          const b = p.poly[kk]
          const l = p.seg[kk - 1]
          if (l <= 0) continue
          if (remain >= l) {
            drawn.push(b)
            remain -= l
          } else {
            const f = remain / l
            drawn.push({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f })
            remain = 0
          }
        }
        beamPath(drawn, alpha * lineAlpha, beamT)
        // light the nodes the front has already reached (from the outside in)
        ctx.shadowColor = `rgba(${ACCENT}, ${alpha})`
        let acc = 0
        for (let kk = 0; kk < p.poly.length; kk++) {
          if (kk > 0) acc += p.seg[kk - 1]
          if (acc > front) break
          const ni = p.ptNode[kk]
          if (ni < 0) continue
          ctx.shadowBlur = 12
          ctx.fillStyle = `rgba(255, 252, 245, ${Math.min(1, alpha * 1.3)})`
          ctx.beginPath()
          ctx.arc(nodePx[ni].x, nodePx[ni].y, 2.2, 0, TAU)
          ctx.fill()
        }
      }
      ctx.restore()
      return alive
    }

    // The node rendered at the mouse — the origin every pulse launches from.
    function drawMouseNode(k: number) {
      ctx.save()
      ctx.shadowColor = `rgba(${ACCENT}, ${k})`
      ctx.shadowBlur = 16
      ctx.fillStyle = `rgba(255, 253, 248, ${Math.min(1, k * 1.4)})`
      ctx.beginPath()
      ctx.arc(pointer.x, pointer.y, 4, 0, TAU)
      ctx.fill()
      ctx.restore()
    }

    // Begin a breath: capture the cursor as the ring centre, pick dwell vs idle
    // amplitude, and clear the per-breath node-lighting flags.
    function beginBreath(t: number, params: BreathParams) {
      mode = 'breath'
      breathStartAt = t
      breathParams = params
      breathCx = pointer.x
      breathCy = pointer.y
      burstFired = false
      breathLit.fill(0)
      ringFade.active = false
    }

    // Ring radius + stroke alpha for a given elapsed time. Inhale grows out
    // (easeOutCubic), exhale contracts back (easeInQuad) with alpha rising
    // slightly as energy gathers. Returns null once the ring has collapsed.
    function ringGeom(elapsed: number): { r: number; alpha: number; inhaling: boolean } | null {
      const peakR = breathParams.ringRFrac * contentW
      if (elapsed < BREATH_INHALE_MS) {
        const p = elapsed / BREATH_INHALE_MS
        return { r: peakR * easeOutCubic(p), alpha: breathParams.ringAlpha * (0.4 + 0.6 * p), inhaling: true }
      }
      if (elapsed < BREATH_INHALE_MS + BREATH_EXHALE_MS) {
        const p = (elapsed - BREATH_INHALE_MS) / BREATH_EXHALE_MS
        return { r: peakR * (1 - easeInQuad(p)), alpha: Math.min(1, breathParams.ringAlpha * (1 + 0.3 * p)), inhaling: false }
      }
      return null
    }

    function strokeRing(cx: number, cy: number, r: number, alpha: number) {
      if (r <= 0.5 || alpha <= 0.001) return
      ctx.save()
      ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
      ctx.lineWidth = 1.5
      ctx.shadowColor = `rgba(${ACCENT}, ${alpha})`
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, TAU)
      ctx.stroke()
      ctx.restore()
    }

    // The concentric breath ring (no white-hot core — that's what distinguishes
    // it from ACTIVE pulses). On the inhale it lights participant nodes as the
    // wavefront sweeps past them.
    function drawBreathRing(t: number) {
      const g = ringGeom(t - breathStartAt)
      if (!g) return
      strokeRing(breathCx, breathCy, g.r, g.alpha)
      if (!g.inhaling) return
      for (let i = 0; i < ALL_NODES.length; i++) {
        if (ALL_NODES[i].edge || breathLit[i]) continue
        const d = Math.hypot(nodePx[i].x - breathCx, nodePx[i].y - breathCy)
        if (d <= g.r) {
          breathLit[i] = 1
          breathLitAt[i] = t
        }
      }
    }

    // Soft amber dots where the inhale wavefront passed, decaying over ~400ms.
    function drawBreathLitNodes(t: number) {
      const DECAY = 400
      const peakA = 0.5 * (breathParams.ringAlpha / BREATH_RING_ALPHA)
      ctx.save()
      ctx.shadowColor = `rgba(${ACCENT}, ${peakA})`
      ctx.shadowBlur = 8
      for (let i = 0; i < ALL_NODES.length; i++) {
        if (!breathLit[i]) continue
        const e = t - breathLitAt[i]
        if (e >= DECAY) continue
        ctx.fillStyle = `rgba(${ACCENT}, ${peakA * (1 - e / DECAY)})`
        ctx.beginPath()
        ctx.arc(nodePx[i].x, nodePx[i].y, 2.4, 0, TAU)
        ctx.fill()
      }
      ctx.restore()
    }

    // Motion interrupt: snapshot the current ring so it can fade out gracefully
    // over BREATH_RING_FADE_MS instead of being hard-cut. No burst follows.
    function startRingFade(t: number) {
      const g = ringGeom(t - breathStartAt)
      if (!g || g.r <= 0.5) return
      ringFade.active = true
      ringFade.startAt = t
      ringFade.r = g.r
      ringFade.a = g.alpha
    }

    function drawRingFade(t: number) {
      const e = t - ringFade.startAt
      if (e >= BREATH_RING_FADE_MS) {
        ringFade.active = false
        return
      }
      strokeRing(breathCx, breathCy, ringFade.r, ringFade.a * (1 - e / BREATH_RING_FADE_MS))
    }

    // The burst: simultaneous pulses from the cursor outward to every reachable
    // perimeter node (a random IDLE_PERI_FRACTION of them for ambient breaths).
    // Polyline is stored cursor → perimeter so the glow grows outward in
    // drawPulses (opposite of spawnPulses' perimeter → cursor ordering).
    function spawnBreathBurst(t: number) {
      const N = nodePx.length
      // The breath-out explodes from BREATH_BURST_ENTRIES nearby nodes (not just
      // the single nearest): pick them at random from the closest BREATH_ENTRY_POOL
      // participant nodes, BFS from each, then route each perimeter through a
      // random one of them so the fan grows outward from several stems.
      const cand: { i: number; d2: number }[] = []
      for (let i = 0; i < N; i++) {
        if (ALL_NODES[i].edge) continue
        const dx = nodePx[i].x - breathCx
        const dy = nodePx[i].y - breathCy
        cand.push({ i, d2: dx * dx + dy * dy })
      }
      if (!cand.length) return
      cand.sort((a, b) => a.d2 - b.d2)
      const pool = cand.slice(0, BREATH_ENTRY_POOL).map((c) => c.i)
      // shuffle the pool (Fisher–Yates) and take the first few as seeds
      for (let i = pool.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0
        ;[pool[i], pool[j]] = [pool[j], pool[i]]
      }
      const entries = pool.slice(0, Math.min(BREATH_BURST_ENTRIES, pool.length))
      const trees = entries.map((entry) => {
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
        return { entry, prev, seen }
      })
      const frac = breathParams.periFraction
      for (const target of perimeter) {
        if (frac < 1 && Math.random() >= frac) continue // sparse ambient layer
        // route this perimeter through a random seed that can reach it
        const reaching = trees.filter((tr) => tr.seen[target])
        if (!reaching.length) continue
        const { entry, prev } = reaching[(Math.random() * reaching.length) | 0]
        const path: number[] = []
        let u = target
        while (u !== -1) {
          path.push(u)
          if (u === entry) break
          u = prev[u]
        }
        path.reverse() // [entry, ..., target]
        const arcs = new Array(Math.max(0, path.length - 1))
        for (let k = 0; k < arcs.length; k++) {
          if (Math.random() >= filterRateRef.current) {
            arcs[k] = 0
            continue
          }
          const deg = sampleInRange(arcMinRef.current, arcMaxRef.current, DISTRIBUTION_TYPE)
          arcs[k] = ((Math.random() < 0.5 ? -1 : 1) * (deg * Math.PI)) / 180
        }
        // poly: cursor -> entry -> ... -> target (outward), curved edges sampled
        // as quadratic Beziers so front/length math stays straight-line valid.
        const poly: { x: number; y: number }[] = [{ x: breathCx, y: breathCy }]
        const ptNode: number[] = [-1]
        poly.push(nodePx[path[0]])
        ptNode.push(path[0])
        for (let ii = 1; ii < path.length; ii++) {
          const theta = arcs[ii - 1]
          const a = nodePx[path[ii - 1]]
          const b = nodePx[path[ii]]
          if (Math.abs(theta) > 1e-4) {
            const dx = b.x - a.x
            const dy = b.y - a.y
            const L = Math.hypot(dx, dy)
            if (L > 0) {
              const ctrlOffset = L * Math.tan(theta / 4)
              const nx = -dy / L
              const ny = dx / L
              const cx = (a.x + b.x) / 2 + nx * ctrlOffset
              const cy = (a.y + b.y) / 2 + ny * ctrlOffset
              for (let st = 1; st < ARC_STEPS; st++) {
                const uu = st / ARC_STEPS
                const omu = 1 - uu
                poly.push({
                  x: omu * omu * a.x + 2 * omu * uu * cx + uu * uu * b.x,
                  y: omu * omu * a.y + 2 * omu * uu * cy + uu * uu * b.y,
                })
                ptNode.push(-1)
              }
            }
          }
          poly.push(b)
          ptNode.push(path[ii])
        }
        const seg: number[] = []
        let total = 0
        for (let kk = 1; kk < poly.length; kk++) {
          const l = Math.hypot(poly[kk].x - poly[kk - 1].x, poly[kk].y - poly[kk - 1].y)
          seg.push(l)
          total += l
        }
        breathPulses.push({ path, arcs, poly, ptNode, seg, total, age: 0, holdMs: 0 })
        // one breath event, not a rate-controlled stream: ignore periReadyAt on
        // spawn, but give each lit perimeter a beat of silence afterward.
        periReadyAt[target] = t + BREATH_GROW_MS + PERI_COOLDOWN_MS
      }
    }

    function drawStatic() {
      if (!ready) return
      drawBgDim()
      drawNodesFaint()
    }

    function loop() {
      const t = performance.now()
      const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0.016
      lastT = t
      const moving = pointer.inside && t - lastMove < HOLD_MS
      const stillMs = pointer.inside ? t - lastMove : 0
      intensity += ((moving ? 1 : 0) - intensity) * (moving ? RISE : FALL)

      // state machine: movement → ACTIVE; sustained stillness → one DWELL breath;
      // then IDLE ambient breaths on a sparse cadence until movement resumes.
      if (moving) {
        if (mode === 'breath') startRingFade(t) // interrupt: fade the ring, no burst
        mode = 'active'
      } else if (animateBg && mode === 'active' && pointer.inside && stillMs >= DWELL_THRESHOLD_MS) {
        beginBreath(t, DWELL_PARAMS) // autonomous breaths only when motion is allowed
      } else if (animateBg && mode === 'idle' && pointer.inside && t - lastBreathBurstAt >= IDLE_PERIOD_MS) {
        beginBreath(t, IDLE_PARAMS)
      }

      drawBgDim()
      drawNodesFaint()
      // ACTIVE pulse spawning is suppressed during a breath (moving is false)
      if (moving && t - beatAt >= BEAT_MS) {
        beatAt = t
        spawnPulses(t)
      }
      pulses = drawPulses(dt, pulses, GROW_MS, FADE_MS, BEAM_T, LINE_ALPHA)

      if (mode === 'breath') {
        drawBreathRing(t)
        const breathElapsed = t - breathStartAt
        const ringDone = BREATH_INHALE_MS + BREATH_EXHALE_MS
        if (breathElapsed >= ringDone && !burstFired) {
          spawnBreathBurst(t)
          burstFired = true
          lastBreathBurstAt = t
        }
        if (breathElapsed >= ringDone + BREATH_GROW_MS + BREATH_FADE_MS) {
          mode = 'idle' // movement promotes back to 'active' via the first branch
          burstFired = false
        }
      }
      if (ringFade.active) drawRingFade(t)
      drawBreathLitNodes(t)
      breathPulses = drawPulses(dt, breathPulses, BREATH_GROW_MS, BREATH_FADE_MS, breathParams.beamT, breathParams.lineAlpha)

      if (intensity > 0.02) drawMouseNode(intensity)
      raf = requestAnimationFrame(loop)
    }

    function setPointerFromEvent(e: PointerEvent) {
      const rect = cv.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.inside = true
      lastMove = performance.now()
    }
    function onMove(e: PointerEvent) {
      setPointerFromEvent(e)
    }
    function onDown(e: PointerEvent) {
      setPointerFromEvent(e) // a tap on iPhone (no prior hover) needs this to seed pulse spawning
      latchNearest(pointer.x, pointer.y) // and to latch the closest active beam if any
      if (e.pointerType !== 'mouse') {
        // prevent the page from scrolling / handling this as a tap-zoom
        e.preventDefault()
      }
    }
    function onUp(e: PointerEvent) {
      // touch / pen: lifting the finger ends the "moving" state
      if (e.pointerType !== 'mouse') pointer.inside = false
    }
    function onLeave() {
      pointer.inside = false
    }

    // iOS Safari often fires touchstart that suppresses synthetic pointerdown,
    // so we wire native touch handlers in parallel. preventDefault keeps the
    // page from scrolling / zooming under the gesture.
    function setPointerFromTouch(t: Touch) {
      const rect = cv.getBoundingClientRect()
      pointer.x = t.clientX - rect.left
      pointer.y = t.clientY - rect.top
      pointer.inside = true
      lastMove = performance.now()
    }
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 0) return
      setPointerFromTouch(e.touches[0])
      latchNearest(pointer.x, pointer.y)
      e.preventDefault()
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 0) return
      setPointerFromTouch(e.touches[0])
      e.preventDefault()
    }
    function onTouchEnd() {
      pointer.inside = false
    }

    // Squared distance from (px,py) to the segment (ax,ay)->(bx,by)
    function distToSegSq(
      px: number, py: number,
      ax: number, ay: number,
      bx: number, by: number,
    ): number {
      const dx = bx - ax
      const dy = by - ay
      const L2 = dx * dx + dy * dy
      let t = L2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0
      t = Math.max(0, Math.min(1, t))
      const ex = px - (ax + dx * t)
      const ey = py - (ay + dy * t)
      return ex * ex + ey * ey
    }

    // Pointer-down latches the pulse whose polyline passes nearest the click/tap
    // point. The pulse jumps to fully-grown if it was mid-fade and holds for
    // CLICK_HOLD_MS. No-op if no pulses are alive.
    function latchNearest(px: number, py: number) {
      let best: Pulse | null = null
      let bestD2 = Infinity
      for (const p of pulses) {
        for (let i = 1; i < p.poly.length; i++) {
          const a = p.poly[i - 1]
          const b = p.poly[i]
          const d2 = distToSegSq(px, py, a.x, a.y, b.x, b.y)
          if (d2 < bestD2) {
            bestD2 = d2
            best = p
          }
        }
      }
      if (!best) return
      if (best.age > GROW_MS) best.age = GROW_MS
      best.holdMs = CLICK_HOLD_MS
    }

    function start() {
      ready = true
      resize()
      // the loop always runs; under reduced-motion it just paints a still
      // background and skips autonomous breaths (gated inside loop()).
      raf = requestAnimationFrame(loop)
    }

    // toolbar actions: button -> randomize/straighten jitter, then rebuild
    // pixel positions + neighbor graph and reset in-flight pulses.
    randomizeRef.current = () => {
      const max = GRID_JITTER_MAX > 0 ? GRID_JITTER_MAX : 0.025
      const min = GRID_JITTER_MAX > 0 ? GRID_JITTER_MIN : 0
      buildJitter(min, max, GRID_JITTER_DIST)
      resize()
    }
    straightenRef.current = () => {
      buildJitter(0, 0, GRID_JITTER_DIST)
      resize()
    }

    if (img.complete && img.naturalWidth) start()
    else img.onload = start

    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    // always attached — interaction is independent of reduced-motion
    cv.addEventListener('pointermove', onMove)
    cv.addEventListener('pointerdown', onDown)
    cv.addEventListener('pointerup', onUp)
    cv.addEventListener('pointercancel', onUp)
    cv.addEventListener('pointerleave', onLeave)
    // touchstart/move with passive:false so preventDefault actually works
    cv.addEventListener('touchstart', onTouchStart, { passive: false })
    cv.addEventListener('touchmove', onTouchMove, { passive: false })
    cv.addEventListener('touchend', onTouchEnd)
    cv.addEventListener('touchcancel', onTouchEnd)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      cv.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerdown', onDown)
      cv.removeEventListener('pointerup', onUp)
      cv.removeEventListener('pointercancel', onUp)
      cv.removeEventListener('pointerleave', onLeave)
      cv.removeEventListener('touchstart', onTouchStart)
      cv.removeEventListener('touchmove', onTouchMove)
      cv.removeEventListener('touchend', onTouchEnd)
      cv.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  return (
    <div
      // aspect-[1.9512] mirrors FRAME_ASPECT (640/328). The canvas/img below are
      // position:absolute inset:0, so they fill this box directly. Below md the box
      // becomes a fixed full-viewport overlay; MandalaField cover-fits the grid.
      className="relative w-full overflow-hidden rounded border border-border bg-bg-primary shadow-[var(--shadow-soft)] aspect-[1.9512] max-md:fixed max-md:inset-0 max-md:z-50 max-md:aspect-auto max-md:rounded-none max-md:border-0 max-md:shadow-none"
    >
      {/* Animation source for the canvas; occluded by the opaque canvas above. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none' }}
      />
      <canvas
        ref={canvasRef}
        aria-label="Bootcamp sangha — participant nodes that connect to your moving cursor"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          background: '#111114',
          touchAction: 'none', // capture iPhone touch as pointer events instead of scroll/zoom
        }}
      />
      <div className="absolute left-2 top-2 z-[2] flex flex-col gap-1.5">
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label={showTools ? 'Hide tools' : 'Show tools'}
            aria-pressed={showTools}
            onClick={() => setShowTools((s) => !s)}
            className={`flex h-9 w-9 touch-manipulation cursor-pointer items-center justify-center rounded border backdrop-blur-sm transition ${
              showTools
                ? 'border-accent/80 bg-accent/15 text-accent'
                : 'border-border/60 bg-bg-primary/80 text-text-muted hover:border-accent/70 hover:text-accent'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
            </svg>
          </button>
          {showTools && (
            <>
              <button
                type="button"
                aria-pressed={showNodes}
                onClick={() => setShowNodes((s) => !s)}
                className={`touch-manipulation cursor-pointer rounded border px-3 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm transition ${
                  showNodes
                    ? 'border-accent/80 bg-accent/15 text-accent'
                    : 'border-border/60 bg-bg-primary/80 text-text-muted hover:border-accent/70 hover:text-accent'
                }`}
              >
                {showNodes ? 'Hide nodes' : 'Show nodes'}
              </button>
              <button
                type="button"
                onClick={() => randomizeRef.current()}
                className="touch-manipulation cursor-pointer rounded border border-border/60 bg-bg-primary/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-text-muted backdrop-blur-sm transition hover:border-accent/70 hover:text-accent"
              >
                Randomize
              </button>
              <button
                type="button"
                onClick={() => straightenRef.current()}
                className="touch-manipulation cursor-pointer rounded border border-border/60 bg-bg-primary/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-text-muted backdrop-blur-sm transition hover:border-accent/70 hover:text-accent"
              >
                Straighten
              </button>
            </>
          )}
        </div>
        {showTools && (
          <div className="flex flex-col gap-1 rounded border border-border/60 bg-bg-primary/80 p-2 backdrop-blur-sm">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-text-muted">
              <span className="w-14">Filter</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={filterRate}
                onChange={(e) => setFilterRate(parseFloat(e.target.value))}
                className="h-1 w-24 accent-[var(--color-accent,#c4a35a)]"
              />
              <span className="w-10 text-right tabular-nums text-accent">{Math.round(filterRate * 100)}%</span>
            </label>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-text-muted">
              <span className="w-14">Arc min</span>
              <input
                type="range"
                min={0}
                max={180}
                step={1}
                value={arcMin}
                onChange={(e) => setArcMin(parseInt(e.target.value, 10))}
                className="h-1 w-24 accent-[var(--color-accent,#c4a35a)]"
              />
              <span className="w-10 text-right tabular-nums text-accent">{arcMin}&deg;</span>
            </label>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-text-muted">
              <span className="w-14">Arc max</span>
              <input
                type="range"
                min={0}
                max={180}
                step={1}
                value={arcMax}
                onChange={(e) => setArcMax(parseInt(e.target.value, 10))}
                className="h-1 w-24 accent-[var(--color-accent,#c4a35a)]"
              />
              <span className="w-10 text-right tabular-nums text-accent">{arcMax}&deg;</span>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
