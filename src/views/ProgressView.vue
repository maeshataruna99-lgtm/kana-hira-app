<script setup lang="ts">
import ProgressBar from '../components/common/ProgressBar.vue'
import AppShell from '../components/navigation/AppShell.vue'
import { useProgress } from '../composables/useProgress'

const { accuracy, hiraganaMastery, katakanaMastery, masteredCount, weakKana } = useProgress()
</script>

<template>
  <AppShell>
    <section class="page">
      <div class="section-heading"><div><p class="eyebrow">Perjalanan belajar</p><h1>Progres Kamu</h1></div></div>
      <section class="panel progress-panel">
        <div class="progress-label"><strong>Hiragana</strong><span>{{ hiraganaMastery }}%</span></div><ProgressBar :value="hiraganaMastery" />
        <div class="progress-label"><strong>Katakana</strong><span>{{ katakanaMastery }}%</span></div><ProgressBar :value="katakanaMastery" tone="gold" />
      </section>
      <div class="mini-stats"><article><strong>{{ accuracy }}%</strong><span>Akurasi</span></article><article><strong>{{ masteredCount }} / 92</strong><span>Dikuasai</span></article><article><strong>{{ weakKana.length }}</strong><span>Perlu latihan</span></article></div>
      <section class="panel">
        <h2>Perlu Latihan</h2>
        <div v-if="weakKana.length" class="weak-kana">
          <span v-for="kana in weakKana" :key="kana.id">{{ kana.character }}</span>
        </div>
        <p v-else class="helper-text">Selesaikan beberapa quiz untuk melihat kana yang perlu kamu ulang.</p>
      </section>
    </section>
  </AppShell>
</template>
