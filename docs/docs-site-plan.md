# Docs-site element plan

Expands ROADMAP §5. The goal: a docs site — including *this* repo's site —
should be buildable end to end out of `z-*` elements, with zero bespoke
site-level layout CSS.

## Status

| Element | State | Notes |
|---|---|---|
| `z-example` | done | `site/src/render/example-card.ts` is now a 33-line adapter; 92 lines cut from `site.css`. Prop is `heading`, not `title` — `title` is a global attribute and would hang a tooltip off the card. |
| `z-copy-button` | done | `z-code-block` now composes it rather than carrying its own. |
| `z-clipboard` | done, as `shared/clipboard.ts` | Built as a module, not an element: copying is a function with nothing to render. |

Everything else below is unstarted.

Ordering note: the sequencing rationale at the foot of this file says to ship
Wave 2 before authoring more content, because content would be written
against a changing API. That risk turned out to be smaller than assumed —
`ComponentDocT` in `site/src/component-docs/types.ts` already matches the
proposed element APIs almost exactly (`ExampleT` ≈ `z-example` props,
`PlaygroundControlT` ≈ `ControlT`, `ApiRowT` only gains optional fields). The
work is in the renderers, not the data, so the remaining doc pages can be
authored in parallel with waves 1–2.

The one exception is `z-anatomy`: pinned numbered callouts need region
coordinates and `AnatomyPartT` is only `{ name, description }`. Add the
optional fields before authoring anatomy content, or it needs a second pass.

## The forcing function

`site/src/` currently hand-rolls the pieces that matter most:

| Bespoke site code | Should become |
|---|---|
| `site/src/render/example-card.ts` | `z-example` |
| `site/src/render/playground.ts` + `site/src/playground.ts` | `z-playground` + `z-control-panel` |
| `site/src/render/api-reference.ts` | `z-api-table` |
| `site/src/render/component-page.ts` | `z-docs-shell` + `z-doc-header` + `z-toc` |
| `.navLink` / `.navGroup` / `.navGroupLabel` in `site.css` | `z-nav-tree` |

Promoting these into the library is the whole thesis: the docs site stops
being a special-case app and becomes the largest proof that the library
works. Every fix to `z-example` improves both the docs and every consumer
documenting their own system.

## Already covered — do not rebuild

`z-callout` · `z-code-block` · `z-terminal` · `z-kbd` · `z-tabs` ·
`z-accordion` · `z-collapsible` · `z-breadcrumbs` · `z-command` ·
`z-markdown` (with `heading-anchors`) · `z-table` · `z-badge` · `z-link` ·
`z-empty-state` · `z-skeleton` · `z-tooltip` · `z-popover` · `z-toast` ·
`z-pagination` · `z-tree` · `z-virtual-list` · `z-resizable-panels` ·
`z-scroll-area` · `z-relative-time` · `z-select` · `z-menu`

Everything below either composes these or fills a real gap.

---

## Wave 1 — the docs frame

Nothing else can be assembled until the page has a shape.

### `z-docs-shell`

Three-column application frame: nav rail, content column, table of
contents. Handles the responsive collapse (toc drops out first, then nav
becomes a drawer), the sticky offsets, and the max content measure — the
things every docs site re-solves badly. Composes `z-chassis`.

```ts
props: {
	navWidth: { type: String, reflect: true },      // '280px'
	tocWidth: { type: String, reflect: true },      // '220px'
	contentWidth: { type: String, reflect: true },  // max measure, '48rem'
	isNavOpen: { type: Boolean, reflect: true },    // mobile drawer state
	hasToc: { type: Boolean, reflect: true },
	isHidden: { type: Boolean, reflect: true }
}
```

Slots: `banner` · `header` · `nav` · `default` · `toc` · `footer`.

### `z-nav-tree`

