# z-list

A vertical stack of rows on a card surface, hairline-divided. Slot in
[z-list-row](z-list-row.md) items; an optional `label` renders a mono
uppercase section caption at the top. Rounds and clips its rows so the
first/last sit flush with the card corners.

```html
<z-list label="Recent">
  <z-list-row is-clickable>
    <svg>…</svg>
    <div>
      <z-text weight="600">Project Alpha</z-text>
      <z-text color="muted" size="sm">Updated 2h ago</z-text>
    </div>
    <z-badge tone="success">Active</z-badge>
  </z-list-row>
</z-list>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | — | mono uppercase section caption |
| `is-plain` | boolean | — | drop the card background/border/radius |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — [z-list-row](z-list-row.md) children.
