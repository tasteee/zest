# @tasteee/zest

A gorgeous, fully-featured, framework-agnostic web component library. Use it in
plain HTML, React, Vue, Svelte, or anywhere else.

Built with [Atomico](https://atomicojs.dev). The root entry registers the whole
library, while element subpaths let applications load only what they use.

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

Or register one element:

```js
import '@tasteee/zest/z-button' // registers only <z-button>
import '@tasteee/zest/ink.css'
```

- **`@tasteee/zest`** runs the side-effectful registration. Importing it calls
  `customElements.define(...)` for every public element.

- **`@tasteee/zest/<name>`** registers just that named element. Composed
  controls do not implicitly register their related elements, so import each
  tag you render or use the root entry. Each component carries its own
  encapsulated styles inside its shadow DOM.

- **`@tasteee/zest/ink.css`** defines the document-level design tokens (colour,
  spacing, typography) that components read through `var(--token)`. It names
  the font families but does not fetch them.
- **`@tasteee/zest/fonts.css`** (optional) loads every family the themes use
  from Google Fonts in one request. Skip it to self-host — see [Fonts](#fonts).

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

The bundle is ESM, so the script tag needs `type="module"`. It keeps its one
runtime dependency, `@tasteee/wired`, as a bare import (so an app that also
uses wired gets one copy, not two), and wired in turn imports `atomico`
bare. A page with no bundler therefore needs an import map for both; the CDN
route below does this for you.

```html
<link rel="stylesheet" href="/node_modules/@tasteee/zest/dist/ink.css" />
<script type="importmap">
	{
		"imports": {
			"@tasteee/wired": "/node_modules/@tasteee/wired/dist/index.mjs",
			"atomico": "/node_modules/atomico/core.js",
			"atomico/jsx-runtime": "/node_modules/atomico/jsx-runtime.js"
		}
	}
</script>
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
  `does-loop`. Present is true; absent is the default. The default is false
  for every boolean except the ones below, which default to true and take
  `attr="false"` to turn off:

<!-- default-true:start -->

- `z-code-block`: `highlight`, `has-copy`
- `z-dialog`: `has-close`
- `z-pattern-roll`: `has-toolbar`, `has-keyboard`
- `z-piano-roll`: `has-toolbar`, `has-keyboard`
- `z-sheet`: `has-close`
- `z-terminal`: `does-auto-scroll`

<!-- default-true:end -->

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
| `light` | light | Quiet paper. Flat, opaque surfaces; the same typography and geometry as dark. |
| `console` | dark | Black anodized aluminium, milled square corners. |
| `studio` | light | Bead-blasted aluminium synth panel. |

`data-theme` works on any element, not just `<html>`, so a region can carry its
own theme. See [`docs/theming.md`](./docs/theming.md) for the material system
underneath, and [`docs/fundamentals/tokens.md`](./docs/fundamentals/tokens.md) for
the token reference.

## Fonts

The tokens only *name* families — `DM Sans`, `DM Mono`, and for the console
theme `Manrope` and `IBM Plex Mono` — with system fallbacks after them. How
they get onto the page is up to the app:

```js
import '@tasteee/zest/ink.css'
import '@tasteee/zest/fonts.css' // Google Fonts, one request, woff2 fetched only as used
```

Offline, air-gapped, or with a font budget: leave `fonts.css` out and declare
the same names yourself.

```css
@font-face {
	font-family: "DM Sans";
	src: url("/fonts/DMSans[opsz,wght].woff2") format("woff2");
	font-weight: 100 1000;
	font-display: swap;
}
```

Nothing in the library makes a network request on its own.

## TypeScript and editor support

The package ships type declarations (`dist/index.d.ts`) and a
[Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
at `custom-elements.json`, referenced through the `customElements` field in
`package.json`. Editors that read the manifest get tag-name and attribute
autocompletion for every `<z-*>` element.

## Components

<!-- catalog:start -->

**116 elements.** Generated from `custom-elements.json`.

Every element has a reference page under [`docs/`](./docs), and
[`docs/element-api-reference.md`](./docs/element-api-reference.md) lists all
of their attributes in one place.

#### Overlays

`z-alert` `z-alert-dialog` `z-command` `z-context-menu` `z-dialog` `z-drawer` `z-hover-card` `z-popover` `z-sheet` `z-toast` `z-tooltip`

#### Data display

`z-avatar` `z-avatar-stack` `z-badge` `z-callout` `z-empty-state` `z-list` `z-list-row` `z-progress` `z-skeleton` `z-stat` `z-status-dot` `z-suggestion-chips` `z-table` `z-tree`

#### Canvas, panels & docs

`z-editor-canvas` `z-panel`

#### Text editor

`z-bubble-menu` `z-copy-button` `z-drag-handle` `z-format-toolbar` `z-gutter-handle` `z-mention-popover` `z-selection-toolbar` `z-slash-menu` `z-status-bar` `z-table-toolbar`

#### Attachments

`z-attachment-chip` `z-attachment-tray` `z-dropzone` `z-file-attachment`

#### Effects

`z-marquee` `z-pointer-follow`

#### Music

`z-pattern-roll` `z-piano-roll`

#### Specialized

`z-code-block` `z-relative-time` `z-terminal`

#### Uncategorised

`z-button` `z-button-group` `z-canvas-item` `z-chat-ai-dock` `z-chat-message` `z-chat-transcript` `z-checkbox` `z-color-picker` `z-combobox` `z-comment-gutter-icon` `z-comment-mark` `z-comment-thread-panel` `z-draggable` `z-drop-indicator` `z-drop-target` `z-field` `z-filter` `z-input` `z-input-otp` `z-number-input` `z-panel-handle` `z-radio` `z-radio-group` `z-range` `z-range-handle` `z-select` `z-slider` `z-swap` `z-switch` `z-table-axis-handle` `z-textarea` `z-theme-switcher` `z-toggle-button` `z-toggle-button-group` `z-toggle-button-group-item` `z-toolbar` `z-toolbar-group`

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
