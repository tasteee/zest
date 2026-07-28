# z-system-message

A centered, muted status line for non-message events ("Alice added Bob",
"You started a call", "Messages are end-to-end encrypted").

```html
<z-system-message label="Alice added Bob to the chat"></z-system-message>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | — | the status text (alternative to slotting children) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — status content (ignored if `label` is set).
