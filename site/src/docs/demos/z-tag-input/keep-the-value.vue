<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const recipients = ref<string[]>([])

const handleChange = (event: CustomEvent<{ value: string[] }>) => (recipients.value = event.detail.value)
</script>

<template>
  <z-column gap="3" style="max-width: 28rem">
    <z-tag-input label="Recipients" placeholder="name@example.com" max="5" tone="secondary" :value.prop="recipients" @change="handleChange"></z-tag-input>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">value → {{ JSON.stringify(recipients) }}</z-text>
  </z-column>
</template>
