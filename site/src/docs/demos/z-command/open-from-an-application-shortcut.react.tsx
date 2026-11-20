import { useEffect, useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // pick a shortcut the browser and OS don't already own
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = event.altKey && event.code === 'KeyP'
      if (!isShortcut) return
      event.preventDefault()
      setIsPaletteOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openPalette = () => setIsPaletteOpen(true)
  const closePalette = () => setIsPaletteOpen(false)

  return (
    <z-column gap="3" alignsX="center">
      <z-command isOpen={isPaletteOpen} onclose={closePalette}>
        <z-command-item value="projects" group="Navigation" shortcut="G P">Go to Projects</z-command-item>
        <z-command-item value="settings" group="Navigation" shortcut="G S">Go to Settings</z-command-item>
        <z-command-item value="new" group="Actions" keywords="create add">New project</z-command-item>
      </z-command>
      <z-button kind="outline" onClick={openPalette}>Open palette</z-button>
      <z-text size="sm" color="muted">
        …or press <z-kbd size="sm">⌥</z-kbd> <z-kbd size="sm">P</z-kbd> anywhere on this page.
      </z-text>
    </z-column>
  )
}
