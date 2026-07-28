# z-delivery-status

The tiny send-state indicator next to a sent message: sending (clock) → sent
(✓) → delivered (✓✓) → read (blue ✓✓), plus an error state. Sits in a
message's meta row.

```html
<z-delivery-status status="read"></z-delivery-status>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `status` | `sending` `sent` `delivered` `read` `error` | `sent` | delivery state and glyph |
| `is-hidden` | boolean | — | hide |

## Notes

- Override the read-state color with `--read-color`.
