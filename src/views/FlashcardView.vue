<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { hiragana, katakana } from '../data/kana'
import { vocabulary } from '../data/vocabulary'
import type { KanaScript } from '../types/kana'
import { useProgress } from '../composables/useProgress'

const route = useRoute()
const script: KanaScript = route.query.script === 'katakana' ? 'katakana' : 'hiragana'
const cards = script === 'katakana' ? katakana : hiragana
const requestedId = typeof route.query.kana === 'string' ? route.query.kana : ''
const startingIndex = Math.max(0, cards.findIndex((kana) => kana.id === requestedId))
const index = ref(startingIndex)
const flipped = ref(false)
const pointerStart = ref<number | null>(null)
const swiped = ref(false)
const { recordAnswer } = useProgress()

const current = computed(() => cards[index.value])
const example = computed(() => vocabulary.find((item) => item.kana.includes(current.value.character)))

function move(direction: -1 | 1) {
  index.value = (index.value + direction + cards.length) % cards.length
  flipped.value = false
}

function review(remembered: boolean) {
  recordAnswer(current.value.id, remembered)
  move(1)
}

function startSwipe(event: PointerEvent) {
  pointerStart.value = event.clientX
  swiped.value = false
}

function endSwipe(event: PointerEvent) {
  if (pointerStart.value === null) return
  const distance = event.clientX - pointerStart.value
  pointerStart.value = null
  if (Math.abs(distance) < 60) return
  swiped.value = true
  review(distance > 0)
}

function toggleCard() {
  if (swiped.value) {
    swiped.value = false
    return
  }
  flipped.value = !flipped.value
}
</script>

<template>
  <main class="flashcard-page">
    <header class="flashcard-topbar">
      <RouterLink class="icon-button" :to="{ path: '/learn', query: { script } }" aria-label="Kembali ke belajar">←</RouterLink>
      <div><strong>Flashcard</strong><span>{{ script === 'hiragana' ? 'Hiragana' : 'Katakana' }}</span></div>
      <span class="flashcard-count">{{ index + 1 }} / {{ cards.length }}</span>
    </header>

    <section class="flashcard-content">
      <p class="flashcard-hint">{{ flipped ? 'Tekan kartu untuk melihat kana' : 'Tekan kartu untuk membalik' }}</p>
      <button class="flashcard" :class="{ 'flashcard--flipped': flipped }" type="button" @pointerdown="startSwipe" @pointerup="endSwipe" @click="toggleCard">
        <template v-if="!flipped">
          <span class="flashcard__kana">{{ current.character }}</span>
          <span class="flashcard__tap">Tap untuk membalik</span>
        </template>
        <template v-else>
          <span class="flashcard__small-kana">{{ current.character }}</span>
          <strong class="flashcard__romaji">{{ current.romaji }}</strong>
          <template v-if="example">
            <span class="flashcard__word">{{ example.word }}</span>
            <span class="flashcard__detail">{{ example.reading }} — {{ example.meaning }}</span>
          </template>
          <span v-else class="flashcard__detail">Baris {{ current.group }}</span>
        </template>
      </button>

      <div class="flashcard-actions">
        <button class="flashcard-action flashcard-action--soft" type="button" @click="review(false)">← Belum Hafal</button>
        <button class="flashcard-action flashcard-action--primary" type="button" @click="review(true)">Hafal →</button>
      </div>
      <p class="helper-text flashcard-note">Geser kartu ke kiri untuk “Belum Hafal”, atau ke kanan untuk “Hafal”.</p>
    </section>
  </main>
</template>
