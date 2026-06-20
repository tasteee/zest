import { c, css } from 'atomico'

const styles = css`
	:host {
		display: inline-flex;
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
		transition:
			opacity 0.1s ease,
			border-color 0.1s ease,
			background-color 0.1s ease,
			color 0.1s ease;
	}

	button.is-full-width {
		width: 100%;
	}

	/* sizes */

	button.is-small {
		border-radius: var(--z-button-radius, var(--small-button-radius));
		height: 2rem;
		padding-inline: 0.875rem;
		font-size: 0.875rem;
	}

	button.is-medium {
		border-radius: var(--z-button-radius, var(--medium-button-radius));
		height: 2.5rem;
		padding-inline: 1rem;
		font-size: 0.875rem;
	}

	button.is-large {
		border-radius: var(--z-button-radius, var(--large-button-radius));
		height: 3rem;
		padding-inline: 1.5rem;
		font-size: 1rem;
	}

	/* tones: each one defines --tone-fill (the solid background) and
	   --tone-accent (the border/text color used by every other kind) so the
	   kind classes below never need a rule per tone. For most tones these are
	   the same vivid color; success/danger use a darker fill paired with a
	   brighter accent for legibility on the dark theme, mirroring the
	   existing --destructive / --destructive-foreground split. */

	button.is-primary {
		--tone-fill: var(--purple);
		--tone-accent: var(--purple);
		--tone-foreground: var(--primary-foreground);
	}

	button.is-secondary {
		--tone-fill: var(--secondary);
		--tone-accent: var(--secondary);
		--tone-foreground: var(--secondary-foreground);
	}

	button.is-neutral {
		--tone-fill: var(--primary);
		--tone-accent: var(--primary);
		--tone-foreground: var(--primary-foreground);
	}

	button.is-success {
		--tone-fill: var(--success);
		--tone-accent: var(--success-foreground);
		--tone-foreground: var(--success-foreground);
	}

	button.is-warning {
		--tone-fill: var(--warning);
		--tone-accent: var(--warning);
		--tone-foreground: var(--primary-foreground);
	}

	button.is-danger {
		--tone-fill: var(--destructive);
		--tone-accent: var(--destructive-foreground);
		--tone-foreground: var(--destructive-foreground);
	}

	/* kinds: paint using the tone variables above */

	button.is-solid {
		background: var(--tone-fill);
		border-color: var(--tone-fill);
		color: var(--tone-foreground);
		font-weight: 600;
	}

	button.is-solid:hover {
		opacity: 0.9;
	}

	button.is-solid:active {
		opacity: 0.8;
	}

	button.is-outline {
		background: transparent;
		border-color: var(--tone-accent);
		color: var(--tone-accent);
	}

	button.is-outline:hover {
		background: color-mix(in oklch, var(--tone-accent) 10%, transparent);
	}

	button.is-outline:active {
		background: color-mix(in oklch, var(--tone-accent) 20%, transparent);
	}

	button.is-ghost {
		background: transparent;
		border-color: transparent;
		color: var(--tone-accent);
	}

	button.is-ghost:hover {
		background: color-mix(in oklch, var(--tone-accent) 10%, transparent);
	}

	button.is-ghost:active {
		background: color-mix(in oklch, var(--tone-accent) 18%, transparent);
	}

	button.is-soft {
		background: color-mix(in oklch, var(--tone-accent) 15%, transparent);
		border-color: transparent;
		color: var(--tone-accent);
		font-weight: 600;
	}

	button.is-soft:hover {
		background: color-mix(in oklch, var(--tone-accent) 24%, transparent);
	}

	button.is-soft:active {
		background: color-mix(in oklch, var(--tone-accent) 32%, transparent);
	}

	button.is-plain {
		background: transparent;
		border-color: transparent;
		color: var(--tone-accent);
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
		opacity: 0.5;
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

	button.is-small ::slotted(svg) {
		width: 0.875rem;
		height: 0.875rem;
	}

	button.is-large ::slotted(svg) {
		width: 1.125rem;
		height: 1.125rem;
	}

	@keyframes z-button-spin {
		to {
			transform: rotate(360deg);
		}
	}
`

const resolveSizeClass = (props: any): string => {
	if (props.size === 'small') return 'is-small'
	if (props.size === 'large') return 'is-large'
	return 'is-medium'
}

const resolveKindClass = (props: any): string => {
	if (props.kind === 'outline') return 'is-outline'
	if (props.kind === 'ghost') return 'is-ghost'
	if (props.kind === 'soft') return 'is-soft'
	if (props.kind === 'plain') return 'is-plain'
	return 'is-solid'
}

const resolveToneClass = (props: any): string => {
	if (props.tone === 'primary') return 'is-primary'
	if (props.tone === 'secondary') return 'is-secondary'
	if (props.tone === 'success') return 'is-success'
	if (props.tone === 'warning') return 'is-warning'
	if (props.tone === 'danger') return 'is-danger'
	return 'is-neutral'
}

export const ZButton = c(
	(props) => {
		const kindClass = resolveKindClass(props)
		const toneClass = resolveToneClass(props)
		const sizeClass = resolveSizeClass(props)
		const isButtonDisabled = props.isDisabled || props.isLoading
		const buttonClass = [kindClass, toneClass, sizeClass]
			.concat(props.isLoading ? ['is-loading'] : [])
			.concat(props.isDisabled ? ['is-disabled'] : [])
			.concat(props.isFullWidth ? ['is-full-width'] : [])
			.join(' ')

		return (
			<host shadowDom>
				<button class={buttonClass} type={(props.type as any) || 'button'} disabled={isButtonDisabled}>
					{props.isLoading && <span class="spinner" aria-hidden="true"></span>}
					{props.label ? props.label : <slot />}
				</button>
			</host>
		)
	},
	{
		props: {
			size: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			tone: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isLoading: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
			label: String,
			type: String
		},
		styles
	}
)

customElements.define('z-button', ZButton)
