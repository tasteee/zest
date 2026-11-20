import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = useState('Enter all six digits')

  const handleComplete = (event: CustomEvent<{ value: string }>) => {
    setLog(`complete → verifying ${event.detail.value}…`)
  }

  return (
    <z-column gap="3" alignsX="center">
      <z-input-otp length={6} isNumeric oncomplete={handleComplete} />
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
