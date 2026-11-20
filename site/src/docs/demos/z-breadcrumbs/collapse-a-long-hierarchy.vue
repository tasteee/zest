<script setup lang="ts">
import '@tasteee/zest'

const LONG_TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Workspace', href: '#workspace' },
  { label: 'Projects', href: '#projects' },
  { label: 'Aurora', href: '#aurora' },
  { label: 'Settings', isCurrent: true }
]
</script>

<template>
  <z-breadcrumbs :items="LONG_TRAIL" max="3" tone="tertiary"></z-breadcrumbs>
</template>
