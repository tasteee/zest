# z-relative-time

A tiny auto-updating timestamp: "just now", "2m", "3h", "Yesterday", then an
absolute date once it's older than `threshold`. Every chat message and
conversation-list row leans on it.

```html
<z-relative-time datetime="2026-07-04T12:00:00Z"></z-relative-time>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `datetime` | ISO string or epoch ms | — | the timestamp to render |
| `format` | — | — | declared, not currently read (output format isn't customizable yet — see [questionable API choices](../questionable-api-choices.md)) |
| `threshold` | number (ms) | `7 days` | age at which display switches from relative ("3d") to an absolute date |
| `refresh` | number (ms) | `60000` | how often the display re-evaluates |
| `is-hidden` | boolean | — | hide |

## Notes

- All instances share a single interval (one shared timer, not one per
  timestamp), so a thread of a thousand timestamps schedules one tick.
- The full absolute time is always available on hover via the native `title`
  attribute, regardless of the current display format.
