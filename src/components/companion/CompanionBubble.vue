<script setup lang="ts">
import portrait from '../../assets/companion/ganyu/portrait.png'
import { useSettings } from '../../composables/useSettings'

withDefaults(defineProps<{ message?: string; compact?: boolean }>(), {
  message: 'Yuk, kita belajar satu langkah kecil hari ini. 🌸',
  compact: false,
})

const { settings } = useSettings()
</script>

<template>
  <aside v-if="settings.companion" class="companion" :class="{ 'companion--compact': compact }" aria-label="Learning companion">
    <p class="companion__bubble">{{ message }}</p>
    <img class="companion__portrait" :src="portrait" alt="Ganyu, learning companion" />
  </aside>
</template>
