<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const isActive = ref(false)

const handleChange = (event: CustomEvent<{ active: boolean }>) => (isActive.value = event.detail.active)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-swap label="Theme" effect="rotate" @change="handleChange">
      <span slot="off">Light</span>
      <span slot="on">Dark</span>
    </z-swap>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">active: {{ isActive }}</z-text>
  </z-column>
</template>
