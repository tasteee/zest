# z-file-attachment

A sent file inside a message bubble: a type icon, the file name and size, and
a download affordance. For a file still being staged before send, use
[z-attachment-chip](z-attachment-chip.md) instead.

```html
<z-file-attachment name="proposal.pdf" size="248000" href="/files/proposal.pdf"></z-file-attachment>
```

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `name` | string | — | file name |
| `size` | number (bytes) | — | formatted as B/KB/MB |
| `type` | MIME type or short category (`image` `video` `audio` `archive` `sheet` `code`) | — | picks the file icon; unrecognized/absent falls back to a generic document icon |
| `href` | string | — | download URL (renders the download button as a real link) |
| `is-hidden` | boolean | — | hide |
