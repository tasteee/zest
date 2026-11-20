<script lang="ts">
  import '@tasteee/zest'

  let log = $state('Enter all six digits')

  const handleComplete = (event: CustomEvent<{ value: string }>) => (log = `complete → verifying ${event.detail.value}…`)
</script>

<z-column gap="3" aligns-x="center">
  <z-input-otp length="6" is-numeric oncomplete={handleComplete}></z-input-otp>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
