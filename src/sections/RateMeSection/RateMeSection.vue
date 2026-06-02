<script setup lang="ts">
import { ref } from 'vue'
import IconStar from '../../icons/IconStar.vue'
import IconSparkles from '../../icons/IconSparkles.vue'
import ghibImg from '../../assets/ghib.png'

const hoveredStar = ref(0)
const selectedStar = ref(0)
const name = ref('')
const email = ref('')
const comment = ref('')
const submitted = ref(false)

const reviews = [
  { name: 'Maria S.', rating: 5, text: 'Aldrin delivered a clean, fast web app on time. Highly recommend!', date: '2025' },
  { name: 'James T.', rating: 5, text: 'Great at communication and technically sharp. Would hire again.', date: '2025' },
  { name: 'Ana R.', rating: 5, text: 'Guided our capstone project from scratch to completion. Very patient.', date: '2024' },
  { name: 'Carlo M.', rating: 5, text: 'Excellent hardware + software knowledge combo. A rare find.', date: '2024' },
]

const avgRating = 5.0
const totalReviews = reviews.length

function submit() {
  if (!name.value.trim() || !email.value.trim() || !selectedStar.value) return
  submitted.value = true
}
</script>

<template>
  <footer id="contact" class="section-full" data-section="rate">
    <div class="rate-wrapper">
      <!-- Left: avatar + aggregate score -->
      <div class="rate-hero">
        <img :src="ghibImg" alt="Aldrin chibi avatar" class="rate-avatar" />
        <div class="rate-score">
          <span class="score-num">{{ avgRating.toFixed(1) }}</span>
          <div class="stars-static">
            <IconStar v-for="i in 5" :key="i" :size="16" :filled="true" class="star filled" />
          </div>
          <p class="score-sub">Based on {{ totalReviews }} reviews</p>
        </div>
      </div>

      <!-- Right: form + reviews -->
      <div class="rate-content">
        <p class="eyebrow">Rate Me</p>
        <h2 class="section-heading">Share Your Feedback</h2>
        <p class="rate-desc">Your feedback helps me improve. Rate your experience and let me know your thoughts!</p>

        <!-- Existing reviews -->
        <div class="reviews-grid">
          <div v-for="r in reviews" :key="r.name" class="review-card">
            <div class="review-top">
              <span class="review-initials">{{ r.name.charAt(0) }}</span>
              <div>
                <strong class="review-name">{{ r.name }}</strong>
                <p class="review-date">{{ r.date }}</p>
              </div>
              <div class="review-stars">
                <IconStar v-for="i in 5" :key="i" :size="13" :filled="i <= r.rating" class="star" :class="{ filled: i <= r.rating }" />
              </div>
            </div>
            <p class="review-text">"{{ r.text }}"</p>
          </div>
        </div>

        <!-- Feedback form -->
        <div v-if="!submitted" class="rate-form">
          <h3 class="form-heading">Leave a Review</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="rate-name">Name</label>
              <input id="rate-name" v-model="name" type="text" placeholder="Your name" autocomplete="name" />
            </div>
            <div class="form-group">
              <label for="rate-email">Email</label>
              <input id="rate-email" v-model="email" type="email" placeholder="your@email.com" autocomplete="email" />
            </div>
          </div>

          <div class="form-group">
            <label>Rating</label>
            <div class="star-picker" role="radiogroup" aria-label="Star rating">
              <button
                v-for="i in 5"
                :key="i"
                type="button"
                class="star-btn"
                :class="{ active: i <= (hoveredStar || selectedStar) }"
                @mouseenter="hoveredStar = i"
                @mouseleave="hoveredStar = 0"
                @click="selectedStar = i"
                :aria-label="`${i} star${i > 1 ? 's' : ''}`"
              ><IconStar :size="22" :filled="i <= (hoveredStar || selectedStar)" /></button>
              <span class="star-label">{{ selectedStar ? `${selectedStar}.0 / 5` : 'Select a rating' }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="rate-comment">Comments <span class="optional">(optional)</span></label>
            <textarea id="rate-comment" v-model="comment" placeholder="Share your experience..." rows="3"></textarea>
          </div>

          <button class="button button-primary submit-btn" @click="submit" :disabled="!name || !email || !selectedStar">
            Submit Feedback
          </button>
        </div>

        <div v-else class="thank-you">
          <span class="ty-icon"><IconSparkles :size="32" /></span>
          <strong>Thanks, {{ name }}!</strong>
          <p>Your {{ selectedStar }}-star review has been received. I appreciate the feedback!</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rate-wrapper {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: 80px 24px;
  min-height: 100vh;
  align-items: start;
}

.rate-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 100px;
}

