import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = createSignal('checked: false')

  // switches apply immediately, so save on every change
  const handleChange = (event: CustomEvent<{ checked: boolean }>) => setLog(`checked: ${event.detail.checked} · saved`)

  return (
    <z-column gap="3">
      <z-switch tone="secondary" onChange={handleChange}>Use compact mode</z-switch>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
