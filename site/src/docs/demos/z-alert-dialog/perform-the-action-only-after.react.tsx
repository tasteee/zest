import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = useState('Waiting for a decision…')

  // act only on confirm; cancel (button, Esc) changes nothing
  const handleConfirm = () => setLog('confirm → project deleted')
  const handleCancel = () => setLog('cancel → nothing changed')

  return (
    <z-column gap="3" alignsX="center">
      <z-alert-dialog
        tone="danger"
        heading="Delete this project?"
        description="This permanently removes the project and its files."
        confirmLabel="Delete"
        onconfirm={handleConfirm}
        oncancel={handleCancel}
      >
        <z-button slot="trigger" kind="outline" tone="danger">Delete project</z-button>
      </z-alert-dialog>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
