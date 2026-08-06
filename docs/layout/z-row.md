# z-row

[z-box](../foundation/z-box.md) with the flow direction locked to a
horizontal row. A thin wrapper — every other z-box attribute (`gap`,
`aligns-x`/`aligns-y`, `does-wrap`, `padding`/`margin`, `inset`,
`is-full-width`/`is-full-height`, …) works exactly the same way.
See [z-box](../foundation/z-box.md) for the full attribute reference and
value scale.

```html
<z-row gap="md" aligns-x="between" aligns-y="center">
  <span>Left</span>
  <span>Right</span>
</z-row>

<!-- wrapping row of chips -->
<z-row does-wrap gap="sm">
  <z-badge>Tag</z-badge>
  <z-badge>Tag</z-badge>
</z-row>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-inline` | boolean | — | `inline-flex` instead of `flex` |
| `aligns-x` | `start` `center` `end` `between` `around` `evenly` `stretch` | — | horizontal relationship, whatever the flow direction |
| `aligns-y` | `start` `center` `end` `between` `around` `evenly` `stretch` | — | vertical relationship, whatever the flow direction |
| `does-wrap` | boolean | — | `flex-wrap: wrap` |
| `does-wrap-text` | boolean | — | allow text inside to wrap |
| `gap` | size token / length | — | spacing between children |
| `row-gap` | size token / length | — | row gap only |
| `column-gap` | size token / length | — | column gap only |
| `padding` | size token / length | — | inner spacing, every edge |
| `padding-x` | size token / length | — | inner spacing, left and right |
| `padding-y` | size token / length | — | inner spacing, top and bottom |
| `padding-top` | size token / length | — | inner spacing, top edge |
| `padding-right` | size token / length | — | inner spacing, right edge |
| `padding-bottom` | size token / length | — | inner spacing, bottom edge |
| `padding-left` | size token / length | — | inner spacing, left edge |
| `margin` | size token / length | — | outer spacing, every edge |
| `margin-x` | size token / length | — | outer spacing, left and right |
| `margin-y` | size token / length | — | outer spacing, top and bottom |
| `margin-top` | size token / length | — | outer spacing, top edge |
| `margin-right` | size token / length | — | outer spacing, right edge |
| `margin-bottom` | size token / length | — | outer spacing, bottom edge |
| `margin-left` | size token / length | — | outer spacing, left edge |
| `inset` | size token / length | — | padding shorthand; the specific `padding*` props win |
| `inset-x` | size token / length | — | padding shorthand, left and right |
| `inset-y` | size token / length | — | padding shorthand, top and bottom |
| `width` | length | — | width; a bare number is px |
| `min-width` | length | — | minimum width |
| `max-width` | length | — | maximum width |
| `height` | length | — | height; a bare number is px |
| `min-height` | length | — | minimum height |
| `max-height` | length | — | maximum height |
| `is-full-width` | boolean | — | `width: 100%` |
| `is-full-height` | boolean | — | `height: 100%` |

## Slots

- _(default)_ — row children.
