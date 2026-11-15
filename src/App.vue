<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import avatar from './assets/ghib.png'
import { archive } from './projects'
import ExperienceSection from './sections/ExperienceSection/ExperienceSection.vue'
import EducationSection from './sections/EducationSection/EducationSection.vue'
import CertificationsSection from './sections/CertificationsSection/CertificationsSection.vue'
import HackathonsSection from './sections/HackathonsSection/HackathonsSection.vue'

const base = import.meta.env.BASE_URL
const projects = [
 { id:'aadi', title:'Aadi Rental Marketplace', short:'Aadi', category:'Web apps', label:'Spaces. Vehicles. Local skills.', description:'A marketplace bringing space rentals, utility vehicles, and local service providers together. Explore listings on a map and find what you need, closer to home.', image:'aadi', color:'#1b9187', tags:['Marketplace','Map discovery','Web + mobile'], status:'Featured project' },
 { id:'stria', title:'Stria', short:'Stria', category:'Mobile', label:'Small habits. A little progress, every day.', description:'A habit-tracking app with daily check-ins, progress, and rewards. A calm interface that makes room for the small things that add up.', image:'stria', color:'#7161ad', tags:['Habit tracking','Daily check-ins','Mobile app'], status:'Featured project' },
 { id:'game', title:'Game Portfolio', short:'Game Portfolio', category:'Games', label:'A portfolio you can explore.', description:'An interactive pixel-art world built around my work. Move through the environment, discover locations, and explore the developer’s cabin.', image:'game', color:'#477c70', tags:['Pixel art','Interactive portfolio','Browser experience'], status:'Featured project' },
 { id:'esports', title:'Catbalogan City Esports', short:'City Esports', category:'Web apps', label:'Local roots. Next-level play.', description:'A website for Catbalogan City Esports, bringing its events, broadcasting services, and local gaming community into one home.', image:'esports', color:'#3973dc', tags:['Community','Esports','Website'], status:'Featured project' },
 { id:'color', title:'Color Game + Message Room', short:'Color Game', category:'Games', label:'A little play. A shared room.', description:'A browser-based color game with a message room. An experiment in bringing a familiar Filipino game and conversation into a shared digital space.', image:'color', color:'#a965b2', tags:['Browser game','Message room','Beta'], status:'Beta' },
 { id:'amari', title:'Amari’s Photobooth', short:'Amari’s', category:'Web apps', label:'A moment worth keeping.', description:'Amari’s Photobooth — another project in my growing collection of web experiences. Visit the live site to explore it.', image:'', color:'#c97c91', tags:['Photobooth','Web experience'], status:'Live site', url:'https://amarisphotobooth.drindlr.com' },
 { id:'katha', title:'KATHA', short:'KATHA', category:'Tabletop', label:'Philippine folklore. Your next adventure.', description:'A tabletop card-and-board game inspired by Philippine folklore. Creatures, alamat, agimat, and pangyayari come together in a world of stories, strategy, and discovery. Currently in development, with a digital playtest prototype.', image:'', color:'#b18a42', tags:['Philippine folklore','Tabletop','In development'], status:'In development' },
]
type Project = typeof projects[number]
const selected = ref<Project>(projects[0]!)
const filter = ref('All projects')
const filtered = computed(() => filter.value === 'All projects' ? projects : projects.filter(p => p.category === filter.value))
const detail = ref<Project | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)
const menuOpen = ref(false)
const viewed = ref(new Set<string>())
let opener: HTMLElement | null = null
function inspect(project: Project) {
 opener = document.activeElement as HTMLElement
 detail.value = project
 viewed.value = new Set([...viewed.value, project.id])
 dialog.value?.showModal()
 document.body.style.overflow = 'hidden'
}
function closeDialog() { dialog.value?.close() }
function afterClose() { document.body.style.overflow = ''; opener?.focus() }
onBeforeUnmount(() => { document.body.style.overflow = '' })
function selectProject(project: Project) { selected.value = project }
function browseKey(event: KeyboardEvent) {
 const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
 if (!offset) return
 event.preventDefault()
 const i = filtered.value.findIndex(p => p.id === selected.value.id)
 const next = filtered.value[(i + offset + filtered.value.length) % filtered.value.length]
 if (next) { selected.value = next; document.getElementById(`select-${next.id}`)?.focus() }
}
function setFilter(value: string) { filter.value = value; const first = filtered.value[0]; if (first) selected.value = first }
const tools = [{name:'Frontend',items:'Vue · React · JavaScript · HTML & CSS'}, {name:'Backend',items:'Laravel · PHP · Node.js · REST APIs'}, {name:'Data',items:'MySQL · PostgreSQL · MongoDB'}, {name:'Hardware',items:'Arduino · Raspberry Pi · Embedded systems'}]
</script>

