<script setup lang="ts">
import '@tasteee/zest'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Aurora', isCurrent: true }
]
</script>

<template>
  <z-breadcrumbs :items="TRAIL"></z-breadcrumbs>
</template>
