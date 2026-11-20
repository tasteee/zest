<script lang="ts">
  import '@tasteee/zest'

  let isActive = $state(false)

  const handleChange = (event: CustomEvent<{ active: boolean }>) => (isActive = event.detail.active)
</script>

<z-column gap="3" aligns-x="center">
  <z-swap label="Theme" effect="rotate" onchange={handleChange}>
    <span slot="off">Light</span>
    <span slot="on">Dark</span>
  </z-swap>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">active: {isActive}</z-text>
</z-column>
