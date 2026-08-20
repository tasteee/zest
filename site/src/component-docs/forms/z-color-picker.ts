import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type ColorPickerElementT = HTMLElement & {
	presets: string[]
	value: string
}

const buildPlaygroundColorPicker = (): HTMLElement => {
	const picker = document.createElement('z-color-picker')
	picker.setAttribute('value', '#BF40BF')
	return picker
}

export const zColorPickerDoc: ComponentDocT = {
	tag: 'z-color-picker',
	title: 'z-color-picker',
	tagline: 'A swatch that opens onto three ways of picking the same colour.',
	status: ComponentStatus.stable,

	description:
		'The trigger is a swatch and its hex code. Opening it reveals a bordered panel with the native spectrum picker, a hex field, and a row of preset swatches — three routes to the same value, because "roughly this blue", "#0A84FF exactly", and "the brand colour" are three different tasks. `value` is always a normalised uppercase hex string, so short forms and stray hashes typed into the field come back out canonical.',

	playground: {
		buildElement: buildPlaygroundColorPicker,
		controlNames: ['value', 'label', 'accent', 'disabled'],
		slotLabel: 'swatch trigger'
	},

	usageGuidance: [
		'Give it presets whenever a house palette exists. Most colour choices should be a click on a known swatch, not a trip through the spectrum.',
		'Presets are a property: `element.presets = ["#BF40BF", "#FF1493"]`. Leave it unset to get the zest palette.',
		'The hex field accepts three-digit shorthand and a leading hash, and normalises both. Do not pre-validate what the user types — the component already does.',
		'`change` fires on every adjustment, including each movement of the native spectrum. Debounce before saving if the write is expensive.',
		'If the choice is genuinely between four or five brand colours, a `z-toggle-group` of swatches is more direct than a picker that opens.',
		'Colour alone should never be the only carrier of meaning in whatever the user is colouring. That constraint lives outside this component, but this is where it gets decided.'
	],

	anatomy: [
		{ name: 'trigger', description: 'The closed control — a swatch of the current colour and its uppercase hex.' },
		{ name: 'panel', description: 'A bordered, shadow-free popover holding all three input routes.' },
		{ name: 'spectrum', description: 'The native colour input, for freehand picking.' },
		{ name: 'hex row', description: 'A text field for typing an exact value. Normalises on commit.' },
		{ name: 'presets', description: 'The palette row. The current colour is ringed so you can see when you are on-palette.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Click the swatch to open the panel. The default palette is the zest one.',
			layout: ExampleLayout.start,
			markup: `
				<z-color-picker value="#BF40BF"></z-color-picker>
			`
		}),

		defineInteractiveExample({
			id: 'presets',
			title: 'Custom presets',
			description: 'A brand palette in the panel makes the common choice a single click, and the spectrum an escape hatch rather than the main road.',
			layout: ExampleLayout.start,
			markup: `
				<z-color-picker id="brandPicker" value="#0A84FF"></z-color-picker>
			`,
			script: `
				const brandPicker = document.querySelector('#brandPicker')

				brandPicker.presets = ['#0A84FF', '#30D158', '#FF9F0A', '#FF453A', '#BF5AF2', '#8E8E93']
			`,
			wire: (root) => {
				const brandPicker = queryPreview<ColorPickerElementT>(root, '#brandPicker')
				brandPicker.presets = ['#0A84FF', '#30D158', '#FF9F0A', '#FF453A', '#BF5AF2', '#8E8E93']
			}
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'The accent colours the trigger’s focus treatment — not the swatch, which always shows the actual value.',
			layout: ExampleLayout.start,
			markup: `
				<z-color-picker accent="neutral" value="#A0A0A0"></z-color-picker>
				<z-color-picker accent="dom" value="#BF40BF"></z-color-picker>
				<z-color-picker accent="sub" value="#FF1493"></z-color-picker>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'The swatch and hex stay legible, because a locked colour still needs to be readable.',
			layout: ExampleLayout.start,
			markup: `
				<z-color-picker value="#FF3B30" disabled></z-color-picker>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the colour',
			description:
				'`change` carries the normalised hex. It fires on every adjustment — including each drag of the native spectrum — so debounce before writing anywhere expensive.',
			layout: ExampleLayout.stack,
			markup: `
				<z-color-picker id="accentPicker" value="#BF40BF"></z-color-picker>
				<div id="accentPreview" style="height: 4rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: #BF40BF"></div>
				<z-text size="sm" color="muted" id="accentStatus">#BF40BF</z-text>
			`,
			script: `
				const accentPicker = document.querySelector('#accentPicker')

				accentPicker.addEventListener('change', (changeEvent) => {
				  applyAccent(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const accentPicker = queryPreview<HTMLElement>(root, '#accentPicker')
				const accentPreview = queryPreview<HTMLElement>(root, '#accentPreview')
				const accentStatus = queryPreview<HTMLElement>(root, '#accentStatus')

				accentPicker.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					accentPreview.style.background = detail.value
					accentStatus.textContent = detail.value
				})
			}
		}),

		defineInteractiveExample({
			id: 'in-a-field',
			title: 'Inside a field',
			description: 'A labelled row, which is how a colour usually appears in a settings panel — named on the left, picked on the right.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row x="between" y="center" gap="md" style="width: 100%">
				  <wired-column gap="2xs">
				    <z-text size="sm">Label colour</z-text>
				    <z-text size="xs" color="muted">Used on the board and in every export.</z-text>
				  </wired-column>
				  <z-color-picker id="labelPicker" label="Label colour" value="#30D158"></z-color-picker>
				</wired-row>
			`,
			script: `
				const labelPicker = document.querySelector('#labelPicker')
				labelPicker.presets = boardPalette
			`,
			wire: (root) => {
				const labelPicker = queryPreview<ColorPickerElementT>(root, '#labelPicker')
				labelPicker.presets = ['#FF453A', '#FF9F0A', '#FFD60A', '#30D158', '#0A84FF', '#BF5AF2']
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'string', defaultValue: '#BF40BF', description: 'The chosen colour as an uppercase hex string. Reflects.' },
		{
			name: 'label',
			type: 'string',
			defaultValue: '—',
			description: 'Names what is being coloured. Announced ahead of the hex, so the value is not lost. Set for you inside a z-field.'
		},
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent for the trigger’s focus treatment.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks opening the panel.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the picker from layout.' }
	],

	properties: [
		{
			name: 'presets',
			type: 'string[]',
			defaultValue: 'the zest palette',
			description: 'Hex strings shown as the swatch row. Property only — assign your own palette.'
		}
	],

	slots: [],

	events: [
		{ name: 'change', detail: '{ value: string }', description: 'Fires on every adjustment — spectrum, hex commit, or preset click — with the normalised hex.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The trigger is a button with aria-haspopup="dialog" and aria-expanded; the panel carries role="dialog" and an accessible name of "Choose color".',
		'Set `label`. The trigger’s only text is the hex code, which names the value but not the thing being coloured — with a label it announces as "Label colour, #30D158", keeping both.',
		'Each preset swatch is a button labelled with its hex value, so the palette is navigable and announced without relying on the colour itself.',
		'The hex field is the accessible path to an exact value — the native spectrum is difficult to operate precisely with a keyboard, so never make it the only route.',
		'Escape closes the panel and a click outside dismisses it, matching every other overlay in the system.',
		'A colour swatch is not a label. Whatever the colour is applied to needs a text name too, or the choice is invisible to anyone who cannot distinguish it.'
	],

	related: [
		{ tag: 'z-popover', route: '/c/overlays/z-popover', description: 'The general-purpose version of the panel this opens.' },
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'When the palette is small enough to show without opening anything.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label and help text treatment.' }
	]
}
