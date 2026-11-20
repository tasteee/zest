<script lang="ts">
  import '@tasteee/zest'

  let log = $state('Waiting for a decision…')

  // act only on confirm; cancel (button, Esc) changes nothing
  const handleConfirm = () => (log = 'confirm → project deleted')
  const handleCancel = () => (log = 'cancel → nothing changed')
</script>

<z-column gap="3" aligns-x="center">
  <z-alert-dialog
    tone="danger"
    heading="Delete this project?"
    description="This permanently removes the project and its files."
    confirm-label="Delete"
    onconfirm={handleConfirm}
    oncancel={handleCancel}
  >
    <z-button slot="trigger" kind="outline" tone="danger">Delete project</z-button>
  </z-alert-dialog>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
