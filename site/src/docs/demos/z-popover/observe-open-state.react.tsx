import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openCount, setOpenCount] = useState(0)

  // toggle reports the resulting state, e.g. for analytics or syncing nearby UI
  const handleToggle = (event: CustomEvent<{ open: boolean }>) => {
    const isNowOpen = event.detail.open
    setIsOpen(isNowOpen)
    if (isNowOpen) setOpenCount((count) => count + 1)
  }

  const stateLabel = isOpen ? 'open' : 'closed'
  const timesLabel = openCount === 1 ? 'time' : 'times'
  const logText = `${stateLabel} · opened ${openCount} ${timesLabel}`

  return (
    <z-column gap="3" alignsX="center">
      <z-popover placement="bottom" ontoggle={handleToggle}>
        <z-button slot="trigger" kind="outline">Shipping details</z-button>
        <z-column gap="1">
          <z-text size="sm" weight={600}>Ships in 2 business days</z-text>
          <z-text size="sm" color="muted">Free returns for 30 days.</z-text>
        </z-column>
      </z-popover>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
