import { c, css } from 'atomico'
import { defineElement } from '../shared/define-element'
import { oneOf } from '../shared/prop-types'

// z-color-swatch: a read-only color chip with its value beside it.
// It draws any CSS color the browser understands, so it never
// parses. Translucent colors sit on a checkerboard so their alpha
// reads at a glance. z-color-picker uses it as its default
// trigger; apps use it in tables, lists and token docs.
const styles = css`
	:host {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-none);
		--chip-size: 1.25rem;
		--chip-radius: var(--radius-sm);
	}

	:host([size='sm']) {
		gap: var(--space-1-5);
		font-size: var(--font-size-xs);
		--chip-size: 1rem;
		--chip-radius: var(--radius-xs);
	}

	:host([size='lg']) {
		gap: var(--space-2-5);
		font-size: var(--font-size-md);
		--chip-size: 1.75rem;
		--chip-radius: var(--radius-md);
	}

	:host([is-round]) {
		--chip-radius: var(--radius-full);
	}

	:host([is-hidden]) {
		display: none;
	}

	.color-swatch-chip {
		flex-shrink: 0;
		width: var(--chip-size);
		height: var(--chip-size);
		border-radius: var(--chip-radius);
		background:
			linear-gradient(var(--swatch-color), var(--swatch-color)),
			repeating-conic-gradient(var(--surface-strong) 0 25%, var(--surface-default) 0 50%) 0 0 / 0.5rem 0.5rem;
		outline: 1px solid color-mix(in oklch, var(--text-primary) 14%, transparent);
		outline-offset: -1px;
	}

	.color-swatch-value {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`

export const ZColorSwatch = c(
	(props) => {
		const color = props.value || 'transparent'
		const visibleText = props.label || props.value || ''
		const isTextShown = !props.isValueHidden && visibleText !== ''
		const chipRole = isTextShown ? undefined : 'img'
		const chipLabel = isTextShown ? undefined : visibleText
		const isChipHiddenFromReaders = isTextShown

		return (
			<host shadowDom>
				<span
					class="color-swatch-chip"
					part="chip"
					role={chipRole}
					aria-label={chipLabel}
					aria-hidden={isChipHiddenFromReaders ? 'true' : undefined}
					style={{ '--swatch-color': color }}
				></span>
				{isTextShown && (
					<span class="color-swatch-value" part="value">
						{visibleText}
					</span>
				)}
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			label: String,
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			isRound: { type: Boolean, reflect: true },
			isValueHidden: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-color-swatch', ZColorSwatch)
