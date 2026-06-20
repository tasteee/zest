import { c, css, event, useHost, useListener } from 'atomico'
import { toggleVariantProps } from '../shared/toggle-schema'

const styles = css`
	:host {
		display: flex;
		width: fit-content;
		align-items: center;
	}

	:host([is-vertical]) {
		flex-direction: column;
	}

	::slotted(*) {
		--z-toggle-radius: 0;
		flex-shrink: 0;
		min-width: 0;
	}

	::slotted(:only-child) {
		--z-toggle-radius: var(--radius-md);
	}

	:host(:not([is-vertical])) ::slotted(:first-child) {
		--z-toggle-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	:host(:not([is-vertical])) ::slotted(:last-child) {
		--z-toggle-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	:host(:not([is-vertical])) ::slotted(:not(:first-child)) {
		margin-left: -1px;
	}

	:host([is-vertical]) ::slotted(:first-child) {
		--z-toggle-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	:host([is-vertical]) ::slotted(:last-child) {
		--z-toggle-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	:host([is-vertical]) ::slotted(:not(:first-child)) {
		margin-top: -1px;
	}

	::slotted(:hover),
	::slotted([data-state='on']),
	::slotted(:focus-visible) {
		position: relative;
		z-index: 1;
	}

	:host([is-purple]) {
		--z-toggle-color: var(--neon-purple);
		--z-toggle-accent: var(--neon-purple);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	:host([is-pink]) {
		--z-toggle-color: var(--neon-pink);
		--z-toggle-accent: var(--neon-pink);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	:host([is-neutral]) {
		--z-toggle-color: var(--foreground);
		--z-toggle-accent: var(--primary);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	:host([is-small]) {
		--z-toggle-height: 2rem;
		--z-toggle-padding-inline: 0.75rem;
		--z-toggle-min-width: 2rem;
		--z-toggle-font-size: 0.8125rem;
		--z-toggle-icon-size: 0.875rem;
	}

	:host([is-large]) {
		--z-toggle-height: 3rem;
		--z-toggle-padding-inline: 1.25rem;
		--z-toggle-min-width: 3rem;
		--z-toggle-font-size: 1rem;
		--z-toggle-icon-size: 1.125rem;
	}

	:host([is-ghost]) {
		--z-toggle-border: transparent;
		--z-toggle-hover-bg: color-mix(in oklch, var(--z-toggle-accent, var(--foreground)) 10%, transparent);
		--z-toggle-on-bg: var(--z-toggle-accent, var(--primary));
		--z-toggle-on-color: var(--z-toggle-accent-foreground, var(--primary-foreground));
		--z-toggle-on-border: transparent;
	}

	:host([is-outlined]) {
		--z-toggle-border: var(--border);
		--z-toggle-hover-bg: color-mix(in oklch, var(--z-toggle-accent, var(--foreground)) 10%, transparent);
		--z-toggle-on-bg: color-mix(in oklch, var(--z-toggle-accent, var(--primary)) 18%, transparent);
		--z-toggle-on-color: var(--z-toggle-accent, var(--primary));
		--z-toggle-on-border: var(--z-toggle-accent, var(--primary));
	}

	:host([is-hidden]) {
		display: none;
	}
`

type PressDetailT = { pressed: boolean; value?: string }
type ToggleGroupItemElementT = HTMLElement & { isPressed?: boolean }

export const ZToggleGroup = c(
	(props) => {
		const host = useHost()

		useListener(
			host,
			'press',
			(rawEvent: unknown) => {
				const zEvent = rawEvent as CustomEvent<PressDetailT>

				if (props.type === 'multiple') {
					props.change({ value: getPressedValues(host.current) })
					return
				}

				const target = zEvent.target as ToggleGroupItemElementT

				for (const item of host.current.querySelectorAll<ToggleGroupItemElementT>('z-toggle-group-item')) {
					if (item !== target) item.isPressed = false
				}

				props.change({ value: zEvent.detail.pressed ? zEvent.detail.value : undefined })
			},
			{ passive: true }
		)

		return (
			<host shadowDom role="group">
				<slot />
			</host>
		)
	},
	{
		props: {
			...toggleVariantProps,
			isVertical: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			type: { type: String, reflect: true },
			change: event<{ value?: string | string[] }>({ bubbles: true, composed: true })
		},
		styles
	}
)

const getPressedValues = (root: HTMLElement): string[] => {
	const items = root.querySelectorAll<ToggleGroupItemElementT & { value?: string }>('z-toggle-group-item')
	const pressedValues: string[] = []

	for (const item of items) {
		if (item.isPressed && item.value) pressedValues.push(item.value)
	}

	return pressedValues
}

customElements.define('z-toggle-group', ZToggleGroup)
