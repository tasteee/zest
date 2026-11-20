import { useState } from 'react'
import '@tasteee/zest'

type FormatChangeEventT = CustomEvent<{ value?: string | string[] }>

export const Example = () => {
  const [log, setLog] = useState('change → ["bold"]')

  // a string for a single-choice group, a string[] with isMultiple
  const handleChange = (event: FormatChangeEventT) => setLog(`change → ${JSON.stringify(event.detail.value)}`)

  return (
    <z-column gap="3" alignsX="center">
      <z-toggle-button-group isMultiple kind="outline" onchange={handleChange}>
        <z-toggle-button-group-item value="bold" isPressed>Bold</z-toggle-button-group-item>
        <z-toggle-button-group-item value="italic">Italic</z-toggle-button-group-item>
        <z-toggle-button-group-item value="underline">Underline</z-toggle-button-group-item>
      </z-toggle-button-group>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
