<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const SOUND_OPTIONS = [
  { value: 'midi', label: 'MIDI output' },
  {
    value: 'keys',
    label: 'Keys',
    isGroup: true,
    children: [
      { value: 'grand-piano', label: 'Grand Piano' },
      { value: 'electric-piano', label: 'Electric Piano' },
      { value: 'organ', label: 'Organ' }
    ]
  },
  {
    value: 'bass',
    label: 'Bass',
    isGroup: true,
    children: [
      { value: 'sub-bass', label: 'Sub Bass' },
      { value: '808', label: '808' }
    ]
  }
]

const log = ref('change → none')

const handleChange = (event: CustomEvent<{ value: string; path: string[] }>) => {
  log.value = `change → ${event.detail.value}`
}
</script>

<template>
  <z-column gap="3" style="width: min(18rem, 100%)">
    <z-field label="Sound">
      <z-select value="grand-piano" :options="SOUND_OPTIONS" @change="handleChange"></z-select>
    </z-field>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
