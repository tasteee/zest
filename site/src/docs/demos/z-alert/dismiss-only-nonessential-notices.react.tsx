import { useState } from 'react'
import '@tasteee/zest'

export const Example = () => {
  const [isNoticeHidden, setIsNoticeHidden] = useState(false)
  const [log, setLog] = useState('dismiss not fired yet')

  const handleDismiss = () => {
    setIsNoticeHidden(true)
    setLog('dismiss → preference saved')
  }

  const handleRestore = () => {
    setIsNoticeHidden(false)
    setLog('dismiss not fired yet')
  }

  return (
    <z-column gap="3" style={{ width: 'min(30rem, 100%)' }}>
      <z-alert
        tone="secondary"
        heading="What’s new in 0.6"
        isDismissable
        isHidden={isNoticeHidden}
        ondismiss={handleDismiss}
      >
        Menus confirm your pick with a quick flash before closing.
      </z-alert>
      <z-row gap="3" alignsY="center">
        <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
        <z-button size="sm" kind="plain" onClick={handleRestore}>Restore</z-button>
      </z-row>
    </z-column>
  )
}
