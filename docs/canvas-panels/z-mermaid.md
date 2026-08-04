# z-mermaid

A diagram rendered from a fenced mermaid source.

```html
<z-mermaid code="graph LR; Parse-->Highlight; Highlight-->Render"></z-mermaid>
```

**The renderer is loaded lazily, from a CDN, on first use.** That is the whole
design constraint. zest ships with zero runtime dependencies, and mermaid is
roughly the size of the rest of the library put together — bundling it to
serve the handful of pages with a diagram would be the worst trade in the
package.

So the import is dynamic, the URL is overridable, and a page with no diagram
pays nothing. The module promise is cached per URL, so ten diagrams on one
page fetch once.

## Self-hosting

Point `src` at your own copy when a CSP forbids the CDN, or when you would
rather not depend on one.

```html
<z-mermaid src="/vendor/mermaid.esm.min.mjs" code="graph TD; A-->B"></z-mermaid>
```

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | string | — | **property** — the mermaid source |
| `src` | url | the cdnjs ESM build | where to load the renderer from |
| `theme` | string | derived | re-renders when it changes; the mermaid theme follows `data-theme` |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `render` | `{ id }` | a diagram finished rendering |

## Notes

The SVG mermaid returns is a string. It is parsed with `DOMParser` and adopted
as a node rather than assigned through `innerHTML` — the same rule the syntax
highlighter follows, and worth keeping for markup this element did not author.

A render that resolves after the source changed is discarded, so a slow
diagram cannot overwrite the one that replaced it.

Failures render in place with the renderer's message rather than leaving an
empty frame. A mermaid syntax error is an authoring mistake, and silence is
the least useful way to report one.
