import { useState } from 'react'
import '@tasteee/zest'

const NAV_ITEMS = [
  { value: 'overview', label: 'Overview' },
  {
    label: 'Workspace',
    items: [
      { value: 'projects', label: 'Projects', badge: '8' },
      { value: 'tasks', label: 'Tasks' },
      { value: 'reports', label: 'Reports' }
    ]
  },
  {
    label: 'Settings',
    items: [
      { value: 'members', label: 'Members' },
      { value: 'billing', label: 'Billing' }
    ]
  }
]

export const Example = () => {
  const [activePage, setActivePage] = useState('overview')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setActivePage(event.detail.value)

  return (
    <div style={{ height: '22rem' }}>
      <z-sidebar value={activePage} items={NAV_ITEMS} onselect={handleSelect}>
        <z-row slot="header" gap="2" alignsY="center">
          <z-avatar name="Acme" size="xs" isSquare tone="tertiary" />
          <z-text weight={600}>Acme</z-text>
        </z-row>
        <z-row slot="footer" gap="2" alignsY="center">
          <z-avatar name="Ada Lovelace" size="xs" status="online" />
          <z-text size="xs" color="muted">Ada Lovelace</z-text>
        </z-row>
      </z-sidebar>
    </div>
  )
}
