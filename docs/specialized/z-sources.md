# z-sources

The grounding references shown under an AI answer: a labeled list of source
cards (index, title, domain, optional snippet). Pairs with inline
[z-citation](z-citation.md) markers.

```html
<z-sources label="Sources" columns="2"></z-sources>
```

```js
const sources = document.querySelector('z-sources')
sources.sources = [
  { title: 'Australia', url: 'https://en.wikipedia.org/wiki/Australia', snippet: 'Canberra is the capital…' }
]
sources.addEventListener('select', (e) => e.detail) // { index, url }
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `label` | string | `Sources` | section label |
| `columns` | number | single column | lay the cards out in a grid with this many columns |
| `is-hidden` | boolean | — | hide |

## Properties

- `sources` — `{ title?, url?, snippet? }[]`

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ index, url }` | a source card was clicked |
