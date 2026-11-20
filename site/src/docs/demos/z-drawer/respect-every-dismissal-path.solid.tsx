import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false)
  const [closeCount, setCloseCount] = createSignal(0)

  const openDrawer = () => setIsDrawerOpen(true)

  // every dismissal path (drag, Esc, backdrop) ends in the same close event
  const handleClose = () => {
    setIsDrawerOpen(false)
    setCloseCount((count) => count + 1)
  }

  return (
    <z-column gap="3" aligns-x="center">
      <z-drawer
        heading="Quick actions"
        description="Drag the handle down, press Esc, or tap the backdrop."
        prop:isOpen={isDrawerOpen()}
        onClose={handleClose}
      >
        <z-column gap="2">
          <z-button kind="soft" is-full-width="">Share</z-button>
          <z-button kind="soft" is-full-width="">Duplicate</z-button>
        </z-column>
      </z-drawer>
      <z-button kind="outline" onClick={openDrawer}>Open drawer</z-button>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">close events: {closeCount()}</z-text>
    </z-column>
  )
}
