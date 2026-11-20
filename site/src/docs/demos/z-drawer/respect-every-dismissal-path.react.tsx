import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [closeCount, setCloseCount] = useState(0)

  const openDrawer = () => setIsDrawerOpen(true)

  // every dismissal path (drag, Esc, backdrop) ends in the same close event
  const handleClose = () => {
    setIsDrawerOpen(false)
    setCloseCount((count) => count + 1)
  }

  const logText = `close events: ${closeCount}`

  return (
    <z-column gap="3" alignsX="center">
      <z-drawer
        heading="Quick actions"
        description="Drag the handle down, press Esc, or tap the backdrop."
        isOpen={isDrawerOpen}
        onclose={handleClose}
      >
        <z-column gap="2">
          <z-button kind="soft" isFullWidth>Share</z-button>
          <z-button kind="soft" isFullWidth>Duplicate</z-button>
        </z-column>
      </z-drawer>
      <z-button kind="outline" onClick={openDrawer}>Open drawer</z-button>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
