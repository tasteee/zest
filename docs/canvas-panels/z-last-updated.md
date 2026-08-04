# z-last-updated

When a page last changed, and optionally what changed it.

```html
<z-last-updated datetime="2026-07-30" commit="a97d175" repo="tasteee/zest"></z-last-updated>
```

Composes `z-relative-time`, so "3 days ago" stays correct as the page sits
open and the formatting matches every other timestamp in the library.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `datetime` | date string | — | when the page last changed; nothing renders without it |
| `label` | string | `Updated` | the word before the time |
| `commit` | string | — | SHA; shown shortened to seven characters |
| `repo` | string | — | `owner/name`, needed to link the commit |
| `is-hidden` | boolean | — | hide |

## Notes

The commit link appears only with both a `commit` and a `repo`. A short SHA
with nowhere to go is noise, not provenance.
