import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [isEditorOpen, setIsEditorOpen] = createSignal(false)

  // the element reports its own closes (Esc, backdrop) through `close`
  const openEditor = () => setIsEditorOpen(true)
  const closeEditor = () => setIsEditorOpen(false)

  return (
    <z-column gap="3" aligns-x="center">
      <z-dialog
        heading="Edit profile"
        description="Opened by the application, not a slotted trigger."
        prop:isOpen={isEditorOpen()}
        onOpen={openEditor}
        onClose={closeEditor}
      >
        <z-field label="Display name">
          <z-input value="Ada Lovelace" />
        </z-field>
        <z-row slot="footer" gap="2" aligns-x="end">
          <z-button kind="plain" onClick={closeEditor}>Cancel</z-button>
          <z-button tone="secondary" onClick={closeEditor}>Save</z-button>
        </z-row>
      </z-dialog>

      <z-button kind="outline" onClick={openEditor}>Open from the app</z-button>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">is-open: {String(isEditorOpen())}</z-text>
    </z-column>
  )
}
