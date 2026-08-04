# z-virtual-list

Windowed rendering: only the rows in view (plus overscan) are ever in the DOM,
so lists of thousands of items scroll cheaply. Headless — you supply the data
and a row renderer.

```html
<z-virtual-list item-height="40"></z-virtual-list>
```

```js
const list = document.querySelector('z-virtual-list')
list.items = bigArray
list.itemHeight = 40
list.renderItem = (item, index) => {
  const row = document.createElement('div')
  row.textContent = item.label
  return row // a DOM Node, or an HTML string
}

list.scrollToIndex(500, 'center')
list.addEventListener('visiblerangechange', (e) => e.detail) // { start, end }
```

Two sizing modes: set `item-height` for the fixed fast path (pure arithmetic
offsets), or `estimate-size` (with no `item-height`) for dynamic rows —
rows are measured as they render and cached in a prefix-sum, so
variable-height rows (chat messages with images, replies, reactions) window
correctly. Unmeasured rows use the estimate until they scroll into view.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `item-height` | number | — | fixed row height in px — enables the fixed fast path |
| `estimate-size` | number | `40` | estimated row height for dynamic mode (used when `item-height` is unset) |
| `overscan` | number | `4` | extra rows rendered beyond the viewport on each side |
| `direction` | boolean | — | lay out as a horizontal row instead of a vertical column |
| `gap` | number | `0` | px gap between rows |

## Properties

- `items` — the full data array
- `renderItem` — `(item, index) => Node | string`
- `keyFn` — `(item, index) => string | number`, optional. When set, a row whose
  key is still in view on the next render is reused instead of re-running
  `renderItem` — its DOM node and any internal state (focus, media playback,
  an inner scroll position) survive.

## Imperative API

- `scrollToIndex(index, align?: 'start' | 'center' | 'end')`
- `scrollToTop()` / `scrollToBottom()`
- `getVisibleRange()` → `{ start, end }`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `visiblerangechange` | `{ start, end }` | the rendered window moved |
