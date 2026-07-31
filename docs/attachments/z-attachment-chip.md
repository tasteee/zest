# z-attachment-chip

A staged file in the composer before send: a thumbnail (or type icon), the
file name and size, and a remove (×) button. An optional `progress` shows an
upload bar. Typically rendered inside a [z-attachment-tray](z-attachment-tray.md).

```html
<z-attachment-chip name="brief.pdf" size="248000" type="application/pdf"></z-attachment-chip>
<z-attachment-chip name="photo.png" thumbnail="/thumbs/photo.svg" progress="60"></z-attachment-chip>
```

```js
chip.addEventListener('remove', (e) => e.detail.value)
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `name` | string | — | file name |
| `size` | number (bytes) | — | formatted as B/KB/MB |
| `type` | MIME type | — | used to pick the type icon when no `thumbnail` is set |
| `thumbnail` | URL | — | image thumbnail (shown instead of the type icon) |
| `value` | string | — | identifier passed back in `remove`'s `detail.value` |
| `progress` | number (0–100) | — | shows an upload progress bar while below `100` |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `remove` | `{ value }` | the remove (×) button was clicked |
