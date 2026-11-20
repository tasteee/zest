<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const panel = ref('overview')

// e.g. keep the selected panel in the URL
const handleChange = (event: CustomEvent<{ value: string }>) => (panel.value = event.detail.value)
</script>

<template>
  <z-column gap="3" style="width: min(32rem, 100%)">
    <z-tabs :value="panel" @change="handleChange">
      <z-tab value="overview">Overview</z-tab>
      <z-tab value="activity">Activity</z-tab>
      <z-tab value="billing" is-disabled>Billing</z-tab>
    </z-tabs>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">?panel={{ panel }}</z-text>
  </z-column>
</template>
