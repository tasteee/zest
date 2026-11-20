import { createSignal } from 'solid-js'
import '@tasteee/zest'

type SeatsInputEventT = CustomEvent<{ value: number | null; rawValue: string; isValid: boolean }>

export const Example = () => {
  const [log, setLog] = createSignal('input: 5 (valid)')

  // input reports every keystroke with its validity; change reports the committed, corrected value
  const handleInput = (event: SeatsInputEventT) => {
    const validity = event.detail.isValid ? 'valid' : 'out of range'
    setLog(`input: ${event.detail.rawValue} (${validity})`)
  }

  const handleChange = (event: CustomEvent<{ value: number }>) => setLog(`change → committed ${event.detail.value}`)

  return (
    <z-column gap="3" style="width: min(18rem, 100%)">
      <z-field label="Seats" description="Try a value below 1 or above 20, then tab away.">
        <z-number-input
          value="5"
          min="1"
          max="20"
          has-stepper-buttons=""
          onInput={handleInput}
          onChange={handleChange}
        />
      </z-field>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
