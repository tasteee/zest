<script lang="ts">
  import '@tasteee/zest'

  const TRAIL = [{ label: 'Library' }, { label: 'Albums' }, { label: 'Lisbon', isCurrent: true }]

  let log = $state('Click a crumb')

  const handleNavigate = (event: CustomEvent<{ value: string; index: number }>) => {
    const crumb = TRAIL[event.detail.index]
    log = `navigate → index ${event.detail.index} (${crumb.label})`
  }
</script>

<z-column gap="3" aligns-x="center">
  <z-breadcrumbs items={TRAIL} onnavigate={handleNavigate}></z-breadcrumbs>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
