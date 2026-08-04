# z-reading-progress

A hairline rule showing how far down the page you are.

```html
<z-reading-progress for="#content"></z-reading-progress>
```

Sticky by default, so it pins under whatever header it is placed below.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `for` | selector | the scrolling element | which container to measure |
| `is-hidden` | boolean | — | hide |

## CSS custom properties

| Name | Default | Description |
| --- | --- | --- |
| `--reading-progress-height` | `2px` | thickness of the rule |

## Notes

Scroll is captured on `document` rather than bound to `window`, for the same
reason [z-toc](z-toc.md) does it: the page may scroll inside a container —
`z-docs-shell` scrolls a `z-chassis` screen, not the document — and scroll
events do not bubble.

The bar is `aria-hidden` and carries no role. A progress bar announces a task
the user is waiting on; this measures a position they already know from the
act of scrolling, so announcing it is noise.
