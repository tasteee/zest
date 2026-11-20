import { createSignal } from 'solid-js'
import '@tasteee/zest'

const TRAIL = [{ label: 'Library' }, { label: 'Albums' }, { label: 'Lisbon', isCurrent: true }]

export const Example = () => {
  const [log, setLog] = createSignal('Click a crumb')

  const handleNavigate = (event: CustomEvent<{ value: string; index: number }>) => {
    const crumb = TRAIL[event.detail.index]
    setLog(`navigate → index ${event.detail.index} (${crumb.label})`)
  }

  return (
    <z-column gap="3" aligns-x="center">
      <z-breadcrumbs prop:items={TRAIL} onNavigate={handleNavigate} />
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
