import { useState } from 'react'
import '@tasteee/zest'

type GuestRangeT = [number | null, number | null]

export const Example = () => {
  const [result, setResult] = useState('No range yet')

  const handleChange = (event: CustomEvent) => {
    const range = event.detail.value as GuestRangeT
    const lower = range[0] ?? 'any'
    const upper = range[1] ?? 'any'
    setResult(`${lower} to ${upper} guests`)
  }

  return (
    <z-column gap="4">
      <z-field label="Guests" style={{ width: 'min(22rem, 100%)' }}>
        <z-number-range-input
          min={1}
          max={20}
          lowerPlaceholder="Min"
          upperPlaceholder="Max"
          onchange={handleChange}
        />
      </z-field>
      <z-text>{result}</z-text>
    </z-column>
  )
}
