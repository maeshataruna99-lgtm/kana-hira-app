<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CompanionBubble from '../companion/CompanionBubble.vue'
import { useSettings } from '../../composables/useSettings'

const route = useRoute()
const { settings } = useSettings()

const items = [
  { label: 'Home', glyph: '⌂', to: '/' },
  { label: 'Learn', glyph: 'あ', to: '/learn' },
  { label: 'Quiz', glyph: '🎴', to: '/quiz' },
  { label: 'Stats', glyph: '◔', to: '/progress' },
]

const currentTitle = computed(() => {
  const found = items.find((item) => item.to === route.path)
  return found?.label ?? 'Settings'
})
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--reduced-motion': !settings.animations }">
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
        <RouterLink class="wordmark" to="/">Kana Companion</RouterLink>
        <span class="mobile-page-title">{{ currentTitle }}</span>
        <RouterLink class="icon-button" to="/settings" aria-label="Pengaturan">⚙</RouterLink>
      </header>
      <slot />
    </main>

    <aside class="desktop-companion-panel" aria-label="Learning companion panel">
      <CompanionBubble />
    </aside>

    <nav class="bottom-nav" aria-label="Primary navigation">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="bottom-nav__item">
        <span class="bottom-nav__glyph">{{ item.glyph }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
