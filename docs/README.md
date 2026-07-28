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

Docs are organized into folders by category (`docs/<category>/z-*.md`). A few
docs cover more than one custom element defined in the same source file (e.g.
`z-text.md` also covers `z-heading`/`z-subheading`/`z-label`/`z-inline`;
`z-drag-drop.md` covers both `z-draggable` and `z-drop-target`) — those are
cross-referenced below.

See [questionable-api-choices.md](questionable-api-choices.md) for a running
list of naming/shape inconsistencies and unwired props found while auditing
these docs, flagged for discussion rather than fixed silently.

## Components

### Foundation
- [z-box](foundation/z-box.md) — flexible layout primitive
- [z-text](foundation/z-text.md) — body text, plus [z-heading](foundation/z-heading.md), [z-subheading](foundation/z-subheading.md), [z-label](foundation/z-label.md), [z-inline](foundation/z-inline.md)
- [z-display](foundation/z-display.md) — oversized fluid hero type
- [z-eyebrow](foundation/z-eyebrow.md) — small mono kicker above a title
- [z-kbd](foundation/z-kbd.md) — keyboard key cap
- [z-card](foundation/z-card.md) — bordered content card
- [z-line](foundation/z-line.md) — hairline rule
- [z-separator](foundation/z-separator.md) — labeled divider

### Layout primitives
- [z-box](foundation/z-box.md) — the canonical layout primitive (flex/grid/block)
- [z-row](layout/z-row.md) / [z-column](layout/z-column.md) — thin, direction-locked z-box wrappers
- [z-grid](layout/z-grid.md) — CSS grid
- [z-center](layout/z-center.md) — centering box
- [z-container](layout/z-container.md) — max-width page wrapper
- [z-section](layout/z-section.md) — vertical page band
- [z-surface](layout/z-surface.md) — themed panel
- [z-scroll](layout/z-scroll.md) — themed overflow container
- [z-spacer](layout/z-spacer.md) — flex spacing
- [z-swap](layout/z-swap.md) — crossfade/rotate/flip between two faces
- [z-chassis](layout/z-chassis.md) — device-like app shell (rail + screen)
- [z-bento-grid](layout/z-bento-grid.md) / [z-bento-item](layout/z-bento-item.md) — fixed-row-height marketing grid

### Buttons & actions
- [z-button](buttons-actions/z-button.md) — button
- [z-button-group](buttons-actions/z-button-group.md) — segmented button row
- [z-toggle](buttons-actions/z-toggle.md) — toggle button
- [z-toggle-group](buttons-actions/z-toggle-group.md) — toggle set
- [z-toggle-group-item](buttons-actions/z-toggle-group-item.md) — toggle set item
- [z-link](buttons-actions/z-link.md) — text link
- [z-send-button](buttons-actions/z-send-button.md) — composer send/stop control
- [z-toolbar](buttons-actions/z-toolbar.md) / [z-toolbar-group](buttons-actions/z-toolbar-group.md) — action strip with roving-tabindex semantics
- [z-dock](buttons-actions/z-dock.md) / [z-dock-item](buttons-actions/z-dock-item.md) — macOS-style magnifying dock

### Form controls
- [z-input](forms/z-input.md) — text field
- [z-textarea](forms/z-textarea.md) — multi-line field
- [z-number-input](forms/z-number-input.md) — numeric field with stepper
- [z-checkbox](forms/z-checkbox.md) — checkbox
- [z-switch](forms/z-switch.md) — switch
- [z-radio](forms/z-radio.md) — radio option
- [z-radio-group](forms/z-radio-group.md) — radio set
- [z-slider](forms/z-slider.md) — single-thumb range slider
- [z-range](forms/z-range.md) / [z-range-handle](forms/z-range-handle.md) — dual-thumb range slider
- [z-select](forms/z-select.md) — dropdown select
- [z-combobox](forms/z-combobox.md) — searchable select
- [z-color-picker](forms/z-color-picker.md) — color picker
- [z-input-otp](forms/z-input-otp.md) — one-time-code input
- [z-field](forms/z-field.md) — label/description/error wrapper
- [z-filter](forms/z-filter.md) — pill-based faceting control

### Attachments & files
- [z-dropzone](attachments/z-dropzone.md) — native file drop area with validation
- [z-drag-drop](attachments/z-drag-drop.md) — pointer-based drag/drop engine (`z-draggable` + `z-drop-target`)
- [z-attachment-chip](attachments/z-attachment-chip.md) — staged file in a composer
- [z-attachment-tray](attachments/z-attachment-tray.md) — composer's attachment strip + drop target
- [z-file-attachment](attachments/z-file-attachment.md) — sent file inside a message

> Three different drag paradigms live side by side here and in Data display
> (`z-sortable`) — see [questionable-api-choices.md](questionable-api-choices.md).

