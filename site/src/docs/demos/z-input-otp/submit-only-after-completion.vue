<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const log = ref('Enter all six digits')

const handleComplete = (event: CustomEvent<{ value: string }>) => (log.value = `complete → verifying ${event.detail.value}…`)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-input-otp length="6" is-numeric @complete="handleComplete"></z-input-otp>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
