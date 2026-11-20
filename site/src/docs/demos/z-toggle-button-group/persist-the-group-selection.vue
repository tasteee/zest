<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const log = ref('change → ["bold"]')

// a string for a single-choice group, a string[] with is-multiple
const handleChange = (event: CustomEvent<{ value?: string | string[] }>) => {
  log.value = `change → ${JSON.stringify(event.detail.value)}`
}
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-toggle-button-group is-multiple kind="outline" @change="handleChange">
      <z-toggle-button-group-item value="bold" is-pressed>Bold</z-toggle-button-group-item>
      <z-toggle-button-group-item value="italic">Italic</z-toggle-button-group-item>
      <z-toggle-button-group-item value="underline">Underline</z-toggle-button-group-item>
    </z-toggle-button-group>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
