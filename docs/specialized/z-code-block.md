# z-code-block

A monospace code surface with an optional header (language tag + filename) and a
copy-to-clipboard button. Pass the source via the `code` **property** (preserves
whitespace). Turn on `highlight` for synchronous lowlight/highlight.js syntax
colouring against the zest `--syntax-*` palette.

```html
<z-code-block language="ts" filename="index.ts" line-numbers highlight></z-code-block>
```

```js
const block = document.querySelector('z-code-block')
block.code = `export const sum = (a, b) => a + b`
block.addEventListener('copy', () => {})
```

## Annotation

Diff and focus annotations use human-readable ranges such as `3-5,8`.

```html
<z-code-block
  language="ts"
  focus-lines="2-8"
  code="..."
></z-code-block>
```

Any annotation switches the block to per-line rows whether or not
`line-numbers` is set — there is nowhere else to hang a mark. With
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
| `line-numbers` | boolean | — | render a line-number gutter |
| `highlight` | boolean | — | apply syntax highlighting |
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
