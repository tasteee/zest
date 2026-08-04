# z-diff

Unified or split diff rendering, syntax highlighted per side.

```html
<z-diff language="ts" filename="src/z-button.tsx"></z-diff>
```

```js
const diff = document.querySelector('z-diff')
diff.before = 'const size = "small"'
diff.after = 'const size = "sm"'
```

Two ways in, because migration guides and changelogs arrive differently. A
guide author has the two versions and wants the diff computed. A changelog has
a patch already and wants it rendered. `patch` wins when both are set.

```html
<z-diff language="ts" patch="@@ -1 +1 @@
-const size = 'small'
+const size = 'sm'"></z-diff>
```

## How the diff is computed

A plain longest-common-subsequence over lines. That is O(n·m) — wrong for a
repository, completely fine for a snippet, and it keeps the
zero-runtime-dependency guarantee that pulling in a diff library would not.

Each side is highlighted with its own language pass rather than the whole diff
being highlighted at once: a patch is not valid source in any language, so
highlighting it wholesale produces garbage.

## Properties & attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `before` | string | — | **property** — the original text |
| `after` | string | — | **property** — the changed text |
| `patch` | string | — | **property** — a unified patch; wins over before/after |
| `language` | string | — | grammar for the per-line highlight pass |
| `filename` | string | — | shown in the header beside the tally |
| `view` | `unified` `split` | `unified` | one column or two |
| `before-label` | string | `Before` | header for the left pane in split view |
| `after-label` | string | `After` | header for the right pane in split view |
| `is-hidden` | boolean | — | hide |

## Notes

Split view collapses to a single column under 48rem, where the two panes stack
with a rule between them instead of beside each other.

Row tints are painted on the cells rather than the row. A table-row's
background sits behind its cells and is invisible wherever a cell paints its
own, which is the classic way a striped table ends up unstriped.
