# Zest component docs

Per-element usage docs for [`@tasteee/zest`](../README.md) — the framework-agnostic
`<z-*>` web component library.

## Getting started

```js
import '@tasteee/zest'          // registers every <z-*> element
import '@tasteee/zest/ink.css'  // design tokens: CSS custom properties + fonts
```

Importing `@tasteee/zest` runs `customElements.define(...)` for every element —
there's nothing else to wire up. Each component carries its own encapsulated
styles inside a shadow root and reads the document-level tokens from `ink.css`
via `var(--token)`.

### A note on attributes vs. properties

These are standard custom elements, so most options are plain HTML **attributes**.
Boolean/camelCase props map to kebab-case attributes (`isHidden` → `is-hidden`,
`openDelay` → `open-delay`).

Options that take **arrays or objects** (e.g. `options`, `items`, `columns`,
`rows`, `data`) can't be expressed as HTML attributes — set them as JS
**properties** on the element instead:

```js
const select = document.querySelector('z-select')
select.options = [{ value: 'a', label: 'Alpha' }]
```

Custom events are dispatched as bubbling, composed `CustomEvent`s. In plain DOM
listen with `el.addEventListener('change', e => e.detail)`; in React use the
`onEventName` convention where supported.

Docs are organized into folders by category (`docs/<category>/z-*.md`), with a
folder one level deeper for a named run inside a category
(`docs/actionables/buttons/z-swap.md`). Grouping is a nav concern only — a
page's route stays `/elements/<category>/<slug>` wherever its file sits. A few
docs cover more than one custom element defined in the same source file (e.g.
`z-text.md` also covers `z-heading`/`z-subheading`/`z-label`/`z-inline`;
`z-drag-drop.md` covers both `z-draggable` and `z-drop-target`) — those are
cross-referenced below.

See [questionable-api-choices.md](questionable-api-choices.md) for a running
list of naming/shape inconsistencies and unwired props found while auditing
these docs, flagged for discussion rather than fixed silently.

## Components

### Typography
- [z-text](typography/z-text.md) — body copy and paragraphs
- [z-heading](typography/z-heading.md) — bold display headings
- [z-subheading](typography/z-subheading.md) — uppercase tracked overlines
- [z-label](typography/z-label.md) — short UI labels
- [z-inline](typography/z-inline.md) — style a fragment without resetting its size
- [z-display](typography/z-display.md) — oversized fluid hero type
- [z-eyebrow](typography/z-eyebrow.md) — small mono kicker above a title
- [z-kbd](typography/z-kbd.md) — keyboard key cap

### Structure
- [z-box](structure/z-box.md) — the canonical layout primitive (flex/grid/block)
- [z-card](structure/z-card.md) — bordered content card
- [z-separator](structure/z-separator.md) — the divider: hairline rule, optionally labeled, optionally vertical
- [wired-row](structure/wired-row.md) / [wired-column](structure/wired-column.md) — thin, direction-locked z-box wrappers
- [wired-grid](structure/wired-grid.md) — CSS grid
- [z-surface](structure/z-surface.md) — themed panel
- [z-scroll](structure/z-scroll.md) — themed overflow container
- [z-scroll-area](structure/z-scroll-area.md) — styled scroll area
- [z-spacer](structure/z-spacer.md) — flex spacing
- [z-chassis](structure/z-chassis.md) — device-like app shell (rail + screen)
- [z-bento-grid](structure/z-bento-grid.md) / [z-bento-item](structure/z-bento-item.md) — fixed-row-height marketing grid

### Actionables

#### Buttons
- [z-button](actionables/buttons/z-button.md) — button
- [z-button-group](actionables/buttons/z-button-group.md) — segmented button row
- [z-toggle-button](actionables/buttons/z-toggle-button.md) — toggle button
- [z-toggle-button-group](actionables/buttons/z-toggle-button-group.md) — toggle set
- [z-toggle-button-group-item](actionables/buttons/z-toggle-button-group-item.md) — toggle set item
- [z-swap](actionables/buttons/z-swap.md) — crossfade/rotate/flip between two faces
- [z-theme-switcher](actionables/buttons/z-theme-switcher.md) — light/dark theme toggle
- [z-toolbar](actionables/buttons/z-toolbar.md) / [z-toolbar-group](actionables/buttons/z-toolbar-group.md) — action strip with roving-tabindex semantics

