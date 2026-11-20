import { createSignal } from 'solid-js'
import '@tasteee/zest'

const NAV_ITEMS = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'sent', label: 'Sent' },
  { value: 'drafts', label: 'Drafts' },
  { value: 'trash', label: 'Trash' }
]

const getLabel = (value: string): string => {
  const item = NAV_ITEMS.find((navItem) => navItem.value === value)
  return item?.label ?? value
}

export const Example = () => {
  const [activePage, setActivePage] = createSignal('inbox')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setActivePage(event.detail.value)
  const title = () => getLabel(activePage())

  return (
    <z-row gap="0" style="width: min(46rem, 100%); height: 20rem; border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden">
      <z-sidebar prop:value={activePage()} prop:items={NAV_ITEMS} style="height: 100%" onSelect={handleSelect} />
      <z-column gap="3" padding="5" style="flex: 1; min-width: 0; background: var(--surface-page)">
        <z-heading size="xs" tag="h2">{title()}</z-heading>
        <z-text size="sm" color="muted">The content sits on its own surface, inset from the sidebar.</z-text>
      </z-column>
    </z-row>
  )
}
