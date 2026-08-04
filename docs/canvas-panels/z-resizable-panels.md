# z-resizable-panels

A group of resizable panes, modeled on
[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels).
Author it declaratively: [z-panel](z-panel.md) children separated by
`z-panel-handle` separators.

```html
<z-resizable-panels direction="row" auto-save-id="editor">
  <z-panel default-size="20%" min-size="160px" collapsible>…sidebar…</z-panel>
  <z-panel-handle></z-panel-handle>
  <z-panel min-size="30%">…main…</z-panel>
  <z-panel-handle></z-panel-handle>
  <z-panel default-size="25%" min-size="200px" max-size="480px">…inspector…</z-panel>
</z-resizable-panels>
```

Sizes accept `%` or `px` (`min-size` == `max-size` gives a fixed-size panel).
Panels can be `is-collapsible` (dragging below `collapse-threshold` snaps to
`collapsed-size`), added/removed at runtime (the group re-normalizes and
preserves surviving panes), and persisted via `auto-save-id` (writes to
`localStorage`).

```js
const group = document.querySelector('z-resizable-panels')
group.getLayout()          // [20, 45, 35] — percentages
group.setLayout([25, 50, 25])
group.reset()
group.addEventListener('layout', (e) => e.detail.sizes)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `direction` | `row` `column` | `row` | layout axis |
| `auto-save-id` | string | — | `localStorage` persistence key |
| `keyboard-step` | number | `5` | % moved per arrow key on a focused handle |
| `is-disabled` | boolean | — | lock all handles |

## Imperative API

- `getLayout()` → `number[]` (percentages, one per panel)
- `setLayout(sizes: number[])`
- `reset()` — clears persisted layout and re-initializes from panel defaults

## Slots

- _(default)_ — [z-panel](z-panel.md) and `z-panel-handle` children, alternating.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `layout` | `{ sizes: number[] }` | fires whenever the layout changes |

## z-panel-handle

The draggable separator between two panels. Renders a hairline grip by
default; slot custom content and it stays the drag target. Arrow keys (or
↑/↓ in a column group) resize by the group's `keyboard-step`.

### Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-disabled` | boolean | — | non-draggable |

### Slots

- _(default)_ — custom separator content (default: a 1px grip).

### Events

| Event | `detail` | Description |
| --- | --- | --- |
| `dragging` | `{ isDragging }` | drag start/end |

### Notes

- Exposes `part="grip"` for external styling.
- `is-column` is mirrored onto the handle by the parent group (not
  `:host-context`, which Firefox doesn't support) so CSS can flip cursor/grip
  orientation.
