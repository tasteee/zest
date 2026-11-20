<script lang="ts">
  import '@tasteee/zest'

  type SeatsInputEventT = CustomEvent<{ value: number | null; rawValue: string; isValid: boolean }>

  let log = $state('input: 5 (valid)')

  // input reports every keystroke with its validity; change reports the committed, corrected value
  const handleInput = (event: SeatsInputEventT) => {
    const validity = event.detail.isValid ? 'valid' : 'out of range'
    log = `input: ${event.detail.rawValue} (${validity})`
  }

  const handleChange = (event: CustomEvent<{ value: number }>) => (log = `change → committed ${event.detail.value}`)
</script>

<z-column gap="3" style="width: min(18rem, 100%)">
  <z-field label="Seats" description="Try a value below 1 or above 20, then tab away.">
    <z-number-input
      value="5"
      min="1"
      max="20"
      has-stepper-buttons
      oninput={handleInput}
      onchange={handleChange}
    ></z-number-input>
  </z-field>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
