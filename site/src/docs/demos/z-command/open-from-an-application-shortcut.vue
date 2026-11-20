<script setup lang="ts">
import '@tasteee/zest'
import { onMounted, onUnmounted, ref } from 'vue'

const isPaletteOpen = ref(false)

// pick a shortcut the browser and OS don't already own
const handleKeyDown = (event: KeyboardEvent) => {
  const isShortcut = event.altKey && event.code === 'KeyP'
  if (!isShortcut) return
  event.preventDefault()
  isPaletteOpen.value = true
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

const openPalette = () => (isPaletteOpen.value = true)
const closePalette = () => (isPaletteOpen.value = false)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-command :isOpen="isPaletteOpen" @close="closePalette">
      <z-command-item value="projects" group="Navigation" shortcut="G P">Go to Projects</z-command-item>
      <z-command-item value="settings" group="Navigation" shortcut="G S">Go to Settings</z-command-item>
      <z-command-item value="new" group="Actions" keywords="create add">New project</z-command-item>
    </z-command>
    <z-button kind="outline" @click="openPalette">Open palette</z-button>
    <z-text size="sm" color="muted">…or press <z-kbd size="sm">⌥</z-kbd> <z-kbd size="sm">P</z-kbd> anywhere on this page.</z-text>
  </z-column>
</template>
