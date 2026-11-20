import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = useState('checked: false')

  // switches apply immediately, so save on every change
  const handleChange = (event: CustomEvent<{ checked: boolean }>) => setLog(`checked: ${event.detail.checked} · saved`)

  return (
    <z-column gap="3">
      <z-switch tone="secondary" onchange={handleChange}>Use compact mode</z-switch>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
