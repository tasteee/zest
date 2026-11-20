import { createSignal } from 'solid-js'
import '@tasteee/zest'

const NAV_ITEMS = [
  { value: 'projects', label: 'Projects' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'reports', label: 'Reports' }
]

export const Example = () => {
  const [activePage, setActivePage] = createSignal('tasks')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setActivePage(event.detail.value)

  return (
    <div style="display: flex; width: 100%; height: 16rem; border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden">
      <z-sidebar
        is-docked=""
        tone="tertiary"
        prop:value={activePage()}
        prop:items={NAV_ITEMS}
        onSelect={handleSelect}
      />
      <div style="flex: 1; padding: 1.25rem">
        <z-text size="sm" color="muted">Page content sits flush against the docked rail.</z-text>
      </div>
    </div>
  )
}
