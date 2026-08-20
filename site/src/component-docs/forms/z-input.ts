import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundInput = (): HTMLElement => {
	const input = document.createElement('z-input')
	input.setAttribute('placeholder', 'you@example.com')
	input.setAttribute('label', 'Email')
	return input
}

export const zInputDoc: ComponentDocT = {
	tag: 'z-input',
	title: 'z-input',
	tagline: 'The single-line text field every other form control is measured against.',
	status: ComponentStatus.stable,

	description:
		'A transparent field with a hairline border that lifts to the accent colour on focus — no fill, no shadow, no inner glow. It wraps a real `<input>`, so `type`, `autocomplete`, and `inputmode` behave exactly as the platform defines them. `value` reflects and is two-way: set it to seed the field, read it to get what the user typed. `input` fires on every keystroke, `change` fires once on blur. Pair it with `z-field` whenever the field needs a visible label, help text, or an error.',

	playground: {
		buildElement: buildPlaygroundInput,
		controlNames: ['placeholder', 'size', 'accent', 'invalid', 'disabled', 'is-readonly', 'inline'],
		slotLabel: 'Email'
	},

	usageGuidance: [
		'Wrap it in `z-field` for anything a user fills in deliberately. A bare `z-input` is for search boxes and inline edits, where a floating label would be noise.',
		'Listen to `input` when you need live feedback — a character counter, a search-as-you-type. Listen to `change` when the work is expensive, because it only fires once the user has moved on.',
		'`placeholder` is an example, not a label. "you@example.com" is a placeholder; "Email" is a label. Never use one as the other — the placeholder disappears the moment typing starts.',
		'Set `type="email"`, `type="tel"`, or `inputmode` so mobile keyboards come up correct. This costs one attribute and saves the user a keyboard switch on every field.',
		'Use `invalid` only after the user has had a chance to be wrong. Validating on the first keystroke marks an empty field red before it was ever filled in.'
	],

	anatomy: [
		{ name: 'prefix slot', description: 'Leading adornment — a search glyph, a currency mark. Sits inside the border, never pushes the text.' },
		{ name: 'input', description: 'The native control. Owns focus, selection, autofill, and the caret.' },
		{ name: 'suffix slot', description: 'Trailing adornment — a unit, a clear button, a validation tick.' },
		{ name: 'focus ring', description: 'The border shifts to the accent colour; the accent attribute chooses which accent.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A placeholder and nothing else. This is the whole component at rest.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input placeholder="you@example.com" label="Email"></z-input>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities on the same scale as z-button, so a field and its submit button line up without adjustment.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input size="sm" placeholder="Small" label="Small"></z-input>
				<z-input size="md" placeholder="Medium" label="Medium"></z-input>
				<z-input size="lg" placeholder="Large" label="Large"></z-input>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'The accent only shows on focus — it picks which accent the border lifts to. Click into each one to see it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input accent="neutral" placeholder="Neutral focus" label="Neutral"></z-input>
				<z-input accent="dom" placeholder="Primary focus" label="Primary"></z-input>
				<z-input accent="sub" placeholder="Secondary focus" label="Secondary"></z-input>
			`
		}),

		defineMarkupExample({
			id: 'adornments',
			title: 'Prefix and suffix',
			description:
				'Slotted adornments live inside the border and stay out of the text flow. Use them for context that is always true of the field — a search glyph, a fixed unit — not for actions.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input placeholder="Search components" label="Search">
				  <span slot="prefix">${Icons.finder}</span>
				</z-input>
				<z-input placeholder="0.00" label="Amount">
				  <z-text slot="prefix" size="sm" color="muted">$</z-text>
				  <z-text slot="suffix" size="sm" color="muted">USD</z-text>
				</z-input>
			`
		}),

		defineMarkupExample({
			id: 'states',
			title: 'States',
			description:
				'Invalid, disabled, and readonly. Disabled means "not available to you"; readonly means "available, but not yours to change" — a readonly field is still focusable and copyable.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input invalid value="not-an-email" label="Invalid"></z-input>
				<z-input disabled placeholder="Disabled" label="Disabled"></z-input>
				<z-input is-readonly value="acct_8f2Ka91" label="Readonly"></z-input>
			`
		}),

		defineMarkupExample({
			id: 'types',
			title: 'Input types',
			description:
				'`type` passes straight through to the native input, which is what brings up the right mobile keyboard and enables password managers.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" label="Email"></z-input>
				<z-input type="password" autocomplete="current-password" placeholder="••••••••" label="Password"></z-input>
				<z-input type="tel" inputmode="tel" placeholder="+1 555 0100" label="Phone"></z-input>
			`
		}),

		defineInteractiveExample({
			id: 'live-value',
			title: 'input versus change',
			description:
				'`input` fires on every keystroke; `change` fires once, on blur. Type into the field and then click away to watch the second line settle behind the first.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input id="nameInput" placeholder="Type, then click away" label="Display name"></z-input>
				<z-text size="sm" color="muted" id="liveLine">input: —</z-text>
				<z-text size="sm" color="muted" id="committedLine">change: —</z-text>
			`,
			script: `
				const nameInput = document.querySelector('#nameInput')

				nameInput.addEventListener('input', (inputEvent) => {
				  showLivePreview(inputEvent.detail.value)
				})

				nameInput.addEventListener('change', (changeEvent) => {
				  saveDisplayName(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const nameInput = queryPreview<HTMLElement>(root, '#nameInput')
				const liveLine = queryPreview<HTMLElement>(root, '#liveLine')
				const committedLine = queryPreview<HTMLElement>(root, '#committedLine')

				nameInput.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ value: string }>).detail
					liveLine.textContent = `input: ${detail.value || '—'}`
				})

				nameInput.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					committedLine.textContent = `change: ${detail.value || '—'}`
				})
			}
		}),

		defineInteractiveExample({
			id: 'validation',
			title: 'Validating on blur',
			description:
				'The honest pattern: let the user finish, then judge. `change` marks the field, and any later keystroke clears the mark so they are not typing against a red border.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Work email" description="We only use this for billing receipts." id="emailField">
				  <z-input id="emailInput" type="email" placeholder="you@company.com"></z-input>
				</z-field>
			`,
			script: `
				const emailInput = document.querySelector('#emailInput')
				const emailField = document.querySelector('#emailField')

				emailInput.addEventListener('change', (changeEvent) => {
				  const isValidEmail = /.+@.+\\..+/.test(changeEvent.detail.value)
				  emailInput.invalid = !isValidEmail
				  emailField.error = isValidEmail ? '' : 'That does not look like an email address.'
				})
			`,
			wire: (root) => {
				const emailInput = queryPreview<HTMLElement>(root, '#emailInput')
				const emailField = queryPreview<HTMLElement & { error: string }>(root, '#emailField')

				const checkEmail = (value: string): boolean => {
					const isEmpty = value.trim().length === 0
					if (isEmpty) return true
					return /.+@.+\..+/.test(value)
				}

				emailInput.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					const isValidEmail = checkEmail(detail.value)

					if (isValidEmail) emailInput.removeAttribute('invalid')
					if (!isValidEmail) emailInput.setAttribute('invalid', '')
					emailField.error = isValidEmail ? '' : 'That does not look like an email address.'
				})

				emailInput.addEventListener('input', () => {
					emailInput.removeAttribute('invalid')
					emailField.error = ''
				})
			}
		}),

		defineMarkupExample({
			id: 'inline',
			title: 'Inline',
			description: '`inline` stops the field filling its container, for search boxes and toolbar fields that should only be as wide as they need to be.',
			layout: ExampleLayout.start,
			markup: `
				<z-input inline size="sm" placeholder="Filter rows" label="Filter">
				  <span slot="prefix">${Icons.finder}</span>
				</z-input>
			`
		})
	],

	attributes: [
		{ name: 'value', type: 'string', defaultValue: '—', description: 'The field contents. Reflects, so it is both the seed and the live value.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name applied to the inner input. Set for you when the field is inside a z-field.' },
		{ name: 'type', type: 'string', defaultValue: 'text', description: 'Native input type — text, email, password, tel, url, search.' },
		{ name: 'placeholder', type: 'string', defaultValue: '—', description: 'Example text shown while the field is empty. Never a substitute for a label.' },
		{ name: 'name', type: 'string', defaultValue: '—', description: 'Name passed to the inner input for form submission.' },
		{ name: 'autocomplete', type: 'string', defaultValue: '—', description: 'Native autocomplete token, forwarded verbatim.' },
		{ name: 'inputmode', type: 'string', defaultValue: '—', description: 'Which soft keyboard to raise on touch devices.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Which accent the border lifts to on focus.' },
		{ name: 'is-focused', type: 'boolean', defaultValue: '—', description: 'Reflects the focus state, so a parent can style around the field.' },
		{ name: 'invalid', type: 'boolean', defaultValue: '—', description: 'Paints the error border and sets aria-invalid.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks interaction and removes the field from the tab order.' },
		{ name: 'is-readonly', type: 'boolean', defaultValue: '—', description: 'Focusable and selectable, but not editable.' },
		{ name: 'is-required', type: 'boolean', defaultValue: '—', description: 'Marks the inner input required for native form validation.' },
		{ name: 'inline', type: 'boolean', defaultValue: '—', description: 'Shrinks the field to its natural width instead of filling its container.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the field from layout.' }
	],

	properties: [],

	slots: [
		{ name: 'prefix', description: 'Leading adornment inside the border — an icon or a unit.' },
		{ name: 'suffix', description: 'Trailing adornment inside the border.' }
	],

	events: [
		{ name: 'input', detail: '{ value: string }', description: 'Fires on every keystroke with the current contents.' },
		{ name: 'change', detail: '{ value: string }', description: 'Fires once on blur with the committed contents.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The inner element is a native input, so autofill, password managers, spellcheck, and the platform caret all work untouched.',
		'A shadow boundary breaks the usual for/id label association — this is why `label` exists. Set it directly, or let z-field forward its own label for you.',
		'invalid sets aria-invalid on the input. The message itself still needs to be associated with the field, which z-field handles.',
		'A placeholder is not an accessible name. A field with only a placeholder is unlabelled to a screen reader.',
		'The focus border is a colour change, so it also carries a visible outline for users who cannot distinguish the two accents.'
	],

	related: [
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label, help text, and error treatment around any control.' },
		{ tag: 'z-textarea', route: '/c/forms/z-textarea', description: 'The multi-line sibling.' },
		{ tag: 'z-number-input', route: '/c/forms/z-number-input', description: 'When the value is a number with bounds.' },
		{ tag: 'z-combobox', route: '/c/forms/z-combobox', description: 'A field that filters a known list as you type.' }
	]
}
