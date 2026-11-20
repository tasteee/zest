import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [isActive, setIsActive] = createSignal(false)

  const handleChange = (event: CustomEvent<{ active: boolean }>) => setIsActive(event.detail.active)

  return (
    <z-column gap="3" aligns-x="center">
      <z-swap label="Theme" effect="rotate" onChange={handleChange}>
        <span slot="off">Light</span>
        <span slot="on">Dark</span>
      </z-swap>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">active: {String(isActive())}</z-text>
    </z-column>
  )
}
