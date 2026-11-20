import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [isConfirmOpen, setIsConfirmOpen] = createSignal(false)

  const openConfirm = () => setIsConfirmOpen(true)

  // the dialog closes itself on either answer; keep the state in step
  const closeConfirm = () => setIsConfirmOpen(false)

  return (
    <>
      <z-card gap="0" style="width: min(36rem, 100%); padding: 0; border-color: var(--status-danger)">
        <z-row gap="4" aligns-y="center" aligns-x="between" does-wrap="" style="padding: 1.25rem">
          <z-column gap="1" style="flex: 1; min-width: 12rem">
            <z-text weight="600">Delete workspace</z-text>
            <z-text size="sm" color="muted">Permanently removes the workspace and all its data.</z-text>
          </z-column>
          <z-button tone="danger" kind="outline" onClick={openConfirm}>Delete workspace</z-button>
        </z-row>
      </z-card>

      <z-alert-dialog
        tone="danger"
        heading="Delete this workspace?"
        description="This can’t be undone."
        confirm-label="Delete workspace"
        prop:isOpen={isConfirmOpen()}
        onConfirm={closeConfirm}
        onCancel={closeConfirm}
      />
    </>
  )
}
