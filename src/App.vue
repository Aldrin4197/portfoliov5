<script setup lang="ts">
import ProjectMedia from './components/ProjectMedia.vue'
import ArrowUpRight from './components/ArrowUpRight.vue'
import SocialLinks from './components/SocialLinks.vue'
import ReviewAvatar from './components/ReviewAvatar.vue'
import AmbientBackground from "./components/AmbientBackground.vue"
import { computed, nextTick, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { catalog, activityLabel, type CatalogProject } from './catalog'
import { reviews } from './reviews'
import ExperienceSection from './sections/ExperienceSection/ExperienceSection.vue'
import EducationSection from './sections/EducationSection/EducationSection.vue'
import CertificationsSection from './sections/CertificationsSection/CertificationsSection.vue'
import HackathonsSection from './sections/HackathonsSection/HackathonsSection.vue'

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
const featuredProjects = ['perchwise', 'aadi', 'stria'].map(id => catalog.find(project => project.id === id)!)
const archiveOpen = ref(false)
const projectHeading = ref<HTMLElement | null>(null)
const visible = computed(() => archiveOpen.value ? filtered.value.slice(0, limit.value) : featuredProjects)
async function toggleArchive() {
  archiveOpen.value = !archiveOpen.value
  limit.value = pageSize
  filter.value = 'All projects'
  search.value = ''
  await nextTick()
  projectHeading.value?.focus({ preventScroll: true })
  projectHeading.value?.scrollIntoView({ block: 'start' })
}
const offers = [
  { title: 'Web & mobile apps', copy: 'Give your customers one place to find your services and book with you.', project: 'aadi' },
  { title: 'Internal tools', copy: 'See which requests need your attention and who on your team owns each one.', project: 'ssu-helpdesk' },
  { title: 'Esports overlays', copy: 'Give your viewers the draft, score, and standout plays at a glance.', project: 'overlays' },
].map(offer => ({ ...offer, example: catalog.find(p => p.id === offer.project)! }))
const detail = ref<CatalogProject | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)
const sections = [
  { id: 'about', label: 'About' }, { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' }, { id: 'stack', label: 'Toolkit' },
  { id: 'reviews', label: 'Reviews' }, { id: 'contact', label: 'Contact' },
]
const active = ref('about')
function updateSection() {
  for (const section of [...sections].reverse()) {
    const top = document.getElementById(section.id)?.getBoundingClientRect().top
    if (top !== undefined && top < window.innerHeight * .42) {
      active.value = section.id
      break
    }
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) active.value = 'contact'
}
onMounted(() => { updateSection(); window.addEventListener('scroll', updateSection, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', updateSection))

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
  <AmbientBackground />
  <a class="skip" href="#main">Skip to content</a>
  <div class="shell" id="home"><header class="profile">
    <div><h1>Aldrin Jay <br>Delos Reyes</h1><p class="role">Full-stack developer</p>
    <p class="lede">I build apps for your business, tools for your team, and graphics for your next broadcast.</p></div>
    <nav aria-label="Section navigation"><a v-for="section in sections" :key="section.id" :href="'#'+section.id" :aria-current="active === section.id ? 'location' : undefined">{{ section.label }}</a></nav>
    <div class="signature"><div><small>Catbalogan, Philippines</small><SocialLinks /></div></div>
  </header><main id="main">    <section id="about" class="about wrap">
      <div><h2>About</h2><a class="inline-link" href="mailto:aldrinjay.delosreyes17@gmail.com?subject=CV%20request">Request my CV <ArrowUpRight /></a></div>
      <div class="about-copy"><p class="statement">Show me how your team works. I’ll help you build a simpler way to handle the parts that slow you down.</p>

        <p>I’ve taken this approach at Samar State University, building tools for employee records, document tracking, and support requests.</p>

      </div>
      <details class="career"><summary>Experience, education & credentials <span>View details</span></summary><div class="history"><ExperienceSection/><EducationSection/><CertificationsSection/><HackathonsSection/></div></details>
    </section>
    <section id="services" class="offer-section wrap">
      <h2>How I can help you</h2>
      <div class="offer-grid hover-list"><article class="hover-row" v-for="offer in offers" :key="offer.title">
        <h3>{{ offer.title }}</h3><p>{{ offer.copy }}</p>
        <button class="proof-link" @click="inspect(offer.example)">{{ offer.example.title }} <ArrowUpRight /></button>
      </article></div>
    </section>
    <section id="projects" class="work wrap">
      <div class="section-head"><h2 ref="projectHeading" tabindex="-1">{{ archiveOpen ? 'Project archive' : 'Featured projects' }}</h2><label v-if="archiveOpen" class="search-field">Search projects<input v-model="search" type="search" placeholder="Name, tool, or keyword"></label></div>
      <div v-if="archiveOpen" class="catalog-controls"><div class="filters" aria-label="Project categories"><button v-for="category in ['All projects','Web apps','Mobile','Games','Hardware','Tabletop','Non-dev projects']" :key="category" :aria-pressed="category === filter" @click="filter = category">{{ category }}</button></div>
      <small aria-live="polite">Showing {{ visible.length }} of {{ filtered.length }} · Latest activity first</small></div>
      <p v-if="archiveOpen && !filtered.length" class="empty">No matching projects. <button @click="search = ''; filter = 'All projects'">Reset filters</button></p>
      <div class="gallery hover-list" id="project-results">
        <article v-for="project in visible" :key="project.id" class="entry hover-row">
          <button class="project-button" @click="inspect(project)" :aria-label="'View '+project.title">
            <span class="cover" :class="[project.id, { 'has-artwork': project.artwork }]">
              <img v-if="project.artwork || project.image" :src="project.artwork || project.image" alt="" loading="lazy">
              <span v-else-if="project.id === 'katha'" class="foil">KATHA</span>
              <span v-else-if="project.id === 'overlays'" class="broadcast-cover" aria-hidden="true"><i>● ON AIR</i><b>Matchday</b><span>Broadcast overlays</span></span>
              <span v-else class="cover-name">{{ project.title }}</span>
            </span>
            <span class="entry-body">
              <span class="entry-title">{{ project.title }}<span aria-hidden="true"><ArrowUpRight /></span></span>
              <span class="project-meta">{{ activityLabel(project.activity) }} · <template v-if="creativeCategories.includes(project.category)">Non-dev / </template>{{ project.category }}<span v-if="['color','katha'].includes(project.id)"> · {{ project.status }}</span></span>
              <span class="catalog-desc">{{ project.description }}</span>
              <span class="tags"><span v-for="tag in project.tags.slice(0,3)" :key="tag">{{ tag }}</span></span>
            </span>
          </button>
        </article>
      </div>
      <div class="more-row">
        <button v-if="!archiveOpen" class="more" @click="toggleArchive">View full project archive <span aria-hidden="true">→</span></button>
        <template v-else>
        <button class="more" v-if="visible.length < filtered.length" aria-controls="project-results" @click="limit += pageSize">See more projects ↓</button>
        <a v-else-if="limit > pageSize" class="more" href="#projects" @click="limit = pageSize">Show fewer projects ↑</a>
        <button class="more back" @click="toggleArchive">Back to featured projects</button>
        </template>
      </div>
    </section>
    <section id="katha" class="feature">
      <div class="wrap feature-inner">
        <div><p class="byline">Non-dev project / Tabletop design</p><h2>KATHA</h2><p class="feature-copy">A tabletop game I’m designing around Philippine folklore. Players follow trails across a shared board, encountering creatures and legends along the way.</p><button class="feature-link" @click="inspect(katha)">Explore the game <ArrowUpRight /></button></div>

      </div>
    </section>
    <section id="stack" class="stack-section"><div class="wrap stack-layout"><h2>Toolkit</h2>
      <dl><div v-for="tool in tools" :key="tool.name"><dt>{{ tool.name }}</dt><dd>{{ tool.items }}</dd></div></dl></div></section>
    <section id="reviews" class="reviews wrap"><h2>What people say</h2>
      <div class="review-grid hover-list"><figure class="hover-row" v-for="(r, index) in reviews" :key="r.name">
        <blockquote>“{{ r.text }}”</blockquote><figcaption><ReviewAvatar :index="index" /><span><strong>{{ r.name }}</strong><small>{{ r.date }}</small></span><span class="review-stars" :aria-label="r.rating + ' out of 5 stars'">{{ '★'.repeat(r.rating) }}</span></figcaption>
      </figure></div>
    </section>
    <section id="contact" class="contact"><div class="wrap"><h2>What are you working on?</h2><div><p>Tell me what you’re trying to make easier. A few lines about your team and your timeline are plenty.</p><a class="button" href="mailto:aldrinjay.delosreyes17@gmail.com">Email me <ArrowUpRight /></a></div></div></section>
  </main>
  </div>
  <dialog ref="dialog" aria-labelledby="detail-title" @close="afterClose" @click="event => { if(event.target === dialog) closeDialog() }">
    <div v-if="detail" class="dialog-content"><button class="close" autofocus @click="closeDialog" aria-label="Close project">Close ×</button>
      <ProjectMedia :key="detail.id" :project="detail" />
      <div class="dialog-copy"><small>{{ detail.category }} · {{ detail.status }}</small><h2 id="detail-title">{{ detail.title }}</h2><p>{{ detail.description }}</p><small>{{ detail.tags.join(' · ') }}</small>
        <a v-if="detail.url" class="button" :href="detail.url" target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight /></a><a v-else class="button" :href="'mailto:aldrinjay.delosreyes17@gmail.com?subject='+encodeURIComponent(detail.title)">Ask about this project <ArrowUpRight /></a>
      </div>
    </div>
  </dialog>
</template>
