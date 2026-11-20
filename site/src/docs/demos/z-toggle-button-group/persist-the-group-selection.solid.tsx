import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [log, setLog] = createSignal('change → ["bold"]')

  // a string for a single-choice group, a string[] with is-multiple
  const handleChange = (event: CustomEvent<{ value?: string | string[] }>) => {
    setLog(`change → ${JSON.stringify(event.detail.value)}`)
  }

  return (
    <z-column gap="3" aligns-x="center">
      <z-toggle-button-group is-multiple="" kind="outline" onChange={handleChange}>
        <z-toggle-button-group-item value="bold" is-pressed="">Bold</z-toggle-button-group-item>
        <z-toggle-button-group-item value="italic">Italic</z-toggle-button-group-item>
        <z-toggle-button-group-item value="underline">Underline</z-toggle-button-group-item>
      </z-toggle-button-group>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
