<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const FOOD_OPTIONS = [
  {
    value: 'fruit',
    label: 'Fruit',
    children: [
      { value: 'apple', label: 'Apple' },
      {
        value: 'citrus',
        label: 'Citrus',
        children: [
          { value: 'lemon', label: 'Lemon' },
          { value: 'orange', label: 'Orange' }
        ]
      }
    ]
  },
  { value: 'water', label: 'Water' }
]

const log = ref('change → none')

const handleChange = (event: CustomEvent<{ value: string; path: string[] }>) => {
  log.value = `change → ${event.detail.path.join(' › ')}`
}
</script>

<template>
  <z-column gap="3" style="width: min(18rem, 100%)">
    <z-field label="Food">
      <z-select placeholder="Pick something" :options="FOOD_OPTIONS" @change="handleChange"></z-select>
    </z-field>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
