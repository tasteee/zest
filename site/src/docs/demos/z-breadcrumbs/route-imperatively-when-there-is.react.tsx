import { useState } from 'react'
import '@tasteee/zest'

const TRAIL = [{ label: 'Library' }, { label: 'Albums' }, { label: 'Lisbon', isCurrent: true }]

type NavigateEventT = CustomEvent<{ value: string; index: number }>

export const Example = () => {
  const [log, setLog] = useState('Click a crumb')

  const handleNavigate = (event: NavigateEventT) => {
    const crumb = TRAIL[event.detail.index]
    setLog(`navigate → index ${event.detail.index} (${crumb.label})`)
  }

  return (
    <z-column gap="3" alignsX="center">
      <z-breadcrumbs items={TRAIL} onnavigate={handleNavigate} />
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
