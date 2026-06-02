<script setup lang="ts">
import IconGlobe from '../../icons/IconGlobe.vue'
import IconGradCap from '../../icons/IconGradCap.vue'
import IconServer from '../../icons/IconServer.vue'
import IconEdit from '../../icons/IconEdit.vue'
import IconCpu from '../../icons/IconCpu.vue'
import IconPalette from '../../icons/IconPalette.vue'
import IconClipboard from '../../icons/IconClipboard.vue'
import IconMonitor from '../../icons/IconMonitor.vue'
import type { Component } from 'vue'

interface Service { icon: Component; title: string; desc: string }

const services: Service[] = [
  { icon: IconGlobe,     title: 'Fullstack Web Development', desc: 'Responsive and optimized websites for businesses and individuals.' },
  { icon: IconGradCap,   title: 'Capstone Consultation',     desc: 'Mentorship and technical guidance for student projects.' },
  { icon: IconServer,    title: 'Backend Services',          desc: 'API development, database design, and server setup.' },
  { icon: IconEdit,      title: 'CMS Development',           desc: 'Custom CMS solutions for content management needs (WordPress, etc.).' },
  { icon: IconCpu,       title: 'Hardware Prototyping',      desc: 'Development of embedded systems for various applications (Arduino, Raspberry Pi, etc.).' },
  { icon: IconPalette,   title: 'UI & UX Design',            desc: 'Creating user-friendly interfaces and experiences for applications.' },
  { icon: IconClipboard, title: 'Project Management',        desc: 'Efficient software planning and execution for projects.' },
  { icon: IconMonitor,   title: 'Custom Software',           desc: 'Tailored software solutions to meet specific business needs.' },
]
</script>

<template>
  <section id="services" class="section-full" data-section="services">
    <div class="glass-col">
      <p class="eyebrow">Services</p>
      <h2 class="section-heading">What I Offer</h2>
      <div class="services-grid">
        <div v-for="svc in services" :key="svc.title" class="service-card">
          <span class="svc-icon"><component :is="svc.icon" :size="20" /></span>
          <strong>{{ svc.title }}</strong>
          <p>{{ svc.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.service-card {
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: background 180ms ease, border-color 180ms ease;
}

.service-card:hover {
  background: rgba(158, 177, 255, 0.06);
  border-color: rgba(158, 177, 255, 0.18);
}

.svc-icon {
  display: inline-flex;
  color: #9eb1ff;
  margin-bottom: 2px;
}

.service-card strong {
  font-size: 0.88rem;
  color: #f4f7ff;
  line-height: 1.3;
}

.service-card p {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: rgba(236, 238, 244, 0.55);
  line-height: 1.5;
  margin: 0;
}
</style>
