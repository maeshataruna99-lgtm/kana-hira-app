<script setup lang="ts">
defineProps<{ value: number; tone?: 'blue' | 'gold' }>()
</script>

<template>
  <div class="progress-bar" :aria-label="`Progress ${value}%`" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
    <span :class="['progress-bar__fill', `progress-bar__fill--${tone ?? 'blue'}`]" :style="{ width: `${value}%` }" />
  </div>
</template>
