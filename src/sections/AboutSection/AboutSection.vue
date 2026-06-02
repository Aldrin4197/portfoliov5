<script setup lang="ts">
import IconZap from '../../icons/IconZap.vue'
import IconTool from '../../icons/IconTool.vue'
import IconTrophy from '../../icons/IconTrophy.vue'
</script>

<template>
  <section id="about" class="section-full" data-section="about">
    <div class="about-layout">
      <div class="glass-col about-copy">
        <p class="eyebrow">About</p>
        <h2 class="section-heading">Background &amp; Drive</h2>
        <p class="lede">
          At the end of 2022, I transitioned to focus fully on software development. I'm a
          self-taught developer with a background in
          <strong>Electronics Engineering</strong> — a combination that lets me work
          comfortably across hardware and software boundaries.
        </p>
        <p class="about-body">
          I'm passionate about prototyping, tinkering, and competing in local and regional
          product and research competitions to explore creative and technical challenges.
          Whether it's a web app, an embedded system, or a capstone project, I enjoy the
          process of turning ideas into working things.
        </p>
      </div>

      <aside class="about-panel">
        <p class="panel-kicker">Core Strengths</p>
        <div class="about-highlights">
          <div class="highlight-item">
            <span class="highlight-icon"><IconZap :size="16" /></span>
            <span>Electronics Engineering background</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon"><IconTool :size="16" /></span>
            <span>Hardware + software development</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon"><IconTrophy :size="16" /></span>
            <span>Competition-driven problem solver</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 20px;
}

.about-copy {
  position: relative;
  overflow: hidden;
}

.about-copy::after {
  content: '';
  position: absolute;
  right: -120px;
  bottom: -140px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(158, 177, 255, 0.16), rgba(158, 177, 255, 0));
  pointer-events: none;
}

.glass-col .lede,
.about-body {
  margin: 16px 0 0;
  max-width: 44rem;
  color: rgba(236, 238, 244, 0.65);
  font-size: 1rem;
  line-height: 1.7;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.about-panel {
  border-radius: 28px;
  border: 1px solid rgba(236, 238, 244, 0.1);
  background:
    radial-gradient(circle at 75% 10%, rgba(255, 154, 216, 0.16), transparent 45%),
    radial-gradient(circle at 10% 80%, rgba(126, 255, 200, 0.12), transparent 40%),
    rgba(4, 8, 18, 0.82);
  backdrop-filter: blur(32px);
  box-shadow: 0 24px 48px rgba(2, 4, 10, 0.64);
  padding: 28px;
}

.panel-kicker {
  margin: 0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(236, 238, 244, 0.5);
}

.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(236, 238, 244, 0.08);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.95rem;
  color: rgba(236, 238, 244, 0.78);
}

.highlight-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  color: #9eb1ff;
  flex-shrink: 0;
}

@media (max-width: 980px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .about-copy::after {
    display: none;
  }
}
</style>
