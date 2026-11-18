<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const light = ref<HTMLDivElement | null>(null)
const particles = Array.from({ length: 46 }, (_, i) => ({
  left: ((i * 61.803 + 3) % 100) + '%',
  top: ((i * 37.157 + i * i * .37 + 7) % 100) + '%',
  opacity: .12 + (i % 5) * .035,
  '--size': i % 4 === 0 ? '2px' : '1px',
  animationDelay: -(i % 19) + 's',
  animationDuration: (16 + i % 11) + 's',
}))

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
    <i v-for="(style, index) in particles" :key="index" :style="style"></i>
  </div>
</template>

<style scoped>
.ambient { position:fixed; inset:0; overflow:hidden; pointer-events:none; z-index:-1; }
.cursor-glow { position:absolute; left:0; top:0; width:clamp(420px,70vw,940px); aspect-ratio:1; opacity:0; transition:opacity 240ms ease; background:radial-gradient(circle, rgb(63 132 157 / 18%),rgb(68 111 159 / 8%) 39%,transparent 70%); }
.ambient i { position:absolute; width:var(--size); height:var(--size); border-radius:50%; background:#b2dada; animation:drift ease-in-out infinite alternate; }
@keyframes drift { from {transform:translate(-3px,5px)} to {transform:translate(5px,-8px)} }
@media(prefers-reduced-motion:reduce) { .ambient i { animation:none; }.cursor-glow { display:none; } }
@media(max-width:700px) { .ambient i:nth-of-type(even) { display:none; } }
</style>
