import { defineInteractiveExample, defineMarkupExample, queryAllPreview, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundRangeHandle = (): HTMLElement => {
	const handle = document.createElement('z-range-handle')
	handle.setAttribute('value', '40')
	handle.setAttribute('accent', 'dom')
	return handle
}

export const zRangeHandleDoc: ComponentDocT = {
	tag: 'z-range-handle',
	title: 'z-range-handle',
	tagline: 'A declaration, not a control — one end of a z-range.',
	status: ComponentStatus.stable,

	description:
		'This element renders nothing. It exists so a range can be described in markup rather than configured through a property: put two of them inside a `z-range` and the parent reads their `value`, `min`, `max`, `step`, and `accent` to paint one unified track. The first child is the lower end, the second is the upper. The parent mirrors each live value back onto its handle, so reading `handleElement.value` afterwards always tells the truth.',

	playground: {
		buildElement: buildPlaygroundRangeHandle,
		controlNames: ['value', 'min', 'max', 'step', 'accent'],
		slotLabel: 'renders nothing on its own'
	},

	usageGuidance: [
		'Only ever use it inside a `z-range`, and always in pairs. On its own it draws nothing, because drawing is the parent’s job.',
		'Order is the API. First child is the lower bound, second is the upper. There is no attribute that says which side a handle is on.',
		'Omit `min` and `max` to inherit the parent’s domain. Set them to constrain one end — "the ceiling can never go above 80" — and the parent paints that unreachable stretch as an off-limits cap.',
		'Handle bounds are clamped to the domain, so a handle `max` past the parent’s `max` is silently treated as the domain edge rather than breaking the geometry.',
		'Give each handle its own `accent` when the two ends mean different things. Matching accents read as one span; differing accents read as two related-but-distinct values.',
		'Set `label` on both handles when the span is about something specific. It becomes the accessible name of that end’s input, replacing the generic positional default.',
		'Read the live values from the parent’s `input`/`change` events rather than polling the handles. The events carry both ends together, which is almost always what you need.'
	],

	anatomy: [
		{ name: 'value', description: 'This end’s current position. Written back by the parent as the handle moves.' },
		{ name: 'min / max', description: 'Optional travel limits inside the parent domain. Inherited when omitted.' },
		{ name: 'step', description: 'Optional per-handle increment. Falls back to the parent’s step.' },
		{ name: 'accent', description: 'The accent this end’s thumb is painted in.' },
		{ name: 'label', description: 'The accessible name the parent gives this end’s input.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'The minimum',
			description: 'Two handles with nothing but a value. Everything else is inherited from the parent domain.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range min="0" max="100" show-value style="width: 100%">
				  <z-range-handle value="30"></z-range-handle>
				  <z-range-handle value="70"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'bounds',
			title: 'Constrained travel',
			description:
				'The lower handle cannot fall below 25; the upper cannot rise above 85. The shaded ends are the stretches neither handle can ever occupy.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Threshold band" min="0" max="100" show-value value-suffix="%" style="width: 100%">
				  <z-range-handle value="40" min="25" accent="dom"></z-range-handle>
				  <z-range-handle value="70" max="85" accent="dom"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Tones',
			description: 'Each handle paints its own thumb. Differing accents are worth it when the two ends carry different meaning.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Soft and hard limit" min="0" max="100" show-value style="width: 100%">
				  <z-range-handle value="45" accent="dom"></z-range-handle>
				  <z-range-handle value="80" accent="sub"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'labels',
			title: 'Naming each end',
			description:
				'`label` becomes the accessible name of that end’s input. Tab into the track and each handle announces what it actually controls instead of "Lower value".',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Price range" min="0" max="500" step="10" show-value value-prefix="$" style="width: 100%">
				  <z-range-handle value="120" label="Minimum price" accent="dom"></z-range-handle>
				  <z-range-handle value="380" label="Maximum price" accent="dom"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'step-override',
			title: 'Per-handle step',
			description:
				'The upper handle steps in fives while the lower moves freely. Useful when one end is a rough ceiling and the other needs precision.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Mixed precision" min="0" max="100" show-value style="width: 100%">
				  <z-range-handle value="22" accent="dom"></z-range-handle>
				  <z-range-handle value="75" step="5" accent="dom"></z-range-handle>
				</z-range>
			`
		}),

		defineInteractiveExample({
			id: 'reading-values',
			title: 'Reading a handle',
			description:
				'The parent writes each live value back onto its handle, so the elements stay truthful. Prefer the parent’s event detail, but this is the fallback when you only have the handle in hand.',
			layout: ExampleLayout.stack,
			markup: `
				<z-range id="readbackRange" label="Span" min="0" max="100" show-value style="width: 100%">
				  <z-range-handle class="readbackHandle" value="20" accent="dom"></z-range-handle>
				  <z-range-handle class="readbackHandle" value="60" accent="dom"></z-range-handle>
				</z-range>
				<z-text size="sm" color="muted" id="readbackStatus">handles: 20, 60</z-text>
			`,
			script: `
				const readbackRange = document.querySelector('#readbackRange')
				const handles = document.querySelectorAll('.readbackHandle')

				readbackRange.addEventListener('input', () => {
				  // the parent mirrors live values back onto each handle
				  logHandles(handles[0].value, handles[1].value)
				})
			`,
			wire: (root) => {
				type RangeHandleElementT = HTMLElement & { value: number }

				const readbackRange = queryPreview<HTMLElement>(root, '#readbackRange')
				const readbackStatus = queryPreview<HTMLElement>(root, '#readbackStatus')
				const handles = queryAllPreview<RangeHandleElementT>(root, '.readbackHandle')

				readbackRange.addEventListener('input', () => {
					const handleValues = handles.map((handle) => handle.value)
					readbackStatus.textContent = `handles: ${handleValues.join(', ')}`
				})
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'number', defaultValue: 'the domain min', description: 'This end’s position. Reflects, and is kept current by the parent as the handle moves.' },
		{ name: 'min', type: 'number', defaultValue: 'the parent min', description: 'Lowest position this handle may reach. Clamped to the parent domain.' },
		{ name: 'max', type: 'number', defaultValue: 'the parent max', description: 'Highest position this handle may reach. Clamped to the parent domain.' },
		{ name: 'step', type: 'number', defaultValue: 'the parent step', description: 'Increment for this handle only.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent for this handle’s thumb.' },
		{
			name: 'label',
			type: 'string',
			defaultValue: 'Lower value / Upper value',
			description: 'Accessible name for this end. Falls back to the positional default when omitted.'
		}
	],

	properties: [],

	slots: [],

	events: [],

	cssVariables: [],

	accessibilityNotes: [
		'The handle has no interactive surface of its own — the real input[type=range] lives in the parent’s shadow root and takes its accessible name from this element’s `label`, defaulting to "Lower value" or "Upper value" by position.',
		'Set `label` when the two ends mean something specific — "Minimum price" and "Maximum price" beats "Lower value" and "Upper value" for anyone navigating by control name.',
		'Because it renders nothing, it is invisible to assistive technology, which is correct: the announced control is the range as a whole.',
		'Per-handle min and max are enforced on the value rather than merely painted, so keyboard travel stops at exactly the same place a drag does.',
		'The parent mirrors live values back onto the handles, so anything reading the DOM — a test, a form serialiser, a devtools inspection — sees the current state.'
	],

	related: [
		{ tag: 'z-range', route: '/c/forms/z-range', description: 'The parent that reads these and paints the track.' },
		{ tag: 'z-slider', route: '/c/forms/z-slider', description: 'A single value, with no handles to declare.' }
	]
}
