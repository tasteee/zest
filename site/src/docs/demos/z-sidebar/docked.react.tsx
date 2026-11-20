import { useState } from 'react'
import '@tasteee/zest'

const NAV_ITEMS = [
  { value: 'projects', label: 'Projects' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'reports', label: 'Reports' }
]

const FRAME_STYLE = {
  display: 'flex',
  width: '100%',
  height: '16rem',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden'
}

export const Example = () => {
  const [activePage, setActivePage] = useState('tasks')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setActivePage(event.detail.value)

  return (
    <div style={FRAME_STYLE}>
      <z-sidebar isDocked tone="tertiary" value={activePage} items={NAV_ITEMS} onselect={handleSelect} />
      <div style={{ flex: 1, padding: '1.25rem' }}>
        <z-text size="sm" color="muted">Page content sits flush against the docked rail.</z-text>
      </div>
    </div>
  )
}
