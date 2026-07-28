# z-display

Oversized, fluid display type for hero titles — the tier above
[z-heading](z-heading.md)'s fixed scale. Where a heading tops out at a fixed
4rem, a display title clamps with the viewport (`sm`…`xl`), filling the space
on a wide screen while staying readable on a phone. Shares
[z-text](z-text.md)'s color/weight vocabulary.

```html
<z-display size="xl">Build faster.</z-display>
<z-display size="md" color="muted" tag="h2">A quieter section title</z-display>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `size` | `sm` `md` `lg` `xl` | `lg` | viewport-clamped size |
| `color` | `neutral` `primary` `secondary` `muted` `white` | `neutral` | text color |
| `weight` | `300` `400` `600` `700` `900` | `700` | font weight override |
| `tag` | any tag name | `h1` | element rendered |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — the title text.
