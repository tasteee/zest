import '@tasteee/zest'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' }
]

export const Example = () => (
  <z-field label="Framework">
    <z-combobox options={FRAMEWORKS} placeholder="Search frameworks..." />
  </z-field>
)
