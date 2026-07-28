# z-kbd

A single keyboard key cap for documenting shortcuts (⌘, Ctrl, Enter, ↑).
Renders a bordered, mono-font box with a subtle raised edge so it reads as a
physical key. Combine several with plain "+" text between them for a chord.

```html
<z-kbd label="⌘"></z-kbd> + <z-kbd label="⇧"></z-kbd> + <z-kbd>K</z-kbd>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `size` | `xs` `sm` `md` `lg` `xl` | `md` | key size |
| `label` | string | — | text (alternative to slotting children) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — key label (ignored if `label` is set).
