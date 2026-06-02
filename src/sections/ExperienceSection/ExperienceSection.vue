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
  <section id="experience" class="section-full" data-section="experience">
    <div class="glass-col">
      <p class="eyebrow">Experience</p>
      <h2 class="section-heading">Where I've Worked</h2>

      <div class="timeline">
        <div v-for="(exp, i) in experiences" :key="i" class="timeline-item">
          <div class="timeline-dot" :class="{ current: exp.current }"></div>
          <div class="timeline-body">
            <div class="timeline-header">
              <strong>{{ exp.role }}</strong>
              <span class="timeline-period">{{ exp.period }}</span>
            </div>
            <p class="timeline-company">{{ exp.company }}</p>
            <p class="timeline-desc">{{ exp.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 24px;
  padding-left: 16px;
  border-left: 1px solid rgba(236, 238, 244, 0.10);
}

.timeline-item {
  display: flex;
  gap: 16px;
  padding-bottom: 28px;
  position: relative;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(158, 177, 255, 0.35);
  border: 2px solid rgba(158, 177, 255, 0.5);
  flex-shrink: 0;
  margin-top: 4px;
  margin-left: -21px;
}

.timeline-dot.current {
  background: #9eb1ff;
  border-color: #9eb1ff;
  box-shadow: 0 0 10px rgba(158, 177, 255, 0.5);
}

.timeline-body {
  flex: 1;
}

.timeline-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.timeline-header strong {
  font-size: 1rem;
  color: #f4f7ff;
}

.timeline-period {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: rgba(236, 238, 244, 0.42);
  white-space: nowrap;
}

.timeline-company {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.82rem;
  color: #9eb1ff;
  margin: 3px 0 8px;
}

.timeline-desc {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  color: rgba(236, 238, 244, 0.62);
  line-height: 1.6;
  margin: 0;
}
</style>
