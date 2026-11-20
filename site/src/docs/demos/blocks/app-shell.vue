<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'
import './styles.css'

const NAV_ITEMS = [
  { value: 'inbox', label: 'Inbox', badge: '3' },
  { value: 'drafts', label: 'Drafts' },
  {
    label: 'Projects',
    items: [
      { value: 'design-system', label: 'Design system' },
      { value: 'website', label: 'Website' }
    ]
  }
]

// "design-system" → "Design system"
const formatTitle = (value: string): string => {
  const spacedValue = value.replace('-', ' ')
  return spacedValue.charAt(0).toUpperCase() + spacedValue.slice(1)
}

const activePage = ref('inbox')
const title = computed(() => formatTitle(activePage.value))

const handleSelect = (event: CustomEvent<{ value: string }>) => (activePage.value = event.detail.value)
</script>

<template>
  <z-row class="app-shell" gap="4" stack-below="small">
    <z-sidebar :value="activePage" :items="NAV_ITEMS" @select="handleSelect">
      <z-row slot="header" gap="2" aligns-y="center">
        <z-avatar name="Acme" size="xs" is-square tone="tertiary"></z-avatar>
        <z-text weight="600">Acme</z-text>
      </z-row>
      <z-row slot="footer" gap="2" aligns-y="center">
        <z-avatar name="Ada Lovelace" size="xs" status="online"></z-avatar>
        <z-text size="xs" color="muted">Ada Lovelace</z-text>
      </z-row>
    </z-sidebar>

    <z-column class="app-shell-content" role="main" gap="3" padding="5">
      <z-row aligns-x="between" aligns-y="center">
        <z-heading size="xs" tag="h2">{{ title }}</z-heading>
        <z-button size="sm" tone="secondary">New message</z-button>
      </z-row>
      <z-text size="sm" color="muted">Pick a destination in the sidebar; the shell owns the layout, the sidebar owns selection.</z-text>
    </z-column>
  </z-row>
</template>
