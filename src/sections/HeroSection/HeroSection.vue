<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import meImg from '../../assets/me.png'

const roles = ['Web Developer', 'Fullstack Dev', 'Firmware Dev', 'Tech Enthusiast', 'ECE Graduate']
const displayed = ref('')
let roleIndex = 0
let timeout: ReturnType<typeof setTimeout>

function type(text: string, i = 0) {
  if (i <= text.length) {
    displayed.value = text.slice(0, i)
    timeout = setTimeout(() => type(text, i + 1), 80)
  } else {
    timeout = setTimeout(() => erase(text), 1800)
  }
}

function erase(text: string) {
  if (text.length > 0) {
    const next = text.slice(0, text.length - 1)
    displayed.value = next
    timeout = setTimeout(() => erase(next), 40)
  } else {
    roleIndex = (roleIndex + 1) % roles.length
    timeout = setTimeout(() => type(roles[roleIndex]), 300)
  }
}

onMounted(() => type(roles[0]))
onUnmounted(() => clearTimeout(timeout))
</script>

<template>
  <section class="hero-full" data-section="hero">
    <div class="hero-top">
      <img :src="meImg" alt="Aldrin Delos Reyes" class="avatar" />
      <div class="hero-meta">
        <p class="eyebrow">Portfolio</p>
        <h1>Hi, I'm <span class="accent">Aldrin</span></h1>
        <p class="hero-role">a <span class="role-typed">{{ displayed }}</span><span class="cursor">|</span></p>
      </div>
    </div>

    <p class="lede">
      Self-taught developer with a background in Electronics Engineering — building web apps,
      embedded systems, and everything in between.
    </p>

    <div class="hero-actions">
      <a class="button button-primary" href="#projects">See my work</a>
      <a class="button button-secondary" href="mailto:aldrinjay.delosreyes17@gmail.com">Get in touch</a>
    </div>

    <div class="social-links">
      <a href="https://www.linkedin.com/in/aldrin-jay-delos-reyes-559817267/" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
      </a>
      <a href="https://www.facebook.com/drindlr" target="_blank" rel="noopener" aria-label="Facebook" class="social-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
      </a>
      <a href="https://github.com/Aldrin4197" target="_blank" rel="noopener" aria-label="GitHub" class="social-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
      </a>
      <a href="mailto:aldrinjay.delosreyes17@gmail.com" aria-label="Email" class="social-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero-full {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 150px clamp(28px, 5vw, 88px) 110px;
  width: min(1440px, 100%);
  margin: 0 auto;
}

.hero-top {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 28px;
}

.avatar {
  width: 118px;
  height: 118px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(158, 177, 255, 0.3);
  flex-shrink: 0;
}

.hero-meta h1 {
  font-size: clamp(2.6rem, 6vw, 5rem);
  margin-bottom: 4px;
}

.accent {
  background: linear-gradient(135deg, #9eb1ff, #ff9ad8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-role {
  font-size: 1.05rem;
  color: rgba(236, 238, 244, 0.6);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  min-height: 1.6em;
}

.role-typed {
  color: #9eb1ff;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: #9eb1ff;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.social-links {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}

.social-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(236, 238, 244, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(236, 238, 244, 0.65);
  text-decoration: none;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
}

.social-btn:hover {
  background: rgba(158, 177, 255, 0.12);
  border-color: rgba(158, 177, 255, 0.3);
  color: #9eb1ff;
  transform: translateY(-2px);
}
</style>
