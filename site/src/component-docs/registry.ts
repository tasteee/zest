// The registry of rich, TypeScript-authored component pages.
//
// Conversion is incremental: a page listed here renders the full reference
// layout, and anything not yet listed falls back to its markdown doc. The
// registry is keyed by tag so the router can look one up straight from the
// route slug.

import { zButtonDoc } from './buttons-actions/z-button'
import { zButtonGroupDoc } from './buttons-actions/z-button-group'
import { zDockDoc } from './buttons-actions/z-dock'
import { zDockItemDoc } from './buttons-actions/z-dock-item'
import { zLinkDoc } from './buttons-actions/z-link'
import { zSendButtonDoc } from './buttons-actions/z-send-button'
import { zThemeSwitcherDoc } from './buttons-actions/z-theme-switcher'
import { zToggleDoc } from './buttons-actions/z-toggle'
import { zToggleGroupDoc } from './buttons-actions/z-toggle-group'
import { zToggleGroupItemDoc } from './buttons-actions/z-toggle-group-item'
import { zToolbarDoc } from './buttons-actions/z-toolbar'
import { zToolbarGroupDoc } from './buttons-actions/z-toolbar-group'

import { zBoxDoc } from './foundation/z-box'
import { zCardDoc } from './foundation/z-card'
import { zDisplayDoc } from './foundation/z-display'
import { zEyebrowDoc } from './foundation/z-eyebrow'
import { zHeadingDoc } from './foundation/z-heading'
import { zInlineDoc } from './foundation/z-inline'
import { zKbdDoc } from './foundation/z-kbd'
import { zLabelDoc } from './foundation/z-label'
import { zLineDoc } from './foundation/z-line'
import { zSeparatorDoc } from './foundation/z-separator'
import { zSubheadingDoc } from './foundation/z-subheading'
import { zTextDoc } from './foundation/z-text'

import { zCheckboxDoc } from './forms/z-checkbox'
import { zColorPickerDoc } from './forms/z-color-picker'
import { zComboboxDoc } from './forms/z-combobox'
import { zFieldDoc } from './forms/z-field'
import { zFilterDoc } from './forms/z-filter'
import { zInputDoc } from './forms/z-input'
import { zInputOtpDoc } from './forms/z-input-otp'
import { zNumberInputDoc } from './forms/z-number-input'
import { zRadioDoc } from './forms/z-radio'
import { zRadioGroupDoc } from './forms/z-radio-group'
import { zRangeDoc } from './forms/z-range'
import { zRangeHandleDoc } from './forms/z-range-handle'
import { zSelectDoc } from './forms/z-select'
import { zSliderDoc } from './forms/z-slider'
import { zSwitchDoc } from './forms/z-switch'
import { zTextareaDoc } from './forms/z-textarea'

import { zBentoGridDoc } from './layout/z-bento-grid'
import { zBentoItemDoc } from './layout/z-bento-item'
import { zCenterDoc } from './layout/z-center'
import { zChassisDoc } from './layout/z-chassis'
import { zColumnDoc } from './layout/z-column'
import { zContainerDoc } from './layout/z-container'
import { zGridDoc } from './layout/z-grid'
import { zRowDoc } from './layout/z-row'
import { zScrollDoc } from './layout/z-scroll'
import { zSectionDoc } from './layout/z-section'
import { zSpacerDoc } from './layout/z-spacer'
import { zSurfaceDoc } from './layout/z-surface'
import { zSwapDoc } from './layout/z-swap'

import { zAlertDoc } from './overlays/z-alert'
import { zAlertDialogDoc } from './overlays/z-alert-dialog'
import { zCalloutDoc } from './overlays/z-callout'
import { zCommandDoc } from './overlays/z-command'
import { zDialogDoc } from './overlays/z-dialog'
import { zDrawerDoc } from './overlays/z-drawer'
import { zHoverCardDoc } from './overlays/z-hover-card'
import { zPopoverDoc } from './overlays/z-popover'
import { zSheetDoc } from './overlays/z-sheet'
import { zToastDoc } from './overlays/z-toast'
import { zTooltipDoc } from './overlays/z-tooltip'

import { zTerminalDoc } from './specialized/z-terminal'

import type { ComponentDocT } from './types'

const ALL_COMPONENT_DOCS: ComponentDocT[] = [
	zButtonDoc,
	zButtonGroupDoc,
	zDockDoc,
	zDockItemDoc,
	zLinkDoc,
	zSendButtonDoc,
	zThemeSwitcherDoc,
	zToggleDoc,
	zToggleGroupDoc,
	zToggleGroupItemDoc,
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
	zLineDoc,
	zSeparatorDoc,
	zSubheadingDoc,
	zTextDoc,

	zBentoGridDoc,
	zBentoItemDoc,
	zCenterDoc,
	zChassisDoc,
	zColumnDoc,
	zContainerDoc,
	zGridDoc,
	zRowDoc,
	zScrollDoc,
	zSectionDoc,
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
