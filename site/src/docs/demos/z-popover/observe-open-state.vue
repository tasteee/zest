<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'

const isOpen = ref(false)
const openCount = ref(0)

// toggle reports the resulting state, e.g. for analytics or syncing nearby UI
const handleToggle = (event: CustomEvent<{ open: boolean }>) => {
  isOpen.value = event.detail.open
  if (event.detail.open) openCount.value += 1
}

const logText = computed(() => {
  const stateLabel = isOpen.value ? 'open' : 'closed'
  const timesLabel = openCount.value === 1 ? 'time' : 'times'
  return `${stateLabel} · opened ${openCount.value} ${timesLabel}`
})
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-popover placement="bottom" @toggle="handleToggle">
      <z-button slot="trigger" kind="outline">Shipping details</z-button>
      <z-column gap="1">
        <z-text size="sm" weight="600">Ships in 2 business days</z-text>
        <z-text size="sm" color="muted">Free returns for 30 days.</z-text>
      </z-column>
    </z-popover>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ logText }}</z-text>
  </z-column>
</template>
