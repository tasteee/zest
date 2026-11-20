import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = createSignal('Waiting for a decision…')

  // act only on confirm; cancel (button, Esc) changes nothing
  const handleConfirm = () => setLog('confirm → project deleted')
  const handleCancel = () => setLog('cancel → nothing changed')

  return (
    <z-column gap="3" aligns-x="center">
      <z-alert-dialog
        tone="danger"
        heading="Delete this project?"
        description="This permanently removes the project and its files."
        confirm-label="Delete"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <z-button slot="trigger" kind="outline" tone="danger">Delete project</z-button>
      </z-alert-dialog>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
