import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [panel, setPanel] = createSignal('overview')

  // e.g. keep the selected panel in the URL
  const handleChange = (event: CustomEvent<{ value: string }>) => setPanel(event.detail.value)

  return (
    <z-column gap="3" style="width: min(32rem, 100%)">
      <z-tabs prop:value={panel()} onChange={handleChange}>
        <z-tab value="overview">Overview</z-tab>
        <z-tab value="activity">Activity</z-tab>
        <z-tab value="billing" is-disabled="">Billing</z-tab>
      </z-tabs>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">?panel={panel()}</z-text>
    </z-column>
  )
}
