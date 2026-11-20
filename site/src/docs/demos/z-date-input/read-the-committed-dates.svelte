<script lang="ts">
  import '@tasteee/zest'

  type DatesEventT = CustomEvent<{ value: string | null; start: string | null; end: string | null }>

  let result = $state('No dates yet')

  const handleChange = (event: DatesEventT) => {
    const start = event.detail.start ?? 'any day'
    const end = event.detail.end ?? 'any day'
    result = `Leaving ${start}, returning ${end}`
  }
</script>

<z-column gap="4">
  <z-field label="Trip" style="width: min(24rem, 100%)">
    <z-date-input
      is-range
      has-calendar
      start-placeholder="Leave"
      end-placeholder="Return"
      onchange={handleChange}
    ></z-date-input>
  </z-field>
  <z-text>{result}</z-text>
</z-column>
