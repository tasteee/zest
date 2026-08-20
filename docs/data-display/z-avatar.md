# z-avatar

A circular identity mark. Shows an image when `src` loads, and gracefully falls
back to initials (from `name`, or given via `initials`) on a tinted ground.
Optional status dot in the corner.

```html
<z-avatar src="/me.svg" name="Shane Colcleasure"></z-avatar>
<z-avatar name="Ada Lovelace" accent="sub"></z-avatar>
<z-avatar initials="ZL" size="lg" status="online"></z-avatar>
<z-avatar name="Box" is-square></z-avatar>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `src` | string | — | image URL (falls back to initials on error) |
| `name` | string | — | used for the alt text and initials |
| `initials` | string | derived from `name` | explicit initials (max 2 chars) |
| `size` | `xs` `sm` `md` `lg` `xl` | `md` | size |
| `accent` | `neutral` `dom` `sub` `success` `warning` `error` | `neutral` | initials ground tint |
| `status` | `online` `busy` `away` `offline` | — | corner status dot |
| `is-square` | boolean | — | rounded-square instead of circle |
| `is-hidden` | boolean | — | hide |

## Slots

None.
