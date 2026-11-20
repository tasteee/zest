import '@tasteee/zest'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Aurora', isCurrent: true }
]

export const Example = () => <z-breadcrumbs prop:items={TRAIL} />
