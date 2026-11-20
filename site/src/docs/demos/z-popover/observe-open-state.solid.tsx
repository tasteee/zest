import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [openCount, setOpenCount] = createSignal(0)

  // toggle reports the resulting state, e.g. for analytics or syncing nearby UI
  const handleToggle = (event: CustomEvent<{ open: boolean }>) => {
    setIsOpen(event.detail.open)
    if (event.detail.open) setOpenCount((count) => count + 1)
  }

  const stateLabel = () => (isOpen() ? 'open' : 'closed')
  const timesLabel = () => (openCount() === 1 ? 'time' : 'times')

  return (
    <z-column gap="3" aligns-x="center">
      <z-popover placement="bottom" onToggle={handleToggle}>
        <z-button slot="trigger" kind="outline">Shipping details</z-button>
        <z-column gap="1">
          <z-text size="sm" weight="600">Ships in 2 business days</z-text>
          <z-text size="sm" color="muted">Free returns for 30 days.</z-text>
        </z-column>
      </z-popover>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">
        {stateLabel()} · opened {openCount()} {timesLabel()}
      </z-text>
    </z-column>
  )
}
