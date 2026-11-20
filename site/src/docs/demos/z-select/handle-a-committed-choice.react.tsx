import { useState } from 'react'
import '@tasteee/zest'

const STYLE_OPTIONS = [
  { value: 'calm', label: 'Calm' },
  { value: 'electric', label: 'Electric' },
  { value: 'minimal', label: 'Minimal', isDisabled: true }
]

export const Example = () => {
  const [selectedStyle, setSelectedStyle] = useState('electric')

  const handleChange = (event: CustomEvent<{ value: string }>) => setSelectedStyle(event.detail.value)
  const logText = `change → ${selectedStyle}`

  return (
    <z-column gap="3" style={{ width: 'min(18rem, 100%)' }}>
      <z-field label="Style">
        <z-select value={selectedStyle} options={STYLE_OPTIONS} onchange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
