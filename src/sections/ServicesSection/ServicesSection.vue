<script setup lang="ts">
import IconGlobe from '../../icons/IconGlobe.vue'
import IconServer from '../../icons/IconServer.vue'
import IconMonitor from '../../icons/IconMonitor.vue'
import IconTool from '../../icons/IconTool.vue'
import IconPalette from '../../icons/IconPalette.vue'
import IconGradCap from '../../icons/IconGradCap.vue'
import ArrowUpRight from '../../components/ArrowUpRight.vue'
import { catalog, type CatalogProject } from '../../catalog'

const emit = defineEmits<{ inspect: [project: CatalogProject] }>()
const services = [
  { title: 'Web & mobile apps', icon: IconGlobe, copy: 'Let your customers find, book, and manage your services in one place.', project: 'aadi' },
  { title: 'Internal tools & APIs', icon: IconServer, copy: 'Connect your records and give your team a clear view of incoming requests.', project: 'ssu-helpdesk' },
  { title: 'Esports overlays', icon: IconMonitor, copy: 'Bring the draft, score, and standout plays into your live broadcast.', project: 'overlays' },
  { title: 'Hardware prototypes', icon: IconTool, copy: 'Test your idea with sensors, firmware, and a working dashboard.', project: 'air-quality-monitoring' },
  { title: 'Interface design', icon: IconPalette, copy: 'Make the next step easy to find on the screens your users visit every day.', project: 'stria' },
  { title: 'Capstone guidance', icon: IconGradCap, copy: 'Turn your research question into a prototype you can build, test, and explain.', project: '' },
].map(service => ({ ...service, example: catalog.find(p => p.id === service.project) }))
</script>

<template>
  <section id="services" aria-labelledby="services-title">
    <h2 id="services-title">How I can help you</h2>
    <div class="services-grid">
      <article v-for="service in services" :key="service.title" class="service-card">
        <component :is="service.icon" :size="24" class="service-icon" aria-hidden="true" />
        <h3>{{ service.title }}</h3>
        <p>{{ service.copy }}</p>
        <button v-if="service.example" class="service-link" @click="emit('inspect', service.example)">{{ service.example.title }} <ArrowUpRight /></button>
        <a v-else class="service-link" href="mailto:aldrinjay.delosreyes17@gmail.com?subject=Capstone%20consultation">Discuss your capstone <ArrowUpRight /></a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.services-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr)); gap:12px; }
.service-card { position:relative; display:flex; flex-direction:column; align-items:flex-start; min-width:0; padding:20px; border:1px solid #93afca28; border-radius:9px; background:linear-gradient(145deg,#1b3045c9,#152437d9); transition:border-color 160ms, background-color 160ms; }
.service-card:is(:hover,:focus-within) { border-color:#82cfc580; background-color:#264752; }
.service-icon { color:var(--accent); margin-bottom:14px; }
.service-card h3 { font-size:16px; letter-spacing:-.02em; }
.service-card p { margin:6px 0 16px; font-size:14px; line-height:1.5; }
.service-link { margin-top:auto; font-size:12px; font-weight:650; color:var(--accent); text-align:left; }
.service-link::after { content:''; position:absolute; inset:0; border-radius:9px; }
.service-link:focus-visible { outline:none; }
.service-card:has(:focus-visible) { outline:2px solid var(--accent); outline-offset:3px; }
.service-card:is(:hover,:focus-within) .service-link { text-decoration:underline; text-underline-offset:3px; }
</style>
