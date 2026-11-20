<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'

const NAV_ITEMS = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'sent', label: 'Sent' },
  { value: 'drafts', label: 'Drafts' },
  { value: 'trash', label: 'Trash' }
]

const getLabel = (value: string): string => {
  const item = NAV_ITEMS.find((navItem) => navItem.value === value)
  return item?.label ?? value
}

const activePage = ref('inbox')
const title = computed(() => getLabel(activePage.value))

const handleSelect = (event: CustomEvent<{ value: string }>) => (activePage.value = event.detail.value)
</script>

<template>
  <z-row gap="0" style="width: min(46rem, 100%); height: 20rem; border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden">
    <z-sidebar :value="activePage" :items="NAV_ITEMS" style="height: 100%" @select="handleSelect"></z-sidebar>
    <z-column gap="3" padding="5" style="flex: 1; min-width: 0; background: var(--surface-page)">
      <z-heading size="xs" tag="h2">{{ title }}</z-heading>
      <z-text size="sm" color="muted">The content sits on its own surface, inset from the sidebar.</z-text>
    </z-column>
  </z-row>
</template>
