import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = createSignal('Nothing picked yet')

  // the picked row flashes twice, then select fires as the menu closes
  const handleSelect = (event: CustomEvent<{ value: string }>) => setLog(`select → ${event.detail.value}`)

  return (
    <z-column gap="3" aligns-x="center">
      <z-menu onSelect={handleSelect}>
        <z-button slot="trigger" kind="soft">Project</z-button>
        <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
        <z-menu-item value="share">Share link</z-menu-item>
        <z-menu-item value="archive" is-disabled="">Archive</z-menu-item>
        <z-menu-separator />
        <z-menu-item value="delete" is-danger="">Delete</z-menu-item>
      </z-menu>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
