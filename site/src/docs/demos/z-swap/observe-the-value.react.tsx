import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [isActive, setIsActive] = useState(false)

  const handleChange = (event: CustomEvent<{ active: boolean }>) => setIsActive(event.detail.active)
  const logText = `active: ${isActive}`

  return (
    <z-column gap="3" alignsX="center">
      <z-swap label="Theme" effect="rotate" onchange={handleChange}>
        <span slot="off">Light</span>
        <span slot="on">Dark</span>
      </z-swap>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
