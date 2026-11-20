import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [pickedText, setPickedText] = createSignal('Nothing selected yet.')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setPickedText(`Selected: ${event.detail.value}`)

  return (
    <z-column gap="3" aligns-x="start">
      <z-command placeholder="Search commands, people, projects…" onSelect={handleSelect}>
        <z-button slot="trigger" kind="outline">
          Open command palette <z-kbd>⌘K</z-kbd>
        </z-button>
    
        <z-command-item value="new-project" group="Create" shortcut="⌘N">
          <span>✦</span> New project
        </z-command-item>
        <z-command-item value="invite" group="Create" keywords="team member people">
          <span>＋</span> Invite teammate
        </z-command-item>
    
        <z-command-item value="ada" group="People" label="Ada Lovelace" keywords="design">
          <z-avatar name="Ada Lovelace" size="xs" />
          Ada Lovelace
          <z-badge size="sm" kind="outline">Design</z-badge>
        </z-command-item>
        <z-command-item value="grace" group="People" label="Grace Hopper" keywords="engineering">
          <z-avatar name="Grace Hopper" size="xs" />
          Grace Hopper
          <z-badge size="sm" kind="outline">Engineering</z-badge>
        </z-command-item>
    
        <z-command-item value="settings" group="Navigate" shortcut="⌘,">Settings</z-command-item>
        <z-command-item value="billing" group="Navigate" is-disabled="">Billing (admins only)</z-command-item>
    
        <z-column slot="empty" gap="1" aligns-x="center">
          <z-text size="sm">Nothing matches.</z-text>
          <z-text size="xs" color="muted">Try a project name or a teammate.</z-text>
        </z-column>
    
        <z-row slot="footer" gap="3">
          <z-text size="xs" color="muted"><z-kbd size="sm">↑</z-kbd> <z-kbd size="sm">↓</z-kbd> navigate</z-text>
          <z-text size="xs" color="muted"><z-kbd size="sm">↵</z-kbd> select</z-text>
        </z-row>
      </z-command>

      <z-text size="sm" color="muted">{pickedText()}</z-text>
    </z-column>
  )
}
