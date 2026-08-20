import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSlider = (): HTMLElement => {
	const slider = document.createElement('z-slider')
	slider.setAttribute('label', 'Volume')
	slider.setAttribute('value', '60')
	slider.setAttribute('does-show-value', '')
	slider.setAttribute('value-suffix', '%')
	slider.setAttribute('accent', 'dom')
	return slider
}

export const zSliderDoc: ComponentDocT = {
	tag: 'z-slider',
	title: 'z-slider',
	tagline: 'A bounded number you set by feel rather than by typing.',
	status: ComponentStatus.stable,

	description:
		'Built on a native `input[type=range]`, then restyled completely: hairline track, accent-filled progress, solid accent thumb. Building on the native control is what buys full keyboard support, correct touch behaviour, and screen-reader announcement for free. An optional header carries the `label` on the left and — with `does-show-value` — the live number on the right as an accent pill, with `value-prefix` and `value-suffix` for units.',

	playground: {
		buildElement: buildPlaygroundSlider,
		controlNames: ['label', 'min', 'max', 'step', 'accent', 'does-show-value', 'value-prefix', 'value-suffix', 'disabled'],
		slotLabel: 'Volume'
	},

	usageGuidance: [
		'Use a slider when the shape of the range matters more than the exact number — volume, opacity, brightness, a rough budget. When precision matters, use `z-number-input`.',
		'Turn on `does-show-value` unless the effect is immediately visible elsewhere. A slider with no readout asks the user to guess where they landed.',
		'Give the value a unit through `value-prefix` or `value-suffix`. "60" is ambiguous; "60%" and "$60" are not.',
		'Choose `step` to match the decision, not the data. A budget slider stepping by 1 makes the user fight for a round number; stepping by 5 hands it to them.',
		'Keep the range honest. A 0–1000 slider where every useful value is under 50 wastes 95% of the track.',
		'For a lower and upper bound on one track, use `z-range` — two sliders side by side cannot express that they belong to the same span.'
	],

	anatomy: [
		{ name: 'header', description: 'Appears when there is a label or a value to show. Label left, value right.' },
		{ name: 'value pill', description: 'The live number in an accent-tinted pill, with any prefix or suffix.' },
		{ name: 'track', description: 'The hairline rail, with the portion below the value filled in the accent.' },
		{ name: 'thumb', description: 'The solid accent disc. Flat — the grab affordance comes from size and colour, not a shadow.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A bare track. Drag it, or focus it and use the arrow keys.',
			layout: ExampleLayout.fill,
			markup: `
				<z-slider value="40" style="width: 100%"></z-slider>
			`
		}),

		defineMarkupExample({
			id: 'label-and-value',
			title: 'Label and value',
			description: 'The header earns its space: the label says what is being set, the pill says where it currently sits.',
			layout: ExampleLayout.fill,
			markup: `
				<z-slider label="Volume" value="60" does-show-value value-suffix="%" accent="dom" style="width: 100%"></z-slider>
			`
		}),

		defineMarkupExample({
			id: 'units',
			title: 'Units',
			description: 'A prefix or a suffix turns a number into a quantity. Both are plain strings — no formatting rules to learn.',
			layout: ExampleLayout.stack,
			markup: `
				<z-slider label="Budget" min="0" max="500" step="25" value="150" does-show-value value-prefix="$" accent="dom" style="width: 100%"></z-slider>
				<z-slider label="Retention" min="1" max="90" value="30" does-show-value value-suffix=" days" accent="dom" style="width: 100%"></z-slider>
				<z-slider label="Opacity" min="0" max="1" step="0.05" value="0.75" does-show-value accent="dom" style="width: 100%"></z-slider>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'The accent used by the fill, the thumb, and the value pill.',
			layout: ExampleLayout.stack,
			markup: `
				<z-slider label="Neutral" accent="neutral" value="35" does-show-value style="width: 100%"></z-slider>
				<z-slider label="Primary" accent="dom" value="55" does-show-value style="width: 100%"></z-slider>
				<z-slider label="Secondary" accent="sub" value="75" does-show-value style="width: 100%"></z-slider>
			`
		}),

		defineMarkupExample({
			id: 'steps',
			title: 'Step',
			description:
				'The second slider only stops at multiples of 10. Coarse steps make a slider decisive; fine steps make it fiddly. Pick for the decision being made.',
			layout: ExampleLayout.stack,
			markup: `
				<z-slider label="Continuous" value="47" does-show-value accent="dom" style="width: 100%"></z-slider>
				<z-slider label="Steps of 10" step="10" value="50" does-show-value accent="dom" style="width: 100%"></z-slider>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'The value stays legible — a disabled slider still has to report where things stand.',
			layout: ExampleLayout.fill,
			markup: `
				<z-slider label="Disabled" value="65" does-show-value value-suffix="%" disabled style="width: 100%"></z-slider>
			`
		}),

		defineInteractiveExample({
			id: 'input-vs-change',
			title: 'input versus change',
			description:
				'`input` fires continuously through the drag; `change` fires once the user lets go. Preview on input, persist on change — otherwise a single drag writes a hundred times.',
			layout: ExampleLayout.stack,
			markup: `
				<z-slider id="qualitySlider" label="Export quality" min="0" max="100" step="5" value="70" does-show-value value-suffix="%" accent="dom" style="width: 100%"></z-slider>
				<z-text size="sm" color="muted" id="qualityLive">input: 70%</z-text>
				<z-text size="sm" color="muted" id="qualityCommitted">change: 70%</z-text>
			`,
			script: `
				const qualitySlider = document.querySelector('#qualitySlider')

				qualitySlider.addEventListener('input', (inputEvent) => {
				  previewQuality(inputEvent.detail.value)
				})

				qualitySlider.addEventListener('change', (changeEvent) => {
				  saveQuality(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const qualitySlider = queryPreview<HTMLElement>(root, '#qualitySlider')
				const qualityLive = queryPreview<HTMLElement>(root, '#qualityLive')
				const qualityCommitted = queryPreview<HTMLElement>(root, '#qualityCommitted')

				qualitySlider.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ value: number }>).detail
					qualityLive.textContent = `input: ${detail.value}%`
				})

				qualitySlider.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: number }>).detail
					qualityCommitted.textContent = `change: ${detail.value}%`
				})
			}
		}),

		defineInteractiveExample({
			id: 'driving-something',
			title: 'Driving something live',
			description: 'The best argument for a slider: when the result is visible while you drag, the number stops mattering at all.',
			layout: ExampleLayout.stack,
			markup: `
				<z-slider id="radiusSlider" label="Corner radius" min="0" max="48" value="12" does-show-value value-suffix="px" accent="dom" style="width: 100%"></z-slider>
				<div id="radiusPreview" style="height: 5rem; background: var(--color-neutral-3); border: 1px solid var(--border); border-radius: 12px"></div>
			`,
			script: `
				const radiusSlider = document.querySelector('#radiusSlider')
				const radiusPreview = document.querySelector('#radiusPreview')

				radiusSlider.addEventListener('input', (inputEvent) => {
				  radiusPreview.style.borderRadius = inputEvent.detail.value + 'px'
				})
			`,
			wire: (root) => {
				const radiusSlider = queryPreview<HTMLElement>(root, '#radiusSlider')
				const radiusPreview = queryPreview<HTMLElement>(root, '#radiusPreview')

				radiusSlider.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ value: number }>).detail
					radiusPreview.style.borderRadius = `${detail.value}px`
				})
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'number', defaultValue: 'min', description: 'The current value. Reflects, so it is both the seed and the live value.' },
		{ name: 'min', type: 'number', defaultValue: '0', description: 'Lower end of the range.' },
		{ name: 'max', type: 'number', defaultValue: '100', description: 'Upper end of the range.' },
		{ name: 'step', type: 'number', defaultValue: '1', description: 'Increment the thumb snaps to, for both dragging and the arrow keys.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Shown in the header and used as the accessible name.' },
		{ name: 'does-show-value', type: 'boolean', defaultValue: '—', description: 'Renders the live value as a pill on the right of the header.' },
		{ name: 'value-prefix', type: 'string', defaultValue: '—', description: 'Text before the value — a currency mark, usually.' },
		{ name: 'value-suffix', type: 'string', defaultValue: '—', description: 'Text after the value — a unit.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent for the fill, the thumb, and the value pill.' },
		{ name: 'name', type: 'string', defaultValue: '—', description: 'Name passed to the inner range input.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks dragging and keyboard changes.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the slider from layout.' }
	],

	properties: [],

	slots: [],

	events: [
		{ name: 'input', detail: '{ value: number }', description: 'Fires continuously while dragging or holding an arrow key.' },
		{ name: 'change', detail: '{ value: number }', description: 'Fires once the interaction settles — on release or key-up.' }
	],

	cssVariables: [
		{ name: '--fill', defaultValue: 'computed', description: 'The filled percentage, written by the component each render and read by the track. Read-only in practice.' }
	],

	accessibilityNotes: [
		'The control underneath is a native input[type=range], which is why arrow keys, Home, End, Page Up, and Page Down all work without any custom key handling.',
		'`label` becomes the aria-label. A slider with no label announces only a number, which tells a screen-reader user nothing about what they are changing.',
		'The value is announced by the native control as it changes, so does-show-value is a visual convenience rather than an accessibility requirement — but it helps everyone.',
		'Native range inputs get a real focus ring here rather than having it styled away, which matters because a thumb is otherwise hard to locate by keyboard.',
		'Keep the thumb at a comfortable hit size on touch. The default is deliberately larger than the track suggests.'
	],

	related: [
		{ tag: 'z-range', route: '/c/forms/z-range', description: 'Two handles on one track, for a span rather than a point.' },
		{ tag: 'z-number-input', route: '/c/forms/z-number-input', description: 'When the exact number matters.' },
		{ tag: 'z-progress', route: '/c/data-display/z-progress', description: 'For reporting a value rather than collecting one.' }
	]
}
