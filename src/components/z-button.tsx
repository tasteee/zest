import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { useAccessibleName } from '../shared/accessible'
import { c, css } from 'atomico'
import { oneOf } from '../shared/prop-types'

const styles = css`
	:host {
		display: inline-flex;
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-full-width]) {
		display: flex;
		width: 100%;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		font-family: inherit;
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		border: 1px solid transparent;
		cursor: pointer;
		line-height: var(--line-height-none);
		box-sizing: border-box;
		/* Fill the host. The host is inline-flex, so it still shrink-wraps to the
		   button's content when standalone, but when a parent stretches the host
		   (full-width, or a z-button-group column), the button fills it instead of
		   staying content-width. */
		width: 100%;
		transition:
			opacity var(--motion-fast),
			border-color var(--motion-fast),
			background-color var(--motion-fast),
			color var(--motion-fast);
	}

	button.is-full-width {
		width: 100%;
	}

	button:focus-visible {
		outline: 3px solid var(--border-focus);
		outline-offset: 2px;
	}

	/* sizes */

	button.is-sm {
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--control-height-sm);
		padding-inline: var(--space-3-5);
		font-size: var(--font-size-sm);
	}

	button.is-md {
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--control-height-md);
		padding-inline: var(--space-4);
		font-size: var(--font-size-sm);
	}

	button.is-lg {
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--control-height-lg);
		padding-inline: var(--space-6);
		font-size: var(--font-size-md);
	}

	button.is-primary {
		--tone: var(--accent-primary);
	}

	button.is-secondary {
		--tone: var(--accent-secondary);
	}

	button.is-tertiary {
		--tone: var(--accent-tertiary);
	}

	button.is-success {
		--tone: var(--status-success);
	}

	button.is-warning {
		--tone: var(--status-warning);
	}

	button.is-error {
		--tone: var(--status-danger);
	}

	/* kinds: paint using --tone */

	button.is-solid {
		background: var(--tone);
		border-color: var(--tone);
		color: var(--tone-on-color);
		font-weight: var(--font-weight-semibold);
	}

	/* A mid-tone fill has no good plain black or white label. The label is
	   the tone's own hue pulled very dark, so it stays legible and still
	   reads as part of the same colour family. The theme sets how dark
	   (light themes keep a plain white label). Neutral overrides this below. */
	button.is-solid {
		--tone-on-color: oklch(from var(--tone) var(--on-tone-lightness) calc(c * var(--on-tone-chroma)) h);
	}


	/* The neutral tone is the one fill that flips with the theme — near-white
	   on dark, near-black on light — so its label has to flip with it rather
	   than being pinned to black. */
	button.is-solid.is-primary {
		color: var(--on-accent);
	}

	button.is-solid:hover {
		opacity: 0.9;
	}

	button.is-solid:active {
		opacity: 0.8;
	}

	button.is-outline {
		background: transparent;
		border-color: var(--tone);
		color: var(--tone);
	}

	button.is-outline:hover {
		background: color-mix(in srgb, var(--tone) 10%, transparent);
	}

	button.is-outline:active {
		background: color-mix(in srgb, var(--tone) 20%, transparent);
	}

	button.is-ghost {
		background: transparent;
		border-color: transparent;
		color: var(--tone);
	}

	button.is-ghost:hover {
		background: color-mix(in srgb, var(--tone) 10%, transparent);
	}

	button.is-ghost:active {
		background: color-mix(in srgb, var(--tone) 18%, transparent);
	}

	button.is-soft {
		background: color-mix(in srgb, var(--tone) 15%, transparent);
		border-color: transparent;
		/* The tone on its own tint measured 3.7–4.3:1 in the light themes.
		   Pulling the text a quarter of the way to the foreground clears 4.5:1
		   in every theme — darker on paper, lighter on ink — as z-badge does. */
		color: color-mix(in oklab, var(--tone) 72%, var(--text-primary));
		font-weight: var(--font-weight-semibold);
	}

	button.is-soft:hover {
		background: color-mix(in srgb, var(--tone) 24%, transparent);
	}

	button.is-soft:active {
		background: color-mix(in srgb, var(--tone) 32%, transparent);
	}

	button.is-plain {
		background: transparent;
		border-color: transparent;
		color: var(--tone);
	}

	button.is-plain:hover {
		text-decoration: underline;
		text-underline-offset: 0.25em;
		text-decoration-thickness: 1px;
	}

	button.is-plain:active {
		opacity: 0.8;
	}

	/* states */

	button.is-disabled,
	button:disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	button.is-loading {
		cursor: progress;
	}

	.spinner {
		width: 0.875em;
		height: 0.875em;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: var(--radius-full);
		animation: z-button-spin 0.7s linear infinite;
	}

	::slotted(svg) {
		width: 1rem;
		height: 1rem;
		margin-top: 1px;
		flex-shrink: 0;
	}

	button.is-sm ::slotted(svg) {
		width: 0.875rem;
		height: 0.875rem;
	}

	button.is-lg ::slotted(svg) {
		width: 1.125rem;
		height: 1.125rem;
	}

	button.is-outline.is-primary {
		border-color: var(--border-default);
		color: var(--text-primary);
	}

	button.is-outline.is-primary:hover {
		border-color: var(--border-strong);
	}

	.label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	@keyframes z-button-spin {
		to {
			transform: rotate(360deg);
		}
	}
`

