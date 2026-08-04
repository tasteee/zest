# z-line

A bare 1px hairline divider — the minimal primitive used inside dense layouts.
For a divider with a centered label, use [z-separator](z-separator.md) instead.

```html
<z-line></z-line>

<!-- inside a horizontal row -->
<z-box   gap="2">
  <span>A</span>
  <z-line direction="vertical"></z-line>
  <span>B</span>
</z-box>
```

## Attributes

| Attribute | Type | Description |
| --- | --- | --- |
| `direction` | boolean | render a vertical 1px rule (full height) instead of horizontal |
| `direction` | boolean | explicit horizontal (the default) |

Exposes `role="separator"` with the matching `aria-orientation`.

## Slots

None.
