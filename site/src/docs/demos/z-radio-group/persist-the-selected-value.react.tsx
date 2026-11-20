import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [plan, setPlan] = useState('pro')

  const handleChange = (event: CustomEvent<{ value?: string }>) => setPlan(event.detail.value ?? '')
  const logText = `change → ${plan}`

  return (
    <z-column gap="3">
      <z-radio-group label="Plan" value={plan} onchange={handleChange}>
        <z-radio value="free">Free</z-radio>
        <z-radio value="pro">Pro</z-radio>
        <z-radio value="team">Team</z-radio>
      </z-radio-group>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
