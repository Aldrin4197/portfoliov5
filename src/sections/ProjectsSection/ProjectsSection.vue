<script setup lang="ts">
import { computed, ref } from 'vue'
import hrmoImg    from '../../assets/proj1.png'   // proj1 = SSU HRMO
import airImg     from '../../assets/proj2.png'   // proj2 = Air Quality
import docImg     from '../../assets/proj3.png'   // proj3 = Document Tracking
import recruitImg from '../../assets/proj4.png'   // proj4 = Recruitment System
import mlbbImg    from '../../assets/proj6.png'   // proj6 = MLBB Draft Simulator
import ipovImg    from '../../assets/proj7.png'   // proj7 = iPOVCON 2025
import damsImg    from '../../assets/proj8.png'   // proj8 = Digital Assets
import helpdeskImg from '../../assets/proj9.png'  // proj9 = SSU Helpdesk
import ssuWebImg  from '../../assets/proj10.png'  // proj10 = SSU Website v2
import eaphImg    from '../../assets/eaph.png'    // Equity Access PH

const projects = [
  {
    title: 'SSU HRMO',
    status: 'Completed',
    img: hrmoImg,
    desc: 'Streamlines human resource processes and employee record management efficiently.',
    tags: ['Laravel', 'MySQL', 'Vue'],
  },
  {
    title: 'Air Quality Monitoring',
    status: 'Completed',
    img: airImg,
    desc: 'Monitors and analyzes air quality data for environmental safety.',
    tags: ['Embedded Systems', 'Laravel', 'MySQL'],
  },
  {
    title: 'SSU Digital Assets Management System',
    status: 'Completed',
    img: damsImg,
    desc: 'A comprehensive digital asset management system for SSU-ICT Unit.',
    tags: ['Laravel', 'MySQL', 'Vue'],
  },
  {
    title: 'Equity Access PH',
    status: 'Completed',
    img: eaphImg,
    desc: 'Unified College Admission System for CHED.',
    tags: ['Laravel', 'MySQL', 'Vue', 'React'],
  },
  {
    title: 'MLBB Draft Simulator V1',
    status: 'Completed',
    img: mlbbImg,
    desc: 'A web-based application for simulating drafts in Mobile Legends: Bang Bang.',
    tags: ['Vue', 'Node.js', 'Laravel', 'MySQL'],
  },
  {
    title: 'iPOVCON 2025',
    status: 'Completed',
    img: ipovImg,
    desc: 'Website for the 6th International Conference on Poverty Alleviation and Sustainable Development.',
    tags: ['WordPress', 'PHP', 'MySQL'],
  },
  {
    title: 'Document Tracking System',
    status: 'Completed',
    img: docImg,
    desc: 'Simplifies and tracks document processing for student enrollment systems.',
    tags: ['Vue', 'Laravel', 'PostgreSQL'],
  },
  {
    title: 'Personnel Recruitment System',
    status: 'Completed',
    img: recruitImg,
    desc: 'Manages hiring processes with advanced features and seamless automation.',
    tags: ['React', 'MongoDB', 'Node.js'],
  },
  {
    title: 'SSU Helpdesk',
    status: 'On-going',
    img: helpdeskImg,
    desc: 'Internal support ticketing system for Samar State University departments.',
    tags: ['Vue', 'Laravel', 'MySQL'],
  },
  {
    title: 'SSU Website v2',
    status: 'On-going',
    img: ssuWebImg,
    desc: 'Redesign and rebuild of the official Samar State University website.',
    tags: ['Vue', 'Laravel', 'MySQL'],
  },
]

const pageSize = 3
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(projects.length / pageSize))
const visibleProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return projects.slice(start, start + pageSize)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value -= 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}
</script>

<template>
  <section id="projects" class="section-full" data-section="projects">
    <div class="glass-col">
      <p class="eyebrow">Recent Projects</p>
      <h2 class="section-heading">Things I've Built</h2>
      <div class="projects-pager">
        <button class="pager-btn" type="button" @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span class="pager-meta">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pager-btn" type="button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
      <div class="projects-grid">
        <article v-for="proj in visibleProjects" :key="proj.title" class="project-card">
          <div v-if="proj.img" class="project-thumb">
            <img :src="proj.img" :alt="proj.title" loading="lazy" />
          </div>
          <div class="project-header">
            <strong>{{ proj.title }}</strong>
            <span class="status-badge" :class="proj.status === 'On-going' ? 'ongoing' : 'done'">
              {{ proj.status }}
            </span>
          </div>
          <p class="project-desc">{{ proj.desc }}</p>
          <div class="project-tags">
            <span v-for="tag in proj.tags" :key="tag" class="proj-tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-pager {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pager-btn {
  border: 1px solid rgba(236, 238, 244, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(236, 238, 244, 0.82);
  border-radius: 8px;
  padding: 6px 10px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.74rem;
  cursor: pointer;
}

.pager-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pager-meta {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.72rem;
  color: rgba(236, 238, 244, 0.58);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .projects-grid { grid-template-columns: 1fr; }
}

.project-card {
  padding: 0;
  border-radius: 14px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  transition: background 180ms ease, border-color 180ms ease;
}

.project-thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: rgba(0,0,0,0.3);
}

.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 300ms ease;
}

.project-card:hover .project-thumb img {
  transform: scale(1.04);
}

.project-card:hover {
  background: rgba(158, 177, 255, 0.04);
  border-color: rgba(158, 177, 255, 0.18);
}

.project-header {
  padding: 14px 16px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.project-header strong {
  font-size: 0.88rem;
  color: #f4f7ff;
  line-height: 1.3;
}

.status-badge {
  flex-shrink: 0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 2px 7px;
  border-radius: 5px;
  font-weight: 600;
}

.status-badge.done {
  background: rgba(126, 255, 200, 0.12);
  color: #7effc8;
  border: 1px solid rgba(126, 255, 200, 0.2);
}

.status-badge.ongoing {
  background: rgba(255, 221, 132, 0.12);
  color: #ffdd84;
  border: 1px solid rgba(255, 221, 132, 0.2);
}

.project-desc {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: rgba(236, 238, 244, 0.55);
  line-height: 1.5;
  margin: 0;
  padding: 6px 16px 0;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
  padding: 4px 16px 14px;
}

.proj-tag {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.68rem;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(158, 177, 255, 0.08);
  border: 1px solid rgba(158, 177, 255, 0.15);
  color: rgba(158, 177, 255, 0.8);
}
</style>
