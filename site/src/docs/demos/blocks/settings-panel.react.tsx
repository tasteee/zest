import { useState } from 'react'
import { toaster } from '@tasteee/zest'

const saveSettings = () => toaster.show('Settings saved')

export const Example = () => {
  const [activePanel, setActivePanel] = useState('general')

  const handleTabChange = (event: CustomEvent<{ value: string }>) => setActivePanel(event.detail.value)
  const isGeneralHidden = activePanel !== 'general'
  const isNotificationsHidden = activePanel !== 'notifications'

  return (
    <z-card gap="0" style={{ width: 'min(36rem, 100%)', padding: '0' }}>
      <z-tabs value={activePanel} style={{ padding: '0.25rem 1.25rem 0' }} onchange={handleTabChange}>
        <z-tab value="general">General</z-tab>
        <z-tab value="notifications">Notifications</z-tab>
        <z-tab value="billing" isDisabled>Billing</z-tab>
      </z-tabs>

      {/* the tabs are a controller here: panels live outside z-tabs and follow its value */}
      <section style={{ padding: '1.25rem' }} hidden={isGeneralHidden}>
        <z-column gap="4">
          <z-field label="Workspace name">
            <z-input value="Acme Inc." />
          </z-field>
          <z-field label="Workspace URL" description="Changing this breaks existing links.">
            <z-input value="acme" />
          </z-field>
        </z-column>
      </section>

      <section style={{ padding: '1.25rem' }} hidden={isNotificationsHidden}>
        <z-column gap="3">
          <z-switch isChecked>Email me about mentions</z-switch>
          <z-switch isChecked>Weekly summary</z-switch>
          <z-switch>Product updates</z-switch>
        </z-column>
      </section>

      <z-row
        gap="2"
        alignsX="end"
        style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid var(--border-default)' }}
      >
        <z-button kind="plain">Cancel</z-button>
        <z-button tone="secondary" onClick={saveSettings}>Save changes</z-button>
      </z-row>
    </z-card>
  )
}
