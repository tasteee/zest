import '@tasteee/zest'

const AREAS = [
  {
    value: 'work',
    label: 'Work',
    children: [
      { value: 'design', label: 'Design' },
      { value: 'engineering', label: 'Engineering' }
    ]
  },
  { value: 'life', label: 'Life', children: [{ value: 'travel', label: 'Travel' }] }
]

export const Example = () => <z-filter is-drilldown="" label="Area" tone="secondary" prop:options={AREAS} />
