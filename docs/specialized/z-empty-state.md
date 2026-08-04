# z-empty-state

The centered placeholder shown when a list, search, or page has nothing to
display. An optional `[slot="icon"]` sits above a `heading` and `description`,
with the default slot reserved for actions.

```html
<z-empty-state
  heading="No results"
  description="Try adjusting your filters or search terms."
  is-bordered
>
  <svg slot="icon">…</svg>
  <z-button accent="dom">Clear filters</z-button>
</z-empty-state>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `heading` | string | — | the headline |
| `description` | string | — | supporting copy |
| `accent` | `sub` | `dom` (purple) | icon tint |
| `is-bordered` | boolean | — | dashed border around the block |
| `is-hidden` | boolean | — | hide |

## Slots

- `icon` — an icon shown above the heading (the tinted badge hides itself if empty).
- _(default)_ — action buttons (the row hides itself if empty).
