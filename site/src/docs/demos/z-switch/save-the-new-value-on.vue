<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const log = ref('checked: false')

// switches apply immediately, so save on every change
const handleChange = (event: CustomEvent<{ checked: boolean }>) => (log.value = `checked: ${event.detail.checked} · saved`)
</script>

<template>
  <z-column gap="3">
    <z-switch tone="secondary" @change="handleChange">Use compact mode</z-switch>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
