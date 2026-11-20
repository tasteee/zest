import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = createSignal('Enter all six digits')

  const handleComplete = (event: CustomEvent<{ value: string }>) => setLog(`complete → verifying ${event.detail.value}…`)

  return (
    <z-column gap="3" aligns-x="center">
      <z-input-otp length="6" is-numeric="" onComplete={handleComplete} />
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