#### Inputs
- [z-input](actionables/inputs/z-input.md) — text field
- [z-textarea](actionables/inputs/z-textarea.md) — multi-line field
- [z-number-input](actionables/inputs/z-number-input.md) — numeric field with stepper
- [z-checkbox](actionables/inputs/z-checkbox.md) — checkbox
- [z-switch](actionables/inputs/z-switch.md) — switch
- [z-radio](actionables/inputs/z-radio.md) — radio option
- [z-radio-group](actionables/inputs/z-radio-group.md) — radio set
- [z-slider](actionables/inputs/z-slider.md) — single-thumb range slider
- [z-range](actionables/inputs/z-range.md) / [z-range-handle](actionables/inputs/z-range-handle.md) — dual-thumb range slider
- [z-select](actionables/inputs/z-select.md) — dropdown select
- [z-combobox](actionables/inputs/z-combobox.md) — searchable select
- [z-color-picker](actionables/inputs/z-color-picker.md) — color picker
- [z-input-otp](actionables/inputs/z-input-otp.md) — one-time-code input
- [z-field](actionables/inputs/z-field.md) — label/description/error wrapper
- [z-filter](actionables/inputs/z-filter.md) — pill-based faceting control

### Overlays
- [z-tooltip](overlays/z-tooltip.md) — tooltip
- [z-popover](overlays/z-popover.md) — popover
- [z-hover-card](overlays/z-hover-card.md) — hover card
- [z-dialog](overlays/z-dialog.md) — modal dialog
- [z-alert-dialog](overlays/z-alert-dialog.md) — confirmation dialog
- [z-alert](overlays/z-alert.md) — inline alert banner reacting to what the app just did
- [z-sheet](overlays/z-sheet.md) — edge sheet
- [z-drawer](overlays/z-drawer.md) — bottom drawer
- [z-toast](overlays/z-toast.md) — toast notifications
- [z-command](overlays/z-command.md) — command palette
- [z-context-menu](overlays/z-context-menu.md) — right-click menu

### Navigation
- [z-link](navigation/z-link.md) — text link
- [z-breadcrumbs](navigation/z-breadcrumbs.md) — breadcrumb trail
- [z-tabs](navigation/z-tabs.md) — tabs
- [z-menu](navigation/z-menu.md) — dropdown menu
- [z-nav-menu](navigation/z-nav-menu.md) — navigation bar
- [z-sidebar](navigation/z-sidebar.md) — sidebar nav rail
- [z-pagination](navigation/z-pagination.md) — page navigation

### Data display
- [z-badge](data-display/z-badge.md) — pill / tag / chip
- [z-avatar](data-display/z-avatar.md) — identity mark
- [z-avatar-stack](data-display/z-avatar-stack.md) — overlapping avatar cluster
- [z-status-dot](data-display/z-status-dot.md) — presence dot
- [z-progress](data-display/z-progress.md) — progress meter
- [z-skeleton](data-display/z-skeleton.md) — loading placeholder
- [z-table](data-display/z-table.md) — data table
- [z-chart](data-display/z-chart.md) — chart
- [z-stat](data-display/z-stat.md) — statistic block
- [z-list](data-display/z-list.md) / [z-list-row](data-display/z-list-row.md) — divided row list on a card
- [z-tree](data-display/z-tree.md) — hierarchical disclosure tree
- [z-empty-state](data-display/z-empty-state.md) — empty placeholder
- [z-suggestion-chips](data-display/z-suggestion-chips.md) — tappable prompt suggestions
- [z-callout](data-display/z-callout.md) — in-flow documentation admonition, annotating what you're reading

### Interactive
- [z-sortable](interactive/z-sortable.md) — drag-to-reorder children
- [z-drag-drop](interactive/z-drag-drop.md) — pointer-based drag/drop engine (`z-draggable` + `z-drop-target`)
- [z-resizable-panels](interactive/z-resizable-panels.md) — resizable pane group (+ `z-panel-handle`)
- [z-collapsible](interactive/z-collapsible.md) — disclosure section
- [z-accordion](interactive/z-accordion.md) — accordion
- [z-carousel](interactive/z-carousel.md) — carousel
- [z-knob](interactive/z-knob.md) — rotary knob control

> Three different drag paradigms live side by side in Interactive
> (`z-drag-drop`, `z-sortable`) — see [questionable-api-choices.md](questionable-api-choices.md).

### Attachments & files
- [z-dropzone](attachments/z-dropzone.md) — native file drop area with validation
- [z-attachment-chip](attachments/z-attachment-chip.md) — staged file in a composer
- [z-attachment-tray](attachments/z-attachment-tray.md) — composer's attachment strip + drop target
- [z-file-attachment](attachments/z-file-attachment.md) — sent file inside a message

