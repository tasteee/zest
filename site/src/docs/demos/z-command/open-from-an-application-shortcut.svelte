<script lang="ts">
  import '@tasteee/zest'

  let isPaletteOpen = $state(false)

  // pick a shortcut the browser and OS don't already own
  const handleKeyDown = (event: KeyboardEvent) => {
    const isShortcut = event.altKey && event.code === 'KeyP'
    if (!isShortcut) return
    event.preventDefault()
    isPaletteOpen = true
  }

  const openPalette = () => (isPaletteOpen = true)
  const closePalette = () => (isPaletteOpen = false)
</script>

<svelte:window onkeydown={handleKeyDown} />

<z-column gap="3" aligns-x="center">
  <z-command isOpen={isPaletteOpen} onclose={closePalette}>
    <z-command-item value="projects" group="Navigation" shortcut="G P">Go to Projects</z-command-item>
    <z-command-item value="settings" group="Navigation" shortcut="G S">Go to Settings</z-command-item>
    <z-command-item value="new" group="Actions" keywords="create add">New project</z-command-item>
  </z-command>
  <z-button kind="outline" onclick={openPalette}>Open palette</z-button>
  <z-text size="sm" color="muted">…or press <z-kbd size="sm">⌥</z-kbd> <z-kbd size="sm">P</z-kbd> anywhere on this page.</z-text>
</z-column>
