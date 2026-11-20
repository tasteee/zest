<script lang="ts">
  import '@tasteee/zest'

  const STYLE_OPTIONS = [
    { value: 'calm', label: 'Calm' },
    { value: 'electric', label: 'Electric' },
    { value: 'minimal', label: 'Minimal', isDisabled: true }
  ]

  let selectedStyle = $state('electric')

  const handleChange = (event: CustomEvent<{ value: string }>) => (selectedStyle = event.detail.value)
</script>

<z-column gap="3" style="width: min(18rem, 100%)">
  <z-field label="Style">
    <z-select value={selectedStyle} options={STYLE_OPTIONS} onchange={handleChange}></z-select>
  </z-field>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {selectedStyle}</z-text>
</z-column>
