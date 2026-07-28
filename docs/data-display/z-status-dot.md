# z-status-dot

A small presence indicator: a colored dot, optionally with a live pulse and a
trailing label. Sits on avatars, chat headers, and member lists.

```html
<z-status-dot status="online"></z-status-dot>
<z-status-dot status="dnd" label="Do not disturb"></z-status-dot>
<z-status-dot status="online" pulse></z-status-dot>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `status` | `online` `away` `dnd` `busy` `offline` | — | color |
| `size` | `md` `lg` | small (default) | dot size |
| `pulse` | boolean | — | animate an outward "ping" ring |
| `label` | string | — | trailing text label |
| `is-hidden` | boolean | — | hide |

## Notes

- Colors come from the ink tone tokens; override `--color` per instance for
  custom statuses.
- Exposes `part="dot"` so a consumer (e.g. [z-avatar](z-avatar.md)) can
  position it precisely.