.rate-avatar {
  width: 160px;
  height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 16px 32px rgba(158, 177, 255, 0.2));
}

.rate-score {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.score-num {
  font-size: 3rem;
  font-weight: 700;
  color: #f4f7ff;
  letter-spacing: -0.06em;
  line-height: 1;
}

.stars-static {
  display: flex;
  gap: 2px;
}

.score-sub {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: rgba(236, 238, 244, 0.4);
  margin: 0;
}

.star {
  color: rgba(236, 238, 244, 0.18);
  display: inline-flex;
}

.star.filled {
  color: #ffd97d;
}

.rate-content {
  padding: 36px 40px;
  border-radius: 28px;
  border: 1px solid rgba(236, 238, 244, 0.10);
  background: rgba(4, 8, 18, 0.82);
  backdrop-filter: blur(36px);
  box-shadow: 0 24px 48px rgba(2, 4, 10, 0.7);
}

.rate-desc {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: rgba(236, 238, 244, 0.6);
  font-size: 0.95rem;
  margin: 6px 0 22px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 28px;
}

.review-card {
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(236, 238, 244, 0.07);
  background: rgba(255, 255, 255, 0.025);
}

.review-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.review-initials {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(158, 177, 255, 0.3), rgba(255, 154, 216, 0.3));
  font-weight: 700;
  font-size: 0.85rem;
  color: #f4f7ff;
  flex-shrink: 0;
}

.review-name {
  font-size: 0.85rem;
  color: #f4f7ff;
  display: block;
}

.review-date {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.68rem;
  color: rgba(236, 238, 244, 0.36);
  margin: 0;
}

.review-stars {
  margin-left: auto;
  display: flex;
  gap: 1px;
}

.review-stars .star { font-size: 0.85rem; }

.review-text {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: rgba(236, 238, 244, 0.58);
  line-height: 1.5;
  margin: 0;
  font-style: italic;
}

.rate-form {
  border-top: 1px solid rgba(236, 238, 244, 0.08);
  padding-top: 24px;
}

.form-heading {
  font-size: 1rem;
  color: #f4f7ff;
  margin: 0 0 18px;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.form-group label {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: rgba(236, 238, 244, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.optional {
  color: rgba(236, 238, 244, 0.3);
  font-size: 0.65rem;
  letter-spacing: 0;
  text-transform: none;
}

.form-group input,
.form-group textarea {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(236, 238, 244, 0.12);
  border-radius: 10px;
  padding: 10px 14px;
  color: #f4f7ff;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.88rem;
  resize: none;
  transition: border-color 160ms ease;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: rgba(158, 177, 255, 0.45);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(236, 238, 244, 0.25);
}

.star-picker {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: rgba(236, 238, 244, 0.18);
  padding: 0 2px;
  transition: color 120ms ease, transform 120ms ease;
}

.star-btn.active {
  color: #ffd97d;
}

.star-btn:hover {
  transform: scale(1.15);
}

.star-label {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: rgba(236, 238, 244, 0.4);
  margin-left: 8px;
}

.submit-btn {
  margin-top: 6px;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
}

.thank-you {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px;
  text-align: center;
  border-top: 1px solid rgba(236, 238, 244, 0.08);
}

.ty-icon {
  display: inline-flex;
  color: #9eb1ff;
}

.thank-you strong {
  font-size: 1.1rem;
  color: #f4f7ff;
}

.thank-you p {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: rgba(236, 238, 244, 0.6);
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .rate-wrapper {
    grid-template-columns: 1fr;
    padding: 48px 0;
  }

  .rate-hero { flex-direction: row; justify-content: flex-start; position: static; }
  .rate-avatar { width: 100px; height: 100px; }
  .score-num { font-size: 2rem; }
  .reviews-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
