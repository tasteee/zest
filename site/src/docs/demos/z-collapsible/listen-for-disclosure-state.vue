<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const log = ref('Open or close the section')

const handleToggle = (event: CustomEvent<{ value: string; open: boolean }>) => {
  log.value = `toggle → { value: '${event.detail.value}', open: ${event.detail.open} }`
}
</script>

<template>
  <z-column gap="3" style="width: min(30rem, 100%)">
    <z-collapsible
      style="width: min(28rem, 100%)"
      value="details"
      tone="secondary"
      label="Implementation details"
      @toggle="handleToggle"
    >
      The toggle event carries this section’s value and whether it is now open.
    </z-collapsible>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
