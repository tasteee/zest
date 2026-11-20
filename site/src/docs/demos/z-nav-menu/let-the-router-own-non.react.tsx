import { useState } from 'react'
import '@tasteee/zest'

const DESTINATIONS = [
  { value: 'library', label: 'Library' },
  { value: 'create', label: 'Create' },
  { value: 'explore', label: 'Explore' }
]

export const Example = () => {
  const [route, setRoute] = useState('library')

  // the router owns navigation; value follows the route
  const handleSelect = (event: CustomEvent<{ value: string }>) => setRoute(event.detail.value)
  const logText = `route: /${route}`

  return (
    <z-column gap="3" alignsX="center">
      <z-nav-menu tone="tertiary" value={route} items={DESTINATIONS} onselect={handleSelect} />
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
