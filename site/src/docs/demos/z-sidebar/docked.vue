<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const NAV_ITEMS = [
  { value: 'projects', label: 'Projects' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'reports', label: 'Reports' }
]

const activePage = ref('tasks')

const handleSelect = (event: CustomEvent<{ value: string }>) => (activePage.value = event.detail.value)
</script>

<template>
  <div style="display: flex; width: 100%; height: 16rem; border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden">
    <z-sidebar is-docked tone="tertiary" :value="activePage" :items="NAV_ITEMS" @select="handleSelect"></z-sidebar>
    <div style="flex: 1; padding: 1.25rem">
      <z-text size="sm" color="muted">Page content sits flush against the docked rail.</z-text>
    </div>
  </div>
</template>
