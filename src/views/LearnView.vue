<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getKanaByGroup, kanaGroups } from '../data/kana'
import type { KanaScript } from '../types/kana'
import AppShell from '../components/navigation/AppShell.vue'
import { useProgress } from '../composables/useProgress'

const route = useRoute()
const script = ref<KanaScript>(route.query.script === 'katakana' ? 'katakana' : 'hiragana')
const { getStatus } = useProgress()
</script>

<template>
  <AppShell>
    <section class="page">
      <div class="section-heading section-heading--tight"><div><p class="eyebrow">Kana dasar</p><h1>Belajar Kana</h1></div></div>
      <div class="segment-control" aria-label="Pilih jenis kana">
        <button :class="{ active: script === 'hiragana' }" @click="script = 'hiragana'">Hiragana</button>
        <button :class="{ active: script === 'katakana' }" @click="script = 'katakana'">Katakana</button>
      </div>
      <section v-for="group in kanaGroups" :key="group" class="kana-group">
        <h2>{{ group }}</h2>
        <div class="kana-grid">
          <RouterLink v-for="kana in getKanaByGroup(script, group)" :key="kana.id" :class="['kana-tile', `kana-tile--${getStatus(kana.id)}`]" :to="{ path: '/flashcards', query: { script, kana: kana.id } }" :aria-label="`Pelajari ${kana.character}, dibaca ${kana.romaji}`">{{ kana.character }}<span :class="['kana-tile__dot', `kana-tile__dot--${getStatus(kana.id)}`]" /></RouterLink>
        </div>
      </section>
      <p class="helper-text">Pilih kana untuk memulai flashcard. Progress belajar akan tersimpan setelah progress engine ditambahkan.</p>
    </section>
  </AppShell>
</template>
