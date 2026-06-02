<script setup lang="ts">
import harvardImg from '../../assets/harvard.png'
import ssuImg from '../../assets/ssu.png'
import snsImg from '../../assets/sns.jpg'

const education = [
  {
    school: 'CS50x 2023',
    logo: harvardImg,
    link: 'https://cs50.harvard.edu/x/',
    degree: 'Introductory Computer Science Course',
    period: 'July 2023 – December 2023',
  },
  {
    school: 'Samar State University',
    logo: ssuImg,
    link: 'https://ssu.edu.ph/',
    degree: 'Bachelor of Science in Electronics Engineering',
    period: 'July 2014 – May 2019',
  },
  {
    school: 'Samar National School',
    logo: snsImg,
    link: 'https://www.sns.edu.ph/',
    degree: 'Secondary Education',
    period: 'July 2010 – March 2014',
  },
]
</script>

<template>
  <section id="education" class="section-full" data-section="education">
    <div class="glass-col">
      <p class="eyebrow">Education</p>
      <h2 class="section-heading">Academic Background</h2>

      <div class="edu-list">
        <div v-for="(edu, i) in education" :key="i" class="edu-item">
          <div class="edu-icon"><img :src="edu.logo" :alt="edu.school" class="edu-logo" /></div>
          <div class="edu-body">
            <a :href="edu.link" target="_blank" rel="noopener" class="edu-school">{{ edu.school }}</a>
            <p class="edu-degree">{{ edu.degree }}</p>
            <p class="edu-period">{{ edu.period }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.edu-item {
  display: flex;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.edu-icon {
  display: inline-flex;
  align-items: flex-start;
  padding-top: 2px;
  color: #9eb1ff;
  flex-shrink: 0;
}

.edu-logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  padding: 3px;
}

.edu-school {
  font-weight: 700;
  font-size: 1rem;
  color: #9eb1ff;
  text-decoration: none;
  transition: color 180ms ease;
}

.edu-school:hover {
  color: #c4d2ff;
}

.edu-degree {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.88rem;
  color: rgba(236, 238, 244, 0.76);
  margin: 4px 0 2px;
}

.edu-period {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: rgba(236, 238, 244, 0.38);
  margin: 0;
}
</style>
