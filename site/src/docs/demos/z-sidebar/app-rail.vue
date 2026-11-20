<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const NAV_ITEMS = [
  { value: 'home', label: 'Home' },
  {
    label: 'Workspace',
    items: [
      { value: 'projects', label: 'Projects', badge: '4' },
      { value: 'tasks', label: 'Tasks' },
      {
        label: 'Archived',
        items: [
          { value: 'q1', label: 'Q1 launch' },
          { value: 'q2', label: 'Q2 launch' }
        ]
      }
    ]
  },
  { value: 'settings', label: 'Settings' }
]

const activePage = ref('projects')

const handleSelect = (event: CustomEvent<{ value: string }>) => (activePage.value = event.detail.value)
</script>

<template>
  <div style="height: 22rem">
    <z-sidebar :value="activePage" :items="NAV_ITEMS" @select="handleSelect">
      <z-row slot="header" gap="2" aligns-y="center">
        <z-avatar name="Acme" size="xs" is-square tone="tertiary"></z-avatar>
        <z-text weight="600">Acme</z-text>
      </z-row>
      <z-text slot="footer" size="xs" color="muted">Signed in as Maya</z-text>
    </z-sidebar>
  </div>
</template>
