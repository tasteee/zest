<script lang="ts">
  import '@tasteee/zest'

  let log = $state('Nothing picked yet')

  // select fires after the picked row's confirmation flash
  const handleSelect = (event: CustomEvent<{ value: string }>) => (log = `select → ${event.detail.value}`)
</script>

<z-column gap="3" aligns-x="center">
  <z-context-menu tone="tertiary" onselect={handleSelect}>
    <z-surface kind="soft" inset="lg" radius="lg" style="width: min(22rem, 100%); text-align: center">
      <z-text size="sm" color="muted">Right-click this card</z-text>
    </z-surface>
    <z-menu-item value="rename" shortcut="Ctrl+R">Rename</z-menu-item>
    <z-menu-item value="duplicate">Duplicate</z-menu-item>
    <z-menu-separator></z-menu-separator>
    <z-menu-item value="delete" is-danger>Delete</z-menu-item>
  </z-context-menu>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
