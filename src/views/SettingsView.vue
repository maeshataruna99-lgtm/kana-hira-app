<script setup lang="ts">
import AppShell from '../components/navigation/AppShell.vue'
import { useProgress } from '../composables/useProgress'
import { useSettings } from '../composables/useSettings'

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
        <label class="setting-row"><span><strong>Pelafalan</strong><small>Audio cara baca kana</small></span><input v-model="settings.pronunciation" type="checkbox" aria-label="Pelafalan" /></label>
        <label class="setting-row"><span><strong>Companion</strong><small>Komentar dari pendamping belajar</small></span><input v-model="settings.companion" type="checkbox" aria-label="Companion" /></label>
        <label class="setting-row"><span><strong>Animasi</strong><small>Transisi kartu dan efek</small></span><input v-model="settings.animations" type="checkbox" aria-label="Animasi" /></label>
      </section>
      <section class="panel"><h2>Data</h2><button class="danger-button" type="button" @click="requestReset">Reset Progress</button></section>
    </section>
  </AppShell>
</template>