Route-aware documentation nav. `z-sidebar` is an app rail (icons, badges,
one level of grouping); `z-tree` is a generic hierarchy. Docs nav is
neither: it is recursive, link-first, sorted by author intent rather than
alphabetically, auto-expands the branch containing the active route, and
persists collapse state across navigations.

```ts
type NavNodeT = {
	label: string
	href?: string
	route?: string
	status?: 'stable' | 'beta' | 'experimental' | 'new' | 'deprecated'
	children?: NavNodeT[]
}

props: {
	items: { type: Array },                        // NavNodeT[]
	route: { type: String, reflect: true },        // active route
	storageKey: { type: String, reflect: true },   // collapse persistence
	isFiltered: { type: Boolean, reflect: true },  // inline filter field
	navigate: event<{ route: string; node: NavNodeT }>()
}
```

### `z-toc`

On-page contents with scroll-spy. Sources headings either from a `headings`
array or by observing a container (`for="#content"`), which is what makes it
work with `z-markdown` output it did not author. Highlights the active
heading via `IntersectionObserver` with a sane top-bias so the last section
on a short page still activates.

```ts
props: {
	for: { type: String, reflect: true },          // selector to observe
	headings: { type: Array },                     // { id, label, level }[]
	minLevel: { type: Number, reflect: true },     // 2
	maxLevel: { type: Number, reflect: true },     // 3
	label: { type: String, reflect: true },        // 'On this page'
	activeId: { type: String, reflect: true },
	change: event<{ id: string }>()
}
```

### `z-doc-header`

The page hero: eyebrow (category), title, tagline, status badge, and a meta
row (source link, last updated, version added). Uniform across 150 pages, so
it must be one element rather than a composition each page repeats.

### `z-prev-next`

Footer pager. Two labeled cards, previous and next, that read as a pair.

```ts
props: {
	previous: { type: Object },  // { label, route } | null
	next: { type: Object },
	navigate: event<{ route: string }>()
}
```

---

## Wave 2 — the component-documentation core

This is the wave that retires `site/src/render/*`. It is also the most
differentiated: almost no component library ships its docs primitives.

### `z-example`

A preview surface plus collapsible source with per-language tabs and copy.
The single most-used element on a component docs site.

```ts
type ExampleSnippetT = {
	label: string    // 'HTML' | 'React' | 'JS'
	language: string
	code: string
}

props: {
	title: { type: String, reflect: true },
	description: { type: String, reflect: true },
	snippets: { type: Array },                       // ExampleSnippetT[]
	layout: { type: String, reflect: true },         // center|start|stack|fill
	isSourceOpen: { type: Boolean, reflect: true },
	hasBackgroundGrid: { type: Boolean, reflect: true },
	isResizable: { type: Boolean, reflect: true },   // drag preview width
	copy: event<{ code: string; label: string }>()
}
```

Slot: `default` is the live preview — real DOM, real listeners. Composes
`z-tabs` + `z-code-block` + `z-copy-button`.

### `z-playground` + `z-control-panel`

One controllable instance driven by a declarative control list, with the
generated markup shown live beneath it. `z-control-panel` is the knob rack
(booleans → `z-switch`, enums → `z-select`, numbers → `z-slider`, text →
`z-input`); `z-playground` binds it to a target element and re-serializes
the attributes into a snippet on every change.

```ts
type ControlT = {
	name: string
	kind: 'boolean' | 'enum' | 'number' | 'text'
	options?: string[]
	defaultValue: string
	description?: string
}

// z-control-panel
props: {
	controls: { type: Array },
	values: { type: Object },
	change: event<{ name: string; value: string }>()
}

// z-playground
props: {
	target: { type: String, reflect: true },   // selector, or slot the element
	controls: { type: Array },
	slotLabel: { type: String, reflect: true },
	tagName: { type: String, reflect: true },  // for snippet serialization
	reset: event<void>()
}
```

Keeping serialization inside `z-playground` is the point: the code sample
can never drift from the rendered instance.

