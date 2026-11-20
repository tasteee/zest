import '@tasteee/zest'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'svelte', label: 'Svelte' }
]

export const Example = () => (
  <z-column gap="4">
    <z-field label="Framework">
      <z-select placeholder="Choose one" options={FRAMEWORKS} />
    </z-field>
    <z-field label="Project brief" description="A sentence or two is enough.">
      <z-textarea rows={3} placeholder="What are you making?" />
    </z-field>
  </z-column>
)
