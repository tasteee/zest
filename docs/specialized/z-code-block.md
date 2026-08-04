# z-code-block

A monospace code surface with an optional header (language tag + filename) and a
copy-to-clipboard button. Pass the source via the `code` **property** (preserves
whitespace). Syntax highlighting is built in (lowlight / highlight.js, themed
against the zest `--syntax-*` palette) and renders synchronously in the shadow
root.

```html
<z-code-block language="ts" filename="index.ts" has-line-numbers></z-code-block>
```

```js
const block = document.querySelector('z-code-block')
block.code = `export const sum = (a, b) => a + b`
block.addEventListener('copy', () => {})
```

## Annotation

Four attributes mark lines. Ranges are written the way a person writes them —
`3-5,8` — because the alternative is an array property, and the pages that
most want to annotate a snippet are markdown pages with no script.

```html
<z-code-block
  language="ts"
  highlight-lines="3-5"
  focus-lines="2-8"
  code="..."
></z-code-block>
```

Any annotation switches the block to per-line rows whether or not
`has-line-numbers` is set — there is nowhere else to hang a mark. With
`added-lines` or `removed-lines` present the gutter carries `+`/`-` instead of
the line number, because a reader following a change wants the sign more than
the position.

`focus-lines` dims everything else rather than hiding it, so the surrounding
code still gives the excerpt somewhere to sit. Hovering the block restores it.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | string | — | the source (set as a property to preserve whitespace) |
| `language` | string | auto | highlight.js language id (also shown in the header) |
| `filename` | string | — | filename shown in the header |
| `has-line-numbers` | boolean | — | render a line-number gutter |
| `highlight-lines` | range list | — | emphasise these lines, e.g. `3-5,8` |
| `added-lines` | range list | — | mark as added; gutter shows `+` |
| `removed-lines` | range list | — | mark as removed; gutter shows `-` |
| `focus-lines` | range list | — | dim every line outside this range |
| `has-copy` | boolean | — | hide the copy button |
| `accent` | `sub` | `dom` (purple) | header language-tag accent |
| `is-hidden` | boolean | — | hide |

## Events

| Event | Description |
| --- | --- |
| `copy` | after the code is copied to the clipboard |
