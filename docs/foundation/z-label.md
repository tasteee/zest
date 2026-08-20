# z-label

A UI label. Part of the text family (see [z-text](z-text.md)); medium weight
(500), renders an inline `<span>` by default.

```html
<z-label>Email address</z-label>
<z-label size="sm" color="muted">Optional</z-label>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `size` | `lg` `md` `sm` `xs` | `md` | type-scale step |
| `tag` | any HTML tag name | `span` | element to render |
| `color` | `neutral` `dom` `sub` `muted` `strong` `success` `warning` `error` | `neutral` | text color |
| `weight` | number (1–1000) | `500` | font weight override, including variable-font values |
| `is-italic` / `is-underlined` / `is-strikethrough` | boolean | — | decorations |
| `is-hidden` | boolean | — | hide the element |

## Slots

- _(default)_ — label content.
