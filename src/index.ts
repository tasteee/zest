import './ink.css'

// A few implementation modules contain closely related elements. Register
// those through their individual entries so the root import still installs the
// complete public surface without coupling the package subpath imports.
import './elements/z-heading'
import './elements/z-subheading'
import './elements/z-text'
import './elements/z-label'
import './elements/z-inline'
import './elements/z-resizable-panels'
import './elements/z-panel-handle'
import './elements/z-editor-canvas'
import './elements/z-canvas-item'
import './elements/z-draggable'
import './elements/z-drop-target'
import './elements/z-drag-handle'
import './elements/z-drop-indicator'
import './elements/z-table-toolbar'
import './elements/z-table-axis-handle'
import './elements/z-comment-mark'
import './elements/z-comment-gutter-icon'
import './elements/z-comment-thread-panel'

// Foundation
export * from './components/z-box'
export * from './components/z-text'
export * from './components/z-display'
export * from './components/z-eyebrow'
export * from './components/z-card'
export * from './components/z-line'
export * from './components/z-separator'

// Layout primitives. Row, column, and grid are owned by @tasteee/wired;
// re-exporting the package keeps one root import while avoiding duplicate
// implementations and competing layout APIs.
export * from '@tasteee/wired'
export * from './components/z-bento-grid'
export * from './components/z-bento-item'
export * from './components/z-surface'
export * from './components/z-scroll'
export * from './components/z-spacer'
export * from './components/z-resizable-panels'
export * from './components/z-panel'
export * from './components/z-editor-canvas'
export * from './components/z-chassis'
export * from './components/z-drag-drop'
export * from './components/z-sortable'
export * from './components/z-dropzone'
export * from './components/z-tree'

// Buttons & actions
export * from './components/z-button'
export * from './components/z-button-group'
export * from './components/z-toggle'
export * from './components/z-toggle-group'
export * from './components/z-toggle-group-item'
export * from './components/z-toolbar'
export * from './components/z-toolbar-group'
export * from './components/z-swap'
export * from './components/z-link'
export * from './components/z-theme-switcher'
export * from './components/z-copy-button'

// The theme state behind z-theme-switcher, exported so an app can read or set
// the theme from its own chrome without rendering a switcher.
export * from './shared/theme'

// The clipboard primitive behind z-copy-button, exported so an app can copy
// from its own affordances without rendering one.
export * from './shared/clipboard'

// Form controls
export * from './components/z-field'
export * from './components/z-input'
export * from './components/z-number-input'
export * from './components/z-textarea'
export * from './components/z-checkbox'
export * from './components/z-switch'
export * from './components/z-radio'
export * from './components/z-radio-group'
export * from './components/z-slider'
export * from './components/z-range'
export * from './components/z-range-handle'
export * from './components/z-select'
export * from './components/z-combobox'
export * from './components/z-filter'
export * from './components/z-color-picker'
export * from './components/z-input-otp'

// Data display
export * from './components/z-badge'
export * from './components/z-avatar'
export * from './components/z-avatar-stack'
export * from './components/z-progress'
export * from './components/z-skeleton'
export * from './components/z-table'
export * from './components/z-pagination'
export * from './components/z-stat'
export * from './components/z-relative-time'
export * from './components/z-status-dot'
export * from './components/z-kbd'
export * from './components/z-list'
export * from './components/z-list-row'

// Navigation & disclosure
export * from './components/z-breadcrumbs'
export * from './components/z-tabs'
export * from './components/z-collapsible'
export * from './components/z-accordion'
export * from './components/z-menu'
export * from './components/z-nav-menu'
export * from './components/z-sidebar'

// Overlays
export * from './components/z-tooltip'
export * from './components/z-popover'
export * from './components/z-hover-card'
export * from './components/z-dialog'
export * from './components/z-alert-dialog'
export * from './components/z-alert'
export * from './components/z-sheet'
export * from './components/z-drawer'
export * from './components/z-context-menu'
export * from './components/z-toast'
export * from './components/z-command'

// Attachments and prompts
export * from './components/z-file-attachment'
export * from './components/z-attachment-chip'
export * from './components/z-attachment-tray'
export * from './components/z-suggestion-chips'

// Specialized
export * from './components/z-callout'
export * from './components/z-empty-state'
export * from './components/z-scroll-area'
export * from './components/z-code-block'
export * from './components/z-terminal'
export * from './components/z-carousel'
export * from './components/z-marquee'
export * from './components/z-pointer-follow'

// Music / MIDI
export * from './components/z-piano-roll'
export * from './components/z-pattern-roll'
export * from './components/z-knob'

// Text editor
export * from './components/z-selection-toolbar'
export * from './components/z-gutter-handle'
export * from './components/z-slash-menu'
export * from './components/z-mention-popover'
export * from './components/z-format-toolbar'
export * from './components/z-bubble-menu'
export * from './components/z-drag-handle'
export * from './components/z-table-toolbar'
export * from './components/z-comment-thread'
export * from './components/z-status-bar'
