<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { catalog, activityLabel, type CatalogProject } from './catalog'
import { reviews } from './reviews'
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
const pageSize = 3
const limit = ref(pageSize)
watch([search, filter], () => { limit.value = pageSize })
const visible = computed(() => filtered.value.slice(0, limit.value))
const offers = [
  { title: 'Web & mobile apps', copy: 'Give your customers one place to find your services and book with you.', project: 'aadi' },
  { title: 'Internal tools', copy: 'See which requests need your attention and who on your team owns each one.', project: 'ssu-helpdesk' },
  { title: 'Esports overlays', copy: 'Give your viewers the draft, score, and standout plays at a glance.', project: 'overlays' },
].map(offer => ({ ...offer, example: catalog.find(p => p.id === offer.project)! }))
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
const tools = [{name:'Frontend',items:'Vue · React · JavaScript · HTML & CSS'},{name:'Mobile',items:'Flutter'}, {name:'Backend',items:'Laravel · PHP · Node.js · REST APIs'}, {name:'Data',items:'MySQL · PostgreSQL · MongoDB'}, {name:'Hardware',items:'Arduino · Raspberry Pi · Embedded systems'},{name:'Design & production',items:'Figma · OBS Studio'}]
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="masthead wrap" id="home">
    <a href="#home" class="wordmark" aria-label="Drindlr home"><span class="monogram" aria-hidden="true">&gt;_</span>drindlr.</a>
    <button class="menu-button" aria-controls="menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}</button>
    <nav id="menu" :class="{ open: menuOpen }" aria-label="Primary navigation" @click="menuOpen = false">
      <a href="#services">Services</a><a href="#projects">Work</a><a href="#about">About</a><a href="#reviews">Reviews</a><a class="nav-contact" href="#contact">Get in touch ↗</a>
    </nav>
  </header>
  <main id="main">
    <div class="opening wrap">
    <section class="hero" aria-labelledby="intro-title">
      <div class="intro wrap">
        <div class="intro-copy">
          <p class="byline"><i aria-hidden="true"></i> Full-stack developer / Catbalogan, PH</p>
          <h1 id="intro-title">Aldrin Jay<br><em>Delos Reyes.</em></h1>
          <p class="lede">If bookings or team requests are getting lost in messages, I can build you a simpler way to manage them.</p>
          <div class="actions"><a class="button" href="#contact">Tell me about your project ↗</a><a class="inline-link" href="#projects">Explore my work ↓</a></div>
        </div>
        <figure class="hero-portrait"><img :src="portrait" alt="Graduation portrait of Aldrin Jay Delos Reyes" width="820" height="1063" fetchpriority="high"></figure>
      </div>
    </section>
    <section id="services" class="offer-section wrap">
      <h2>How I can help you<span class="dot">.</span></h2>
      <div class="offer-grid"><article v-for="offer in offers" :key="offer.title">
        <h3>{{ offer.title }}</h3><p>{{ offer.copy }}</p>
        <button class="proof-link" @click="inspect(offer.example)">{{ offer.example.title }} ↗</button>
      </article></div>
    </section>
    </div>
    <section id="projects" class="work wrap">
      <div class="section-head"><h2>Project catalog<span class="dot">.</span></h2><label class="search-field">Search projects<input v-model="search" type="search" placeholder="Name, tool, or keyword"></label></div>
      <div class="catalog-controls"><div class="filters" aria-label="Project categories"><button v-for="category in ['All projects','Web apps','Mobile','Games','Hardware','Tabletop','Non-dev projects']" :key="category" :aria-pressed="category === filter" @click="filter = category">{{ category }}</button></div>
      <small aria-live="polite">Showing {{ visible.length }} of {{ filtered.length }} · Latest activity first</small></div>
      <p v-if="!filtered.length" class="empty">No matching projects. <button @click="search = ''; filter = 'All projects'">Reset filters</button></p>
      <div class="gallery" id="project-results">
        <article v-for="project in visible" :key="project.id" class="entry">
          <button class="project-button" @click="inspect(project)" :aria-label="'View '+project.title">
            <span class="cover" :class="project.id">
              <img v-if="project.image" :src="project.image" alt="" loading="lazy"/>
              <span v-else-if="project.id === 'katha'" class="foil">KATHA</span>
              <span v-else-if="project.id === 'overlays'" class="broadcast-cover" aria-hidden="true"><i>● ON AIR</i><b>Matchday</b><span>Broadcast overlays</span></span>
              <span v-else-if="project.id === 'perchwise'" class="entry-title">PerchWise</span>
              <span v-else class="photobooth">Amari’s <i>Photobooth</i></span>
            </span>
            <span class="entry-title">{{ project.title }}<span aria-hidden="true">↗</span></span>
          </button>
          <p>{{ activityLabel(project.activity) }} · <template v-if="creativeCategories.includes(project.category)">Non-dev / </template>{{ project.category }}<span v-if="['color','katha'].includes(project.id)"> · {{ project.status }}</span></p>
          <div class="catalog-desc">{{ project.description }}</div>
        </article>
      </div>
      <div class="more-row" v-if="filtered.length > pageSize">
        <button class="more" v-if="visible.length < filtered.length" aria-controls="project-results" @click="limit += pageSize">See more projects ↓</button>
        <a v-else class="more" href="#projects" @click="limit = pageSize">Show fewer projects ↑</a>
      </div>
    </section>
    <section id="katha" class="feature">
      <div class="wrap feature-inner">
        <div><p class="byline">Non-dev project / Tabletop design</p><h2>KATHA</h2><p class="feature-copy">I’m turning Philippine folklore into a game you can gather around. Players encounter creatures, legends, and events across a shared board. I design the card effects and the routes that connect locations, then refine the rules through playtesting.</p><button class="feature-link" @click="inspect(katha)">Explore the game ↗</button></div>
        <div class="deck" aria-hidden="true"><div class="playing-card"></div><div class="playing-card"></div><div class="playing-card"><span>KATHA</span><b>✷</b><span>Philippine folklore</span></div></div>
      </div>
    </section>
    <section id="about" class="about wrap">
      <div><h2>Working together</h2><a class="inline-link" href="mailto:aldrinjay.delosreyes17@gmail.com?subject=CV%20request">Request my CV ↗</a></div>
      <div class="about-copy"><p class="statement">Show me how your team handles one task today. That’s where we’ll start.</p>
        <p>Together, we’ll pick the part that costs you the most time and build a first version your team can try.</p>
        <p>I’ve taken this approach at Samar State University, building tools for employee records, document tracking, and support requests.</p>

      </div>
      <details class="career"><summary>Experience, education & credentials <span>View details</span></summary><div class="history"><ExperienceSection/><EducationSection/><CertificationsSection/><HackathonsSection/></div></details>
    </section>
    <section id="stack" class="stack-section"><div class="wrap stack-layout"><h2>My tech stack<span class="dot">.</span></h2>
      <dl><div v-for="tool in tools" :key="tool.name"><dt>{{ tool.name }}</dt><dd>{{ tool.items }}</dd></div></dl></div></section>
    <section id="reviews" class="reviews wrap"><h2>What people say<span class="dot">.</span></h2>
      <div class="review-grid"><figure v-for="r in reviews" :key="r.name">
        <blockquote>“{{ r.text }}”</blockquote><figcaption><span class="review-avatar" aria-hidden="true">{{ r.name.split(' ').map(n => n[0]).join('') }}</span><span><strong>{{ r.name }}</strong><small>{{ r.date }}</small></span><span class="review-stars" :aria-label="r.rating + ' out of 5 stars'">{{ '★'.repeat(r.rating) }}</span></figcaption>
      </figure></div>
    </section>
    <section id="contact" class="contact"><div class="wrap"><h2>What are you<br><em>working on?</em></h2><div><p>Tell me what you’re trying to make easier. A few lines about your team and your timeline are plenty.</p><a class="button" href="mailto:aldrinjay.delosreyes17@gmail.com">Email me ↗</a></div></div></section>
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
