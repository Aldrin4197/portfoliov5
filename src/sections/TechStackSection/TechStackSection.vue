<script setup lang="ts">
const stacks = [
  { label: 'Frontend', items: ['Vue', 'React', 'HTML', 'CSS', 'JavaScript'] },
  { label: 'Backend', items: ['Laravel', 'Node.js', 'PHP'] },
  { label: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { label: 'Hardware', items: ['Embedded Systems', 'Arduino', 'Raspberry Pi'] },
  { label: 'Tools', items: ['Git', 'Figma', 'WordPress', 'RESTful APIs', 'Notion'] },
]

const stats = [
  { value: '35+', label: 'Satisfied Clients', sub: 'Active since 2023' },
  { value: '35+', label: 'Finished Projects', sub: 'Completed by 2025' },
  { value: '98%', label: 'Positive Feedbacks', sub: 'Updated as of 2025' },
]
</script>

<template>
  <section id="stack" class="section-full" data-section="stack">
    <div class="glass-col">
      <p class="eyebrow stack-eyebrow">Tech Stack</p>
      <h2 class="section-heading stack-heading">Tools I Work With</h2>

      <div class="stack-categories">
        <div v-for="cat in stacks" :key="cat.label" class="stack-cat">
          <p class="cat-label">{{ cat.label }}</p>
          <div class="tag-row">
            <span v-for="item in cat.items" :key="item" class="stack-tag">{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="stats-row">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
          <span class="stat-sub">{{ stat.sub }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack-eyebrow {
  justify-content: center;
}

.stack-heading {
  text-align: center;
}

.stack-categories {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.stack-cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 14px;
  border-radius: 14px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(5, 10, 20, 0.45);
}

.cat-label {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(236, 238, 244, 0.4);
  margin: 0;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.stack-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(158, 177, 255, 0.2);
  background: rgba(158, 177, 255, 0.07);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: rgba(236, 238, 244, 0.82);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(236, 238, 244, 0.08);
}

@media (max-width: 900px) {
  .stack-categories {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(5, 10, 20, 0.5);
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #f4f7ff;
  letter-spacing: -0.04em;
}

.stat-label {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: rgba(236, 238, 244, 0.76);
}

.stat-sub {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.68rem;
  color: rgba(236, 238, 244, 0.38);
}
</style>
