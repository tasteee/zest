import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [isNoticeHidden, setIsNoticeHidden] = createSignal(false)
  const [log, setLog] = createSignal('dismiss not fired yet')

  const handleDismiss = () => {
    setIsNoticeHidden(true)
    setLog('dismiss → preference saved')
  }

  const handleRestore = () => {
    setIsNoticeHidden(false)
    setLog('dismiss not fired yet')
  }

  return (
    <z-column gap="3" style="width: min(30rem, 100%)">
      <z-alert
        tone="secondary"
        heading="What’s new in 0.6"
        is-dismissable=""
        prop:isHidden={isNoticeHidden()}
        onDismiss={handleDismiss}
      >
        Menus confirm your pick with a quick flash before closing.
      </z-alert>
      <z-row gap="3" aligns-y="center">
        <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
        <z-button size="sm" kind="plain" onClick={handleRestore}>Restore</z-button>
      </z-row>
    </z-column>
  )
}