### Canvas & panels
- [z-editor-canvas](canvas-panels/z-editor-canvas.md) — infinite pannable/zoomable surface (+ `z-canvas-item`)
- [z-panel](canvas-panels/z-panel.md) — a pane inside `z-resizable-panels`

### Effects & motion
- [z-aura](effects/z-aura.md) — animated rotating border-light frame
- [z-marquee](effects/z-marquee.md) — infinite auto-scrolling row/column
- [z-pointer-follow](effects/z-pointer-follow.md) — custom cursor that trails the pointer
- [z-progressive-blur](effects/z-progressive-blur.md) — edge-fading blur over content

### Specialized
- [z-code-block](specialized/z-code-block.md) — code block
- [z-terminal](specialized/z-terminal.md) — animated terminal/code demo
- [z-relative-time](specialized/z-relative-time.md) — auto-updating relative timestamp

### Chat & messaging
- [z-chat-shell](chat/z-chat-shell.md) — resizable inbox/thread/details app frame
- [z-chat-header](chat/z-chat-header.md) — thread top bar
- [z-conversation-list](chat/z-conversation-list.md) / [z-conversation-item](chat/z-conversation-item.md) — inbox rail
- [z-message-list](chat/z-message-list.md) — pin-to-bottom message scroll surface
- [z-message-group](chat/z-message-group.md) / [z-message-bubble](chat/z-message-bubble.md) — sender-grouped bubbles
- [z-composer](chat/z-composer.md) — message input row
- [z-model-picker](chat/z-model-picker.md) — AI model selector
- [z-emoji-picker](chat/z-emoji-picker.md) — categorized emoji panel
- [z-reactions](chat/z-reactions.md) — emoji-count reaction pills
- [z-message-actions](chat/z-message-actions.md) — hover action bar (reply/forward/react/more)
- [z-quoted-message](chat/z-quoted-message.md) — "replying to…" snippet
- [z-image-message](chat/z-image-message.md) — image/album message content
- [z-delivery-status](chat/z-delivery-status.md) — sent/delivered/read indicator
- [z-read-receipt](chat/z-read-receipt.md) — "seen by" avatar row
- [z-typing-indicator](chat/z-typing-indicator.md) — "…" typing bubble
- [z-date-divider](chat/z-date-divider.md) / [z-unread-divider](chat/z-unread-divider.md) — thread dividers
- [z-system-message](chat/z-system-message.md) — centered muted status line
- [z-tool-call](chat/z-tool-call.md) — agent tool-invocation card

### Music
- [z-piano-roll](music/z-piano-roll.md) — full MIDI note editor
- [z-pattern-roll](music/z-pattern-roll.md) — chord-relative pattern editor

### Text editor
Presentational, editor-agnostic UI for building a rich-text editor — no
ProseMirror/Slate/Lexical dependency, no assumed document model. Floating
elements are singletons (place one instance, drive it via `anchorRect`/
`isOpen`, same shape as `z-toast`); positioning and the shared open/close
choreography (fade + 4px rise over 120ms in, fade-only over 80ms out) come
from `shared/overlay.ts` and `shared/transition.ts`. Stacking uses the
`--z-toolbar` / `--z-menu` / `--z-overlay` tokens.
- [z-selection-toolbar](text-editor/z-selection-toolbar.md) — floating formatting strip over a selection
- [z-gutter-handle](text-editor/z-gutter-handle.md) — teleporting block-hover gutter control
- [z-slash-menu](text-editor/z-slash-menu.md) — "/" command menu
- [z-mention-popover](text-editor/z-mention-popover.md) — "@"/"#" mention & autocomplete popover
- [z-format-toolbar](text-editor/z-format-toolbar.md) — sticky formatting bar with a custom heading picker
- [z-bubble-menu](text-editor/z-bubble-menu.md) — link / image / table-cell contextual menu
- [z-drag-handle](text-editor/z-drag-handle.md) — block-reorder grip + drop indicator
- [z-table-toolbar](text-editor/z-table-toolbar.md) — table toolbar + row/column axis handle (`z-table-axis-handle`)
- [z-comment-thread](text-editor/z-comment-thread.md) — inline comment mark, gutter icon, and thread panel
- [z-status-bar](text-editor/z-status-bar.md) — word/char count, read time, cursor position, save state
