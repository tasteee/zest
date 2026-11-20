import '@tasteee/zest'

const TOPICS = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'research', label: 'Research' }
]

export const Example = () => <z-filter label="Topic" options={TOPICS} />
