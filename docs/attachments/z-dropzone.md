# z-dropzone

A file drop area with click-to-browse and validation. Unlike the pointer-based
[z-drag-drop](z-drag-drop.md) engine, this uses native HTML5 drag events on
purpose, since that's the only way to receive files dragged in from the OS.

```html
<z-dropzone accept="image/*,.pdf" is-multiple max-size="5000000"></z-dropzone>
```

```js
const zone = document.querySelector('z-dropzone')
zone.addEventListener('drop', (e) => e.detail.files)          // File[]
zone.addEventListener('reject', (e) => e.detail)               // { files, reason }
zone.addEventListener('clear', () => {})
```

Files are validated against `accept` / `max-size` / `max-files` / `is-multiple`
before `drop` fires; anything rejected comes back on `reject` with a reason
instead.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accept` | comma-separated MIME types / extensions | — | e.g. `image/*,.pdf` |
| `is-multiple` | boolean | — | allow more than one file |
| `max-size` | number (bytes) | — | reject files larger than this |
| `max-files` | number | — | reject drops with more files than this |
| `is-disabled` | boolean | — | disable the zone |

## Properties

- `files` — the currently selected `File[]`, shown as a compact "selected" row when non-empty

## Slots

- _(default)_ — custom empty-state content (default: "Drop files here or click to browse" + the `accept` hint).

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `drop` | `{ files }` | files accepted (drag-drop or picker) |
| `reject` | `{ files, reason }` | validation failed |
| `clear` | — | the clear ("×") button was pressed |

## Notes

- Styleable via the reflected `data-state` attribute (`over` / `reject`), or the
  exposed `zone` / `selected` parts.
