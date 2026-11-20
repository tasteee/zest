import { createSignal } from 'solid-js'
import '@tasteee/zest'

type GuestRangeEventT = CustomEvent<{ value: [number | null, number | null] }>

export const Example = () => {
  const [result, setResult] = createSignal('No range yet')

  const handleChange = (event: GuestRangeEventT) => {
    const lower = event.detail.value[0] ?? 'any'
    const upper = event.detail.value[1] ?? 'any'
    setResult(`${lower} to ${upper} guests`)
  }

  return (
    <z-column gap="4">
      <z-field label="Guests" style="width: min(22rem, 100%)">
        <z-number-range-input
          min="1"
          max="20"
          lower-placeholder="Min"
          upper-placeholder="Max"
          onChange={handleChange}
        />
      </z-field>
      <z-text>{result()}</z-text>
    </z-column>
  )
}
