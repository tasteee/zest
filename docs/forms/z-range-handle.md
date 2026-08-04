# z-range-handle

A declarative, invisible handle for [z-range](z-range.md). Renders nothing on
its own — the parent `z-range` reads its `value` plus optional
`min`/`max`/`step`/`accent` and paints the unified track and thumb.

```html
<z-range min="0" max="100">
  <z-range-handle value="20"></z-range-handle>
  <z-range-handle value="80" accent="sub"></z-range-handle>
</z-range>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `value` | number | — | this handle's value (mirrored live by the parent) |
| `min` / `max` | number | inherits from `z-range` | per-handle travel bounds, clamped to the parent's domain |
| `step` | number | inherits from `z-range` | per-handle step |
| `accent` | `primary` `secondary` | `primary` accent | this handle's thumb/fill color |
| `label` | string | — | reserved for a per-handle accessible label |

## Notes

- The first `z-range-handle` child of a `z-range` is the left/lower handle;
  the second is the right/upper handle. Exactly two are expected.
