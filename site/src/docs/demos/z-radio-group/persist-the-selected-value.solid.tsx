import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [plan, setPlan] = createSignal('pro')

  const handleChange = (event: CustomEvent<{ value?: string }>) => setPlan(event.detail.value ?? '')

  return (
    <z-column gap="3">
      <z-radio-group label="Plan" prop:value={plan()} onChange={handleChange}>
        <z-radio value="free">Free</z-radio>
        <z-radio value="pro">Pro</z-radio>
        <z-radio value="team">Team</z-radio>
      </z-radio-group>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {plan()}</z-text>
    </z-column>
  )
}
