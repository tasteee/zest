import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundNumberInput = (): HTMLElement => {
	const numberInput = document.createElement('z-number-input')
	numberInput.setAttribute('label', 'Seats')
	numberInput.setAttribute('value', '4')
	numberInput.setAttribute('min', '1')
	numberInput.setAttribute('max', '50')
	numberInput.setAttribute('has-stepper-buttons', '')
	return numberInput
}

export const zNumberInputDoc: ComponentDocT = {
	tag: 'z-number-input',
	title: 'z-number-input',
	tagline: 'A number field that corrects itself on the way out, not while you type.',
	status: ComponentStatus.stable,

	description:
		'A typed numeric field with optional ghost steppers. The important behaviour is the timing: while you type, the raw text is left alone — half-typed values like `-` or `1.` are not fought with — and the field only normalises on blur, clamping to `min`/`max` and rounding to the precision `step` implies. `input` fires per keystroke with both the parsed number and the raw text; `change` fires with the settled number. Arrow keys step, and the steppers disable themselves at the bounds.',

	playground: {
		buildElement: buildPlaygroundNumberInput,
		controlNames: ['min', 'max', 'step', 'size', 'accent', 'has-stepper-buttons', 'invalid', 'disabled', 'is-readonly'],
		slotLabel: 'Seats'
	},

	usageGuidance: [
		'Use it when the value is a quantity you do arithmetic on. A year, a PIN, or a phone number is text that happens to be digits — use `z-input` with an `inputmode` for those.',
		'Set `min` and `max` whenever real bounds exist. They are what make the steppers disable at the ends and what the blur correction clamps against.',
		'`step` sets the precision as well as the increment: `step="0.01"` means the field rounds to two decimals on blur, so a pasted 1.005 settles honestly.',
		'Add `has-stepper-buttons` when the values are small and adjustments are frequent — seats, quantity, retries. Leave them off for wide ranges where clicking to 500 is absurd.',
		'For a bounded value with no meaningful precision — a volume, an opacity — a `z-slider` communicates the range better than a field ever will.',
		'The field goes invalid on its own when the typed value is out of range. `invalid` is for errors your server knows about, and it is honoured on top of the internal check.'
	],

	anatomy: [
		{ name: 'field', description: 'The bordered box. Owns focus, invalid, and disabled treatment.' },
		{ name: 'decrease stepper', description: 'Ghost button on the left. Disables itself once the value sits at min.' },
		{ name: 'input', description: 'A text input with inputmode="decimal", so the raw string is yours until blur.' },
		{ name: 'increase stepper', description: 'Ghost button on the right. Disables itself once the value sits at max.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A number and nothing more. Focus selects the whole value, so typing over it replaces rather than appends.',
			layout: ExampleLayout.stack,
			markup: `
				<z-number-input label="Seats" value="4"></z-number-input>
			`
		}),

		defineMarkupExample({
			id: 'steppers',
			title: 'Stepper buttons',
			description:
				'Ghost buttons on both ends. They step by `step` and grey out at the bounds, which is a quieter way of communicating a limit than an error.',
			layout: ExampleLayout.stack,
			markup: `
				<z-number-input label="Seats" value="4" min="1" max="10" has-stepper-buttons></z-number-input>
			`
		}),

		defineMarkupExample({
			id: 'bounds',
			title: 'Bounds and step',
			description:
				'Type 500 into the first field and click away — it settles at 10. `step` on the third field is both the increment and the rounding precision.',
			layout: ExampleLayout.stack,
			markup: `
				<z-number-input label="Clamped 1–10" value="5" min="1" max="10" has-stepper-buttons></z-number-input>
				<z-number-input label="Steps of 5" value="20" min="0" max="100" step="5" has-stepper-buttons></z-number-input>
				<z-number-input label="Two decimals" value="19.99" min="0" step="0.01" has-stepper-buttons></z-number-input>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities on the shared control scale, so a quantity field lines up with the buttons next to it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-number-input size="sm" label="Small" value="1" has-stepper-buttons></z-number-input>
				<z-number-input size="md" label="Medium" value="1" has-stepper-buttons></z-number-input>
				<z-number-input size="lg" label="Large" value="1" has-stepper-buttons></z-number-input>
			`
		}),

		defineMarkupExample({
			id: 'states',
			title: 'States',
			description: 'Invalid, disabled, and readonly. Readonly keeps the value selectable and blocks the steppers.',
			layout: ExampleLayout.stack,
			markup: `
				<z-number-input label="Invalid" value="99" min="0" max="10" invalid></z-number-input>
				<z-number-input label="Disabled" value="4" disabled has-stepper-buttons></z-number-input>
				<z-number-input label="Readonly" value="4" is-readonly has-stepper-buttons></z-number-input>
			`
		}),

		defineInteractiveExample({
			id: 'live-validity',
			title: 'input versus change',
			description:
				'`input` reports the parsed number, the raw text, and whether it is currently in range — all three, because a half-typed value is none of them cleanly. `change` only speaks once the value has settled.',
			layout: ExampleLayout.stack,
			markup: `
				<z-number-input id="thresholdInput" label="Threshold" value="50" min="0" max="100" has-stepper-buttons accent="dom"></z-number-input>
				<z-text size="sm" color="muted" id="thresholdLive">input: 50 (valid)</z-text>
				<z-text size="sm" color="muted" id="thresholdCommitted">change: 50</z-text>
			`,
			script: `
				const thresholdInput = document.querySelector('#thresholdInput')

				thresholdInput.addEventListener('input', (inputEvent) => {
				  previewThreshold(inputEvent.detail.value, inputEvent.detail.isValid)
				})

				thresholdInput.addEventListener('change', (changeEvent) => {
				  saveThreshold(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const thresholdInput = queryPreview<HTMLElement>(root, '#thresholdInput')
				const thresholdLive = queryPreview<HTMLElement>(root, '#thresholdLive')
				const thresholdCommitted = queryPreview<HTMLElement>(root, '#thresholdCommitted')

				thresholdInput.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ value: number | null; rawValue: string; isValid: boolean }>).detail
					const parsedText = detail.value === null ? `“${detail.rawValue}” (not a number)` : String(detail.value)
					const validityText = detail.value === null ? '' : detail.isValid ? ' (in range)' : ' (out of range)'
					thresholdLive.textContent = `input: ${parsedText}${validityText}`
				})

				thresholdInput.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: number }>).detail
					thresholdCommitted.textContent = `change: ${detail.value}`
				})
			}
		}),

		defineInteractiveExample({
			id: 'quantity-row',
			title: 'A quantity row',
			description: 'The everyday use: a small bounded number next to what it counts, with the running total derived from it.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row x="between" y="center" gap="md" style="width: 100%">
				  <wired-column gap="2xs">
				    <z-text size="sm">Team seats</z-text>
				    <z-text size="xs" color="muted">$12 per seat, per month</z-text>
				  </wired-column>
				  <wired-row y="center" gap="md">
				    <z-number-input id="seatsInput" size="sm" label="Seats" value="4" min="1" max="50" has-stepper-buttons inline></z-number-input>
				    <z-text size="sm" id="seatsTotal">$48 / mo</z-text>
				  </wired-row>
				</wired-row>
			`,
			script: `
				const seatsInput = document.querySelector('#seatsInput')

				seatsInput.addEventListener('change', (changeEvent) => {
				  updateTotal(changeEvent.detail.value * 12)
				})
			`,
			wire: (root) => {
				const seatsInput = queryPreview<HTMLElement>(root, '#seatsInput')
				const seatsTotal = queryPreview<HTMLElement>(root, '#seatsTotal')
				const pricePerSeat = 12

				seatsInput.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: number }>).detail
					seatsTotal.textContent = `$${detail.value * pricePerSeat} / mo`
				})
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'number', defaultValue: '—', description: 'The current number. Reflects, and is rewritten on blur once the raw text has been normalised.' },
		{ name: 'min', type: 'number', defaultValue: '—', description: 'Lower bound. Clamped to on blur; disables the decrease stepper at the limit.' },
		{ name: 'max', type: 'number', defaultValue: '—', description: 'Upper bound. Clamped to on blur; disables the increase stepper at the limit.' },
		{ name: 'step', type: 'number', defaultValue: '1', description: 'Stepper increment, and the decimal precision the value rounds to.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name applied to the inner input. Set for you inside a z-field.' },
		{ name: 'name', type: 'string', defaultValue: '—', description: 'Name passed to the inner input.' },
		{ name: 'placeholder', type: 'string', defaultValue: '—', description: 'Shown while the field is empty.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Which accent the border lifts to on focus.' },
		{ name: 'has-stepper-buttons', type: 'boolean', defaultValue: '—', description: 'Shows the ghost decrease and increase buttons.' },
		{ name: 'invalid', type: 'boolean', defaultValue: '—', description: 'Forces the error state. Out-of-range typing also triggers it on its own.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks typing and stepping.' },
		{ name: 'is-readonly', type: 'boolean', defaultValue: '—', description: 'Selectable but not editable; the steppers are inert.' },
		{ name: 'is-required', type: 'boolean', defaultValue: '—', description: 'Marks the inner input required for native form validation.' },
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'Stretches the field to fill its container.' },
		{ name: 'inline', type: 'boolean', defaultValue: '—', description: 'Shrinks the field to its natural width.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the field from layout.' }
	],

	properties: [],

	slots: [],

	events: [
		{
			name: 'input',
			detail: '{ value: number | null, rawValue: string, isValid: boolean }',
			description: 'Fires per keystroke. value is null while the text is not yet a number; rawValue is always what is on screen.'
		},
		{ name: 'change', detail: '{ value: number }', description: 'Fires once the value has settled — on blur, on a stepper click, or on an arrow key.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The inner control is type="text" with inputmode="decimal" rather than type="number" — this keeps the raw string editable mid-typing and avoids the browser’s scroll-wheel-changes-the-value behaviour, while still raising a numeric keypad on touch.',
		'ArrowUp and ArrowDown step the value, matching what a native number input trains users to expect.',
		'Both steppers carry aria-labels ("Increase value" / "Decrease value") and go genuinely disabled at the bounds, so the limit is exposed rather than merely painted.',
		'Out-of-range input sets aria-invalid on the field as you type, so the error is announced without waiting for a submit.',
		'Focus selects the whole value, which makes replacing it a single action for keyboard and switch users rather than a select-all-then-type dance.'
	],

	related: [
		{ tag: 'z-input', route: '/c/forms/z-input', description: 'For digits that are not quantities — years, codes, phone numbers.' },
		{ tag: 'z-slider', route: '/c/forms/z-slider', description: 'When the range matters more than the exact number.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label, help text, and error treatment.' }
	]
}
