<script setup lang="ts">
import CompanionBubble from '../components/companion/CompanionBubble.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import AppShell from '../components/navigation/AppShell.vue'
import { useProgress } from '../composables/useProgress'

const { hiraganaMastery, katakanaMastery, masteredCount } = useProgress()
</script>

<template>
  <AppShell>
    <section class="page page--home">
      <div class="intro">
        <p class="eyebrow">Belajar hari ini</p>
        <h1>Selamat datang 🌸</h1>
        <p>Siap untuk pelajaran berikutnya?</p>
      </div>

      <div class="stat-row" aria-label="Ringkasan progres">
        <article class="stat-card"><strong>🌱 {{ masteredCount }}</strong><span>Kana dikuasai</span></article>
        <article class="stat-card"><strong>🎴</strong><span>Quiz menyesuaikan progres</span></article>
      </div>

      <section class="stack-section">
        <div class="section-heading"><h2>Lanjutkan Belajar</h2><span>Mulai dari dasar</span></div>
        <div class="continue-row">
          <RouterLink class="continue-card" to="/learn">
            <span class="continue-card__kana">あ</span><strong>Hiragana</strong>
            <ProgressBar :value="hiraganaMastery" /><span class="continue-card__percentage">{{ hiraganaMastery }}%</span>
          </RouterLink>
          <RouterLink class="continue-card" to="/learn">
            <span class="continue-card__kana">ア</span><strong>Katakana</strong>
            <ProgressBar :value="katakanaMastery" tone="gold" /><span class="continue-card__percentage">{{ katakanaMastery }}%</span>
          </RouterLink>
        </div>
      </section>

      <RouterLink class="primary-button" to="/quiz">🎴 Mulai Quiz Cepat</RouterLink>
      <CompanionBubble message="Kita mulai pelan-pelan, ya. Pilih Hiragana atau langsung coba quiz! 🌸" />
    </section>
  </AppShell>
</template>
