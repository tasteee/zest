import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

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
		gap: 0.5rem;
		font-family: inherit;
		font-weight: 500;
		white-space: nowrap;
		border: 1px solid transparent;
		cursor: pointer;
		line-height: 1;
		box-sizing: border-box;
		/* Fill the host. The host is inline-flex, so it still shrink-wraps to the
		   button's content when standalone — but when a parent stretches the host
		   (full-width, or a z-button-group column), the button fills it instead of
		   staying content-width. */
		width: 100%;
		transition:
			opacity 0.05s,
			border-color 0.05s,
			background-color 0.05s,
			color 0.05s,
			box-shadow var(--material-press-duration) ease;
	}

	button.is-full-width {
		width: 100%;
	}

	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 55%, transparent);
		outline-offset: 2px;
	}

	/* sizes */

	button.is-sm {
		border-radius: var(--z-button-radius, var(--small-button-radius));
		height: var(--control-height-sm);
		padding-inline: 0.875rem;
		font-size: 0.75rem;
	}

	button.is-md {
		border-radius: var(--z-button-radius, var(--medium-button-radius));
		height: var(--control-height-md);
		padding-inline: 1rem;
		font-size: 0.875rem;
	}

	button.is-lg {
		border-radius: var(--z-button-radius, var(--large-button-radius));
		height: var(--control-height-lg);
		padding-inline: 1.5rem;
		font-size: 1rem;
	}

	button.is-neutral {
		--tone-color: var(--color-neutral-8);
	}

	button.is-dom {
		--tone-color: var(--purple);
	}

	button.is-sub {
		--tone-color: var(--pink);
	}

	button.is-success {
		--tone-color: var(--success);
	}

	button.is-warning {
		--tone-color: var(--warning);
	}

	button.is-error {
		--tone-color: var(--destructive);
	}

	/* kinds: paint using --tone-color */

	/* A solid button is the library's most physical object, so it consumes the
	   full material vocabulary: a lit fill, a raised stack, and an LED rim in
	   its own tone. Every one of those tokens is inert in the flat themes,
	   where this paints exactly the flat tone colour it always did.
	   --emissive-color is the handshake: the theme writes the glow, this
	   writes which colour it glows. */
	button.is-solid {
		--emissive-color: var(--tone-color);
		background: var(--material-tone), var(--tone-color);
		box-shadow: var(--elevation-raised), var(--emissive-tone);
		border-color: var(--tone-color);
		color: white;
		font-weight: 600;
	}

	/* Pressing swaps the raised stack for the pressed one, which in the
	   hardware themes reads as the cap travelling into the panel. */
	button.is-solid:active {
		box-shadow: var(--elevation-pressed);
	}

	/* The neutral tone is the one fill that flips with the theme — near-white
	   on dark, near-black on light — so its label has to flip with it rather
	   than being pinned to black. */
	button.is-solid.is-neutral {
		color: var(--primary-foreground);
	}

	button.is-solid:hover {
		opacity: 0.9;
	}

	button.is-solid:active {
		opacity: 0.8;
	}

	button.is-outline {
		background: var(--material-surface);
		border-color: var(--tone-color);
		color: var(--tone-color);
	}

	button.is-outline:hover {
		background: color-mix(in srgb, var(--tone-color) 10%, transparent);
	}

	button.is-outline:active {
		background: color-mix(in srgb, var(--tone-color) 20%, transparent);
	}

	button.is-ghost {
		background: transparent;
		border-color: transparent;
		color: var(--tone-color);
	}

	button.is-ghost:hover {
		background: color-mix(in srgb, var(--tone-color) 10%, transparent);
	}

	button.is-ghost:active {
		background: color-mix(in srgb, var(--tone-color) 18%, transparent);
	}

	button.is-soft {
		background: color-mix(in srgb, var(--tone-color) 15%, transparent);
		border-color: transparent;
		color: var(--tone-color);
		font-weight: 600;
	}

	button.is-soft:hover {
		background: color-mix(in srgb, var(--tone-color) 24%, transparent);
	}

	button.is-soft:active {
		background: color-mix(in srgb, var(--tone-color) 32%, transparent);
	}

	button.is-plain {
		background: transparent;
		border-color: transparent;
		color: var(--tone-color);
	}

	button.is-plain:hover {
		text-decoration: underline;
	}

	button.is-plain:active {
		opacity: 0.8;
	}

	/* states */

	button.is-disabled,
	button:disabled {
		filter: contrast(75%) brightness(0.6);
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
		border-radius: 999px;
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

	button.is-outline.is-neutral {
		--tone-color: var(--color-neutral-7);
		color: var(--color-neutral-7);

		&:hover {
			/* background: var(--color-neutral-3); */
			color: var(--color-neutral-9) !important;
		}
	}

	.label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
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
	if (props.accent === 'dom') return 'is-dom'
	if (props.accent === 'sub') return 'is-sub'
	if (props.accent === 'success') return 'is-success'
	if (props.accent === 'warning') return 'is-warning'
	if (props.accent === 'error') return 'is-error'
	return 'is-neutral'
}

export const ZButton = c(
	(props) => {
		const buttonType = (props.type as any) || 'button'

		const kindClass = resolveKindClass(props)
		const accentClass = resolveAccentClass(props)
		const sizeClass = resolveSizeClass(props)
		const isButtonDisabled = props.disabled || props.isLoading

		const buttonClass = [kindClass, accentClass, sizeClass]
			.concat(props.isLoading ? ['is-loading'] : [])
			.concat(props.disabled ? ['is-disabled'] : [])
			.concat(props.isFullWidth ? ['is-full-width'] : [])
			.join(' ')

		return (
			<host shadowDom>
				<button class={buttonClass} type={buttonType} disabled={isButtonDisabled}>
					{props.isLoading && <span class='spinner' aria-hidden='true'></span>}
					<span class='label'>{props.label ? props.label : <slot />}</span>
				</button>
			</host>
		)
	},
	{
		props: {
			size: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			accent: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			disabled: { type: Boolean, reflect: true },
			isLoading: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
			label: String,
			type: String
		},
		styles
	}
)

defineElement('z-button', ZButton)
