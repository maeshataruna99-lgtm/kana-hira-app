<script setup lang="ts">
import { computed } from 'vue'
import portrait from '../../assets/companion/ganyu/portrait.png'
import { useCompanion } from '../../composables/useCompanion'
import { useSettings } from '../../composables/useSettings'

const props = withDefaults(defineProps<{ message?: string; compact?: boolean }>(), {
  compact: false,
})

const { settings } = useSettings()
const { companion } = useCompanion()
const visibleMessage = computed(() => props.message ?? companion.value.message)
</script>

<template>
  <aside v-if="settings.companion" class="companion" :class="{ 'companion--compact': compact }" aria-label="Learning companion">
    <p class="companion__bubble">{{ visibleMessage }}</p>
    <img class="companion__portrait" :src="portrait" alt="Ganyu, learning companion" />
  </aside>
</template>
