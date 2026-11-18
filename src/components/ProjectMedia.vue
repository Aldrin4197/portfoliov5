<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CatalogProject } from '../catalog'
import ArrowUpRight from './ArrowUpRight.vue'

const props = defineProps<{ project: CatalogProject }>()
const selected = ref(0)
const media = computed(() => {
  const { id, title, artwork, image } = props.project
  const items: { label: string; src: string; alt: string }[] = []
  if (artwork) {
    const isPoster = ['perchwise', 'aadi', 'stria'].includes(id)
    const label = isPoster ? 'Poster' : 'Screenshot'
    items.push({ label, src: artwork, alt: title + ' ' + label.toLowerCase() })
  }
  if (image) {
    const label = id === 'perchwise' ? 'Dashboard' : 'Interface'
    items.push({ label, src: image, alt: title + ' ' + label.toLowerCase() })
    if (id === 'perchwise') {
      items.push({ label: 'Splash screen', src: import.meta.env.BASE_URL + 'projects/perchwise-splash.webp', alt: 'PerchWise splash screen with its penguin mascot' })
    }
  }
  return items
})
const active = computed(() => media.value[selected.value])
</script>

<template>
  <figure v-if="active" class="project-media">
    <a class="media-image" :href="active.src" target="_blank" rel="noopener"
       :aria-label="'Open full-size ' + active.alt">
      <img :src="active.src" :alt="active.alt">
    </a>
    <figcaption>
      <div v-if="media.length > 1" class="views" role="group" aria-label="Project images">
        <button v-for="(item, i) in media" :key="item.src" type="button"
                :aria-pressed="selected === i" @click="selected = i">{{ item.label }}</button>
      </div>
      <a class="full-size" :href="active.src" target="_blank" rel="noopener">Full size <ArrowUpRight /></a>
    </figcaption>
  </figure>
</template>

<style scoped>
.project-media { margin:0 0 1rem; }
.media-image { display:grid; place-items:center; border-radius:4px; background:#0c1727; }
.media-image img { width:100%; height:clamp(190px,46vh,420px); object-fit:contain; }
figcaption, .views { display:flex; flex-wrap:wrap; align-items:center; gap:.35rem; }
figcaption { justify-content:space-between; margin-top:.6rem; }
.views button, .full-size { min-height:32px; padding:.25rem .6rem; font-size:.78rem; border-radius:4px; }
.views button[aria-pressed=true] { color:var(--accent); background:#19363d; }
.views button:hover, .full-size:hover { color:var(--accent); }
.full-size { margin-left:auto; }
</style>
