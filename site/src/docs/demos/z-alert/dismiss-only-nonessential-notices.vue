<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const isNoticeHidden = ref(false)
const log = ref('dismiss not fired yet')

const handleDismiss = () => {
  isNoticeHidden.value = true
  log.value = 'dismiss → preference saved'
}

const handleRestore = () => {
  isNoticeHidden.value = false
  log.value = 'dismiss not fired yet'
}
</script>

<template>
  <z-column gap="3" style="width: min(30rem, 100%)">
    <z-alert
      tone="secondary"
      heading="What’s new in 0.6"
      is-dismissable
      :isHidden="isNoticeHidden"
      @dismiss="handleDismiss"
    >
      Menus confirm your pick with a quick flash before closing.
    </z-alert>
    <z-row gap="3" aligns-y="center">
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
      <z-button size="sm" kind="plain" @click="handleRestore">Restore</z-button>
    </z-row>
  </z-column>
</template>
