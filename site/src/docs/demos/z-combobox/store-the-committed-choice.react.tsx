import { useState } from 'react'
import '@tasteee/zest'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' }
]

export const Example = () => {
  const [framework, setFramework] = useState('react')

  const handleChange = (event: CustomEvent<{ value: string }>) => setFramework(event.detail.value)
  const logText = `change → ${framework}`

  return (
    <z-column gap="3" style={{ width: 'min(20rem, 100%)' }}>
      <z-field label="Framework">
        <z-combobox value={framework} options={FRAMEWORKS} placeholder="Search frameworks…" onchange={handleChange} />
      </z-field>
      <z-text size="xs" color="muted" style={{ fontFamily: 'var(--font-mono)' }}>{logText}</z-text>
    </z-column>
  )
}
