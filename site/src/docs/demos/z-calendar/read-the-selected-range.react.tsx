import { useState } from 'react'
import '@tasteee/zest'

type SelectionDetailT = { value: string | null; start: string | null; end: string | null }

export const Example = () => {
  const [result, setResult] = useState('Pick a start and an end')

  const handleInput = (event: CustomEvent<SelectionDetailT>) => {
    const hasEnd = event.detail.end !== null
    if (!hasEnd) setResult(`From ${event.detail.start}, pick an end`)
  }

  const handleChange = (event: CustomEvent<SelectionDetailT>) => {
    setResult(`${event.detail.start} to ${event.detail.end}`)
  }

  return (
    <z-column gap="4">
      <z-calendar isRange oninput={handleInput} onchange={handleChange} />
      <z-text>{result}</z-text>
    </z-column>
  )
}
