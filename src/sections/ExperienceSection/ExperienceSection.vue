<script setup lang="ts">
const experiences = [
  {
    role: 'Information Systems Analyst',
    company: 'Samar State University',
    period: 'Present',
    desc: 'Managing and securing university systems while providing IT support and resolving technical issues.',
    current: true,
  },
  {
    role: 'Firmware Developer',
    company: 'CreatorBox',
    period: '2022 – 2023',
    desc: 'Developed and maintained firmware for embedded systems, ensuring performance and functionality.',
    current: false,
  },
  {
    role: 'Special Science Teacher',
    company: 'DepEd Catbalogan',
    period: '2020 – 2022',
    desc: 'Delivered engaging science lessons using hands-on experiments and technology to enhance student learning.',
    current: false,
  },
]
</script>

<template>
  <section id="experience" data-section="experience">
    <h2>Where I’ve worked</h2>
    <div class="timeline hover-list">
      <article v-for="exp in experiences" :key="exp.company" class="timeline-item hover-row">
        <span class="timeline-period">{{ exp.period }}</span>
        <div>
          <h3>{{ exp.role }} · {{ exp.company }}</h3>
          <p>{{ exp.desc }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.timeline-item { display:grid; grid-template-columns:minmax(86px,24%) 1fr; gap:18px; }
.timeline-period { padding-top:3px; font:600 .7rem/1.6 ui-monospace,monospace; text-transform:uppercase; letter-spacing:.04em; }
.timeline-item p { font-size:.875rem; margin-top:5px; }
@media (max-width:500px) { .timeline-item { grid-template-columns:1fr; gap:4px; } }
</style>
