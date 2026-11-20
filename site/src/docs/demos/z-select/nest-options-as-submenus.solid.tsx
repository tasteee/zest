import { createSignal } from 'solid-js'
import '@tasteee/zest'

const FOOD_OPTIONS = [
  {
    value: 'fruit',
    label: 'Fruit',
    children: [
      { value: 'apple', label: 'Apple' },
      {
        value: 'citrus',
        label: 'Citrus',
        children: [
          { value: 'lemon', label: 'Lemon' },
          { value: 'orange', label: 'Orange' }
        ]
      }
    ]
  },
  { value: 'water', label: 'Water' }
]

export const Example = () => {
  const [log, setLog] = createSignal('change → none')

  const handleChange = (event: CustomEvent<{ value: string; path: string[] }>) => {
    setLog(`change → ${event.detail.path.join(' › ')}`)
  }

  return (
    <z-column gap="3" style="width: min(18rem, 100%)">
      <z-field label="Food">
        <z-select placeholder="Pick something" prop:options={FOOD_OPTIONS} onChange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
