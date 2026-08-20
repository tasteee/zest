# z-drag-drop

A general, pointer-based drag-and-drop engine — deliberately **not** native
HTML5 DnD, which is inconsistent and hard to style. Two elements share a
module-level registry: `z-draggable` (the thing you pick up) and
`z-drop-target` (the thing that accepts it). This is the substrate for
cross-area drags — panel → canvas, list → list, sidebar → editor. For
file drops from the OS, use [z-dropzone](z-dropzone.md) instead.

```html
<z-draggable type="card" group="board">
  <div>Card content</div>
</z-draggable>

<z-drop-target accept="card" group="board">
  <div>Drop here</div>
</z-drop-target>
```

```js
draggable.data = { id: 'card-1' }
draggable.addEventListener('dragend', (e) => e.detail) // { dropped, target }
dropTarget.addEventListener('dropitem', (e) => e.detail) // { data, type, source, x, y }
```

A draggable starts a drag after a small movement threshold, shows a floating
preview (a clone of itself, or a slotted `preview`), hit-tests registered
targets under the pointer, and drops onto a matching target on release.
Targets match when their `group` equals the draggable's `group` **and** their
`accept` list contains the draggable's `type` (or `accept` is `*`).

## z-draggable

### Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `type` | string | — | what kind of thing this is, matched against a target's `accept` |
| `group` | string | — | must equal the target's `group` to be droppable there |
| `handle` | CSS selector | — | restrict picking up to pointerdown within this selector |
| `disabled` | boolean | — | disable dragging |

### Properties

- `data` — arbitrary payload, handed back in `dropitem`'s `detail.data`

### Slots

- _(default)_ — the draggable content.
- `preview` — optional custom drag-preview content (defaults to a clone of the element).

### Events

| Event | `detail` | Description |
| --- | --- | --- |
| `dragstart` | `{ type, data }` | drag began (past the movement threshold) |
| `dragmove` | `{ x, y, over }` | pointer moved during a drag |
| `dragend` | `{ dropped, target }` | drag ended |

## z-drop-target

### Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accept` | space-separated types, or `*` | `*` | which draggable `type`s this accepts |
| `group` | string | — | must equal the draggable's `group` |
| `disabled` | boolean | — | reject all drags |

### Slots

- _(default)_ — the drop area content.

### Events

| Event | `detail` | Description |
| --- | --- | --- |
| `dragenter` | `{ data, type, source, x, y }` | a matching drag entered |
| `dragover` | `{ data, type, source, x, y }` | pointer moving over the target |
| `dragleave` | `{ data, type, source, x, y }` | the drag left |
| `dropitem` | `{ data, type, source, x, y }` | item dropped and accepted |

### Notes

- Styleable via the reflected `data-state` attribute (`over` / `reject`) on the target.