### Data display
- [z-badge](data-display/z-badge.md) — pill / tag / chip
- [z-avatar](data-display/z-avatar.md) — identity mark
- [z-avatar-stack](data-display/z-avatar-stack.md) — overlapping avatar cluster
- [z-status-dot](data-display/z-status-dot.md) — presence dot
- [z-progress](data-display/z-progress.md) — progress meter
- [z-skeleton](data-display/z-skeleton.md) — loading placeholder
- [z-table](data-display/z-table.md) — data table
- [z-pagination](data-display/z-pagination.md) — page navigation
- [z-stat](data-display/z-stat.md) — statistic block
- [z-list](data-display/z-list.md) / [z-list-row](data-display/z-list-row.md) — divided row list on a card
- [z-tree](data-display/z-tree.md) — hierarchical disclosure tree
- [z-virtual-list](data-display/z-virtual-list.md) — windowed list rendering
- [z-sortable](data-display/z-sortable.md) — drag-to-reorder children

### Navigation & disclosure
- [z-breadcrumbs](navigation-disclosure/z-breadcrumbs.md) — breadcrumb trail
- [z-tabs](navigation-disclosure/z-tabs.md) — tabs
- [z-collapsible](navigation-disclosure/z-collapsible.md) — disclosure section
- [z-accordion](navigation-disclosure/z-accordion.md) — accordion
- [z-menu](navigation-disclosure/z-menu.md) — dropdown menu
- [z-nav-menu](navigation-disclosure/z-nav-menu.md) — navigation bar
- [z-sidebar](navigation-disclosure/z-sidebar.md) — sidebar nav rail
- [z-context-menu](navigation-disclosure/z-context-menu.md) — right-click menu

### Overlays
- [z-tooltip](overlays/z-tooltip.md) — tooltip
- [z-popover](overlays/z-popover.md) — popover
- [z-hover-card](overlays/z-hover-card.md) — hover card
- [z-dialog](overlays/z-dialog.md) — modal dialog
- [z-alert-dialog](overlays/z-alert-dialog.md) — confirmation dialog
- [z-alert](overlays/z-alert.md) — inline alert banner
- [z-callout](overlays/z-callout.md) — in-flow documentation admonition
- [z-sheet](overlays/z-sheet.md) — edge sheet
- [z-drawer](overlays/z-drawer.md) — bottom drawer
- [z-toast](overlays/z-toast.md) — toast notifications
- [z-command](overlays/z-command.md) — command palette

### Canvas & panels
- [z-editor-canvas](canvas-panels/z-editor-canvas.md) — infinite pannable/zoomable surface (+ `z-canvas-item`)
- [z-resizable-panels](canvas-panels/z-resizable-panels.md) — resizable pane group (+ `z-panel-handle`)
- [z-panel](canvas-panels/z-panel.md) — a pane inside `z-resizable-panels`

### Effects & motion
- [z-aura](effects/z-aura.md) — animated rotating border-light frame
- [z-marquee](effects/z-marquee.md) — infinite auto-scrolling row/column
- [z-pointer-follow](effects/z-pointer-follow.md) — custom cursor that trails the pointer
- [z-progressive-blur](effects/z-progressive-blur.md) — edge-fading blur over content

### Specialized
- [z-empty-state](specialized/z-empty-state.md) — empty placeholder
- [z-scroll-area](specialized/z-scroll-area.md) — styled scroll area
- [z-code-block](specialized/z-code-block.md) — code block
- [z-markdown](specialized/z-markdown.md) — shared markdown renderer
- [z-streaming-text](specialized/z-streaming-text.md) — token-streaming/typewriter text reveal
- [z-post-meta](specialized/z-post-meta.md) — blog byline
- [z-carousel](specialized/z-carousel.md) — carousel
- [z-chart](specialized/z-chart.md) — minimal chart
- [z-terminal](specialized/z-terminal.md) — animated terminal/code demo
- [z-citation](specialized/z-citation.md) — inline AI-answer citation marker
- [z-sources](specialized/z-sources.md) — AI-answer grounding source list
- [z-suggestion-chips](specialized/z-suggestion-chips.md) — tappable prompt suggestions
- [z-relative-time](specialized/z-relative-time.md) — auto-updating relative timestamp

### Chat & messaging
- [z-chat-shell](chat/z-chat-shell.md) — resizable inbox/thread/details app frame
- [z-chat-header](chat/z-chat-header.md) — thread top bar
- [z-conversation-list](chat/z-conversation-list.md) / [z-conversation-item](chat/z-conversation-item.md) — inbox rail
- [z-message-list](chat/z-message-list.md) — pin-to-bottom message scroll surface
- [z-message-group](chat/z-message-group.md) / [z-message-bubble](chat/z-message-bubble.md) — sender-grouped bubbles
- [z-composer](chat/z-composer.md) — message input row
- [z-send-button](buttons-actions/z-send-button.md) — composer send/stop control
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
- [z-thinking](chat/z-thinking.md) — collapsible chain-of-thought block
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
