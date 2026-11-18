<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const light = ref<HTMLDivElement | null>(null)
// Coordinates are local to each trace so their angles stay crisp at any viewport size.
const traces = [
  { x: 1, y: 12, route: '0,50 34,50 67,17 144,17', end: [144,17] },
  { x: 72, y: 3, route: '0,50 45,50 75,20 122,20', end: [122,20] },
  { x: 39, y: 28, route: '0,50 54,50 84,80 150,80', end: [150,80] },
  { x: 89, y: 36, route: '0,50 48,50 80,18 130,18', end: [130,18] },
  { x: 5, y: 63, route: '0,50 65,50 94,21 146,21', end: [146,21] },
  { x: 58, y: 74, route: '0,50 40,50 68,78 134,78', end: [134,78] },
  { x: 22, y: 88, route: '0,50 32,50 70,12 138,12', end: [138,12] },
  { x: 82, y: 92, route: '0,50 60,50 88,22 142,22', end: [142,22] },
]

let frame = 0
let x = 0
let y = 0
function paint() {
  frame = 0
  if (!light.value) return
  light.value.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`
  light.value.style.opacity = '1'
}
function follow(event: PointerEvent) {
  if (event.pointerType === 'touch') return hide()
  x = event.clientX
  y = event.clientY
  if (!frame) frame = requestAnimationFrame(paint)
}
function hide() {
  cancelAnimationFrame(frame)
  frame = 0
  if (light.value) light.value.style.opacity = '0'
}

let motion: MediaQueryList
function syncMotion() {
  window.removeEventListener('pointermove', follow)
  hide()
  if (motion.matches) window.addEventListener('pointermove', follow, { passive: true })
}
onMounted(() => {
  motion = matchMedia('(any-hover: hover) and (prefers-reduced-motion: no-preference)')
  syncMotion()
  motion.addEventListener('change', syncMotion)
  document.documentElement.addEventListener('pointerleave', hide)
  window.addEventListener('blur', hide)
})
onBeforeUnmount(() => {
  motion?.removeEventListener('change', syncMotion)
  window.removeEventListener('pointermove', follow)
  document.documentElement.removeEventListener('pointerleave', hide)
  window.removeEventListener('blur', hide)
  hide()
})
</script>

<template>
  <div class="ambient" aria-hidden="true">
    <div ref="light" class="cursor-glow"></div>
    <svg v-for="(trace, index) in traces" :key="trace.route" class="trace"
      viewBox="-4 0 160 90" focusable="false"
      :style="{ left: trace.x + '%', top: trace.y + '%', '--delay': -index * 1.9 + 's', '--duration': (9 + index % 4) + 's' }">
      <polyline :points="trace.route" class="wire" />
      <circle cx="0" cy="50" r="2" class="node" />
      <circle :cx="trace.end[0]" :cy="trace.end[1]" r="2" class="node" />
      <polyline :points="trace.route" pathLength="100" class="signal" />
    </svg>
  </div>
</template>

<style scoped>
.ambient { position:fixed; inset:0; overflow:hidden; pointer-events:none; z-index:-1; }
.cursor-glow { position:absolute; left:0; top:0; width:clamp(420px,70vw,940px); aspect-ratio:1; opacity:0; transition:opacity 240ms ease; background:radial-gradient(circle, rgb(63 132 157 / 18%),rgb(68 111 159 / 8%) 39%,transparent 70%); }
.trace { position:absolute; width:clamp(108px,12vw,180px); overflow:visible; }
.trace polyline { fill:none; stroke-linecap:round; stroke-linejoin:round; }
.wire { stroke:rgb(131 221 207 / 13%); stroke-width:1; }
.node { fill:var(--bg); stroke:rgb(131 221 207 / 30%); stroke-width:1; }
.signal { stroke:rgb(156 235 222 / 52%); stroke-width:1.6; stroke-dasharray:3 107;
  animation:transmit var(--duration) linear var(--delay) infinite; }
@keyframes transmit {
  0% { stroke-dashoffset:3; opacity:0; }
  6% { opacity:1; }
  62%,100% { stroke-dashoffset:-100; opacity:0; }
}
@media(prefers-reduced-motion:reduce) { .signal,.cursor-glow { display:none; animation:none; } }
@media(max-width:700px) { .trace:nth-of-type(even) { display:none; } }
</style>
