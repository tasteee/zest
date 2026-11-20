import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  // the element reports its own closes (Esc, backdrop) through `close`
  const openEditor = () => setIsEditorOpen(true)
  const closeEditor = () => setIsEditorOpen(false)
  const logText = `is-open: ${isEditorOpen}`

  return (
    <z-column gap="3" alignsX="center">
      <z-dialog
        heading="Edit profile"
        description="Opened by the application, not a slotted trigger."
        isOpen={isEditorOpen}
        onopen={openEditor}
        onclose={closeEditor}
      >
        <z-field label="Display name">
          <z-input value="Ada Lovelace" />
        </z-field>
        <z-row slot="footer" gap="2" alignsX="end">
          <z-button kind="plain" onClick={closeEditor}>Cancel</z-button>
          <z-button tone="secondary" onClick={closeEditor}>Save</z-button>
        </z-row>
      </z-dialog>

      <z-button kind="outline" onClick={openEditor}>Open from the app</z-button>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
