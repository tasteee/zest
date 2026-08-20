import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundTextarea = (): HTMLElement => {
	const textarea = document.createElement('z-textarea')
	textarea.setAttribute('placeholder', 'Tell us what happened…')
	textarea.setAttribute('label', 'Notes')
	textarea.setAttribute('rows', '3')
	return textarea
}

export const zTextareaDoc: ComponentDocT = {
	tag: 'z-textarea',
	title: 'z-textarea',
	tagline: 'Multi-line text, with an optional field that grows to fit what was written.',
	status: ComponentStatus.stable,

	description:
		'The same hairline-to-accent focus treatment as `z-input`, wrapped around a native `<textarea>`. `rows` sets the resting height. Set `is-auto-resize` and the field tracks its own content instead — no scrollbar, no fixed box the user has to write inside. `input` fires per keystroke and `change` on blur, matching `z-input` exactly, so the two are interchangeable in a form handler.',

	playground: {
		buildElement: buildPlaygroundTextarea,
		controlNames: ['placeholder', 'rows', 'size', 'accent', 'is-auto-resize', 'invalid', 'disabled', 'is-readonly'],
		slotLabel: 'Notes'
	},

	usageGuidance: [
		'Pick `rows` to match the expected answer. A three-row box invites a paragraph; a one-row box invites a sentence. The size of the field is the strongest hint about how much to write.',
		'Reach for `is-auto-resize` in composers, comment boxes, and anywhere the text can run long — it removes the inner scrollbar, which is the thing that makes long-form typing feel cramped.',
		'Do not use auto-resize inside a fixed-height panel. The field will happily grow past the panel and take the layout with it.',
		'If the answer is short and structured, use `z-input`. A textarea for a name or an email address invites a paragraph nobody wants.'
	],

	anatomy: [
		{ name: 'field', description: 'The bordered box. Owns the focus treatment and the invalid and disabled states.' },
		{ name: 'textarea', description: 'The native control — selection, spellcheck, and the caret all come from the platform.' },
		{ name: 'auto-resize', description: 'When set, height is recomputed from scrollHeight on every input, so the box is always exactly as tall as its content.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Three rows by default. The box stays that height and scrolls once the content passes it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea placeholder="Tell us what happened…" label="Notes"></z-textarea>
			`
		}),

		defineMarkupExample({
			id: 'rows',
			title: 'Rows',
			description: 'Resting height in lines. This is the clearest signal you have about how long an answer you expect.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea rows="2" placeholder="Two rows — a sentence or two" label="Short"></z-textarea>
				<z-textarea rows="6" placeholder="Six rows — room to think" label="Long"></z-textarea>
			`
		}),

		defineMarkupExample({
			id: 'auto-resize',
			title: 'Auto resize',
			description: 'Type past the third line. The field grows instead of scrolling, so the whole draft stays visible.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea is-auto-resize rows="2" placeholder="Keep typing — this grows with you" label="Message"></z-textarea>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Type scale and padding, matched to z-input so a form of mixed controls stays on one rhythm.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea size="sm" rows="2" placeholder="Small" label="Small"></z-textarea>
				<z-textarea size="md" rows="2" placeholder="Medium" label="Medium"></z-textarea>
				<z-textarea size="lg" rows="2" placeholder="Large" label="Large"></z-textarea>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'Which accent the border lifts to on focus. Click into each to see the difference.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea accent="neutral" rows="2" placeholder="Neutral focus" label="Neutral"></z-textarea>
				<z-textarea accent="dom" rows="2" placeholder="Primary focus" label="Primary"></z-textarea>
				<z-textarea accent="sub" rows="2" placeholder="Secondary focus" label="Secondary"></z-textarea>
			`
		}),

		defineMarkupExample({
			id: 'states',
			title: 'States',
			description: 'Invalid, disabled, and readonly. Readonly keeps the text selectable, which matters when the content is something to copy.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea invalid rows="2" value="Too short." label="Invalid"></z-textarea>
				<z-textarea disabled rows="2" placeholder="Disabled" label="Disabled"></z-textarea>
				<z-textarea is-readonly rows="2" value="Generated summary — read only." label="Readonly"></z-textarea>
			`
		}),

		defineInteractiveExample({
			id: 'character-count',
			title: 'With a character count',
			description:
				'A live counter is the one case where listening to `input` on every keystroke is clearly worth it. The count turns to the error colour before the limit, not at it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea id="bioInput" is-auto-resize rows="3" placeholder="A short bio" label="Bio"></z-textarea>
				<z-text size="sm" color="muted" id="bioCount">0 / 160</z-text>
			`,
			script: `
				const bioInput = document.querySelector('#bioInput')

				bioInput.addEventListener('input', (inputEvent) => {
				  updateCounter(inputEvent.detail.value.length)
				})
			`,
			wire: (root) => {
				const bioInput = queryPreview<HTMLElement>(root, '#bioInput')
				const bioCount = queryPreview<HTMLElement>(root, '#bioCount')
				const characterLimit = 160

				bioInput.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ value: string }>).detail
					const usedCharacters = detail.value.length
					const isOverLimit = usedCharacters > characterLimit

					const overageNote = isOverLimit ? ` — ${usedCharacters - characterLimit} over` : ''
					bioCount.textContent = `${usedCharacters} / ${characterLimit}${overageNote}`
					bioCount.setAttribute('color', isOverLimit ? 'sub' : 'muted')

					if (isOverLimit) bioInput.setAttribute('invalid', '')
					if (!isOverLimit) bioInput.removeAttribute('invalid')
				})
			}
		}),

		defineInteractiveExample({
			id: 'submit-shortcut',
			title: 'Submit on Cmd+Enter',
			description:
				'A composer convention worth keeping: Enter breaks the line, the modifier sends. Listen on the host — keyboard events cross the shadow boundary.',
			layout: ExampleLayout.stack,
			markup: `
				<z-textarea id="replyInput" is-auto-resize rows="2" placeholder="Write a reply — ⌘↵ to send" label="Reply"></z-textarea>
				<z-text size="sm" color="muted" id="replyStatus">Nothing sent yet.</z-text>
			`,
			script: `
				const replyInput = document.querySelector('#replyInput')

				replyInput.addEventListener('keydown', (keyEvent) => {
				  const isSendChord = keyEvent.key === 'Enter' && (keyEvent.metaKey || keyEvent.ctrlKey)
				  if (!isSendChord) return

				  keyEvent.preventDefault()
				  sendReply(replyInput.value)
				})
			`,
			wire: (root) => {
				const replyInput = queryPreview<HTMLElement & { value: string }>(root, '#replyInput')
				const replyStatus = queryPreview<HTMLElement>(root, '#replyStatus')

				replyInput.addEventListener('keydown', (rawEvent) => {
					const keyEvent = rawEvent as KeyboardEvent
					const isSendChord = keyEvent.key === 'Enter' && (keyEvent.metaKey || keyEvent.ctrlKey)
					if (!isSendChord) return

					keyEvent.preventDefault()

					const draft = (replyInput.value || '').trim()
					const isEmpty = draft.length === 0
					if (isEmpty) {
						replyStatus.textContent = 'Nothing to send.'
						return
					}

					replyStatus.textContent = `Sent: “${draft}”`
					replyInput.value = ''
				})
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'string', defaultValue: '—', description: 'The field contents. Reflects, so it is both the seed and the live value.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name applied to the inner textarea. Set for you inside a z-field.' },
		{ name: 'placeholder', type: 'string', defaultValue: '—', description: 'Example text shown while the field is empty.' },
		{ name: 'name', type: 'string', defaultValue: '—', description: 'Name passed to the inner textarea for form submission.' },
		{ name: 'rows', type: 'number', defaultValue: '3', description: 'Resting height in lines. Ignored once the content grows under is-auto-resize.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Which accent the border lifts to on focus.' },
		{ name: 'is-auto-resize', type: 'boolean', defaultValue: '—', description: 'Grows the field to fit its content instead of scrolling.' },
		{ name: 'is-focused', type: 'boolean', defaultValue: '—', description: 'Reflects the focus state.' },
		{ name: 'invalid', type: 'boolean', defaultValue: '—', description: 'Paints the error border and sets aria-invalid.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks interaction and removes the field from the tab order.' },
		{ name: 'is-readonly', type: 'boolean', defaultValue: '—', description: 'Focusable and selectable, but not editable.' },
		{ name: 'is-required', type: 'boolean', defaultValue: '—', description: 'Marks the inner textarea required for native form validation.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the field from layout.' }
	],

	properties: [],

	slots: [],

	events: [
		{ name: 'input', detail: '{ value: string }', description: 'Fires on every keystroke with the current contents.' },
		{ name: 'change', detail: '{ value: string }', description: 'Fires once on blur with the committed contents.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'Wraps a native textarea, so selection, spellcheck, dictation, and the platform caret behave exactly as users expect.',
		'Set `label` (or let z-field forward one) — the shadow boundary means an external <label for> will not reach the inner control.',
		'Auto-resize removes the inner scroll container, which is a real win for screen-magnifier users who otherwise lose the caret inside a small scrolling box.',
		'If you add a Cmd+Enter shortcut, keep a visible submit button too. A keyboard chord is an accelerator, never the only path.',
		'The scrollbar is themed rather than hidden, so it stays visible for anyone who relies on it to know there is more text.'
	],

	related: [
		{ tag: 'z-input', route: '/c/forms/z-input', description: 'The single-line sibling, with the same event shape.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label, help text, and error treatment.' }
	]
}
