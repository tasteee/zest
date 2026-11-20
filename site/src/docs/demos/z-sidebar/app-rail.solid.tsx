import { createSignal } from 'solid-js'
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
  const [activePage, setActivePage] = createSignal('projects')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setActivePage(event.detail.value)

  return (
    <div style="height: 22rem">
      <z-sidebar prop:value={activePage()} prop:items={NAV_ITEMS} onSelect={handleSelect}>
        <z-row slot="header" gap="2" aligns-y="center">
          <z-avatar name="Acme" size="xs" is-square="" tone="tertiary" />
          <z-text weight="600">Acme</z-text>
        </z-row>
        <z-text slot="footer" size="xs" color="muted">Signed in as Maya</z-text>
      </z-sidebar>
    </div>
  )
}
