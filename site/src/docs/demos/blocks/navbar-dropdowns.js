document.querySelector('#menu').items = [
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