const resolveSizeClass = (props: any): string => {
	if (props.size === 'sm') return 'is-sm'
	if (props.size === 'lg') return 'is-lg'
	return 'is-md'
}

const resolveKindClass = (props: any): string => {
	if (props.kind === 'outline') return 'is-outline'
	if (props.kind === 'ghost') return 'is-ghost'
	if (props.kind === 'soft') return 'is-soft'
	if (props.kind === 'plain') return 'is-plain'
	return 'is-solid'
}

const resolveAccentClass = (props: any): string => {
	if (props.tone === 'secondary') return 'is-secondary'
	if (props.tone === 'tertiary') return 'is-tertiary'
	if (props.tone === 'success') return 'is-success'
	if (props.tone === 'warning') return 'is-warning'
	if (props.tone === 'danger') return 'is-error'
	return 'is-primary'
}

export const ZButton = c(
	(props) => {
		const buttonType = (props.type as any) || 'button'
		// An icon-only button is named by aria-label / aria-labelledby on the
		// host; the inner button is what a screen reader reads, so it goes there.
		// `label` is visible text, so it is not part of this.
		const accessibleName = useAccessibleName()

		// The inner <button> has no form owner from inside the shadow root, so a
		// submit or reset is relayed to the owning form through ElementInternals.
		// A named submit button contributes its name/value for the duration of
		// the submission, as the native submitter would.
		const { internals, isFormDisabled } = useFormControl({
			value: null,
			isDisabled: props.isDisabled,
			onReset: () => {}
		})
		const isDisabled = props.isDisabled || isFormDisabled
		const relayToForm = () => {
			const form = internals?.form
			if (!form) return
			if (buttonType === 'reset') { form.reset(); return }
			if (buttonType !== 'submit') return
			const isNamed = Boolean(props.name)
			if (isNamed) internals!.setFormValue(props.value ?? '')
			try { form.requestSubmit() } finally { if (isNamed) internals!.setFormValue(null) }
		}

		const kindClass = resolveKindClass(props)
		const toneClass = resolveAccentClass(props)
		const sizeClass = resolveSizeClass(props)
		const isButtonDisabled = isDisabled || props.isLoading

		const buttonClass = [kindClass, toneClass, sizeClass]
			.concat(props.isLoading ? ['is-loading'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.concat(props.isFullWidth ? ['is-full-width'] : [])
			.join(' ')

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<button class={buttonClass} type={buttonType} disabled={isButtonDisabled} aria-busy={props.isLoading ? 'true' : undefined} aria-label={accessibleName} onclick={relayToForm}>
					{props.isLoading && <span class='spinner' aria-hidden='true'></span>}
					<span class='label'>{props.label ? props.label : <slot />}</span>
				</button>
			</host>
		)
	},
	{
		props: {
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			kind: { type: oneOf('solid', 'outline', 'ghost', 'soft', 'plain'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			isHidden: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isLoading: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
			label: String,
			type: oneOf('button', 'submit', 'reset'),
			name: { type: String, reflect: true },
			value: String
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-button', ZButton)
