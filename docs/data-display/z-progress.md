# z-progress

A slim linear meter — hairline track, accent-filled bar. Determinate
(`value` of `max`) or indeterminate (`is-indeterminate`).

```html
<z-progress aria-label="Upload progress" value="60"></z-progress>
<z-progress aria-label="Completed tasks" value="3" max="5" accent="success"></z-progress>
<z-progress aria-label="Loading results" is-indeterminate></z-progress>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | string | — | accessible name |
| `value` | number | `0` | current value (clamped to 0…max; nonfinite values become 0) |
| `max` | number | `100` | finite positive maximum; otherwise falls back to 100 |
| `accent` | `sub` `success` `error` | neutral | bar color |
| `size` | `sm` `md` `lg` | `md` | bar thickness |
| `is-indeterminate` | boolean | — | continuous sweep instead of a value |
| `is-hidden` | boolean | — | hide |

Exposes `role="progressbar"` with matching numeric ARIA attributes; indeterminate progress omits `aria-valuenow`. Give each meter a descriptive `aria-label`.

## Slots

None.
