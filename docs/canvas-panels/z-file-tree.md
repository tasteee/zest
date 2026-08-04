# z-file-tree

A directory illustration — file rows, guides, and an annotation column.

```html
<z-file-tree paths="src/
  components/
    z-button.tsx  the element
    z-button.css
  index.ts  registers every tag
"></z-file-tree>
```

**Presentational, not interactive.** `z-tree` renders ARIA `treeitem`s,
handles selection and keyboard navigation, and expects to be operated — all of
which is wrong for a picture of a folder in a README. Nothing here is
selectable, nothing collapses, and the guides always show, because the point
is to be read rather than used.

## The indented-text form

The primary API is a string, for the same reason
[z-token-table](z-token-table.md) takes `names`: the pages that most want a
file tree are markdown pages with no script, and an array property needs one.

| Convention | Meaning |
| --- | --- |
| two spaces or a tab | one level of depth |
| trailing `/` | a directory — every terminal already says it this way |
| a doubled space after the name | starts the annotation column |
| leading `*` | highlights the row the surrounding prose is about |

```
src/
  *components/  everything lives here
    z-button.tsx
```

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `paths` | string | — | the indented-text form above |
| `entries` | `{ name, depth?, note?, isDirectory?, isHighlighted? }[]` | `[]` | **property** — the explicit form; wins over `paths` |
| `is-hidden` | boolean | — | hide |

## Notes

Guides are fixed-width spans rather than borders on nested boxes. The rows are
siblings, not nested elements, so there is nothing for a border to hang on.

The annotation column drops the monospace and the alignment — it is the one
thing here that is prose rather than a path.
