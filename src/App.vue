<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CadModelViewer from './cad-viewer/CadModelViewer.vue'
import CircuitBackground from './components/CircuitBackground.vue'
import HeroSection from './sections/HeroSection/HeroSection.vue'
import AboutSection from './sections/AboutSection/AboutSection.vue'
import TechStackSection from './sections/TechStackSection/TechStackSection.vue'
import ExperienceSection from './sections/ExperienceSection/ExperienceSection.vue'
import ServicesSection from './sections/ServicesSection/ServicesSection.vue'
import ProjectsSection from './sections/ProjectsSection/ProjectsSection.vue'
import EducationSection from './sections/EducationSection/EducationSection.vue'
import CertificationsSection from './sections/CertificationsSection/CertificationsSection.vue'
import HackathonsSection from './sections/HackathonsSection/HackathonsSection.vue'
import RateMeSection from './sections/RateMeSection/RateMeSection.vue'

const compactNav = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentY = window.scrollY
  if (currentY > 70 && currentY > lastScrollY) {
    compactNav.value = true
  } else if (currentY < lastScrollY || currentY < 24) {
    compactNav.value = false
  }
  lastScrollY = currentY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Circuit trace background -->
  <CircuitBackground />
  <!-- Fixed 3D background, always behind page content -->
  <CadModelViewer model-url="/models/Arduino.stp" />

  <div class="page-shell">
    <header class="site-nav glass-col" :class="{ compact: compactNav }" aria-label="Primary">
      <a href="#" class="nav-brand" aria-label="drindlr home">
        <span class="nav-logo">D</span>
        <span class="nav-name">drindlr</span>
      </a>
      <nav class="nav-links">
        <a href="#about">About</a>
        <a href="#stack">Stack</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main class="app-main">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <HackathonsSection />
      <EducationSection />
      <CertificationsSection />
      <RateMeSection />
    </main>
  </div>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  width: min(1080px, calc(100% - 36px));
  padding: 14px 18px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  transition: padding 220ms ease, border-radius 220ms ease, top 220ms ease;
}

.site-nav.compact {
  top: 10px;
  padding: 8px 14px;
  border-radius: 14px;
}

.nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.nav-logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  color: #08111f;
  background: linear-gradient(135deg, #9eb1ff, #ff9ad8);
}

.site-nav.compact .nav-logo {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}

.nav-name {
  font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
  font-size: 1.08rem;
  letter-spacing: 0.02em;
  color: #f4f7ff;
  text-transform: lowercase;
}

.nav-links {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.nav-links a {
  text-decoration: none;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(236, 238, 244, 0.8);
  transition: color 140ms ease;
}

.nav-links a:hover {
  color: #f4f7ff;
}

.app-main {
  padding-top: 92px;
}

@media (max-width: 780px) {
  .site-nav {
    width: calc(100% - 20px);
    padding: 10px 12px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    font-size: 0.72rem;
    letter-spacing: 0.06em;
  }

  .nav-name {
    font-size: 0.98rem;
  }

  .app-main {
    padding-top: 82px;
  }
}

@media (max-width: 620px) {
  .nav-links {
    display: none;
  }

  .site-nav {
    justify-content: flex-start;
  }
}
</style>
