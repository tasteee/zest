# z-callout

An in-flow documentation admonition (Note / Tip / Important / Warning /
Caution). Unlike [z-alert](z-alert.md) — a dismissable, overlay-adjacent
status banner — a callout is a content-emphasis block that lives inside
prose: a left accent bar tinted by `kind`, a leading icon, an optional
`heading`, and slotted body copy.

```html
<z-callout kind="tip" heading="Pro tip">
  You can also drag files directly into the composer.
</z-callout>

<z-callout kind="warning" is-expandable>
  A long paragraph of caveats that clamps to two lines with a
  "Show more" toggle once it actually overflows…
</z-callout>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `kind` | `note` `tip` `important` `warning` `caution` | `note` | accent color, icon, and (for `warning`/`caution`) `role="alert"` |
| `heading` | string | — | bold label above the body. Omit for a compact callout (icon centered, no label row) |
| `is-expandable` | boolean | — | clamp the body to two lines with a "Show more"/"Show less" toggle (only appears if the copy actually overflows) |
| `is-expanded` | boolean | — | expanded state (reflected, two-way) |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — body copy.

## Notes

- Override the accent with `--callout-color`.
