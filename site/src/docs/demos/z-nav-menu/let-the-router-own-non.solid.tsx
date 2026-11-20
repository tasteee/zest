import { createSignal } from 'solid-js'
import '@tasteee/zest'

const DESTINATIONS = [
  { value: 'library', label: 'Library' },
  { value: 'create', label: 'Create' },
  { value: 'explore', label: 'Explore' }
]

export const Example = () => {
  const [route, setRoute] = createSignal('library')

  // the router owns navigation; value follows the route
  const handleSelect = (event: CustomEvent<{ value: string }>) => setRoute(event.detail.value)

  return (
    <z-column gap="3" aligns-x="center">
      <z-nav-menu tone="tertiary" prop:value={route()} prop:items={DESTINATIONS} onSelect={handleSelect} />
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">route: /{route()}</z-text>
    </z-column>
  )
}
