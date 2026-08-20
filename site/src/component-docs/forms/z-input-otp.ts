import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundInputOtp = (): HTMLElement => {
	const otp = document.createElement('z-input-otp')
	otp.setAttribute('length', '6')
	otp.setAttribute('is-numeric', '')
	return otp
}

export const zInputOtpDoc: ComponentDocT = {
	tag: 'z-input-otp',
	title: 'z-input-otp',
	tagline: 'One cell per character, and a paste that fills all of them.',
	status: ComponentStatus.stable,

	description:
		'A row of single-character cells for verification codes. Typing advances, Backspace retreats — and on an empty cell it clears the one before it, which is what people actually mean by Backspace here. Pasting a whole code fills every cell at once and lands the caret at the end, because nobody wants to paste a code six times. `value` stays positionally faithful to the cells: clearing a middle one leaves a hole rather than sliding the rest back, and `change` emits exactly the string the property holds, so the two can never disagree. `complete` fires the moment every cell is filled, which is usually where you submit.',

	playground: {
		buildElement: buildPlaygroundInputOtp,
		controlNames: ['label', 'length', 'size', 'accent', 'is-numeric', 'invalid', 'disabled'],
		slotLabel: 'six numeric cells'
	},

	usageGuidance: [
		'Use it only for short codes people transcribe — 2FA, email confirmation, a device pairing code. It is a bad password field and a worse general text input.',
		'Submit on `complete`. Making the user press a button after the last digit adds a step to an interaction they are already impatient with.',
		'Do not submit on `change` and do not trim it yourself. A partially filled code can contain a hole, and `complete` is the only signal that the value is a whole code.',
		'Set `is-numeric` for digit-only codes. It raises the numeric keypad and drops non-digits out of a pasted string rather than refusing the paste.',
		'Six is the convention; four reads as a PIN. Going past eight turns transcription into work — if the code is that long, let people paste it into a plain field instead.',
		'On failure, mark it `invalid` and leave the digits in place. Clearing the field forces a re-type of a code the user may no longer have on screen.',
		'Pair it with `autocomplete="one-time-code"` handling in your own flow where the platform supports it — the fastest OTP entry is the one the user never types.'
	],

	anatomy: [
		{ name: 'cells', description: 'The row. Owns the paste handler, so a paste into any cell fills the whole code.' },
		{ name: 'cell', description: 'One character. A hairline box that lifts to the accent when focused or filled.' },
		{ name: 'filled state', description: 'A filled cell reads in the accent colour, so progress through the code is visible at a glance.' },
		{ name: 'holes', description: 'A cleared middle cell stays empty; the characters after it hold their positions rather than sliding back.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Six numeric cells. Type a digit and watch the focus advance; try pasting a full code into any cell.',
			markup: `
				<z-input-otp length="6" is-numeric></z-input-otp>
			`
		}),

		defineMarkupExample({
			id: 'lengths',
			title: 'Lengths',
			description: 'Four reads as a PIN, six as a verification code, eight as a licence key. The length itself sets the expectation.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input-otp length="4" is-numeric></z-input-otp>
				<z-input-otp length="6" is-numeric></z-input-otp>
				<z-input-otp length="8"></z-input-otp>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three cell sizes. Large suits a dedicated verification screen; small suits a code tucked inside a dialog.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input-otp size="sm" length="6" is-numeric></z-input-otp>
				<z-input-otp length="6" is-numeric></z-input-otp>
				<z-input-otp size="lg" length="6" is-numeric></z-input-otp>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'The accent that filled and focused cells read in.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input-otp accent="neutral" length="6" is-numeric value="1234"></z-input-otp>
				<z-input-otp accent="dom" length="6" is-numeric value="1234"></z-input-otp>
				<z-input-otp accent="sub" length="6" is-numeric value="1234"></z-input-otp>
			`
		}),

		defineMarkupExample({
			id: 'states',
			title: 'States',
			description:
				'Invalid keeps the digits visible — the user needs to compare what they typed against what they were sent. Disabled is for while the check is in flight.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input-otp length="6" is-numeric value="123456" invalid></z-input-otp>
				<z-input-otp length="6" is-numeric value="123456" disabled></z-input-otp>
			`
		}),

		defineInteractiveExample({
			id: 'complete',
			title: 'Submitting on complete',
			description:
				'`complete` fires the instant the last cell fills, however it was filled — typed or pasted. That is the moment to verify, with no button in between.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input-otp id="verifyOtp" length="6" is-numeric accent="dom"></z-input-otp>
				<z-text size="sm" color="muted" id="verifyStatus">Enter the 6-digit code we sent you.</z-text>
			`,
			script: `
				const verifyOtp = document.querySelector('#verifyOtp')

				verifyOtp.addEventListener('complete', (completeEvent) => {
				  verifyCode(completeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const verifyOtp = queryPreview<HTMLElement>(root, '#verifyOtp')
				const verifyStatus = queryPreview<HTMLElement>(root, '#verifyStatus')

				verifyOtp.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					const isPartial = detail.value.length < 6
					if (isPartial) verifyStatus.textContent = `${detail.value.length} of 6 entered.`
				})

				verifyOtp.addEventListener('complete', (completeEvent) => {
					const detail = (completeEvent as CustomEvent<{ value: string }>).detail
					verifyStatus.textContent = `Verifying ${detail.value}…`
				})
			}
		}),

		defineInteractiveExample({
			id: 'rejection',
			title: 'Handling a wrong code',
			description:
				'Mark it invalid, say what went wrong, and leave the digits alone. Clearing the field on failure is the single most common way to make this flow miserable.',
			layout: ExampleLayout.stack,
			markup: `
				<z-input-otp id="checkOtp" length="4" is-numeric accent="dom"></z-input-otp>
				<z-text size="sm" color="muted" id="checkStatus">The code is 1234 — try anything else to see the failure.</z-text>
			`,
			script: `
				const checkOtp = document.querySelector('#checkOtp')

				checkOtp.addEventListener('complete', async (completeEvent) => {
				  const [isAccepted, checkError] = await wrap(checkCode(completeEvent.detail.value))
				  if (checkError) return showError('We could not reach the server.')

				  checkOtp.invalid = !isAccepted
				})
			`,
			wire: (root) => {
				const checkOtp = queryPreview<HTMLElement>(root, '#checkOtp')
				const checkStatus = queryPreview<HTMLElement>(root, '#checkStatus')

				checkOtp.addEventListener('complete', (completeEvent) => {
					const detail = (completeEvent as CustomEvent<{ value: string }>).detail
					const isAccepted = detail.value === '1234'

					if (isAccepted) {
						checkOtp.removeAttribute('invalid')
						checkStatus.textContent = 'Verified.'
						return
					}

					checkOtp.setAttribute('invalid', '')
					checkStatus.textContent = 'That code did not match. Check it and edit the digits above.'
				})

				checkOtp.addEventListener('change', () => {
					checkOtp.removeAttribute('invalid')
				})
			}
		})
	],

	attributes: [
		{
			name: 'value',
			type: 'string',
			defaultValue: '—',
			description: 'The code as typed. Reflects, and stays positionally faithful — a cleared middle cell reads as a space, not a shift.'
		},
		{ name: 'label', type: 'string', defaultValue: 'One-time code', description: 'Accessible name for the group of cells. Set for you inside a z-field.' },
		{ name: 'length', type: 'number', defaultValue: '6', description: 'How many cells to render.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Cell size.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent for filled and focused cells.' },
		{ name: 'is-numeric', type: 'boolean', defaultValue: '—', description: 'Digits only. Raises the numeric keypad and strips non-digits from a paste.' },
		{ name: 'invalid', type: 'boolean', defaultValue: '—', description: 'Paints every cell in the error colour, without clearing them.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks typing and pasting — use while verification is in flight.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the control from layout.' }
	],

	properties: [],

	slots: [],

	events: [
		{
			name: 'change',
			detail: '{ value: string }',
			description: 'Fires on every edit, carrying exactly what the value property holds — including any hole, as a space.'
		},
		{ name: 'complete', detail: '{ value: string }', description: 'Fires once every cell is filled with no holes, whether by typing or by paste.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The row carries role="group" named by `label`, defaulting to "One-time code", so the cells are announced as one control rather than as several unrelated inputs.',
		'Each cell is labelled by position ("Digit 1", "Digit 2"), which is what makes the code navigable when you cannot see where the focus is.',
		'ArrowLeft and ArrowRight move between cells, and Backspace on an empty cell steps back and clears — the behaviour people already expect from every other OTP field they have used.',
		'Paste is handled on the group, so a code pasted into any cell fills the whole row. Forcing one character at a time is a real barrier for switch and voice-control users.',
		'On failure, keep the digits and set invalid. Wiping the field is an accessibility problem as much as a usability one — the user may have no way to recover what they typed.'
	],

	related: [
		{ tag: 'z-input', route: '/c/forms/z-input', description: 'For codes long enough that transcription beats cell-by-cell entry.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label and error treatment around the row.' },
		{ tag: 'z-kbd', route: '/c/foundation/z-kbd', description: 'For rendering keys rather than collecting them.' }
	]
}
