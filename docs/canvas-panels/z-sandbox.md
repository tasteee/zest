# z-sandbox

An example running in its own document.

```html
<z-sandbox
  html="<z-button accent='dom'>Save</z-button>"
  assets="/zest.js /ink.css"
></z-sandbox>
```

**Required whenever an example would otherwise reach outside itself** —
anything that opens a `<dialog>`, registers a global hotkey, writes to
storage, or paints something fixed. On a docs page those escape the example
and land on the page around it: a modal example steals focus from a reader
scrolling past, and two hotkey examples on one page fight each other.

The document is built from `srcdoc` rather than fetched, so there is nothing
to serve and nothing to keep in sync.

## Assets

`assets` says where the library lives, because this element cannot know — a
docs site serves it from one path, a consumer's app from another, a CDN from a
third. Space- or comma-separated; the extension decides whether an entry
becomes a `<link>` or a `<script type="module">`.

## Isolation

The frame runs with `allow-scripts allow-popups allow-forms allow-modals` and
deliberately **without** `allow-same-origin`. That gives it an opaque origin,
so it cannot read this page's storage, cookies, or DOM — which is the entire
reason an example runs in here rather than inline.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `html` | string | — | **property** — the markup to run |
| `assets` | string | — | space- or comma-separated URLs for the library |
| `device` | `desktop` `tablet` `phone` | `desktop` | initial viewport width |
| `theme` | string | the page's | `data-theme` for the frame |
| `height` | CSS length | `20rem` | frame height |
| `title` | string | `Example` | accessible name for the frame |
| `is-bare` | boolean | — | drop the toolbar; for composition into another element |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `open` | `{ url }` | opened in a new tab; `url` is the blob |

## Notes

Device presets are widths, not user-agent lies. Nothing pretends to be a
phone — it makes the viewport phone-sized, which is what a reader checking a
responsive layout actually wants.

"Open ↗" needs a real document, and `srcdoc` has no URL to share, so it builds
a blob. The blob is revoked on a 30-second timer rather than immediately: the
new tab has to fetch it first and there is no event for that.
