<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const DESTINATIONS = [
  { value: 'library', label: 'Library' },
  { value: 'create', label: 'Create' },
  { value: 'explore', label: 'Explore' }
]

const route = ref('library')

// the router owns navigation; value follows the route
const handleSelect = (event: CustomEvent<{ value: string }>) => (route.value = event.detail.value)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-nav-menu tone="tertiary" :value="route" :items="DESTINATIONS" @select="handleSelect"></z-nav-menu>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">route: /{{ route }}</z-text>
  </z-column>
</template>
