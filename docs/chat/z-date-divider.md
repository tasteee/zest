# z-date-divider

A centered day separator between message groups ("Today" / "Yesterday" /
"March 3").

```html
<z-date-divider label="Today"></z-date-divider>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | — | the divider text (alternative to slotting children) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — divider content (ignored if `label` is set).
