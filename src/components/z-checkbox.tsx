import { defineElement } from '../shared/define-element'
import { c, css, event, useProp } from 'atomico'

/*
 * z-checkbox — square control. Unchecked is a hairline outline; checked fills
 * with the accent and reveals a stroked checkmark.
 * Optional slotted label sits to the right and is fully clickable.
 */
const styles = css`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		min-height: var(--control-height-md);
		cursor: pointer;
		font-family: inherit;
		font-size: var(--font-size-small);
		color: var(--foreground);
		user-select: none;
		-webkit-user-select: none;
		--accent: var(--primary);
	}

	label.is-sm { min-height: var(--control-height-sm); font-size: var(--font-size-caption); }
	label.is-md { font-size: var(--font-size-small); }
	label.is-lg { min-height: var(--control-height-lg); font-size: var(--font-size-body); }

	:host([accent='dom']) label {
		--accent: var(--purple);
	}

	:host([accent='sub']) label {
		--accent: var(--pink);
	}

	label.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.box {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		transition: border-color 0.12s ease, background-color 0.12s ease;
	}

	label.is-sm .box {
		width: 1rem;
		height: 1rem;
	}
	label.is-lg .box {
		width: 1.375rem;
		height: 1.375rem;
	}

	label:hover .box {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}

	.box.is-checked {
		background: var(--accent);
		border-color: var(--accent);
	}

	/* hidden native input drives focus + a11y */
	input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
	}

	input:focus-visible + .box {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.check {
		width: 70%;
		height: 70%;
		color: var(--primary-foreground);
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		opacity: 0;
		transform: scale(0.6);
		transition: opacity 0.12s ease, transform 0.12s ease;
	}

	.box.is-checked .check {
		opacity: 1;
		transform: scale(1);
	}

`

const resolveSizeClass = (props: any): string => {
	if (props.size === 'sm') return 'is-sm'
	if (props.size === 'lg') return 'is-lg'
	return 'is-md'
}

export const ZCheckbox = c(
	(props) => {
		const [isChecked, setIsChecked] = useProp<boolean>('isChecked')

		const labelClass = ['label', resolveSizeClass(props)]
			.concat(props.disabled ? ['is-disabled'] : [])
			.join(' ')

		const boxClass = ['box'].concat(isChecked ? ['is-checked'] : []).join(' ')

		return (
			<host shadowDom>
				<label class={labelClass}>
					<input
						type="checkbox"
						checked={isChecked}
						name={props.name}
						value={props.value}
						disabled={props.disabled}
						aria-checked={isChecked ? 'true' : 'false'}
						onchange={(changeEvent: Event) => {
							changeEvent.stopPropagation()
							const next = !isChecked
							setIsChecked(next)
							props.change({ checked: next, value: props.value })
						}}
					/>
					<span class={boxClass} aria-hidden="true">
						<svg class="check" viewBox="0 0 24 24">
							<polyline points="4 12 10 18 20 6" />
						</svg>
					</span>
					<slot />
				</label>
			</host>
		)
	},
	{
		props: {
			isChecked: { type: Boolean, reflect: true },
			disabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			size: { type: String, reflect: true },
			accent: { type: String, reflect: true },
			name: String,
			value: String,
			change: event<{ checked: boolean; value?: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-checkbox', ZCheckbox)
