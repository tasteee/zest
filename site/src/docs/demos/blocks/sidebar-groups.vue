<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const NAV_ITEMS = [
  { value: 'overview', label: 'Overview' },
  {
    label: 'Workspace',
    items: [
      { value: 'projects', label: 'Projects', badge: '8' },
      { value: 'tasks', label: 'Tasks' },
      { value: 'reports', label: 'Reports' }
    ]
  },
  {
    label: 'Settings',
    items: [
      { value: 'members', label: 'Members' },
      { value: 'billing', label: 'Billing' }
    ]
  }
]

const activePage = ref('overview')

const handleSelect = (event: CustomEvent<{ value: string }>) => (activePage.value = event.detail.value)
</script>

<template>
  <div style="height: 22rem">
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
  </div>
</template>
