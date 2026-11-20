<script lang="ts">
  import '@tasteee/zest'

  type SelectionEventT = CustomEvent<{ value: string | null; start: string | null; end: string | null }>

  let result = $state('Pick a start and an end')

  const handleInput = (event: SelectionEventT) => {
    const hasEnd = event.detail.end !== null
    if (!hasEnd) result = `From ${event.detail.start}, pick an end`
  }

  const handleChange = (event: SelectionEventT) => {
    result = `${event.detail.start} to ${event.detail.end}`
  }
</script>

<z-column gap="4">
  <z-calendar is-range oninput={handleInput} onchange={handleChange}></z-calendar>
  <z-text>{result}</z-text>
</z-column>
