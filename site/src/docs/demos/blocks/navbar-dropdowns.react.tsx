import '@tasteee/zest'

const MENU_ITEMS = [
  {
    value: 'products',
    label: 'Products',
    children: [
      { value: 'analytics', label: 'Analytics', description: 'Track the work that matters' },
      { value: 'automation', label: 'Automation', description: 'Make repeatable work disappear' },
      { value: 'insights', label: 'Insights', description: 'Answers without a spreadsheet' }
    ]
  },
  {
    value: 'resources',
    label: 'Resources',
    children: [
      { value: 'docs', label: 'Documentation', description: 'Guides and API reference' },
      { value: 'blog', label: 'Blog', description: 'Product news and write-ups' }
    ]
  },
  { value: 'pricing', label: 'Pricing', href: '#pricing' }
]

const BAR_STYLE = {
  width: 'min(52rem, 100%)',
  padding: '0.5rem 1rem',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-lg)'
}

export const Example = () => (
  <z-row alignsX="between" alignsY="center" gap="4" style={BAR_STYLE}>
    <z-text weight={600}>Acme</z-text>
    <z-nav-menu items={MENU_ITEMS} />
    <z-button tone="secondary" size="sm">Get started</z-button>
  </z-row>
)
