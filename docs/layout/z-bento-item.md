# z-bento-item

One cell of a [z-bento-grid](z-bento-grid.md). Default slot is the body
(heading/description); `slot="icon"` sits above it; `slot="background"` (an
image, gradient, pattern) fills the cell behind everything and nudges into
view on hover. Giving `href` reveals a CTA row pinned to the bottom on
hover/focus — omit it for a static cell.

```html
<z-bento-item col-span="2" href="/features">
  <img slot="background" src="/bg.svg" alt="" />
  <svg slot="icon">…</svg>
  <z-heading size="xs">Feature name</z-heading>
  <z-text color="muted">A short description.</z-text>
</z-bento-item>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `col-span` | number | `1` | columns to span |
| `row-span` | number | `1` | rows to span |
| `href` | string | — | reveals a hover/focus CTA row linking here (omit for a static cell) |
| `cta-label` | string | `Learn more` | CTA text |
| `is-hidden` | boolean | — | hide |

## Slots

- `background` — fills the cell behind everything (image, gradient, pattern).
- `icon` — sits above the body.
- _(default)_ — the body content (heading/description).
