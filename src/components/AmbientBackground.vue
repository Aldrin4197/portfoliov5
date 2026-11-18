<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const light = ref<HTMLDivElement | null>(null)
// Each bank fans out from a common bus, with 45-degree turns on a six-unit grid.
const banks = [
  { x: -4, y: 8, angle: 0 }, { x: 30, y: -4, angle: 90 },
  { x: 76, y: 3, angle: 180 }, { x: 93, y: 27, angle: 90 },
  { x: 36, y: 37, angle: 180 }, { x: -9, y: 53, angle: 0 },
  { x: 70, y: 66, angle: 180 }, { x: 92, y: 83, angle: 180 },
  { x: 12, y: 91, angle: 0 },
]
const lanes = Array.from({ length: 5 }, (_, i) => {
  const start = 12 + i * 6
  const bend = 42 + i * 3
  const end = 192 - i * 6
  return {
    start, end, finish: start + 30,
    route: `M8 ${start} H${bend} l24 24 h48 l6 6 H${end}`,
  }
})

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
    <svg v-for="(bank, index) in banks" :key="index" class="trace-bank"
      viewBox="0 0 200 84" focusable="false"
      :style="{ left: bank.x + '%', top: bank.y + '%', transform: 'rotate(' + bank.angle + 'deg)' }">
      <rect x="2" y="8" width="6" height="32" rx="1" class="bus"/>
      <g v-for="(lane, i) in lanes" :key="i">
        <path :d="lane.route" class="wire"/>
        <circle :cx="lane.end + 2" :cy="lane.finish" r="2" class="via"/>
        <path v-if="i !== 2" :d="lane.route" class="signal" pathLength="100"
          :style="{ '--delay': -(index * 1.7 + i * 2.8) + 's', '--duration': (8 + (index + i) % 5) + 's' }" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.ambient { position:fixed; inset:0; overflow:hidden; pointer-events:none; z-index:-1; }
.cursor-glow { position:absolute; left:0; top:0; width:clamp(420px,70vw,940px); aspect-ratio:1; opacity:0; transition:opacity 240ms ease; background:radial-gradient(circle, rgb(63 132 157 / 18%),rgb(68 111 159 / 8%) 39%,transparent 70%); }
.trace-bank { position:absolute; width:clamp(170px,19vw,310px); overflow:visible; }
.trace-bank path { fill:none; stroke-linecap:round; stroke-linejoin:round; }
.wire { stroke:rgb(118 178 188 / 14%); stroke-width:.75; }
.bus,.via { fill:var(--bg); stroke:rgb(128 197 198 / 24%); stroke-width:.9; }
.signal { stroke:#9ce5d9; stroke-width:1.6; stroke-dasharray:1.8 104;
  animation:transmit var(--duration) linear var(--delay) infinite; }
@keyframes transmit {
  0% { stroke-dashoffset:2; opacity:0; }
  10% { opacity:.49; }
  57% { opacity:.37; }
  68%,100% { stroke-dashoffset:-100; opacity:0; }
}
@media (prefers-reduced-motion:reduce) { .signal,.cursor-glow { display:none; animation:none; } }
@media (max-width:700px) {
  .trace-bank { width:145px; opacity:.82; }
  .trace-bank:nth-of-type(3n + 2) { display:none; }
}
</style>
