import { useState } from 'react'
import '@tasteee/zest'

const describeCommand = (value: string): string => {
  const isNewProject = value === 'new'
  if (isNewProject) return 'select → open the new-project dialog'
  return `select → navigate to /${value}`
}

export const Example = () => {
  const [log, setLog] = useState('Nothing run yet')

  const handleSelect = (event: CustomEvent<{ value: string }>) => setLog(describeCommand(event.detail.value))

  return (
    <z-column gap="3" alignsX="center">
      <z-command emptyText="No matching commands" onselect={handleSelect}>
        <z-button slot="trigger" kind="outline">Open commands</z-button>
        <z-command-item value="projects" group="Navigation" shortcut="G P" keywords="work">Go to Projects</z-command-item>
        <z-command-item value="settings" group="Navigation" shortcut="G S">Go to Settings</z-command-item>
        <z-command-item value="new" group="Actions" shortcut="Ctrl+N" keywords="create add">New project</z-command-item>
        <z-command-item value="invite" group="Actions" keywords="member user">Invite teammate</z-command-item>
      </z-command>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
