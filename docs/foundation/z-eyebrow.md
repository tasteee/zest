# z-eyebrow

The small mono kicker that sits above a page or section title
("DESIGN SYSTEM ─────"). Uppercase, letter-tracked, drawn in an accent accent,
with an optional trailing hairline rule. Owns no outer margin — space it with
the surrounding layout primitive.

```html
<z-eyebrow label="Design system" has-rule></z-eyebrow>
<z-eyebrow color="dom" full-width>Changelog</z-eyebrow>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `color` | `primary` `neutral` | secondary/pink | accent color |
| `label` | string | — | text (alternative to slotting children) |
| `has-rule` | boolean | — | show a trailing hairline rule |
| `is-full-width` | boolean | — | stretch the rule to fill the container instead of a fixed width |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — label text (ignored if `label` is set).
