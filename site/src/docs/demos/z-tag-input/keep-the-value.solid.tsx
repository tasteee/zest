import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [recipients, setRecipients] = createSignal<string[]>([])

  const handleChange = (event: CustomEvent<{ value: string[] }>) => setRecipients(event.detail.value)

  return (
    <z-column gap="3" style="max-width: 28rem">
      <z-tag-input label="Recipients" placeholder="name@example.com" max="5" tone="secondary" prop:value={recipients()} onChange={handleChange}></z-tag-input>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">value → {JSON.stringify(recipients())}</z-text>
    </z-column>
  )
}
