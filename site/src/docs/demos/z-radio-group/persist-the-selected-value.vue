<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const plan = ref('pro')

const handleChange = (event: CustomEvent<{ value?: string }>) => (plan.value = event.detail.value ?? '')
</script>

<template>
  <z-column gap="3">
    <z-radio-group label="Plan" :value="plan" @change="handleChange">
      <z-radio value="free">Free</z-radio>
      <z-radio value="pro">Pro</z-radio>
      <z-radio value="team">Team</z-radio>
    </z-radio-group>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {{ plan }}</z-text>
  </z-column>
</template>
