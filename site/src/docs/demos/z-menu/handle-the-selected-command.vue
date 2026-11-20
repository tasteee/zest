<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const log = ref('Nothing picked yet')

// the picked row flashes twice, then select fires as the menu closes
const handleSelect = (event: CustomEvent<{ value: string }>) => (log.value = `select → ${event.detail.value}`)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-menu @select="handleSelect">
      <z-button slot="trigger" kind="soft">Project</z-button>
      <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
      <z-menu-item value="share">Share link</z-menu-item>
      <z-menu-item value="archive" is-disabled>Archive</z-menu-item>
      <z-menu-separator></z-menu-separator>
      <z-menu-item value="delete" is-danger>Delete</z-menu-item>
    </z-menu>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{{ log }}</z-text>
  </z-column>
</template>
