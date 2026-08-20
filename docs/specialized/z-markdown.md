# z-markdown

The shared markdown renderer behind chat, blog, and docs surfaces. Parses
markdown (GFM) and renders it into the shadow root, upgrading fenced code to
[z-code-block](z-code-block.md). Themed with the ink tokens so prose looks the
same everywhere.

```html
<z-markdown></z-markdown>
```

```js
const md = document.querySelector('z-markdown')
md.content = '# Hi\n\nSome **bold** text and `code`.'
md.addEventListener('linkclick', (e) => e.detail.href)
```

Set `is-streaming` while tokens are still arriving (chat/AI use). Sanitization
is on by default — it strips dangerous tags/attributes and neutralizes
`javascript:` URLs; `does-allow-html` opts out. This is a minimal, purpose-built
sanitizer, not a full DOMPurify integration.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `is-streaming` | boolean | — | mark content as still-arriving (for streaming/typing styling) |
| `does-allow-html` | boolean | — | skip sanitization of the parsed output |
| `does-highlight` | boolean | `true` | route fenced code through `z-code-block`; `does-highlight="false"` leaves it a plain `<pre><code>` |
| `has-heading-anchors` | boolean | — | give every heading a stable id and a hover-revealed "#" permalink |
| `is-hidden` | boolean | — | hide |

## Properties

- `content` — the raw markdown string to render

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `linkclick` | `{ href }` | a rendered link was clicked |

## Notes

- External links (`http(s)://`) automatically get `target="_blank"` and
  `rel="noopener noreferrer"`.
- Copying a fenced code block dispatches [z-code-block](z-code-block.md)'s own
  `copy` event, which bubbles through z-markdown untouched — there's no
  separate copy event on this component.
