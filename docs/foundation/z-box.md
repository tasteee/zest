# z-box

The one generic layout primitive. Flex (the default), grid, or block — picked
with `is-flex`/`is-grid`/`is-block` etc. — plus alignment, gap, margin,
padding, inset, and sizing as attributes, all resolved against the
design-system spacing scale. [z-row](../layout/z-row.md) and
[z-column](../layout/z-column.md) are thin wrappers over this element with
the flow direction locked.

```html
<z-box is-row gap="md" aligns-x="between" aligns-y="center" padding="lg">
  <span>Left</span>
  <span>Right</span>
</z-box>
```

`aligns-x`/`aligns-y` are always the horizontal/vertical relationship,
regardless of flow direction — in flex mode they resolve to
`justify-content`/`align-items` (swapped onto the cross axis when
`is-column` is set); in grid mode they resolve to
`justify-items`/`align-items` instead, since grid alignment is per-cell and
doesn't swap with direction.

## Value scale

Spacing props (`gap`, `margin*`, `padding*`, `inset*`) accept:
- a **size token** — `0` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl`
- a **bare number** (`gap="6"`), mapped straight to the `--spacing-N` scale
- any **CSS length** (`1rem`, `12px`, `2ch`), passed through verbatim

Sizing props (`width`, `height`, …) treat a bare number as `px` and pass any
other CSS length through. Grid `columns`/`rows` treat a bare number as
`repeat(n, minmax(0, 1fr))`.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-row` / `is-column` | boolean | — | `flex-direction`; also which axis `aligns-x`/`aligns-y` map to |
| `is-flex` / `is-inline-flex` | boolean | flex (default) | `display: flex` / `inline-flex` |
| `is-grid` / `is-inline-grid` | boolean | — | `display: grid` / `inline-grid` |
| `is-block` / `is-inline-block` / `is-inline` | boolean | — | block display modes |
| `aligns-x` | alignment | — | horizontal relationship |
| `aligns-y` | alignment | — | vertical relationship |
| `wrap` | boolean | — | `flex-wrap: wrap` |
| `does-wrap-text` | boolean | — | allow text wrapping |
| `full-width` / `full-height` | boolean | — | `width`/`height: 100%` |
| `gap` `row-gap` `column-gap` | size token / length | — | spacing between children |
| `margin` `margin-x` `margin-y` `margin-top/right/bottom/left` | size token / length | — | outer spacing |
| `padding` `padding-x` `padding-y` `padding-top/right/bottom/left` | size token / length | — | inner spacing |
| `inset` `inset-x` `inset-y` | size token / length | — | inner padding shorthand; overridden by the more specific `padding*` props when both are set |
| `width` `min-width` `max-width` `height` `min-height` `max-height` | length | — | sizing |
| `columns` `rows` | number / grid-template | — | grid template (number → `repeat(n, …)`) |
| `small-columns` `medium-columns` `large-columns` `extra-large-columns` | number / grid-template | — | responsive grid columns (breakpoints at 40/48/64/80rem) |

Alignment values: `start` `center` `end` `between` `around` `evenly`
`stretch` (in grid mode, the distribution-only values collapse to `stretch`,
matching CSS `justify-items`/`align-items`).

## Slots

- _(default)_ — box contents.
