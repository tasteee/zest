# @tasteee/zest

A gorgeous, fully-featured, framework-agnostic web component library. Use it in
plain HTML, React, Vue, Svelte, or anywhere else.

Built with [Atomico](https://atomicojs.dev) and shipped as a single
self-contained bundle with **zero runtime dependencies** — Atomico and the
syntax-highlighting libraries are bundled in at build time.

Four themes, two dark and two light. Depth comes from surface and border rather
than shadow, which is why a grid of cards reads as a flat plane rather than a
pile.

## Install

```sh
npm install @tasteee/zest
```

## Usage

```js
import '@tasteee/zest' // registers every <z-*> element
import '@tasteee/zest/ink.css' // design tokens: CSS custom properties + fonts
```

- **`@tasteee/zest`** runs the side-effectful registration. Importing it calls
  `customElements.define(...)` for every element. There is nothing else to wire
  up — each component carries its own encapsulated styles inside its shadow DOM.

- **`@tasteee/zest/ink.css`** defines the document-level design tokens (colour,
  spacing, typography) that components read through `var(--token)`. It also
  loads DM Sans and DM Mono from Google Fonts.

### React

```jsx
import '@tasteee/zest'
import '@tasteee/zest/ink.css'

export function App() {
	return (
		<z-button accent="dom" onClick={() => console.log('clicked')}>
			Click me
		</z-button>
	)
}
```

### Plain HTML

The bundle is ESM, so the script tag needs `type="module"`.

```html
<link rel="stylesheet" href="/node_modules/@tasteee/zest/dist/ink.css" />
<script type="module" src="/node_modules/@tasteee/zest/dist/zest.js"></script>

<z-button accent="dom">Click me</z-button>
```

### From a CDN, no build step

```html
<link rel="stylesheet" href="https://esm.sh/@tasteee/zest/ink.css" />
<script type="module" src="https://esm.sh/@tasteee/zest"></script>

<z-button accent="dom">Click me</z-button>
```

## The API in one minute

Three axes cover most components, and they compose freely.

```jsx
<z-button
	accent="dom | sub | neutral | success | warning | error"
	kind="solid | outline | ghost | soft | plain"
	size="xs | sm | md | lg | xl"
	is-disabled
/>
```

- **`accent`** picks the colour family. `dom` is the dominant accent, `sub` the
  subordinate one; `error` is reserved for destructive and failed states and
  nothing else. Components whose entire output is text take **`color`** instead,
  because there the value *is* the glyph colour.
- **`kind`** picks the visual treatment.
- **`size`** picks the density.
- **Booleans read as questions** — `is-disabled`, `has-copy`, `can-jump`,
  `does-loop`. Present is true, absent is false.

Attributes are kebab-case in markup and camelCase as JS properties:
`is-full-width` is `el.isFullWidth`. Anything richer than a string — an options
list, a row set — is a **property only**, assigned from JS:

```js
document.querySelector('z-select').options = [{ value: 'a', label: 'Alpha' }]
```

[`docs/element-api-reference.md`](./docs/element-api-reference.md) has every
element as a JSX-shaped signature, generated from source.

## Theming

```html
<html data-theme="studio"></html>
```

| Theme | Scheme | Character |
| --- | --- | --- |
| `dark` | dark | The default. Flat ink — no shadow, no gradient. |
| `light` | light | Haze. Soft lavender paper, no pure white. |
| `console` | dark | Black anodized aluminium, milled square corners. |
| `studio` | light | Bead-blasted aluminium synth panel. |

`data-theme` works on any element, not just `<html>`, so a region can carry its
own theme. See [`docs/theming.md`](./docs/theming.md) for the material system
underneath, and [`docs/foundation/tokens.md`](./docs/foundation/tokens.md) for
the token reference.

## TypeScript and editor support

The package ships type declarations (`dist/index.d.ts`) and a
[Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
at `custom-elements.json`, referenced through the `customElements` field in
`package.json`. Editors that read the manifest get tag-name and attribute
autocompletion for every `<z-*>` element.

## Components

<!-- catalog:start -->

**184 elements.** Generated from `custom-elements.json`.

Every element has a reference page under [`docs/`](./docs), and
[`docs/element-api-reference.md`](./docs/element-api-reference.md) lists all
of their attributes in one place.

#### Foundation

`z-box` `z-card` `z-display` `z-eyebrow` `z-heading` `z-inline` `z-kbd` `z-label` `z-line` `z-separator` `z-subheading` `z-text`

#### Layout

`z-bento-grid` `z-bento-item` `z-center` `z-chassis` `z-column` `z-container` `z-grid` `z-row` `z-scroll` `z-section` `z-spacer` `z-surface` `z-swap`

#### Buttons & actions

`z-button` `z-button-group` `z-dock` `z-dock-item` `z-link` `z-send-button` `z-theme-switcher` `z-toggle` `z-toggle-group` `z-toggle-group-item` `z-toolbar` `z-toolbar-group`

#### Forms

`z-checkbox` `z-color-picker` `z-combobox` `z-field` `z-filter` `z-input` `z-input-otp` `z-number-input` `z-radio` `z-radio-group` `z-range` `z-range-handle` `z-select` `z-slider` `z-switch` `z-textarea`

#### Navigation & disclosure

`z-accordion` `z-breadcrumbs` `z-collapsible` `z-context-menu` `z-menu` `z-nav-menu` `z-sidebar` `z-tabs`

#### Overlays

`z-alert` `z-alert-dialog` `z-callout` `z-command` `z-dialog` `z-drawer` `z-hover-card` `z-popover` `z-sheet` `z-toast` `z-tooltip`

#### Data display

`z-avatar` `z-avatar-stack` `z-badge` `z-list` `z-list-row` `z-pagination` `z-progress` `z-skeleton` `z-sortable` `z-stat` `z-status-dot` `z-table` `z-tree` `z-virtual-list`

#### Canvas, panels & docs

`z-announcement-bar` `z-api-table` `z-canvas-item` `z-code-group` `z-control-panel` `z-diff` `z-do-dont` `z-doc-header` `z-docs-shell` `z-edit-on-github` `z-editor-canvas` `z-example` `z-external-link` `z-file-tree` `z-language-switcher` `z-last-updated` `z-live-code` `z-mermaid` `z-nav-tree` `z-panel` `z-panel-handle` `z-playground` `z-prev-next` `z-reading-progress` `z-resizable-panels` `z-sandbox` `z-search-dialog` `z-step` `z-steps` `z-swatch` `z-toc` `z-token-table` `z-type-badge` `z-version-picker` `z-was-this-helpful`

#### Text editor

`z-bubble-menu` `z-comment-gutter-icon` `z-comment-mark` `z-comment-thread-panel` `z-copy-button` `z-drag-handle` `z-drop-indicator` `z-format-toolbar` `z-gutter-handle` `z-mention-popover` `z-selection-toolbar` `z-slash-menu` `z-status-bar` `z-table-axis-handle` `z-table-toolbar`

#### Chat

`z-chat-header` `z-chat-shell` `z-composer` `z-conversation-item` `z-conversation-list` `z-date-divider` `z-delivery-status` `z-emoji-picker` `z-image-message` `z-message-actions` `z-message-bubble` `z-message-group` `z-message-list` `z-model-picker` `z-quoted-message` `z-reactions` `z-read-receipt` `z-system-message` `z-thinking` `z-tool-call` `z-typing-indicator` `z-unread-divider`

#### Attachments

`z-attachment-chip` `z-attachment-tray` `z-draggable` `z-drop-target` `z-dropzone` `z-file-attachment`

#### Effects

`z-aura` `z-marquee` `z-pointer-follow` `z-progressive-blur`

#### Music

`z-knob` `z-pattern-roll` `z-piano-roll`

#### Specialized

`z-carousel` `z-chart` `z-citation` `z-code-block` `z-empty-state` `z-markdown` `z-post-meta` `z-relative-time` `z-scroll-area` `z-sources` `z-streaming-text` `z-suggestion-chips` `z-terminal`

<!-- catalog:end -->

## Local development

```sh
npm install
npm run dev        # rebuilds dist/ on change
npm run build      # dist/ + custom-elements.json + generated docs
npm run typecheck
npm run docs       # the documentation site
npm run demo       # the demo page
```

`npm run build` runs, in order: the css-template guard, the Vite bundle, the
declaration build, the custom-elements manifest, the API reference, and this
README's catalog. The last three are generated — edit the sources, not the
output.

## Publishing

```sh
npm run build
npm publish
```

`prepublishOnly` runs the build, and `publishConfig.access` is `public`.

## License

MIT — see [LICENSE](./LICENSE).
