<script setup lang="ts">
import ServicesSection from './sections/ServicesSection/ServicesSection.vue'
import TechStackSection from './sections/TechStackSection/TechStackSection.vue'
import { kathaCards } from './katha'
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
const detail = ref<CatalogProject | null>(null)
const initialMedia = ref(0)
const dialog = ref<HTMLDialogElement | null>(null)
const sections = [
  { id: 'about', label: 'About' }, { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' }, { id: 'stack', label: 'Toolkit' },
  { id: 'career', label: 'Background' }, { id: 'reviews', label: 'Reviews' }, { id: 'contact', label: 'Contact' },
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
function inspect(project: CatalogProject, mediaIndex = 0) {
 initialMedia.value = mediaIndex
 opener = document.activeElement as HTMLElement
 detail.value = project
 dialog.value?.showModal()
 document.body.style.overflow = 'hidden'
}
function closeDialog() { dialog.value?.close() }
function afterClose() {
 detail.value = null
 document.body.style.overflow = ''
 opener?.focus()
}
onBeforeUnmount(() => { document.body.style.overflow = '' })
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
      <a class="career-jump" href="#career">Experience, education &amp; credentials ↓</a>
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
              <img v-else-if="project.id === 'katha'" :src="kathaCards[1].thumbnail" alt="" loading="lazy">
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
    <section id="katha" class="feature" aria-labelledby="katha-title">
      <p class="byline">Non-dev project / Tabletop design</p>
      <h2 id="katha-title">KATHA</h2>
      <p class="feature-copy">A tabletop game I’m designing around Philippine folklore. Players follow trails across a shared board, encountering creatures and legends along the way.</p>
      <div class="katha-cards">
        <button v-for="(card, index) in kathaCards" :key="card.label"
          :aria-label="'Inspect ' + card.label + ' card'" @click="inspect(katha, index)">
          <img :src="card.thumbnail" alt="" width="320" height="440" loading="lazy">
          <span>{{ card.label }} <ArrowUpRight /></span>
        </button>
      </div>
      <button class="feature-link" @click="inspect(katha)">Explore the game <ArrowUpRight /></button>
    </section>
    <ServicesSection @inspect="inspect" />
    <TechStackSection />
    <section id="career" aria-labelledby="career-title">
      <h2 id="career-title">Experience, education &amp; credentials</h2>
      <div class="history"><ExperienceSection/><EducationSection/><CertificationsSection/><HackathonsSection/></div>
    </section>
    <section id="reviews" class="reviews wrap"><h2>What people say</h2>
      <div class="review-grid hover-list"><figure class="hover-row" v-for="(r, index) in reviews" :key="r.name">
        <blockquote>“{{ r.text }}”</blockquote><figcaption><ReviewAvatar :index="index" /><span><strong>{{ r.name }}</strong><small>{{ r.date }}</small></span><span class="review-stars" :aria-label="r.rating + ' out of 5 stars'">{{ '★'.repeat(r.rating) }}</span></figcaption>
      </figure></div>
    </section>
    <section id="contact" class="contact"><div class="wrap"><h2>What are you working on?</h2><div><p>Tell me what you’re trying to make easier. A few lines about your team and your timeline are plenty.</p><a class="button" href="mailto:aldrinjay.delosreyes17@gmail.com">Email me <ArrowUpRight /></a></div></div></section>
  </main>
  </div>
  <footer class="site-footer">
    <p>© {{ new Date().getFullYear() }} Aldrin Jay Delos Reyes</p>
    <SocialLinks />
    <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
  </footer>
  <dialog ref="dialog" aria-labelledby="detail-title" @close="afterClose" @click="event => { if(event.target === dialog) closeDialog() }">
    <div v-if="detail" class="dialog-content"><button class="close" autofocus @click="closeDialog" aria-label="Close project">Close ×</button>
      <ProjectMedia :key="detail.id + initialMedia" :project="detail" :initial-index="initialMedia" />
      <div class="dialog-copy"><small>{{ detail.category }} · {{ detail.status }}</small><h2 id="detail-title">{{ detail.title }}</h2><p>{{ detail.description }}</p><small>{{ detail.tags.join(' · ') }}</small>
        <a v-if="detail.url" class="button" :href="detail.url" target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight /></a><a v-else class="button" :href="'mailto:aldrinjay.delosreyes17@gmail.com?subject='+encodeURIComponent(detail.title)">Ask about this project <ArrowUpRight /></a>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.site-footer {
  width: min(1130px, 88%);
  margin-inline: auto;
  padding-block: 22px;
  border-top: 1px solid var(--rule);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 24px;
  font-size: 14px;
}
.site-footer p { margin-inline-end: auto; }
.site-footer a { padding-block: 8px; }
.site-footer a:is(:hover, :focus-visible) { color: var(--accent); }
@media (max-width: 830px), (max-height: 610px) {
  .site-footer { width: min(640px, 88%); }
}
@media (max-width: 540px) {
  .site-footer p { flex-basis: 100%; }
  .site-footer > a { margin-inline-start: auto; }
}
</style>
