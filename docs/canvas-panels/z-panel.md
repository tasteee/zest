# z-panel

A single pane inside [z-resizable-panels](z-resizable-panels.md). Mostly
declarative — the group reads its size attributes and drives its flex-basis —
but exposes an imperative API that delegates back to the group.

```html
<z-resizable-panels>
  <z-panel default-size="30%" min-size="160px" is-collapsible collapsed-size="0">
    …
  </z-panel>
  <z-panel-handle></z-panel-handle>
  <z-panel>…</z-panel>
</z-resizable-panels>
```

```js
const panel = document.querySelector('z-panel')
panel.collapse()
panel.expand()
panel.getSize()      // current size, as a percentage
panel.addEventListener('collapsechange', (e) => e.detail.collapsed)
panel.addEventListener('sizechange', (e) => e.detail.size)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `default-size` | `%` or `px` | — | initial size |
| `min-size` / `max-size` | `%` or `px` | — | clamps (equal values ⇒ fixed-size panel) |
| `is-collapsible` | boolean | — | can collapse to `collapsed-size` |
| `collapsed-size` | `%` or `px` | `0` | size when collapsed |
| `collapse-threshold` | `%` or `px` | — | drag below this ⇒ snap collapsed |
| `order` | number | — | stable slot identity for conditional mounting |
| `is-collapsible` | boolean | — | the panel can be collapsed by its handle |

## Imperative API

- `collapse()` / `expand()`
- `resize(size: number)` — request a target size (percentage)
- `getSize()` → current size as a percentage
- `isCollapsed()` → boolean

## Slots

- _(default)_ — panel content.

## Events

Dispatched by the parent group *onto* the panel (not declared as its own
Atomico props, to avoid colliding with the same-named imperative methods):

| Event | `detail` | Description |
| --- | --- | --- |
| `sizechange` | `{ size }` | this panel's size changed (percentage) |
| `collapsechange` | `{ collapsed }` | this panel collapsed or expanded |
