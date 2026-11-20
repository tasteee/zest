import '@tasteee/zest'

// data-nav-item children are the plain-HTML way to declare the menu.
// In React, pass the same structure as items instead.
const NAV_ITEMS = [
  {
    value: 'products',
    label: 'Products',
    children: [
      { label: 'Overview', href: '/products', description: 'Explore products' },
      { value: 'features', label: 'Features' }
    ]
  },
  { label: 'About', href: '/about' }
]

export const Example = () => <z-nav-menu value="products" items={NAV_ITEMS} />
