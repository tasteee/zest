# z-surface

A neutral container panel. `level` chooses a surface step and `kind` chooses the
treatment. Status colour belongs in purpose-built elements, and depth uses
surface contrast and borders rather than shadows.

```html
<z-surface level="1" radius="lg">Panel content</z-surface>
<z-surface kind="outline" interactive>Panel with a nested link</z-surface>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `level` | `0` `1` `2` `3` | — | neutral elevation step |
| `kind` | `plain` `filled` `soft` `outline` `ghost` | — | neutral surface treatment |
| `radius` | radius token / length | `lg` | corner radius — `none` `sm` `md` `lg` `xl` `2xl` `full` |
| `interactive` | boolean | — | pointer cursor + hover border |
| `is-full-width` | boolean | — | `width: 100%` |
| `hidden` | boolean | — | hide (native attribute) |

## Slots

- _(default)_ — panel content.
