<script setup lang="ts">
const profiles = [
  { name: 'GitHub', href: 'https://github.com/Aldrin4197' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aldrin-jay-delos-reyes-559817267/' },
  { name: 'CodePen', href: 'https://codepen.io/Aldrin-Jay-Delos-Reyes' },
  { name: 'Instagram', href: 'https://www.instagram.com/arudurin_jei/' },
  { name: 'Gmail', href: 'mailto:aldrinjay.delosreyes17@gmail.com' },
]
</script>

<template>
  <ul class="social-links" aria-label="Social profiles and email">
    <li v-for="profile in profiles" :key="profile.name">
      <component :is="profile.href ? 'a' : 'span'" :href="profile.href || undefined"
        :class="{ pending: !profile.href }" :role="profile.href ? undefined : 'img'"
        :aria-label="profile.href ? profile.name : profile.name + ' profile unavailable'"
        :title="profile.href ? profile.name : profile.name + ' profile unavailable'">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path v-if="profile.name === 'GitHub'" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          <path v-else-if="profile.name === 'LinkedIn'" fill-rule="evenodd" d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1.5 8H9v9H5.5zm1.75-5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM11 10h3v1.25c.55-.93 1.55-1.52 2.8-1.52 2.48 0 3.2 1.62 3.2 4.15V19h-3.2v-4.7c0-1.12-.25-2.05-1.45-2.05-1.28 0-1.55 1-1.55 2.05V19H11z"/>
          <g v-else-if="profile.name === 'CodePen'" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 2 10 6.6v6.8L12 22 2 15.4V8.6zM12 2v6.7l10 6.7M2 15.4l10-6.7M22 8.6l-10 6.7L2 8.6M12 15.3V22"/></g>
          <g v-else-if="profile.name === 'Instagram'"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/></g><circle cx="17.5" cy="6.8" r="1.2"/></g>
          <path v-else d="M1 5.6a2.5 2.5 0 0 1 4-2L12 9l7-5.4a2.5 2.5 0 0 1 4 2V19a1.5 1.5 0 0 1-1.5 1.5H18v-10l-6 4.6-6-4.6v10H2.5A1.5 1.5 0 0 1 1 19z"/>
        </svg>
      </component>
    </li>
  </ul>
</template>

<style scoped>
.social-links { display:flex; flex-wrap:wrap; align-items:center; gap:1px; list-style:none; margin:2px 0 0 -6px; padding:0; }
.social-links a,.social-links .pending { width:32px; height:32px; display:grid; place-items:center; color:#a4b4c9; border-radius:6px; }
.social-links svg { width:21px; height:21px; }
.social-links .pending { color:#74859b; }
.social-links a { transition:color 160ms, background 160ms, transform 160ms; }
.social-links a:is(:hover,:focus-visible) { color:var(--accent); background:#81dacc12; transform:translateY(-2px); }
</style>
