<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' }
]

const framework = ref('react')

const handleChange = (event: CustomEvent<{ value: string }>) => (framework.value = event.detail.value)
</script>

<template>
  <z-column gap="3" style="width: min(20rem, 100%)">
    <z-field label="Framework">
      <z-combobox
        :value="framework"
        :options="FRAMEWORKS"
        placeholder="Search frameworks…"
        @change="handleChange"
      ></z-combobox>
    </z-field>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {{ framework }}</z-text>
  </z-column>
</template>
