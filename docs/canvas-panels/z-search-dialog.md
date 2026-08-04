# z-search-dialog

Full-text search over a prebuilt index, on the native `<dialog>` foundation —
so focus trapping, Esc, and the backdrop come free.

```js
const dialog = document.querySelector('z-search-dialog')
dialog.index = [
  { id: 'z-input', route: '#/c/forms/z-input', title: 'z-input', group: 'Forms', body: 'A single-line text field…' }
]
dialog.isOpen = true
dialog.addEventListener('select', (e) => e.detail) // { route, id }
```

**Not `z-command` with a filter.** A command palette is a fixed list of actions
the reader picks from. Search is ranked, snippet-bearing, and may be
asynchronous. Overloading one element with both would damage both — the
palette would grow scoring it does not want, and search would inherit a flat
list model that cannot show *why* a result matched.

## Ranking

Deliberately simple and local. A title hit beats a body hit, a whole-word hit
beats a partial, and every query term has to appear somewhere or the entry is
out. That is enough for a few hundred doc pages and needs no index format
beyond what a site already has.

| Hit | Weight |
| --- | --- |
| whole word in the title | 12 |
| partial in the title | 6 |
| whole word in the body | 3 |
| partial in the body | 1 |

Assign `search` — an async function returning the same result shape — and the
local scorer is bypassed entirely.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `index` | `{ id, route, title, group?, body? }[]` | `[]` | **property** — the corpus |
| `search` | `(query) => Promise<result[]>` | — | **property** — replaces local scoring |
| `is-open` | boolean | — | two-way; assigning it opens or closes the dialog |
| `placeholder` | string | `Search the docs` | field placeholder and accessible name |
| `empty-text` | string | `No matches.` | shown when nothing matched |
| `recent-key` | string | — | persists recent queries; omit and none are stored |

## Events

| Event | `detail` | Description |
| --- | --- | --- |
| `select` | `{ route, id }` | a result was chosen |

## Notes

Group headings are emitted when the group *changes* down the ranked list,
rather than the list being re-sorted into sections. Re-sorting would put a
weak result above a strong one purely because of its group.

Snippets are split around the matched terms and marked as real nodes, not
assembled as an HTML string.