### `z-api-table`

Attributes / properties / slots / events / CSS-variable reference. `z-table`
is a general data grid; an API table needs monospace type cells with their
own coloring, wrapped default values, a description column that carries
inline code, deep-linkable rows (`#attr-kind`), and a required marker.

```ts
type ApiRowT = {
	name: string
	type: string
	defaultValue?: string
	description: string
	isRequired?: boolean
	isDeprecated?: boolean
}

props: {
	rows: { type: Array },
	kind: { type: String, reflect: true },  // attributes|properties|slots|events|css
	caption: { type: String, reflect: true },
	isDense: { type: Boolean, reflect: true }
}
```

### `z-type-badge` and `z-api-signature`

`z-type-badge` — a monospace pill for a single type token, colored by
category (primitive / union / literal / function). `z-api-signature` — a
rendered method or function signature with parameters broken out, for the
imperative APIs (`canvas.fit()`, `tree.expandAll()`) that attribute tables
cannot express.

### `z-anatomy`

Numbered callouts pinned over a static preview, mapping visible regions to
part and slot names. It is the fastest way to teach a component with many
slots, and directly serves `ComponentDocT.anatomy`, which today renders as a
plain list.

---

## Wave 3 — content blocks

### `z-steps` (+ `z-step`)

Numbered instructions with a connector rail; each step takes arbitrary
content including code blocks. Supports `is-ordered` vs. checklist mode and
a `current` index for guided flows.

### `z-code-group`

Tabbed sibling code blocks — the npm/pnpm/yarn case, and the
HTML/React/Vue case. Tab choice syncs across every group on the page through
a shared `group` name plus storage, so choosing pnpm once holds everywhere.

```ts
props: {
	group: { type: String, reflect: true },  // sync key, e.g. 'package-manager'
	value: { type: String, reflect: true },
	storageKey: { type: String, reflect: true },
	change: event<{ value: string }>()
}
```

### `z-code-annotation`

Line highlighting, added/removed line marks, focus dimming, and numbered
inline notes. Best delivered as new attributes on `z-code-block`
(`highlight-lines="3-5"`, `added-lines`, `removed-lines`, `focus-lines`)
plus a thin `z-code-annotation` element for the tethered note bubbles —
rather than a second, competing code element.

### `z-diff`

Unified and split diff rendering with syntax highlighting per side. Needed
for migration guides and changelog entries.

### `z-file-tree`

Directory illustration: file-type icons, highlighted rows, annotation
comments per line. Composes `z-tree` in a presentational mode where nodes
are not selectable and guides are always shown.

### `z-token-table` and `z-swatch`

Design-token documentation. `z-swatch` renders one token — color chip or
spacing/radius/type specimen — with its name, resolved value, and
click-to-copy. `z-token-table` groups them into a scannable scale. For a
library whose entire premise is `base.css` tokens, this is table stakes and
currently absent.

### `z-do-dont`

Paired guidance cards with correct/incorrect affordances. This is what makes
docs feel like Figma's or Stripe's rather than a generated API dump, and it
gives `ComponentDocT.usageGuidance` somewhere real to render.

### `z-mermaid`

Diagram rendering from a fenced source. Loads its renderer lazily so the
dependency never enters the main bundle — the zero-runtime-dependency
guarantee has to survive this one.

---

## Wave 4 — discovery and page furniture

### `z-search-dialog`

Full-text search over a prebuilt index: grouped results, snippet
highlighting, recent searches, keyboard-only operation. `z-command` is a
command palette (a fixed action list); search is a different interaction —
async, ranked, snippet-bearing — and overloading `z-command` would damage
both.

```ts
props: {
	isOpen: { type: Boolean, reflect: true },
	index: { type: Array },                     // or a `search` async prop
	placeholder: { type: String, reflect: true },
	recentKey: { type: String, reflect: true },
	select: event<{ route: string; id: string }>()
}
```

