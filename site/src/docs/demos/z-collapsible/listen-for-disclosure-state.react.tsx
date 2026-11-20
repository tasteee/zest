import { useState } from 'react'
import '@tasteee/zest'

type ToggleEventT = CustomEvent<{ value: string; open: boolean }>

export const Example = () => {
  const [log, setLog] = useState('Open or close the section')

  const handleToggle = (event: ToggleEventT) => {
    setLog(`toggle → { value: '${event.detail.value}', open: ${event.detail.open} }`)
  }

  return (
    <z-column gap="3" style={{ width: 'min(30rem, 100%)' }}>
      <z-collapsible
        value="details"
        tone="secondary"
        label="Implementation details"
        ontoggle={handleToggle}
      >
        The toggle event carries this section’s value and whether it is now open.
      </z-collapsible>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
