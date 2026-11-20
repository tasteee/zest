import { createSignal } from 'solid-js'
import '@tasteee/zest'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' }
]

export const Example = () => {
  const [framework, setFramework] = createSignal('react')

  const handleChange = (event: CustomEvent<{ value: string }>) => setFramework(event.detail.value)

  return (
    <z-column gap="3" style="width: min(20rem, 100%)">
      <z-field label="Framework">
        <z-combobox
          prop:value={framework()}
          prop:options={FRAMEWORKS}
          placeholder="Search frameworks…"
          onChange={handleChange}
        />
      </z-field>
      <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {framework()}</z-text>
    </z-column>
  )
}
