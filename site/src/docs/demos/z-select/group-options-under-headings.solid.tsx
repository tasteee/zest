import { createSignal } from 'solid-js'
import '@tasteee/zest'

const SOUND_OPTIONS = [
  { value: 'midi', label: 'MIDI output' },
  {
    value: 'keys',
    label: 'Keys',
    isGroup: true,
    children: [
      { value: 'grand-piano', label: 'Grand Piano' },
      { value: 'electric-piano', label: 'Electric Piano' },
      { value: 'organ', label: 'Organ' }
    ]
  },
  {
    value: 'bass',
    label: 'Bass',
    isGroup: true,
    children: [
      { value: 'sub-bass', label: 'Sub Bass' },
      { value: '808', label: '808' }
    ]
  }
]

export const Example = () => {
  const [log, setLog] = createSignal('change → none')

  const handleChange = (event: CustomEvent<{ value: string; path: string[] }>) => {
    setLog(`change → ${event.detail.value}`)
  }

  return (
    <z-column gap="3" style="width: min(18rem, 100%)">
      <z-field label="Sound">
        <z-select value="grand-piano" prop:options={SOUND_OPTIONS} onChange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log()}</z-text>
    </z-column>
  )
}
