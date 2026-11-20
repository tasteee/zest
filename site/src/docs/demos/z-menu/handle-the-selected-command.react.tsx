import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = useState('Nothing picked yet')

  // the picked row flashes twice, then select fires as the menu closes
  const handleSelect = (event: CustomEvent<{ value: string }>) => setLog(`select → ${event.detail.value}`)

  return (
    <z-column gap="3" alignsX="center">
      <z-menu onselect={handleSelect}>
        <z-button slot="trigger" kind="soft">Project</z-button>
        <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
        <z-menu-item value="share">Share link</z-menu-item>
        <z-menu-item value="archive" isDisabled>Archive</z-menu-item>
        <z-menu-separator />
        <z-menu-item value="delete" isDanger>Delete</z-menu-item>
      </z-menu>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
