# z-api-table

The attributes / properties / slots / events / CSS reference table. `kind`
picks the column set, so one element covers all five surfaces rather than five
near-identical ones.

```html
<z-api-table kind="attributes"></z-api-table>
```

```js
const table = document.querySelector('z-api-table')
table.rows = [
  { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md', description: 'Control density.' },
  { name: 'value', type: 'string', description: 'The current value.', isRequired: true }
]
```

Not `z-table` with different columns. A general data grid renders strings into
cells; an API reference needs the type column to be typed (see
[z-type-badge](z-type-badge.md)), descriptions to carry inline code, every row
to be deep-linkable, and required and deprecated to read at a glance. Pushing
all of that through a generic table means handing it HTML, and a data grid
that accepts HTML is not a data grid any more.

## Row shape

Which fields are read depends on `kind`. Extra fields are ignored, so one row
array can serve more than one table.

| Field | Used by | Description |
| --- | --- | --- |
| `name` | all | the attribute, property, slot, event, or custom property |
| `type` | attributes, properties | rendered as a `z-type-badge` |
| `detail` | events | the event's `detail` shape, rendered as a `z-type-badge` |
| `defaultValue` | attributes, properties, css | an em dash means "no default" |
| `description` | all | backtick-delimited inline code is rendered |
| `isRequired` | all | adds a red asterisk after the name |
| `isDeprecated` | all | strikes the name through |

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `row[]` | `[]` | **property** — the table body |
| `kind` | `attributes` `properties` `slots` `events` `css` | `attributes` | which column set to render |
| `caption` | string | — | a label above the table |
| `is-dense` | boolean | — | tighter row padding |
| `is-hidden` | boolean | — | hide |

## Notes

Every name cell is an anchor with an id of `{kind}-{name}`, so
`#attributes-size` links straight to a row.

Renders "Nothing here." rather than an empty table when `rows` is empty.
