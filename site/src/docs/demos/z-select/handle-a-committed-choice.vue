<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const STYLE_OPTIONS = [
  { value: 'calm', label: 'Calm' },
  { value: 'electric', label: 'Electric' },
  { value: 'minimal', label: 'Minimal', isDisabled: true }
]

const selectedStyle = ref('electric')

const handleChange = (event: CustomEvent<{ value: string }>) => (selectedStyle.value = event.detail.value)
</script>

<template>
  <z-column gap="3" style="width: min(18rem, 100%)">
    <z-field label="Style">
      <z-select :value="selectedStyle" :options="STYLE_OPTIONS" @change="handleChange"></z-select>
    </z-field>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {{ selectedStyle }}</z-text>
  </z-column>
</template>
