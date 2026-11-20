<script lang="ts">
  import '@tasteee/zest'

  let log = $state('checked: false')

  // switches apply immediately, so save on every change
  const handleChange = (event: CustomEvent<{ checked: boolean }>) => (log = `checked: ${event.detail.checked} · saved`)
</script>

<z-column gap="3">
  <z-switch tone="secondary" onchange={handleChange}>Use compact mode</z-switch>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
