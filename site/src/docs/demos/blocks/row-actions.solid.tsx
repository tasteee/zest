import { createSignal } from 'solid-js'
import { toaster } from '@tasteee/zest'

export const Example = () => {
  const [isConfirmOpen, setIsConfirmOpen] = createSignal(false)

  // the menu confirms the pick (a quick double flash) before `select` fires,
  // so the dialog opens after the menu has visibly acknowledged the choice
  const handleSelect = (event: CustomEvent<{ value: string }>) => {
    const isDelete = event.detail.value === 'delete'
    if (isDelete) return setIsConfirmOpen(true)
    toaster.show(`${event.detail.value} clicked`)
  }

  const handleConfirm = () => {
    setIsConfirmOpen(false)
    toaster.show({ title: 'Project deleted', tone: 'danger' })
  }

  const handleCancel = () => setIsConfirmOpen(false)

  return (
    <>
      <z-card is-horizontal="" gap="4" style="width: min(30rem, 100%); align-items: center; padding: 1rem 1.25rem">
        <z-avatar name="Design system" is-square="" tone="tertiary" />
        <z-column gap="1" style="flex: 1; min-width: 0">
          <z-text weight="600">Design system</z-text>
          <z-text size="xs" color="muted">Updated 2 hours ago · 14 files</z-text>
        </z-column>
      
        <z-menu align="end" onSelect={handleSelect}>
          <z-button slot="trigger" kind="ghost" size="sm" aria-label="Project actions">•••</z-button>
          <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
          <z-menu-item value="duplicate" shortcut="⌘D">Duplicate</z-menu-item>
          <z-menu-separator />
          <z-menu-item value="delete" is-danger="">Delete project</z-menu-item>
        </z-menu>
      </z-card>

      <z-alert-dialog
        tone="danger"
        heading="Delete “Design system”?"
        description="This permanently deletes the project and its 14 files."
        confirm-label="Delete project"
        prop:isOpen={isConfirmOpen()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
