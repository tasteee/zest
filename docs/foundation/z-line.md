# z-line

A bare 1px hairline divider — the minimal primitive used inside dense layouts.
For a divider with a centered label, use [z-separator](z-separator.md) instead.

```html
<z-line></z-line>

<!-- inside a horizontal row -->
<z-box   gap="2">
  <span>A</span>
  <z-line vertical></z-line>
  <span>B</span>
</z-box>
```

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `vertical` | boolean | `false` | fills the available height instead of width |

Exposes `role="separator"` with the matching `aria-orientation`.

## Slots

None.
