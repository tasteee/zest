# z-attachment-tray

The strip of staged [z-attachment-chip](z-attachment-chip.md) children above
a composer, doubling as a file drop/browse target (it composes
[z-dropzone](z-dropzone.md) internally).

```html
<z-attachment-tray accept="image/*,.pdf" multiple max-size="5000000">
  <z-attachment-chip name="brief.pdf" size="248000"></z-attachment-chip>
</z-attachment-tray>
```

```js
tray.addEventListener('files', (e) => e.detail.files)
tray.addEventListener('reject', (e) => e.detail) // { files, reason }
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `accept` | comma-separated MIME types / extensions | — | e.g. `image/*,.pdf` |
| `multiple` | boolean | — | allow more than one file |
| `max-size` | number (bytes) | — | reject files larger than this |
| `max-files` | number | — | reject drops with more files than this |
| `is-hidden` | boolean | — | hide |

## Slots

- _(default)_ — staged [z-attachment-chip](z-attachment-chip.md) children.

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `files` | `{ files }` | files accepted (drag-drop or picker) |
| `reject` | `{ files, reason }` | validation failed |

## Notes

- Shows an "Add files or drop here" (or "Add more", once chips are present)
  affordance alongside the slotted chips.
