import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = useState('Nothing picked yet')

  // select fires after the picked row's confirmation flash
  const handleSelect = (event: CustomEvent<{ value: string }>) => setLog(`select → ${event.detail.value}`)

  return (
    <z-column gap="3" alignsX="center">
      <z-context-menu tone="tertiary" onselect={handleSelect}>
        <z-surface kind="soft" inset="lg" radius="lg" style={{ width: 'min(22rem, 100%)', textAlign: 'center' }}>
          <z-text size="sm" color="muted">Right-click this card</z-text>
        </z-surface>
        <z-menu-item value="rename" shortcut="Ctrl+R">Rename</z-menu-item>
        <z-menu-item value="duplicate">Duplicate</z-menu-item>
        <z-menu-separator />
        <z-menu-item value="delete" isDanger>Delete</z-menu-item>
      </z-context-menu>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
