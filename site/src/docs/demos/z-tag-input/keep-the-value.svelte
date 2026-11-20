<script lang="ts">
  import '@tasteee/zest'

  let recipients = $state<string[]>([])

  const handleChange = (event: CustomEvent<{ value: string[] }>) => (recipients = event.detail.value)
</script>

<z-column gap="3" style="max-width: 28rem">
  <z-tag-input label="Recipients" placeholder="name@example.com" max="5" tone="secondary" value={recipients} onchange={handleChange}></z-tag-input>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">value → {JSON.stringify(recipients)}</z-text>
</z-column>
