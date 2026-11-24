<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ index: number }>()
const palettes = [
  { base: '#253f4b', shell: '#9ed9cf', visor: '#22434b', lights: '#dcf5c0' },
  { base: '#353950', shell: '#b9b2dd', visor: '#3d3657', lights: '#f5dcad' },
  { base: '#443b3b', shell: '#e4b295', visor: '#4d424a', lights: '#fce4bd' },
  { base: '#253c55', shell: '#9cbbd6', visor: '#283e5d', lights: '#bde9e4' },
]
const variant = computed(() => props.index % palettes.length)
const ink = computed(() => palettes[variant.value]!)
</script>

<template>
  <svg class="avatar" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
    <circle cx="22" cy="22" r="22" :fill="ink.base"/>
    <path d="M8 44q1-11 14-11t14 11" :fill="ink.shell" opacity=".65"/>
    <path :d="variant % 2 ? 'M22 15V8h6' : 'M22 16V8'" fill="none" :stroke="ink.shell" stroke-width="2"/>
    <circle :cx="variant % 2 ? 28 : 22" cy="8" r="2.1" :fill="ink.lights"/>
    <rect x="8" y="16" width="28" height="16" rx="5" :fill="ink.visor"/>
    <rect x="10" y="13" width="24" height="20" :rx="variant % 2 ? 5 : 9" :fill="ink.shell"/>
    <rect x="13" y="18" width="18" height="9" rx="4.5" :fill="ink.visor"/>
    <g :fill="ink.lights">
      <template v-if="variant === 1"><rect x="16" y="21" width="4" height="2" rx="1"/><circle cx="26" cy="22" r="1.6"/></template>
      <path v-else-if="variant === 2" d="m15 23 3-4 3 4h-2l-1-1.4-1 1.4zm8 0 3-4 3 4h-2l-1-1.4-1 1.4z"/>
      <template v-else><circle cx="18" cy="22.5" :r="variant === 3 ? 2 : 1.4"/><circle cx="26" cy="22.5" r="1.4"/></template>
    </g>
    <path d="M20 29h4" :stroke="ink.visor" stroke-width="1.3" stroke-linecap="round"/>
  </svg>
</template>

<style scoped>
.avatar { width:36px; height:36px; flex:none; border-radius:50%; box-shadow:0 0 0 1px #ffffff17; }
</style>