<template>
 <a class="skip" href="#main">Skip to content</a>
 <header class="topbar">
  <a class="brand" href="#home" aria-label="Aldrin home"><span class="brand-mark">a<span>+</span></span><strong>drindlr<span class="brand-dot">.</span></strong></a>
  <button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-controls="navigation">{{ menuOpen ? 'Close menu' : 'Menu +' }}</button>
  <nav id="navigation" :class="{open:menuOpen}" aria-label="Main navigation" @click="menuOpen=false"><a href="#projects">Project select</a><a href="#about">Player profile</a><a href="#katha">Side quest</a><a class="nav-contact" href="#contact">Let’s talk <span><svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></nav>
 </header>
 <main id="main">
  <section id="home" class="hero wrap">
   <div class="hero-copy">
    <div class="player-label"><span class="pixel-dot"></span> Aldrin Jay Delos Reyes <span class="tag-small">Player one</span></div>
    <h1>Serious about<br>building.<br><span>Always playing.</span></h1>
    <p>I’m Aldrin, a developer with an Electronics Engineering background. I build useful apps, interactive worlds, and the occasional tabletop adventure.</p>
    <div class="hero-actions"><a class="button primary" href="#projects"><span>▶</span> Explore my projects</a><a class="text-link" href="mailto:aldrinjay.delosreyes17@gmail.com?subject=CV%20request">Request CV <span><svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div>
    <div class="location"><span>⌖</span> Made with curiosity in Catbalogan, Philippines</div>
   </div>
   <div class="hero-console">
    <div class="console-top"><span><i></i> Aldrin’s world</span><span>Creative mode</span></div>
    <div class="world-scene"><img :src="base+'projects/game.webp'" alt="My pixel-art Game Portfolio: a developer’s cabin in a forest at night" fetchpriority="high"/><div class="world-caption"><span class="world-icon">✦</span><div><small>Current adventure</small><strong>Building things I wish existed.</strong></div></div></div>
    <div class="console-bottom"><div class="dpad" aria-hidden="true">✚</div><span>Developer. Tinkerer.<br>World builder.</span><button class="round-button" @click="inspect(projects[2]!)" aria-label="View Game Portfolio"><svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></button><span class="console-buttons" aria-hidden="true">● ●</span></div>
    <span class="console-sticker">Keep making<br>cool stuff ✳</span>
   </div>
  </section>
  <div class="chapter-strip"><div class="wrap"><span>Web applications</span><b>✦</b><span>Interactive experiences</span><b>✦</b><span>Embedded systems</span><b>✦</b><span>Tabletop adventures</span></div></div>
  <section id="projects" class="projects-section wrap">
   <div class="section-intro"><div><p class="section-note">The project collection</p><h2>Choose your adventure<span>.</span></h2></div><p>Different ideas. Same curiosity.<br>Select a project to take a closer look.</p></div>
   <div class="filters" aria-label="Filter projects"><button v-for="f in ['All projects','Web apps','Mobile','Games','Tabletop']" :key="f" :aria-pressed="filter===f" :class="{active:filter===f}" @click="setFilter(f)">{{ f }}<span v-if="f==='All projects'">{{ projects.length }}</span></button></div>
   <div class="project-console" :style="{'--project-color':selected.color}">
    <div class="featured-visual" :class="selected.id">
     <img v-if="selected.image" :src="base+'projects/'+selected.image+'.webp'" :alt="selected.title+' interface screenshot'" :key="selected.id" loading="lazy"/>
     <div v-else-if="selected.id==='amari'" class="amari-art" aria-label="Amari’s Photobooth typographic project cover"><span>Smile. Save. Remember.</span><div class="photo-strip"><i>✿</i><i>☺</i><i>♡</i></div><strong>Amari’s<br><em>Photobooth</em></strong></div>
     <div v-else class="katha-cover"><span>Stories become adventures</span><b>✺</b><strong>KATHA</strong><span>A Philippine folklore tabletop game</span></div>
     <span class="visual-label">{{ selected.image ? 'Project preview' : 'Project cover' }}</span>
    </div>
    <div class="project-info" aria-live="polite"><div class="project-status"><i></i>{{ selected.status }}</div><p class="project-type">{{ selected.category }}</p><h3>{{ selected.title }}</h3><p>{{ selected.description }}</p><div class="tags"><span v-for="tag in selected.tags" :key="tag">{{ tag }}</span></div><button class="button dark" @click="inspect(selected)">Explore project <span><svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button></div>
   </div>
   <div class="project-roster" aria-label="Select project" @keydown="browseKey"><button v-for="p in filtered" :key="p.id" :id="'select-'+p.id" :aria-pressed="selected.id===p.id" :class="{selected:selected.id===p.id}" @click="selectProject(p)"><img v-if="p.image" :src="base+'projects/'+p.image+'.webp'" alt="" loading="lazy"/><span v-else class="tile-symbol" :style="{background:p.color}">{{ p.id==='katha' ? '✺' : '☺' }}</span><span>{{ p.short }}</span><span v-if="viewed.has(p.id)" class="viewed" aria-label="Viewed">✓</span></button></div>
   <div class="collection-footer"><span>← → Browse with your keyboard</span><span>{{ viewed.size }} / {{ projects.length }} projects explored</span></div>
   <details class="archive"><summary>Earlier builds <span>10 projects <b>＋</b></span></summary><div class="archive-grid"><article v-for="p in archive" :key="p.title"><img :src="p.img" :alt="p.title" loading="lazy"/><div><small>{{ p.status }}</small><h3>{{ p.title }}</h3><p>{{ p.desc }}</p><div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div></div></article></div></details>
  </section>
  <section id="katha" class="katha-section"><div class="wrap katha-layout"><div class="katha-copy"><span class="side-quest">✦ Side quest in progress</span><h2>Some worlds deserve<br>a place at the table.</h2><p>Meet KATHA, my tabletop card-and-board game inspired by Philippine folklore. A growing world of creatures, legends, and unexpected turns — made to be explored together.</p><button class="button parchment" @click="inspect(projects[6]!)">Discover KATHA <span><svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button><small>In development · Tabletop + digital playtest</small></div><div class="katha-deck" aria-label="Decorative KATHA card backs"><div class="katha-card card-left"><span>Alamat</span><b>☼</b><strong>KATHA</strong><small>Stories that stay with us</small></div><div class="katha-card card-right"><span>Pangyayari</span><b>✷</b><strong>KATHA</strong><small>Every turn, a new story</small></div><div class="katha-card card-center"><span>Philippine folklore</span><b>✺</b><strong>KATHA</strong><small>An adventure in the making</small></div></div></div></section>
  <section id="about" class="about-section wrap"><div class="section-intro"><div><p class="section-note">Behind the builds</p><h2>Meet the player<span>.</span></h2></div><a class="text-link" href="mailto:aldrinjay.delosreyes17@gmail.com?subject=CV%20request">Request my CV <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div><div class="profile-layout"><div class="profile-card"><img :src="avatar" alt="Illustrated portrait of Aldrin with his manga collection" loading="lazy"/><div><span class="tag-small">Player one</span><h3>Aldrin Jay<br>Delos Reyes</h3><p>Developer & curious human</p></div></div><div class="profile-copy"><h3>A builder at heart.<br>A little hard to put in a box.</h3><p>I’m a self-taught developer with a background in Electronics Engineering. Since shifting my focus to software at the end of 2022, I’ve worked across web applications, embedded systems, and ideas that sit somewhere in between.</p><p>I enjoy prototyping, solving practical problems, and making room for play. Sometimes that means a university system. Sometimes it means a game about Philippine folklore.</p><div class="loadout"><h4>My everyday loadout</h4><div v-for="tool in tools" :key="tool.name"><span>{{ tool.name }}</span><p>{{ tool.items }}</p></div></div></div></div>
   <details class="career"><summary>Experience & achievements <span>Open player history ＋</span></summary><div class="legacy-sections"><ExperienceSection/><EducationSection/><CertificationsSection/><HackathonsSection/></div></details>
  </section>
  <section id="contact" class="contact-section"><div class="wrap"><span class="contact-spark" aria-hidden="true">✳</span><p>Got an idea? Let’s build it.</p><h2>Ready for the<br>next adventure?</h2><a class="button primary" href="mailto:aldrinjay.delosreyes17@gmail.com">Say hello <span><svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a><a class="email-link" href="mailto:aldrinjay.delosreyes17@gmail.com">aldrinjay.delosreyes17@gmail.com</a></div></section>
 </main>
 <footer class="wrap footer"><a class="brand" href="#home"><strong>drindlr.</strong></a><span>Built with curiosity. And a little play.</span><div><a href="https://github.com/Aldrin4197" target="_blank" rel="noopener noreferrer">GitHub <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><a href="https://www.linkedin.com/in/aldrin-jay-delos-reyes-559817267/" target="_blank" rel="noopener noreferrer">LinkedIn <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><a href="https://www.facebook.com/drindlr" target="_blank" rel="noopener noreferrer">Facebook <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div></footer>
 <dialog ref="dialog" class="project-dialog" aria-labelledby="project-dialog-title" @close="afterClose" @click="(e) => { if(e.target===dialog) closeDialog() }"><div v-if="detail" class="dialog-inner"><button class="dialog-close" autofocus @click="closeDialog" aria-label="Close project">✕</button><img v-if="detail.image" class="dialog-image" :class="detail.id" :src="base+'projects/'+detail.image+'.webp'" :alt="detail.title+' screenshot'"/><div class="dialog-copy"><p class="section-note">{{ detail.category }} / {{ detail.status }}</p><h2 id="project-dialog-title">{{ detail.title }}</h2><h3>{{ detail.label }}</h3><p>{{ detail.description }}</p><div class="tags"><span v-for="t in detail.tags" :key="t">{{ t }}</span></div><a v-if="detail.url" class="button primary" :href="detail.url" target="_blank" rel="noopener noreferrer">Visit live site <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><a v-else class="button primary" :href="'mailto:aldrinjay.delosreyes17@gmail.com?subject='+encodeURIComponent('Tell me about '+detail.title)">Ask me about this project <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><p v-if="detail.id==='katha'" class="development-note">KATHA is still being developed. The card motifs on this portfolio are decorative covers, not final gameplay cards.</p></div></div></dialog>
</template>
