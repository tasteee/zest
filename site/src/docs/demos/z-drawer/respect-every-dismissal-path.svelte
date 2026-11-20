<script lang="ts">
  import '@tasteee/zest'

  let isDrawerOpen = $state(false)
  let closeCount = $state(0)

  const openDrawer = () => (isDrawerOpen = true)

  // every dismissal path (drag, Esc, backdrop) ends in the same close event
  const handleClose = () => {
    isDrawerOpen = false
    closeCount += 1
  }
</script>

<z-column gap="3" aligns-x="center">
  <z-drawer
    heading="Quick actions"
    description="Drag the handle down, press Esc, or tap the backdrop."
    isOpen={isDrawerOpen}
    onclose={handleClose}
  >
    <z-column gap="2">
      <z-button kind="soft" is-full-width>Share</z-button>
      <z-button kind="soft" is-full-width>Duplicate</z-button>
    </z-column>
  </z-drawer>
  <z-button kind="outline" onclick={openDrawer}>Open drawer</z-button>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">close events: {closeCount}</z-text>
</z-column>
