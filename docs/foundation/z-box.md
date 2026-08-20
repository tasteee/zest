# z-box

The generic flex primitive: alignment, gap, margin, padding, inset, and
sizing as attributes, all resolved against the design-system spacing scale.
[wired-row](../layout/wired-row.md) and [wired-column](../layout/wired-column.md) are thin
wrappers over this element with the flow direction locked.

A box is flex, always. It used to carry seven booleans for one CSS `display`
value — grid, inline-grid, block, inline-block and the rest — which made it a
display switch rather than a layout primitive. Grid belongs to
[wired-grid](../layout/wired-grid.md), which owns that job properly. The one modifier
that composes with flex rather than replacing it, `inline`, survives.

```html
<z-box  gap="md" aligns-x="between" aligns-y="center" padding="lg">
  <span>Left</span>
  <span>Right</span>
</z-box>
```

`aligns-x`/`aligns-y` are always the horizontal/vertical relationship,
regardless of flow direction. They resolve to `justify-content`/`align-items`,
swapping onto the cross axis when `direction="vertical"` is set.

## Value scale

Spacing props (`gap`, `margin*`, `padding*`, `inset*`) accept:
- a **size token** — `0` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl`
- a **bare number** (`gap="6"`), mapped straight to the `--spacing-N` scale
- any **CSS length** (`1rem`, `12px`, `2ch`), passed through verbatim

Sizing props (`width`, `height`, …) treat a bare number as `px` and pass any
other CSS length through.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `direction` | `horizontal` `vertical` | `horizontal` | flow direction; also which axis `aligns-x`/`aligns-y` map to |
| `inline` | boolean | — | `display: inline-flex` instead of `flex` |
| `aligns-x` | alignment | — | horizontal relationship |
| `aligns-y` | alignment | — | vertical relationship |
| `does-wrap` | boolean | — | `flex-wrap: wrap` |
| `does-wrap-text` | boolean | — | allow text wrapping |
| `is-full-width` / `is-full-height` | boolean | — | `width`/`height: 100%` |
| `gap` `row-gap` `column-gap` | size token / length | — | spacing between children |
| `margin` `margin-x` `margin-y` `margin-top/right/bottom/left` | size token / length | — | outer spacing |
| `padding` `padding-x` `padding-y` `padding-top/right/bottom/left` | size token / length | — | inner spacing |
| `inset` `inset-x` `inset-y` | size token / length | — | inner padding shorthand; overridden by the more specific `padding*` props when both are set |
| `width` `min-width` `max-width` `height` `min-height` `max-height` | length | — | sizing |

Alignment values: `start` `center` `end` `between` `around` `evenly`
`stretch`.

## Slots

- _(default)_ — box contents.
