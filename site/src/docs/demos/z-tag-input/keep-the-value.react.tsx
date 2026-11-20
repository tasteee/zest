import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [recipients, setRecipients] = useState<string[]>([])

  const handleChange = (event: CustomEvent<{ value: string[] }>) => setRecipients(event.detail.value)
  const logText = `value → ${JSON.stringify(recipients)}`

  return (
    <z-column gap="3" style={{ maxWidth: '28rem' }}>
      <z-tag-input label="Recipients" placeholder="name@example.com" max={5} tone="secondary" value={recipients} onchange={handleChange} />
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
