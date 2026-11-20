import { useState } from 'react'
import '@tasteee/zest'

const NAV_ITEMS = [
  { value: 'home', label: 'Home' },
  {
    label: 'Workspace',
    items: [
      { value: 'projects', label: 'Projects', badge: '4' },
      { value: 'tasks', label: 'Tasks' },
      {
        label: 'Archived',
        items: [
          { value: 'q1', label: 'Q1 launch' },
          { value: 'q2', label: 'Q2 launch' }
        ]
      }
    ]
  },
  { value: 'settings', label: 'Settings' }
]

export const Example = () => {
  const [activePage, setActivePage] = useState('projects')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setActivePage(event.detail.value)

  return (
    <div style={{ height: '22rem' }}>
      <z-sidebar value={activePage} items={NAV_ITEMS} onselect={handleSelect}>
        <z-row slot="header" gap="2" alignsY="center">
          <z-avatar name="Acme" size="xs" isSquare tone="tertiary" />
          <z-text weight={600}>Acme</z-text>
        </z-row>
        <z-text slot="footer" size="xs" color="muted">Signed in as Maya</z-text>
      </z-sidebar>
    </div>
  )
}
