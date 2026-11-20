import { createSignal } from 'solid-js'
import '@tasteee/zest'

const STYLE_OPTIONS = [
  { value: 'calm', label: 'Calm' },
  { value: 'electric', label: 'Electric' },
  { value: 'minimal', label: 'Minimal', isDisabled: true }
]

export const Example = () => {
  const [selectedStyle, setSelectedStyle] = createSignal('electric')

  const handleChange = (event: CustomEvent<{ value: string }>) => setSelectedStyle(event.detail.value)

  return (
    <z-column gap="3" style="width: min(18rem, 100%)">
      <z-field label="Style">
        <z-select prop:value={selectedStyle()} prop:options={STYLE_OPTIONS} onChange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {selectedStyle()}</z-text>
    </z-column>
  )
}
