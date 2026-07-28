# z-tree

A data-driven hierarchical tree with expand/collapse, selection, and keyboard
navigation. Feed it a recursive `items` array — rows are flattened internally
(only expanded branches render), keeping it flat enough to hand off to
[z-virtual-list](z-virtual-list.md) for very large trees.

```html
<z-tree selection="single" show-guides></z-tree>
```

```js
const tree = document.querySelector('z-tree')
tree.items = [
  { id: 'src', label: 'src', children: [
    { id: 'index', label: 'index.ts' },
    { id: 'utils', label: 'utils.ts' }
  ] }
]

tree.addEventListener('select', (e) => e.detail)   // { ids, node }
tree.addEventListener('activate', (e) => e.detail) // { id, node } — Enter/dblclick
tree.expandAll()
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `selection` | `single` `multiple` `none` | `single` | selection mode (⌘/Ctrl-click adds in `multiple`) |
| `show-guides` | boolean | — | draw indent guide lines |
| `is-hidden` | boolean | — | hide |

## Properties

- `items` — `{ id, label?, icon?, children?, isExpanded?, isSelected?, isDisabled? }[]`
- `selected` — array of ids, seeds initial selection
- `expanded` — array of ids, seeds initial expansion

## Imperative API

- `expand(id)` / `collapse(id)` / `expandAll()` / `collapseAll()`
- `select(id)`
- `getSelection()` → `string[]`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ ids, node }` | selection changed |
| `expand` | `{ id }` | a node was expanded |
| `collapse` | `{ id }` | a node was collapsed |
| `activate` | `{ id, node }` | Enter/Space or double-click on a row |

## Interaction notes

- Keyboard: ↑/↓ move, →/← expand/collapse (or step to parent/first child),
  Home/End jump, Enter/Space select + activate.
- ARIA `tree`/`treeitem` roles with `aria-expanded`/`aria-level`/`aria-selected`.
- Drag-reorder (via [z-drag-drop](../attachments/z-drag-drop.md)) is not implemented yet.
