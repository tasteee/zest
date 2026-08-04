# z-token-table

A group of [z-swatch](z-swatch.md), laid out as a scannable scale.

```html
<z-token-table names="--space-xs --space-sm --space-md" kind="space"></z-token-table>
```

```js
const table = document.querySelector('z-token-table')
table.tokens = [
  { name: '--purple', description: 'The dominant accent.' },
  { name: '--pink', description: 'The subordinate accent.' }
]
```

Two ways in, on purpose. `names` is a plain space- or comma-separated
attribute, which is what lets a token table appear in hand-written HTML and in
markdown docs — an array property needs a script, and the pages that most want
a token table are the ones with no script. `tokens` takes the richer array
when there is a sentence to say per row, and wins when both are set.

Entries in `tokens` may be bare strings or objects, so a colour ramp stays a
list of names while a curated table gets its descriptions.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tokens` | `(string \| { name, label?, description?, kind? })[]` | `[]` | **property** — the rows; wins over `names` |
| `names` | string | — | space- or comma-separated token names |
| `kind` | `color` `space` `radius` `type` `value` | inferred per token | forces the specimen for every row |
| `caption` | string | — | a label above the grid |
| `columns` | `1` | auto | force a single column |
| `is-hidden` | boolean | — | hide |

## Notes

Columns collapse on their own rather than at a breakpoint, because the useful
width of a swatch depends on its kind — a colour ramp wants many narrow
columns, a font-family list wants one wide one. `columns="1"` overrides.

See [tokens](../foundation/tokens.md) for the reference this element renders.
