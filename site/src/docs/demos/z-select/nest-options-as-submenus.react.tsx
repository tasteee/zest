import { useState } from 'react'
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

type FoodChangeEventT = CustomEvent<{ value: string; path: string[] }>

export const Example = () => {
  const [log, setLog] = useState('change → none')

  const handleChange = (event: FoodChangeEventT) => setLog(`change → ${event.detail.path.join(' › ')}`)

  return (
    <z-column gap="3" style={{ width: 'min(18rem, 100%)' }}>
      <z-field label="Food">
        <z-select placeholder="Pick something" options={FOOD_OPTIONS} onchange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
