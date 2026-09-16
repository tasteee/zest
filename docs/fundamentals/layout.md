# Layout

Container widths, the stacking scale, and the honest state of breakpoints. The thinnest of the token layers, and the page most likely to grow.

## What it solves

A page that is the same width in every app that uses the library, and floating UI that stacks in a known order instead of a bidding war of `z-index: 9999`.

## Primitives

### Container widths

A named scale in `shared/layout-schema.ts`, read by `z-container size`, `z-section container` and `z-center`. Unknown values pass straight through, so `size="60ch"` is legal.

| Name | Width | Typical use |
| --- | --- | --- |
| `xs` | `20rem` (320px) | A single field or a phone-width card. |
| `sm` | `30rem` (480px) | A dialog, a sign-in form. |
| `md` | `48rem` (768px) | Reading measure for an article. |
| `lg` | `64rem` (1024px) | A dashboard's content column. |
| `xl` | `80rem` (1280px) | The default page container. |
| `2xl` | `96rem` (1536px) | A wide app shell. |
| `3xl` | `120rem` (1920px) | Full-bleed grids with their own gutters. |
| `full` / `screen` | `100%` / `100vw` | Opt out. |

The scale is a JS map, not a set of CSS custom properties: a component resolves the name and writes the result to `--z-container-size`. All three elements that read it are held back from the 0.8 public surface, so today a consumer gets the widths by writing them — `z-box max-width="80rem"` — not by naming them.

### Stacking

| Token | Value | Layer |
| --- | --- | --- |
| `--z-toolbar` | `40` | Sticky and floating toolbars: selection, format, table, comment gutter. Lowest so menus can open above them. |
| `--z-menu` | `50` | Menus, slash and mention popovers, bubble menus. |
| `--z-overlay` | `60` | Drag-and-drop chrome — the handle and the drop indicator. Highest so it stays above whatever it is dragged over. |

<z-token-table names="--z-toolbar --z-menu --z-overlay" kind="value"></z-token-table>

Modal surfaces (`z-dialog`, `z-alert-dialog`, `z-sheet`, `z-drawer`) use the top layer via `showModal()` / `popover` and have no `z-index` at all — they are above every stacking context by definition. `z-toast` pins itself at `9999`.

### Breakpoints

There are none. Five components carry a media query, each with its own number: `40rem`, `48rem` (twice), `860px`, `1100px`. Every other component is fluid and lets its container decide.

<z-callout accent="warning" heading="Unfinished: no breakpoint or container-width tokens">
The container widths are a JS map, so a stylesheet cannot read them, and the only elements that resolve the names (<code>z-container</code>, <code>z-section</code>, <code>z-center</code>) are not yet public — the scale exists without a public consumer. The stacking scale covers the editor family only; the older overlays — <code>z-menu</code>, <code>z-select</code>, <code>z-combobox</code>, <code>z-context-menu</code>, <code>z-nav-menu</code>, <code>z-color-picker</code> — hardcode <code>50</code>, which happens to equal <code>--z-menu</code> and should read it. And the five ad-hoc media queries should either share two named breakpoints (<code>40rem</code>, <code>48rem</code> would cover four of the five) or move to container queries.
</z-callout>

## Semantic tokens

| Role | Token | → Primitive | Job |
| --- | --- | --- | --- |
| Page container | `--z-container-size` (instance) | `xl` → `80rem` | The default measure a `z-container` centres to. Held back; use `z-box max-width` for now. |
| Section gutter | `--z-section-gutter` (instance) | `--space-*` name | Side padding that keeps content off the viewport edge. Held back with `z-section`. |
| Overlay width | `--z-overlay-max-width` (instance) | `20rem` | The widest a popover, menu or tooltip surface grows. |
| Dialog width | `--z-dialog-width` (instance) | `30rem`, capped at `100vw − 2rem` | A modal's measure. |
| Toolbar layer | `--z-toolbar` | `40` | See stacking. |
| Menu layer | `--z-menu` | `50` | |
| Drag layer | `--z-overlay` | `60` | |

## In use

A centred `md` measure with a gutter, holding a popover that opens on the menu layer. Every width and layer is a role — the measure is written as a length because the element that would name it is not public yet.

<z-box max-width="48rem" inset="md" style="margin-inline: auto; border: 1px dashed var(--border); border-radius: var(--radius-lg);">
<div style="display: flex; gap: var(--space-sm); align-items: center; justify-content: space-between;">
<z-text color="muted" size="sm">max-width="48rem" · the <code>md</code> measure, centred, inset="md"</z-text>
<z-popover>
<z-button slot="trigger" kind="outline" size="sm">Open popover</z-button>
<z-text size="sm">Floats at <code>z-index: 50</code> — the <code>--z-menu</code> layer — above any toolbar, below drag chrome.</z-text>
</z-popover>
</div>
</z-box>

```css
.page    { max-width: var(--z-container-size, 80rem); margin-inline: auto; padding-inline: var(--space-base); }
.toolbar { position: sticky; z-index: var(--z-toolbar, 40); }
.menu    { position: fixed;  z-index: var(--z-menu, 50); }
.handle  { position: absolute; z-index: var(--z-overlay, 60); }
```

## Rules

- **Do** size a page column to one of the named widths, even while you have to write the length yourself. `48rem`, `64rem`, `80rem` are the shared measures; `900px` is not.
- **Do** read `--z-menu` / `--z-toolbar` / `--z-overlay` for anything positioned. Three layers is enough; if it is not, the answer is the top layer, not `70`.
- **Don't** write a `z-index` above `60` outside `z-toast`. Modal surfaces use the top layer and beat any number anyway.
- **Don't** add a media query to a component without checking the five that exist. Match one of them or use a container query.
- **Don't** make a component depend on the viewport when it could depend on its container. The layout helpers are fluid on purpose.

## Rationale

Container queries and the top layer both shipped after the library's overlay model was designed, and both remove the need for a token where one used to be mandatory: a component that sizes to its container needs no breakpoint, and a modal in the top layer needs no `z-index`. The stacking scale is deliberately three names, because the fourth would be "above everything", and the top layer already is.
