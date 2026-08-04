# z-link

An inline text link. Accent-colored by `color`, with an animated underline that
grows from the start on hover.

```html
<z-link href="/docs">Read the docs</z-link>
<z-link href="https://example.com" is-external>External ↗</z-link>
<z-link href="/x" color="neutral" underline="always">Always underlined</z-link>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `href` | string | — | destination |
| `target` | string | — | anchor target (`_blank` implies external rel) |
| `label` | string | — | text (alternative to slotting children) |
| `color` | `dom` `sub` `neutral` | `dom` | color |
| `size` | `sm` `md` `lg` | `md` | size |
| `underline` | `hover` `always` `none` | `hover` | underline behaviour |
| `is-external` | boolean | — | open in a new tab with `rel="noopener noreferrer"` |
| `is-block` | boolean | — | render as a block-level flex link |
| `is-disabled` | boolean | — | disable (removes `href`) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — link content (text and/or icons). Ignored if `label` is set.