### `z-copy-button`

Standalone copy-to-clipboard with state feedback. `z-code-block` already has
one internally; extracting it means prose, tokens, install commands, and
swatches all get the identical affordance.

### `z-theme-toggle`

Light / dark / system tri-state, writing the resolved theme to the document
and persisting the choice. The library is dark-first today, so this is the
element that forces the light-theme token work — which is worth doing on its
own merits.

### Small page furniture

- `z-external-link` — trailing ↗ , `rel` hardening, new-tab semantics.
- `z-last-updated` — composes `z-relative-time` with a commit link.
- `z-edit-on-github` — pencil affordance, builds the edit URL from a repo
  base plus the page path.
- `z-was-this-helpful` — 👍/👎 into a follow-up comment field, emits an
  event and lets the host decide where it goes.
- `z-reading-progress` — a hairline scroll-progress rule pinned under the
  header.
- `z-announcement-bar` — dismissible top banner with persisted dismissal.
- `z-version-picker` / `z-language-switcher` — thin `z-menu` compositions;
  worth their own tags only because the route-rewriting behavior belongs
  inside them, not in every consumer.

---

## Wave 5 — live code

The heaviest lift, deliberately last.

### `z-live-code`

An editable code pane with a rendering preview beside it. Needs a small
editor surface (textarea plus `z-code-block` overlay is enough — a full
editor is out of scope) and debounced evaluation.

### `z-sandbox`

Iframe-isolated preview with a resizable viewport, device presets, a theme
toggle, and an "open in new tab" escape hatch. Required whenever an example
mutates global state, registers hotkeys, or opens a `<dialog>` — which
several existing components do.

---

## Cross-cutting prerequisites

These are not docs-specific but every wave above leans on them, so they
should land alongside Wave 1.

- **`z-hotkeys`** — declarative shortcut registry. ⌘K, `/` to search, and
  the theme toggle all need it, and each solving it locally is how docs
  sites end up with conflicting listeners.
- **`z-lazy`** — render children on intersection. With ~150 example-dense
  pages, the component index page is unaffordable without it.
- **`z-clipboard`** — the copy primitive `z-copy-button` and `z-swatch` sit
  on.
- **`z-scroll-spy`** — start it as internal machinery inside `z-toc`;
  promote it to its own element only if a second consumer appears.

## Sequencing rationale

Wave 1 is a hard prerequisite for everything. Wave 2 pays for itself
immediately by deleting `site/src/render/*` and roughly half of
`site.css` — ship it before writing more of the 146 doc pages, or that
content gets authored against an API that is about to change. Waves 3 and 4
are independently shippable and can be interleaved with content work. Wave 5
should wait until the token and theme story from Wave 4's `z-theme-toggle`
is settled, since a sandbox has to inherit it.

## Deliberately dropped from ROADMAP §5

- **`z-heading-anchor`** — `z-markdown`'s `heading-anchors` attribute
  already does this for prose. TS-authored pages get anchors from
  `z-doc-header` and `z-toc` instead; a standalone element would be a third
  way to do one thing.
- **`z-property-table`** — same element as `z-api-table`, different `kind`.
- **`z-diagram`** — `z-mermaid` plus the existing `z-editor-canvas` covers
  it. A generic diagram element has no coherent API.
- **`z-code-tabs`** — merged into `z-code-group`.

## Counting

35 new elements across waves 1–5, plus 4 cross-cutting primitives and one
set of `z-code-block` attribute additions. That takes the library from 151
to ~190 elements.

Nine of the 35 — `z-example`, `z-playground`, `z-control-panel`,
`z-api-table`, `z-anatomy`, `z-docs-shell`, `z-doc-header`, `z-nav-tree`,
`z-toc` — are promotions of logic that already runs in `site/src/`. They
are the cheapest to build and the highest-leverage, and they are all in
waves 1 and 2 for exactly that reason.
