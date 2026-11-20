<script lang="ts">
  import '@tasteee/zest'

  const DESTINATIONS = [
    { value: 'library', label: 'Library' },
    { value: 'create', label: 'Create' },
    { value: 'explore', label: 'Explore' }
  ]

  let route = $state('library')

  // the router owns navigation; value follows the route
  const handleSelect = (event: CustomEvent<{ value: string }>) => (route = event.detail.value)
</script>

<z-column gap="3" aligns-x="center">
  <z-nav-menu tone="tertiary" value={route} items={DESTINATIONS} onselect={handleSelect}></z-nav-menu>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">route: /{route}</z-text>
</z-column>
