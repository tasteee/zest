<script lang="ts">
  import '@tasteee/zest'

  let isEditorOpen = $state(false)

  // the element reports its own closes (Esc, backdrop) through `close`
  const openEditor = () => (isEditorOpen = true)
  const closeEditor = () => (isEditorOpen = false)
</script>

<z-column gap="3" aligns-x="center">
  <z-dialog
    heading="Edit profile"
    description="Opened by the application, not a slotted trigger."
    isOpen={isEditorOpen}
    onopen={openEditor}
    onclose={closeEditor}
  >
    <z-field label="Display name">
      <z-input value="Ada Lovelace"></z-input>
    </z-field>
    <z-row slot="footer" gap="2" aligns-x="end">
      <z-button kind="plain" onclick={closeEditor}>Cancel</z-button>
      <z-button tone="secondary" onclick={closeEditor}>Save</z-button>
    </z-row>
  </z-dialog>

  <z-button kind="outline" onclick={openEditor}>Open from the app</z-button>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">is-open: {isEditorOpen}</z-text>
</z-column>
