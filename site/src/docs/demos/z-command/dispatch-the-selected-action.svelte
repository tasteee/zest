<script lang="ts">
  import '@tasteee/zest'

  const describeCommand = (value: string): string => {
    const isNewProject = value === 'new'
    if (isNewProject) return 'select → open the new-project dialog'
    return `select → navigate to /${value}`
  }

  let log = $state('Nothing run yet')

  const handleSelect = (event: CustomEvent<{ value: string }>) => (log = describeCommand(event.detail.value))
</script>

<z-column gap="3" aligns-x="center">
  <z-command empty-text="No matching commands" onselect={handleSelect}>
    <z-button slot="trigger" kind="outline">Open commands</z-button>
    <z-command-item value="projects" group="Navigation" shortcut="G P" keywords="work">Go to Projects</z-command-item>
    <z-command-item value="settings" group="Navigation" shortcut="G S">Go to Settings</z-command-item>
    <z-command-item value="new" group="Actions" shortcut="Ctrl+N" keywords="create add">New project</z-command-item>
    <z-command-item value="invite" group="Actions" keywords="member user">Invite teammate</z-command-item>
  </z-command>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
