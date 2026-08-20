# z-subheading

An uppercase, letter-spaced eyebrow / overline label. Part of the text family
(see [z-text](z-text.md)); semibold (600) and `text-transform: uppercase` by
default. Renders a `<p>` unless `tag` is set.

```html
<z-subheading size="sm" color="dom">Now in beta</z-subheading>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `size` | `xl` `lg` `md` `sm` `xs` | `md` | type-scale step |
| `tag` | any HTML tag name | `p` | element to render |
| `color` | `neutral` `dom` `sub` `muted` `strong` `success` `warning` `error` | `neutral` | text color |
| `weight` | number (1–1000) | `600` | font weight override, including variable-font values |
| `is-italic` / `is-underlined` / `is-strikethrough` | boolean | — | decorations |
| `is-hidden` | boolean | — | hide the element |

## Slots

- _(default)_ — subheading content.
