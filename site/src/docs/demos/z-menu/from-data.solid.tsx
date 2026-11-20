import '@tasteee/zest'

// for menus built from data, pass items instead of writing children
const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'modified', label: 'Last modified' },
  { value: 'size', label: 'Size' }
]

export const Example = () => (
  <z-menu prop:items={SORT_OPTIONS}>
    <z-button slot="trigger" kind="outline">Sort by</z-button>
  </z-menu>
)
