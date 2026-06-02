<script setup lang="ts">
import IconMapPin from '../../icons/IconMapPin.vue'
import hackathonImg from '../../assets/hackathon.jpg'
import bootcampImg from '../../assets/bootcamp.png'
import amyImg from '../../assets/amy.jpg'
import dost8Img from '../../assets/dost8.png'
const hackathons = [
  {
    img: hackathonImg,
    date: 'December 21st – 22nd, 2023',
    title: '2023 Hackathon: Co-creating Solutions for Catbalogan City',
    location: 'Catbalogan City, Samar',
    desc: 'Developed and designed an E-commerce application for local businesses.',
  },
  {
    img: bootcampImg,
    date: 'September 13th – 17th, 2021',
    title: 'Catbalogan City Bootcamp 2021',
    location: 'Catbalogan City, Samar',
    desc: 'Attended multiple workshops related to tech and development.',
  },
  {
    img: amyImg,
    date: 'October 10th, 2019',
    title: 'PCCI AMY IP Awards 2019',
    location: 'BGC Taguig, Metro Manila',
    desc: 'Showcased a project prototype of an Electric Utility Meter with IoT.',
  },
  {
    img: dost8Img,
    date: 'August 9th – 11th, 2018',
    title: 'DOST VIII Regional Invention Contests and Exhibits 2018',
    location: 'Tacloban City, Leyte',
    desc: 'Showcased a project prototype of Pork Quality Assessment System.',
  },
]
</script>

<template>
  <section id="hackathons" class="section-full" data-section="hackathons">
    <div class="glass-col">
      <p class="eyebrow">Hackathons</p>
      <h2 class="section-heading">Competing &amp; Building</h2>
      <blockquote class="hack-quote">
        "During my time in university, I attended 4+ hackathons. People from around the country
        would come together and build incredible things in 2–3 days. It was eye-opening to see
        the endless possibilities brought to life by a group of motivated and passionate individuals."
      </blockquote>

      <div class="hack-grid">
        <article v-for="h in hackathons" :key="h.title" class="hack-card">
          <div class="hack-img-wrap">
            <img :src="h.img" :alt="h.title" class="hack-img" loading="lazy" />
          </div>
          <div class="hack-body">
            <p class="hack-date">{{ h.date }}</p>
            <strong class="hack-title">{{ h.title }}</strong>
            <p class="hack-loc">
              <IconMapPin :size="12" />
              {{ h.location }}
            </p>
            <p class="hack-desc">{{ h.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hack-quote {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 1rem;
  color: rgba(236, 238, 244, 0.62);
  line-height: 1.7;
  border-left: 2px solid rgba(158, 177, 255, 0.4);
  padding-left: 18px;
  margin: 20px 0 28px;
  font-style: italic;
}

.hack-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.hack-card {
  border-radius: 16px;
  border: 1px solid rgba(236, 238, 244, 0.08);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 200ms ease, background 200ms ease;
}

.hack-card:hover {
  border-color: rgba(158, 177, 255, 0.2);
  background: rgba(158, 177, 255, 0.04);
}

.hack-img-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.hack-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 400ms ease;
}

.hack-card:hover .hack-img {
  transform: scale(1.04);
}

.hack-body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.hack-date {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.68rem;
  color: rgba(236, 238, 244, 0.36);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hack-title {
  font-size: 0.88rem;
  color: #f4f7ff;
  line-height: 1.35;
}

.hack-loc {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: #9eb1ff;
  margin: 0;
}

.hack-desc {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: rgba(236, 238, 244, 0.52);
  line-height: 1.5;
  margin: 4px 0 0;
}

@media (max-width: 1024px) {
  .hack-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .hack-grid { grid-template-columns: 1fr; }
}
</style>
