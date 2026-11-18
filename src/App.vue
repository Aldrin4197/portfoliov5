<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import { catalog, activityLabel, type CatalogProject } from './catalog'
import ExperienceSection from './sections/ExperienceSection/ExperienceSection.vue'
import EducationSection from './sections/EducationSection/EducationSection.vue'
import CertificationsSection from './sections/CertificationsSection/CertificationsSection.vue'
import HackathonsSection from './sections/HackathonsSection/HackathonsSection.vue'

import portrait from './assets/me.png'
const katha = catalog.find(p => p.id === 'katha')!
const creativeCategories = ['Tabletop', 'Broadcast design']
const filter = ref('All projects')
const search = ref('')
const filtered = computed(() => {
  const query = search.value.trim().toLowerCase()
  return catalog.filter(p =>
    (filter.value === 'All projects' || p.category === filter.value ||
      (filter.value === 'Non-dev projects' && creativeCategories.includes(p.category))) &&
    [p.title, p.description, ...p.tags].join(' ').toLowerCase().includes(query)
  )
})
const detail = ref<CatalogProject | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)
const menuOpen = ref(false)

let opener: HTMLElement | null = null
function inspect(project: CatalogProject) {
 opener = document.activeElement as HTMLElement
 detail.value = project
 dialog.value?.showModal()
 document.body.style.overflow = 'hidden'
}
function closeDialog() { dialog.value?.close() }
function afterClose() { document.body.style.overflow = ''; opener?.focus() }
onBeforeUnmount(() => { document.body.style.overflow = '' })
const tools = [{name:'Frontend',items:'Vue · React · JavaScript · HTML & CSS'}, {name:'Backend',items:'Laravel · PHP · Node.js · REST APIs'}, {name:'Data',items:'MySQL · PostgreSQL · MongoDB'}, {name:'Hardware',items:'Arduino · Raspberry Pi · Embedded systems'}]
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="masthead wrap" id="home">
    <a href="#home" class="wordmark" aria-label="Drindlr home"><span class="monogram" aria-hidden="true">&gt;_</span>drindlr.</a>
    <button class="menu-button" aria-controls="menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}</button>
    <nav id="menu" :class="{ open: menuOpen }" aria-label="Primary navigation" @click="menuOpen = false">
      <a href="#projects">Work</a><a href="#about">About</a><a href="#katha">KATHA</a><a class="nav-contact" href="#contact">Get in touch ↗</a>
    </nav>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="intro-title">
      <div class="intro wrap">
        <div class="intro-copy">
          <p class="byline"><i aria-hidden="true"></i> Full-stack developer / Catbalogan, PH</p>
          <h1 id="intro-title">Aldrin Jay<br><em>Delos Reyes.</em></h1>
          <p class="lede">I turn complex workflows into software people can use. I build web apps for teams and local communities, and games that bring people together.</p>
          <div class="actions"><a class="button" href="#projects">Explore my work <span>↓</span></a><a class="inline-link" href="https://github.com/Aldrin4197">GitHub ↗</a></div>
        </div>
        <figure class="hero-portrait"><img :src="portrait" alt="Graduation portrait of Aldrin Jay Delos Reyes" width="820" height="1063" fetchpriority="high"></figure>
      </div>
    </section>
    <div class="stack-strip"><div class="wrap"><span>Core stack</span><b>Laravel</b><b>Vue.js</b><b>Flutter</b><b>MySQL</b></div></div>
    <section id="projects" class="work wrap">
      <div class="section-head"><h2>Project catalog<span class="dot">.</span></h2><label class="search-field">Search projects<input v-model="search" type="search" placeholder="Name, tool, or keyword"></label></div>
      <div class="catalog-controls"><div class="filters" aria-label="Project categories"><button v-for="category in ['All projects','Web apps','Mobile','Games','Hardware','Tabletop','Non-dev projects']" :key="category" :aria-pressed="category === filter" @click="filter = category">{{ category }}</button></div>
      <small aria-live="polite">{{ filtered.length }} of {{ catalog.length }} · Latest activity first</small></div>
      <p v-if="!filtered.length" class="empty">No matching projects. <button @click="search = ''; filter = 'All projects'">Reset filters</button></p>
      <div class="gallery">
        <article v-for="project in filtered" :key="project.id" class="entry">
          <button class="project-button" @click="inspect(project)" :aria-label="'View '+project.title">
            <span class="cover" :class="project.id">
              <img v-if="project.image" :src="project.image" alt="" loading="lazy"/>
              <span v-else-if="project.id === 'katha'" class="foil">KATHA</span>
              <span v-else-if="project.id === 'overlays'" class="broadcast-cover" aria-hidden="true"><i>● ON AIR</i><b>Matchday</b><span>Broadcast overlays</span></span>
              <span v-else class="photobooth">Amari’s <i>Photobooth</i></span>
            </span>
            <span class="entry-title">{{ project.title }}<span aria-hidden="true">↗</span></span>
          </button>
          <p>{{ activityLabel(project.activity) }} · <template v-if="creativeCategories.includes(project.category)">Non-dev / </template>{{ project.category }}<span v-if="['color','katha'].includes(project.id)"> · {{ project.status }}</span></p>
          <div class="catalog-desc">{{ project.description }}</div>
        </article>
      </div>
    </section>
    <section id="katha" class="feature">
      <div class="wrap feature-inner">
        <div><p class="byline">Non-dev project / Tabletop design</p><h2>KATHA</h2><p class="feature-copy">I’m turning Philippine folklore into a game you can gather around. Players encounter creatures, legends, and events across a shared board. I design the card effects and the routes that connect locations, then refine the rules through playtesting.</p><button class="feature-link" @click="inspect(katha)">Explore the game ↗</button></div>
        <div class="deck" aria-hidden="true"><div class="playing-card"></div><div class="playing-card"></div><div class="playing-card"><span>KATHA</span><b>✷</b><span>Philippine folklore</span></div></div>
      </div>
    </section>
    <section id="about" class="about wrap">
      <div><h2>How I work</h2><a class="inline-link" href="mailto:aldrinjay.delosreyes17@gmail.com?subject=CV%20request">Request my CV ↗</a></div>
      <div class="about-copy"><p class="statement">I start with the person doing the work, then build the system around them.</p>
        <p>At Samar State University, that has meant tools for managing employee records, tracking documents, and handling support requests. My electronics and firmware background helps me follow a problem across the interface, database, and device.</p>
        <p>Interaction design matters just as much. In Aadi, a map helps people compare nearby rentals. In Stria, a daily check-in makes the next action clear.</p>
        <dl><div v-for="item in tools" :key="item.name"><dt>{{ item.name }}</dt><dd>{{ item.items }}</dd></div></dl>
      </div>
      <details class="career"><summary>Experience, education & credentials <span>View details</span></summary><div class="history"><ExperienceSection/><EducationSection/><CertificationsSection/><HackathonsSection/></div></details>
    </section>
    <section id="contact" class="contact"><div class="wrap"><h2>What are you<br><em>working on?</em></h2><div><p>Tell me about the workflow you want to improve or the product you’re trying to build.</p><a class="button" href="mailto:aldrinjay.delosreyes17@gmail.com">Email Aldrin ↗</a></div></div></section>
  </main>
  <footer class="wrap"><a class="wordmark" href="#home">drindlr.</a><div><a href="https://github.com/Aldrin4197">GitHub ↗</a><a href="https://www.linkedin.com/in/aldrin-jay-delos-reyes-559817267/">LinkedIn ↗</a><a href="https://www.facebook.com/drindlr">Facebook ↗</a></div></footer>
  <dialog ref="dialog" aria-labelledby="detail-title" @close="afterClose" @click="event => { if(event.target === dialog) closeDialog() }">
    <div v-if="detail" class="dialog-content"><button class="close" autofocus @click="closeDialog" aria-label="Close project">Close ×</button>
      <img v-if="detail.image" class="detail-image" :src="detail.image" :alt="detail.title+' interface'"/>
      <div class="dialog-copy"><small>{{ detail.category }} · {{ detail.status }}</small><h2 id="detail-title">{{ detail.title }}</h2><p>{{ detail.description }}</p><small>{{ detail.tags.join(' · ') }}</small>
        <a v-if="detail.url" class="button" :href="detail.url" target="_blank" rel="noopener noreferrer">Visit project ↗</a><a v-else class="button" :href="'mailto:aldrinjay.delosreyes17@gmail.com?subject='+encodeURIComponent(detail.title)">Ask about this project ↗</a>
      </div>
    </div>
  </dialog>
</template>
