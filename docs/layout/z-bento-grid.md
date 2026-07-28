# z-bento-grid

A fixed-row-height CSS grid for slotted [z-bento-item](z-bento-item.md) cells.
Items opt into a footprint via `col-span`/`row-span`; the grid just sets the
column count and the height of one row unit.

```html
<z-bento-grid columns="3" row-height="14rem" gap="md">
  <z-bento-item col-span="2">…</z-bento-item>
  <z-bento-item>…</z-bento-item>
</z-bento-grid>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `columns` | number | `3` | column count |
| `row-height` | length | `14rem` | height of one grid row unit |
| `gap` | size token / length | `var(--spacing-4)` | grid gap |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — [z-bento-item](z-bento-item.md) children.
