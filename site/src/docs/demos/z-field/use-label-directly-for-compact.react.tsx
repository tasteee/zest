import '@tasteee/zest'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'svelte', label: 'Svelte' }
]

export const Example = () => <z-combobox label="Filter framework" placeholder="Filter" options={FRAMEWORKS} />
