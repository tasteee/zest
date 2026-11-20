<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

type SelectionEventT = CustomEvent<{ value: string | null; start: string | null; end: string | null }>

const result = ref('Pick a start and an end')

const handleInput = (event: SelectionEventT) => {
  const hasEnd = event.detail.end !== null
  if (!hasEnd) result.value = `From ${event.detail.start}, pick an end`
}

const handleChange = (event: SelectionEventT) => {
  result.value = `${event.detail.start} to ${event.detail.end}`
}
</script>

<template>
  <z-column gap="4">
    <z-calendar is-range @input="handleInput" @change="handleChange"></z-calendar>
    <z-text>{{ result }}</z-text>
  </z-column>
</template>
