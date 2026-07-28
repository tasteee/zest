# z-citation

An inline citation marker for grounded AI answers: a small superscript badge
referencing a source. Renders an anchor when `href` is set, otherwise a
button that emits `activate` (e.g. to scroll to the matching
[z-sources](z-sources.md) entry).

```html
…the capital is Canberra<z-citation index="2"></z-citation>.
```

```js
citation.addEventListener('activate', (e) => e.detail) // { index, href }
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `index` | number | — | shown as the badge label (unless `label` is set) |
| `label` | string | — | overrides the shown label |
| `href` | string | — | if set, renders as a real link (opens in a new tab); otherwise fires `activate` |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `activate` | `{ index, href }` | clicked with no `href` set |
