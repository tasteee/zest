// The registry of rich, TypeScript-authored component pages.
//
// Conversion is incremental: a page listed here renders the full reference
// layout, and anything not yet listed falls back to its markdown doc. The
// registry is keyed by tag so the router can look one up straight from the
// route slug.

import { zButtonDoc } from './actionables/z-button'
import { zButtonGroupDoc } from './actionables/z-button-group'
import { zThemeSwitcherDoc } from './actionables/z-theme-switcher'
import { zToggleButtonDoc } from './actionables/z-toggle-button'
import { zToggleButtonGroupDoc } from './actionables/z-toggle-button-group'
import { zToggleButtonGroupItemDoc } from './actionables/z-toggle-button-group-item'
import { zToolbarDoc } from './actionables/z-toolbar'
import { zToolbarGroupDoc } from './actionables/z-toolbar-group'
import { zSwapDoc } from './actionables/z-swap'
import { zCheckboxDoc } from './actionables/z-checkbox'
import { zColorPickerDoc } from './actionables/z-color-picker'
import { zComboboxDoc } from './actionables/z-combobox'
import { zFieldDoc } from './actionables/z-field'
import { zFilterDoc } from './actionables/z-filter'
import { zInputDoc } from './actionables/z-input'
import { zInputOtpDoc } from './actionables/z-input-otp'
import { zNumberInputDoc } from './actionables/z-number-input'
import { zRadioDoc } from './actionables/z-radio'
import { zRadioGroupDoc } from './actionables/z-radio-group'
import { zRangeDoc } from './actionables/z-range'
import { zRangeHandleDoc } from './actionables/z-range-handle'
import { zSelectDoc } from './actionables/z-select'
import { zSliderDoc } from './actionables/z-slider'
import { zSwitchDoc } from './actionables/z-switch'
import { zTextareaDoc } from './actionables/z-textarea'

import { zLinkDoc } from './navigation/z-link'

import { zBoxDoc } from './structure/z-box'
import { zCardDoc } from './structure/z-card'
import { zSeparatorDoc } from './structure/z-separator'
import { zBentoGridDoc } from './structure/z-bento-grid'
import { zBentoItemDoc } from './structure/z-bento-item'
import { zChassisDoc } from './structure/z-chassis'
import { wiredColumnDoc } from './structure/wired-column'
import { wiredGridDoc } from './structure/wired-grid'
import { wiredRowDoc } from './structure/wired-row'
import { zScrollDoc } from './structure/z-scroll'
import { zSpacerDoc } from './structure/z-spacer'
import { zSurfaceDoc } from './structure/z-surface'

import { zDisplayDoc } from './typography/z-display'
import { zEyebrowDoc } from './typography/z-eyebrow'
import { zHeadingDoc } from './typography/z-heading'
import { zInlineDoc } from './typography/z-inline'
import { zKbdDoc } from './typography/z-kbd'
import { zLabelDoc } from './typography/z-label'
import { zSubheadingDoc } from './typography/z-subheading'
import { zTextDoc } from './typography/z-text'

import { zAlertDoc } from './overlays/z-alert'
import { zAlertDialogDoc } from './overlays/z-alert-dialog'
import { zCommandDoc } from './overlays/z-command'
import { zDialogDoc } from './overlays/z-dialog'
import { zDrawerDoc } from './overlays/z-drawer'
import { zHoverCardDoc } from './overlays/z-hover-card'
import { zPopoverDoc } from './overlays/z-popover'
import { zSheetDoc } from './overlays/z-sheet'
import { zToastDoc } from './overlays/z-toast'
import { zTooltipDoc } from './overlays/z-tooltip'

import { zCalloutDoc } from './data-display/z-callout'

import { zTerminalDoc } from './specialized/z-terminal'

import type { ComponentDocT } from './types'

const ALL_COMPONENT_DOCS: ComponentDocT[] = [
	zButtonDoc,
	zButtonGroupDoc,
	zLinkDoc,
	zThemeSwitcherDoc,
	zToggleButtonDoc,
	zToggleButtonGroupDoc,
	zToggleButtonGroupItemDoc,
	zToolbarDoc,
	zToolbarGroupDoc,

	zBoxDoc,
	zCardDoc,
	zDisplayDoc,
	zEyebrowDoc,
	zHeadingDoc,
	zInlineDoc,
	zKbdDoc,
	zLabelDoc,
	zSeparatorDoc,
	zSubheadingDoc,
	zTextDoc,

	zBentoGridDoc,
	zBentoItemDoc,
	zChassisDoc,
	wiredColumnDoc,
	wiredGridDoc,
	wiredRowDoc,
	zScrollDoc,
	zSpacerDoc,
	zSurfaceDoc,
	zSwapDoc,

	zCheckboxDoc,
	zColorPickerDoc,
	zComboboxDoc,
	zFieldDoc,
	zFilterDoc,
	zInputDoc,
	zInputOtpDoc,
	zNumberInputDoc,
	zRadioDoc,
	zRadioGroupDoc,
	zRangeDoc,
	zRangeHandleDoc,
	zSelectDoc,
	zSliderDoc,
	zSwitchDoc,
	zTextareaDoc,

	zAlertDoc,
	zAlertDialogDoc,
	zCalloutDoc,
	zCommandDoc,
	zDialogDoc,
	zDrawerDoc,
	zHoverCardDoc,
	zPopoverDoc,
	zSheetDoc,
	zToastDoc,
	zTooltipDoc,

	zTerminalDoc
]

const buildDocsByTag = (): Map<string, ComponentDocT> => {
	const docsByTag = new Map<string, ComponentDocT>()
	for (const componentDoc of ALL_COMPONENT_DOCS) {
		docsByTag.set(componentDoc.tag, componentDoc)
	}
	return docsByTag
}

const COMPONENT_DOCS_BY_TAG = buildDocsByTag()

export const getComponentDoc = (tag: string): ComponentDocT | null => {
	return COMPONENT_DOCS_BY_TAG.get(tag) ?? null
}

export const hasComponentDoc = (tag: string): boolean => {
	return COMPONENT_DOCS_BY_TAG.has(tag)
}

export const getAllComponentDocTags = (): string[] => {
	return [...COMPONENT_DOCS_BY_TAG.keys()]
}
