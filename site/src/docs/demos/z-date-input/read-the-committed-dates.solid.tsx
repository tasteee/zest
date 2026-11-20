import { createSignal } from 'solid-js'
import '@tasteee/zest'

type DatesEventT = CustomEvent<{ value: string | null; start: string | null; end: string | null }>

export const Example = () => {
  const [result, setResult] = createSignal('No dates yet')

  const handleChange = (event: DatesEventT) => {
    const start = event.detail.start ?? 'any day'
    const end = event.detail.end ?? 'any day'
    setResult(`Leaving ${start}, returning ${end}`)
  }

  return (
    <z-column gap="4">
      <z-field label="Trip" style="width: min(24rem, 100%)">
        <z-date-input
          is-range
          has-calendar
          start-placeholder="Leave"
          end-placeholder="Return"
          onChange={handleChange}
        />
      </z-field>
      <z-text>{result()}</z-text>
    </z-column>
  )
}
