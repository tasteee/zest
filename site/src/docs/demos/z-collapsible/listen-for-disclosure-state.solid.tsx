import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = createSignal('Open or close the section')

  const handleToggle = (event: CustomEvent<{ value: string; open: boolean }>) => {
    setLog(`toggle → { value: '${event.detail.value}', open: ${event.detail.open} }`)
  }

  return (
    <z-column gap="3" style="width: min(30rem, 100%)">
      <z-collapsible
        style="width: min(28rem, 100%)"
        value="details"
        tone="secondary"
        label="Implementation details"
        onToggle={handleToggle}
      >
        The toggle event carries this section’s value and whether it is now open.
      </z-collapsible>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
