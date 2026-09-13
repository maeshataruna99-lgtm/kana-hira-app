<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../components/navigation/AppShell.vue'
import { getKanaByGroup, kanaGroups } from '../data/kana'
import { vocabulary } from '../data/vocabulary'
import type { Kana, KanaScript } from '../types/kana'

const script = ref<KanaScript>('hiragana')
const selectedKana = ref<Kana[]>([])

const word = computed(() => selectedKana.value.map((kana) => kana.character).join(''))
const romaji = computed(() => selectedKana.value.map((kana) => kana.romaji).join(''))
const knownWord = computed(() => vocabulary.find((item) => item.word === word.value))

function setScript(nextScript: KanaScript) {
  script.value = nextScript
  selectedKana.value = []
}

function addKana(kana: Kana) {
  selectedKana.value.push(kana)
}

function removeLast() {
  selectedKana.value.pop()
}

function clearWord() {
  selectedKana.value = []
}
</script>

<template>
  <AppShell>
    <section class="page word-builder-page">
      <div class="section-heading"><div><p class="eyebrow">Latihan bebas</p><h1>Rangkai Kata</h1></div></div>
      <p class="helper-text">Pilih kana untuk menyusun kata sendiri. Ganti jenis tulisan kapan saja.</p>

      <div class="segment-control" aria-label="Pilih jenis kana untuk dirangkai">
        <button :class="{ active: script === 'hiragana' }" @click="setScript('hiragana')">Hiragana</button>
        <button :class="{ active: script === 'katakana' }" @click="setScript('katakana')">Katakana</button>
      </div>

      <section class="word-builder-output" aria-live="polite" aria-label="Kata yang dirangkai">
        <span v-if="word" class="word-builder-output__kana">{{ word }}</span>
        <span v-else class="word-builder-output__placeholder">Pilih kana di bawah</span>
        <span v-if="romaji" class="word-builder-output__romaji">{{ romaji }}</span>
        <span v-if="knownWord" class="word-builder-output__meaning">{{ knownWord.meaning }}</span>
      </section>

      <div class="word-builder-actions">
        <button class="flashcard-action flashcard-action--soft" type="button" :disabled="!word" @click="removeLast">⌫ Hapus</button>
        <button class="flashcard-action flashcard-action--primary" type="button" :disabled="!word" @click="clearWord">↺ Reset</button>
      </div>

      <section v-for="group in kanaGroups" :key="group" class="kana-group">
        <h2>{{ group }}</h2>
        <div class="kana-grid">
          <button v-for="kana in getKanaByGroup(script, group)" :key="kana.id" class="kana-tile word-builder-key" type="button" :aria-label="`Tambahkan ${kana.character}, dibaca ${kana.romaji}`" @click="addKana(kana)">{{ kana.character }}</button>
        </div>
      </section>
    </section>
  </AppShell>
</template>
