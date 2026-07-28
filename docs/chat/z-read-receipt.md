# z-read-receipt

A row of small overlapping avatars showing who has seen a message, with an
optional "+N" overflow and a leading label. Composes [z-avatar](../data-display/z-avatar.md).

```html
<z-read-receipt label="Seen by"></z-read-receipt>
```

```js
const receipt = document.querySelector('z-read-receipt')
receipt.avatars = [{ name: 'Bob' }, { name: 'Priya' }, { name: 'Sam' }, { name: 'Lee' }]
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `max` | number | `3` | avatars to render before overflowing into "+N" |
| `label` | string | — | leading label text |
| `is-hidden` | boolean | — | hide |

## Properties

- `avatars` — `{ name?, src? }[]`
