import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [panel, setPanel] = useState('overview')

  // e.g. keep the selected panel in the URL
  const handleChange = (event: CustomEvent<{ value: string }>) => setPanel(event.detail.value)
  const logText = `?panel=${panel}`

  return (
    <z-column gap="3" style={{ width: 'min(32rem, 100%)' }}>
      <z-tabs value={panel} onchange={handleChange}>
        <z-tab value="overview">Overview</z-tab>
        <z-tab value="activity">Activity</z-tab>
        <z-tab value="billing" isDisabled>Billing</z-tab>
      </z-tabs>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
