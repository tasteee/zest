import { c, css } from 'atomico'

const styles = css`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
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

	button.is-extra-small {
		border-radius: var(--z-button-radius, var(--small-button-radius));
		height: 1.5rem;
		padding-inline: 0.625rem;
		font-size: 0.6875rem;
	}

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

	button.is-extra-large {
		border-radius: var(--z-button-radius, var(--large-button-radius));
		height: 3.5rem;
		padding-inline: 2rem;
		font-size: 1.125rem;
	}

	button.is-icon {
		border-radius: var(--z-button-radius, var(--small-button-radius));
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
	}

	button.is-solid.is-purple {
		background: var(--purple);
		border-color: var(--purple);
		color: var(--primary-foreground);
		font-weight: 600;
	}

	button.is-solid.is-pink {
		background: var(--pink);
		border-color: var(--pink);
		color: var(--primary-foreground);
		font-weight: 600;
	}

	button.is-solid.is-red {
		background: var(--destructive);
		border-color: var(--destructive);
		color: var(--destructive-foreground);
		font-weight: 600;
	}

	button.is-solid.is-neutral {
		background: var(--primary);
		border-color: var(--primary);
		color: var(--primary-foreground);
		font-weight: 600;
	}

	button.is-solid:hover {
		opacity: 0.9;
	}

	button.is-solid:active {
		opacity: 0.8;
	}

	button.is-dim {
		color: #fff;
		background: #ffffff25;
		border-color: transparent;
		font-weight: 600;
	}

	button.is-dim:hover {
		background: #ffffff38;
	}

	button.is-dim:active {
		background: #ffffff4d;
	}

	button.is-outlined {
		background: transparent;
	}

	button.is-outlined.is-purple {
		border-color: var(--purple);
		color: var(--purple);
	}

	button.is-outlined.is-pink {
		border-color: var(--pink);
		color: var(--pink);
	}

	button.is-outlined.is-red {
		border-color: var(--destructive);
		color: var(--destructive);
	}

	button.is-outlined.is-neutral,
	button.is-outlined:not(.is-purple, .is-pink, .is-red) {
		border-color: var(--border);
		color: var(--foreground);
	}

	button.is-outlined.is-purple:hover {
		background: color-mix(in oklch, var(--purple) 10%, transparent);
	}

	button.is-outlined.is-pink:hover {
		background: color-mix(in oklch, var(--pink) 10%, transparent);
	}

	button.is-outlined.is-red:hover {
		background: color-mix(in oklch, var(--destructive) 10%, transparent);
	}

	button.is-outlined.is-neutral:hover,
	button.is-outlined:not(.is-purple, .is-pink, .is-red):hover {
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	button.is-outlined.is-purple:active {
		background: color-mix(in oklch, var(--purple) 20%, transparent);
	}

	button.is-outlined.is-pink:active {
		background: color-mix(in oklch, var(--pink) 20%, transparent);
	}

	button.is-outlined.is-red:active {
		background: color-mix(in oklch, var(--destructive) 20%, transparent);
	}

	button.is-outlined.is-neutral:active,
	button.is-outlined:not(.is-purple, .is-pink, .is-red):active {
		border-color: color-mix(in oklch, var(--foreground) 70%, transparent);
		background: color-mix(in oklch, var(--foreground) 5%, transparent);
	}

	button.is-ghost {
		background: transparent;
		border-color: transparent;
	}

	button.is-ghost.is-purple {
		color: var(--purple);
	}

	button.is-ghost.is-pink {
		color: var(--pink);
	}

	button.is-ghost.is-red {
		color: var(--destructive);
	}

	button.is-ghost.is-neutral,
	button.is-ghost:not(.is-purple, .is-pink, .is-red) {
		color: var(--foreground);
	}

	button.is-ghost:hover {
		opacity: 0.7;
	}

	button.is-ghost:active {
		opacity: 0.55;
	}

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

	button.is-extra-small ::slotted(svg) {
		width: 0.75rem;
		height: 0.75rem;
	}

	button.is-small ::slotted(svg) {
		width: 0.875rem;
		height: 0.875rem;
	}

	button.is-large ::slotted(svg) {
		width: 1.125rem;
		height: 1.125rem;
	}

	button.is-extra-large ::slotted(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	@keyframes z-button-spin {
		to {
			transform: rotate(360deg);
		}
	}
`

const resolveColorClass = (props: any): string => {
	if (props.isPurple) return 'is-purple'
	if (props.isPink) return 'is-pink'
	if (props.isRed) return 'is-red'
	return 'is-neutral'
}

const resolveSizeClass = (props: any): string => {
	if (props.isExtraSmall) return 'is-extra-small'
	if (props.isSmall) return 'is-small'
	if (props.isLarge) return 'is-large'
	if (props.isExtraLarge) return 'is-extra-large'
	if (props.isIcon) return 'is-icon'
	return 'is-medium'
}

const resolveKindClass = (props: any): string => {
	if (props.isGhost) return 'is-ghost'
	if (props.isSolid) return 'is-solid'
	if (props.isDim) return 'is-dim'
	return 'is-outlined'
}

export const ZButton = c(
	(props) => {
		const kindClass = resolveKindClass(props)
		const colorClass = resolveColorClass(props)
		const sizeClass = resolveSizeClass(props)
		const isButtonDisabled = props.isDisabled || props.isLoading
		const buttonClass = [kindClass, colorClass, sizeClass]
			.concat(props.isLoading ? ['is-loading'] : [])
			.concat(props.isDisabled ? ['is-disabled'] : [])
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
			isPurple: { type: Boolean, reflect: true },
			isPink: { type: Boolean, reflect: true },
			isRed: { type: Boolean, reflect: true },
			isNeutral: { type: Boolean, reflect: true },
			isExtraSmall: { type: Boolean, reflect: true },
			isSmall: { type: Boolean, reflect: true },
			isMedium: { type: Boolean, reflect: true },
			isLarge: { type: Boolean, reflect: true },
			isExtraLarge: { type: Boolean, reflect: true },
			isIcon: { type: Boolean, reflect: true },
			isGhost: { type: Boolean, reflect: true },
			isOutlined: { type: Boolean, reflect: true },
			isSolid: { type: Boolean, reflect: true },
			isDim: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isLoading: { type: Boolean, reflect: true },
			label: String,
			type: String
		},
		styles
	}
)

customElements.define('z-button', ZButton)
