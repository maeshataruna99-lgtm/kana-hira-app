<script setup lang="ts">
import AppShell from '../components/navigation/AppShell.vue'
import { useProgress } from '../composables/useProgress'
import { kanaFontOptions, useSettings } from '../composables/useSettings'

const { resetProgress } = useProgress()
const { settings } = useSettings()

function requestReset() {
  if (window.confirm('Hapus seluruh progres belajar yang tersimpan di perangkat ini?')) resetProgress()
}
</script>

<template>
  <AppShell>
    <section class="page">
      <div class="section-heading"><div><p class="eyebrow">Preferensi</p><h1>Pengaturan</h1></div></div>
      <section class="settings-list">
        <label class="setting-row"><span><strong>Efek Suara</strong><small>Bunyi saat menjawab</small></span><input v-model="settings.soundEffects" type="checkbox" aria-label="Efek Suara" /></label>
        <label class="setting-row"><span><strong>Pelafalan</strong><small>Aktifkan tombol dengarkan untuk kana</small></span><input v-model="settings.pronunciation" type="checkbox" aria-label="Pelafalan" /></label>
        <label class="setting-row" :class="{ 'setting-row--disabled': !settings.pronunciation }"><span><strong>Putar Otomatis</strong><small>Baca kana saat flashcard berganti</small></span><input v-model="settings.autoPronunciation" :disabled="!settings.pronunciation" type="checkbox" aria-label="Putar Otomatis" /></label>
        <label class="setting-row"><span><strong>Companion</strong><small>Komentar dari pendamping belajar</small></span><input v-model="settings.companion" type="checkbox" aria-label="Companion" /></label>
        <label class="setting-row"><span><strong>Animasi</strong><small>Transisi kartu dan efek</small></span><input v-model="settings.animations" type="checkbox" aria-label="Animasi" /></label>
      </section>
      <section class="panel font-settings">
        <div><p class="eyebrow">Kejelasan Kana</p><h2>Font belajar</h2><p class="helper-text">Pilih tampilan kana yang paling mudah Anda baca. Berlaku untuk kartu, quiz, dan daftar kana.</p></div>
        <div class="font-choice-list" role="radiogroup" aria-label="Font belajar kana">
          <label v-for="font in kanaFontOptions" :key="font.value" class="font-choice" :class="{ 'font-choice--selected': settings.kanaFont === font.value }">
            <input v-model="settings.kanaFont" type="radio" name="kana-font" :value="font.value" />
            <span class="font-choice__preview" :class="`font-choice__preview--${font.value}`">あ ア 漢</span>
            <span><strong>{{ font.label }}</strong><small>{{ font.description }}</small></span>
          </label>
        </div>
      </section>
      <section class="panel"><h2>Data</h2><button class="danger-button" type="button" @click="requestReset">Reset Progress</button></section>
    </section>
  </AppShell>
</template>
