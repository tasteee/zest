import '@tasteee/zest'

const TREE_ITEMS = [
  {
    id: 'src',
    label: 'src',
    isExpanded: true,
    children: [
      {
        id: 'components',
        label: 'components',
        isExpanded: true,
        children: [
          { id: 'button', label: 'z-button.tsx' },
          { id: 'input', label: 'z-input.tsx', isSelected: true },
          { id: 'tree', label: 'z-tree.tsx' }
        ]
      },
      { id: 'index', label: 'index.ts' }
    ]
  },
  { id: 'pkg', label: 'package.json' },
  { id: 'readme', label: 'README.md', isDisabled: true }
]

export const Example = () => <z-tree prop:items={TREE_ITEMS} style="width: 18rem" />
