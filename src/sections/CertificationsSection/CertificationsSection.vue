<script setup lang="ts">
import udemyImg from '../../assets/udemy.webp'
import tesdaImg from '../../assets/tesda.png'
import cscImg from '../../assets/csc.png'

const certs = [
  {
    title: 'Laravel 11 and Vue 3 Mastery',
    issuer: 'TutsPrime Online Education – Udemy',
    logo: udemyImg,
    date: 'Feb. 2025',
    desc: 'Demonstrated expertise in Laravel development and advanced concepts.',
  },
  {
    title: 'National Certificate II in Computer Systems Servicing',
    issuer: 'TESDA',
    logo: tesdaImg,
    date: 'April 2021',
    desc: 'A TESDA-accredited qualification in the Philippines for installing, maintaining, and repairing computer systems and networks.',
  },
  {
    title: 'Career Service Professional',
    issuer: 'Civil Service Commission',
    logo: cscImg,
    date: 'July 2017',
    desc: 'A requirement for individuals aspiring to work in government professional positions, including technical, supervisory, and managerial roles.',
  },
]
</script>

<template>
  <section id="certifications" class="section-full" data-section="certifications">
    <div class="glass-col">
      <p class="eyebrow">Certifications</p>
      <h2 class="section-heading">Credentials</h2>

      <div class="cert-list">
        <div v-for="(cert, i) in certs" :key="i" class="cert-item">
          <img :src="cert.logo" :alt="cert.issuer" class="cert-logo" />
          <div class="cert-body">
            <div class="cert-header">
              <strong>{{ cert.title }}</strong>
              <span class="cert-date">{{ cert.date }}</span>
            </div>
            <p class="cert-issuer">{{ cert.issuer }}</p>
            <p class="cert-desc">{{ cert.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.cert-item {
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.cert-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
  background: rgba(255,255,255,0.06);
  padding: 4px;
}

.cert-body {
  flex: 1;
  min-width: 0;
}

.cert-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.cert-header strong {
  font-size: 0.92rem;
  color: #f4f7ff;
  line-height: 1.3;
}

.cert-date {
  flex-shrink: 0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.7rem;
  color: rgba(236, 238, 244, 0.38);
}

.cert-issuer {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: #9eb1ff;
  margin: 0 0 6px;
}

.cert-desc {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: rgba(236, 238, 244, 0.5);
  line-height: 1.5;
  margin: 0;
}
</style>
