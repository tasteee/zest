# z-toc

On-page contents with scroll-spy. Say what is in it two ways: hand it a
`headings` **array property** when the page already knows its own outline, or
give it a `for` selector and let it read the headings out of that container.

The `for` mode descends through shadow roots, so it finds headings inside a
`z-markdown` it did not author. Headings without an `id` get one, slugified
from their text, because otherwise there is nothing to scroll to.

```html
<article id="content">…</article>

<z-toc for="#content" min-level="2" max-level="3"></z-toc>
```

```js
// or drive it from an authored outline
const toc = document.querySelector('z-toc')
toc.headings = [
  { id: 'overview', label: 'Overview', level: 2 },
  { id: 'api', label: 'API reference', level: 2 }
]
toc.addEventListener('change', (e) => e.detail) // { id }
```

Clicks are intercepted, unlike `z-nav-tree`. A toc scrolls within the current
page rather than navigating between pages, and on a hash-routed site a bare
`#section` href would replace the route instead of moving down it. The
`change` event still fires so a host can sync the URL itself.

The active heading is the last one to cross the top of the viewport — the
bottom 70% is masked off, so a heading activates on arrival rather than the
moment it appears. The final section on a short page can never reach the top,
so hitting the bottom of the scroll always claims it.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `headings` | `{ id, label, level }[]` | `[]` | **property** — an authored outline; wins over `for` |
| `for` | selector | — | container to read headings from, shadow roots included |
| `min-level` | number | `2` | shallowest heading level collected |
| `max-level` | number | `3` | deepest heading level collected |
| `label` | string | `On this page` | heading above the list, also the nav's accessible name |
| `active-id` | string | — | force the active entry instead of letting scroll-spy pick |
| `is-hidden` | boolean | — | hide |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `change` | `{ id }` | an entry was clicked |

## Notes

Renders nothing at all when it has no headings, so a page with no outline
leaves no empty gutter behind.

Scroll is listened for in the capture phase on `document` rather than on
`window`, because the page may scroll inside a container — `z-docs-shell`
scrolls a `z-chassis` screen, not the document — and scroll events do not
bubble.
