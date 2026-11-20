<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const TRAIL = [{ label: 'Library' }, { label: 'Albums' }, { label: 'Lisbon', isCurrent: true }]

const log = ref('Click a crumb')

const handleNavigate = (event: CustomEvent<{ value: string; index: number }>) => {
  const crumb = TRAIL[event.detail.index]
  log.value = `navigate → index ${event.detail.index} (${crumb.label})`
}
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-breadcrumbs :items="TRAIL" @navigate="handleNavigate"></z-breadcrumbs>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
