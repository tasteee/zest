import { createSignal } from 'solid-js'
import '@tasteee/zest'

type SelectionEventT = CustomEvent<{ value: string | null; start: string | null; end: string | null }>

export const Example = () => {
  const [result, setResult] = createSignal('Pick a start and an end')

  const handleInput = (event: SelectionEventT) => {
    const hasEnd = event.detail.end !== null
    if (!hasEnd) setResult(`From ${event.detail.start}, pick an end`)
  }

  const handleChange = (event: SelectionEventT) => {
    setResult(`${event.detail.start} to ${event.detail.end}`)
  }

  return (
    <z-column gap="4">
      <z-calendar is-range onInput={handleInput} onChange={handleChange} />
      <z-text>{result()}</z-text>
    </z-column>
  )
}
