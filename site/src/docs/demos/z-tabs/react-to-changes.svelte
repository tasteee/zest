<script lang="ts">
  import '@tasteee/zest'

  let panel = $state('overview')

  // e.g. keep the selected panel in the URL
  const handleChange = (event: CustomEvent<{ value: string }>) => (panel = event.detail.value)
</script>

<z-column gap="3" style="width: min(32rem, 100%)">
  <z-tabs value={panel} onchange={handleChange}>
    <z-tab value="overview">Overview</z-tab>
    <z-tab value="activity">Activity</z-tab>
    <z-tab value="billing" is-disabled>Billing</z-tab>
  </z-tabs>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">?panel={panel}</z-text>
</z-column>
