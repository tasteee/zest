# z-sortable

Drag-to-reorder for its direct children. On pickup the dragged child is lifted
out of flow (fixed, following the pointer) and a same-sized placeholder takes
its place; as the pointer moves, the placeholder relocates among siblings by
midpoint hit-testing; on release the child drops where the placeholder sits.
Operates on real light-DOM children, so the app keeps ownership of the list —
it just also gets a `sort` event to sync state.

```html
<z-sortable axis="y" handle=".grip">
  <div><span class="grip">⋮⋮</span> Item one</div>
  <div><span class="grip">⋮⋮</span> Item two</div>
  <div><span class="grip">⋮⋮</span> Item three</div>
</z-sortable>
```

```js
sortable.addEventListener('sort', (e) => e.detail) // { oldIndex, newIndex }
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `axis` | `x` `y` | `y` | drag axis |
| `handle` | CSS selector | — | restrict picking up to pointerdown within this selector |
| `disabled` | boolean | — | disable reordering |

## Slots

- _(default)_ — the sortable children.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `start` | `{ index }` | a child was picked up |
| `sort` | `{ oldIndex, newIndex }` | the child was dropped at a new index |
| `end` | — | drag ended (fires after `sort`, or alone if dropped back in place) |

## Notes

- Cross-list dragging and FLIP easing are future enhancements. They are not
  exposed as props until they have working behavior.
