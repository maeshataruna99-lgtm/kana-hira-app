<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import CompanionBubble from '../companion/CompanionBubble.vue'
import { useSettings } from '../../composables/useSettings'

const route = useRoute()
const { settings } = useSettings()
const mobileMenuOpen = ref(false)

const items = [
  { label: 'Home', glyph: '⌂', to: '/' },
  { label: 'Learn', glyph: 'あ', to: '/learn' },
  { label: 'Rangkai', glyph: '✎', to: '/word-builder' },
  { label: 'Quiz', glyph: '🎴', to: '/quiz' },
  { label: 'Stats', glyph: '◔', to: '/progress' },
]

const currentTitle = computed(() => {
  const found = items.find((item) => item.to === route.path)
  return found?.label ?? 'Settings'
})

const kanaFontFamily = computed(() => ({
  'noto-sans': "'Noto Sans JP', 'Meiryo', sans-serif",
  meiryo: "Meiryo, 'Noto Sans JP', sans-serif",
  hiragino: "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
  'noto-serif': "'Noto Serif JP', 'Yu Mincho', serif",
}[settings.value.kanaFont]))

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--reduced-motion': !settings.animations }" :style="{ '--kana-font': kanaFontFamily }">
    <aside class="desktop-nav" aria-label="Primary navigation">
      <RouterLink class="brand" to="/">🌸 Kana Companion</RouterLink>
      <nav>
        <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="desktop-nav__item">
          <span>{{ item.glyph }}</span>{{ item.label }}
        </RouterLink>
        <RouterLink class="desktop-nav__item" to="/settings"><span>⚙</span>Settings</RouterLink>
      </nav>
    </aside>

    <main class="app-main">
      <header class="topbar">
        <button class="mobile-menu-button" type="button" aria-label="Buka menu navigasi" aria-controls="mobile-navigation" :aria-expanded="mobileMenuOpen" @click="mobileMenuOpen = true">☰</button>
        <RouterLink class="wordmark" to="/">Kana Companion</RouterLink>
        <span class="mobile-page-title">{{ currentTitle }}</span>
        <RouterLink class="icon-button" to="/settings" aria-label="Pengaturan">⚙</RouterLink>
      </header>
      <slot />
    </main>

    <aside class="desktop-companion-panel" aria-label="Learning companion panel">
      <CompanionBubble />
    </aside>

    <div v-if="mobileMenuOpen" class="mobile-nav-layer">
      <button class="mobile-nav-backdrop" type="button" aria-label="Tutup menu" @click="closeMobileMenu" />
      <aside id="mobile-navigation" class="mobile-nav-drawer" aria-label="Navigasi utama">
        <div class="mobile-nav-drawer__header"><strong>🌸 Kana Companion</strong><button class="icon-button" type="button" aria-label="Tutup menu" @click="closeMobileMenu">×</button></div>
        <nav>
          <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="mobile-nav-item" @click="closeMobileMenu"><span>{{ item.glyph }}</span>{{ item.label }}</RouterLink>
          <RouterLink to="/settings" class="mobile-nav-item" @click="closeMobileMenu"><span>⚙</span>Settings</RouterLink>
        </nav>
      </aside>
    </div>
  </div>
</template>
