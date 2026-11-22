import { useState } from 'react'
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

type SoundChangeEventT = CustomEvent<{ value: string; path: string[] }>

export const Example = () => {
  const [log, setLog] = useState('change → none')

  const handleChange = (event: SoundChangeEventT) => setLog(`change → ${event.detail.value}`)

  return (
    <z-column gap="3" style={{ width: 'min(18rem, 100%)' }}>
      <z-field label="Sound">
        <z-select value="grand-piano" options={SOUND_OPTIONS} onchange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{log}</z-text>
    </z-column>
  )
}
