import { useState } from 'react'
import '@tasteee/zest'

type DatesDetailT = { value: string | null; start: string | null; end: string | null }

export const Example = () => {
  const [result, setResult] = useState('No dates yet')

  const handleChange = (event: CustomEvent<DatesDetailT>) => {
    const start = event.detail.start ?? 'any day'
    const end = event.detail.end ?? 'any day'
    setResult(`Leaving ${start}, returning ${end}`)
  }

  return (
    <z-column gap="4">
      <z-field label="Trip" style={{ width: 'min(24rem, 100%)' }}>
        <z-date-input
          isRange
          hasCalendar
          startPlaceholder="Leave"
          endPlaceholder="Return"
          onchange={handleChange}
        />
      </z-field>
      <z-text>{result}</z-text>
    </z-column>
  )
}
