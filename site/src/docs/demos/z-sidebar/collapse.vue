<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const buildIcon = (paths: string): string => {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

// with icons, the collapsed rail keeps them; without, it falls back to initials
const NAV_ITEMS = [
  { value: 'inbox', label: 'Inbox', icon: buildIcon('<path d="M4 13h4l2 3h4l2-3h4"/><path d="M4 13 7 5h10l3 8v6H4z"/>') },
  {
    value: 'calendar',
    label: 'Calendar',
    icon: buildIcon('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>')
  },
  { value: 'files', label: 'Files', icon: buildIcon('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>') },
  {
    value: 'settings',
    label: 'Settings',
    icon: buildIcon('<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>')
  }
]

const activePage = ref('inbox')
const isCollapsed = ref(false)

const handleSelect = (event: CustomEvent<{ value: string }>) => (activePage.value = event.detail.value)
const toggleCollapsed = () => (isCollapsed.value = !isCollapsed.value)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <div style="height: 16rem">
      <z-sidebar :value="activePage" :items="NAV_ITEMS" :isCollapsed="isCollapsed" @select="handleSelect"></z-sidebar>
    </div>
    <z-button kind="outline" size="sm" @click="toggleCollapsed">{{ isCollapsed ? 'Expand' : 'Collapse' }}</z-button>
  </z-column>
</template>
