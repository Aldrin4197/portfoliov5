<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0
let ctx: CanvasRenderingContext2D | null = null

// ── Types ────────────────────────────────────────────────
interface Node { x: number; y: number }
interface Segment { x1: number; y1: number; x2: number; y2: number; len: number }

interface Pulse {
  seg: Segment
  t: number       // 0..1 along segment
  speed: number
  brightness: number
  size: number
}

// ── Circuit state ─────────────────────────────────────────
let nodes: Node[] = []
let segments: Segment[] = []
let pulses: Pulse[] = []

const TRACE_COLOR    = 'rgba(90, 120, 255, 0.09)'
const NODE_COLOR     = 'rgba(120, 150, 255, 0.18)'
const PULSE_COLOR_1  = '#9eb1ff'
const PULSE_COLOR_2  = '#ff9ad8'
const PULSE_COLOR_3  = '#7effc8'
const PULSE_COLORS   = [PULSE_COLOR_1, PULSE_COLOR_2, PULSE_COLOR_3]

function buildCircuit(w: number, h: number) {
  nodes = []
  segments = []
  pulses = []

  // Sparse grid of nodes with slight jitter
  const cols = Math.ceil(w / 90) + 1
  const rows = Math.ceil(h / 90) + 1
  const cellW = w / (cols - 1)
  const cellH = h / (rows - 1)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.35) continue   // sparse — skip ~35% of nodes
      const jx = (Math.random() - 0.5) * cellW * 0.4
      const jy = (Math.random() - 0.5) * cellH * 0.4
      nodes.push({ x: c * cellW + jx, y: r * cellH + jy })
    }
  }

  // Connect nearby nodes with Manhattan-style traces (horizontal then vertical)
  const maxDist = Math.max(cellW, cellH) * 2.2
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    let connections = 0
    for (let j = i + 1; j < nodes.length && connections < 3; j++) {
      const b = nodes[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > maxDist) continue
      if (Math.random() < 0.42) continue   // randomly skip some connections

      // Manhattan: two segments via a corner point
      const corner = Math.random() < 0.5
        ? { x: b.x, y: a.y }   // horizontal first
        : { x: a.x, y: b.y }   // vertical first

      const addSeg = (x1: number, y1: number, x2: number, y2: number) => {
        const len = Math.sqrt((x2-x1)**2 + (y2-y1)**2)
        if (len > 4) segments.push({ x1, y1, x2, y2, len })
      }

      addSeg(a.x, a.y, corner.x, corner.y)
      addSeg(corner.x, corner.y, b.x, b.y)
      connections++
    }
  }

  // Seed initial pulses
  const count = Math.min(segments.length, 55)
  const pool = [...segments].sort(() => Math.random() - 0.5).slice(0, count)
  for (const seg of pool) {
    pulses.push(makePulse(seg))
  }
}

function makePulse(seg: Segment): Pulse {
  return {
    seg,
    t: Math.random(),
    speed: 0.00012 + Math.random() * 0.00022,
    brightness: 0.55 + Math.random() * 0.45,
    size: 1.8 + Math.random() * 1.4,
  }
}

function draw(ts: number) {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.clearRect(0, 0, w, h)

  // ── Traces ──────────────────────────────────────────────
  ctx.lineWidth = 1
  ctx.strokeStyle = TRACE_COLOR
  ctx.lineCap = 'round'

  for (const s of segments) {
    ctx.beginPath()
    ctx.moveTo(s.x1, s.y1)
    ctx.lineTo(s.x2, s.y2)
    ctx.stroke()
  }

  // ── Nodes (junction dots) ────────────────────────────────
  ctx.fillStyle = NODE_COLOR
  for (const n of nodes) {
    ctx.beginPath()
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // ── Pulses ───────────────────────────────────────────────
  for (const p of pulses) {
    p.t += p.speed * (ts || 16)   // ts is delta-time from rAF, approx 16ms

    if (p.t > 1) {
      // Pick a new segment to travel
      const next = segments[Math.floor(Math.random() * segments.length)]
      p.seg = next
      p.t = 0
      p.speed = 0.00012 + Math.random() * 0.00022
    }

    const { x1, y1, x2, y2 } = p.seg
    const px = x1 + (x2 - x1) * p.t
    const py = y1 + (y2 - y1) * p.t
    const colorHex = PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)]

    // Glow
    const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 5)
    grad.addColorStop(0, colorHex + 'cc')
    grad.addColorStop(0.3, colorHex + '55')
    grad.addColorStop(1, colorHex + '00')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(px, py, p.size * 5, 0, Math.PI * 2)
    ctx.fill()

    // Core dot
    ctx.fillStyle = colorHex
    ctx.globalAlpha = p.brightness * 0.85
    ctx.beginPath()
    ctx.arc(px, py, p.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

let prevTs = 0
function tick(ts: number) {
  const delta = ts - prevTs
  prevTs = ts
  draw(delta)
  animId = requestAnimationFrame(tick)
}

function resize() {
  if (!canvasRef.value) return
  canvasRef.value.width  = window.innerWidth
  canvasRef.value.height = window.innerHeight
  buildCircuit(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize, { passive: true })
  animId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="canvasRef" class="circuit-bg" aria-hidden="true"></canvas>
</template>

<style scoped>
.circuit-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  display: block;
}
</style>
