import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, useEffect, useHost, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-fieldset, a titled group of related controls. A legend names the
 * group, an optional description sits under it, the controls stack in
 * the body, and a group-level error closes it.
 *
 * `is-disabled` disables every control inside, the way a native
 * <fieldset disabled> does. The platform cannot do it for us: slotted
 * children are not tree descendants of a fieldset inside a shadow root.
 * So the fieldset sets `isDisabled` on each z control (and `disabled` on
 * each native one) and remembers which it touched, so a control that was
 * disabled on its own stays disabled when the group is enabled again.
 */
const styles = css`
	:host {
		display: block;
		min-width: 0;
		--z-fieldset-gap: var(--space-4);
	}

	:host([is-hidden]) {
		display: none;
	}

	.fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		min-width: 0;
	}

	.fieldset.is-outline {
		padding: var(--space-5);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
	}

	.fieldset.is-soft {
		padding: var(--space-5);
		background: var(--surface-default);
		border: 1px solid transparent;
		border-radius: var(--radius-lg);
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		min-width: 0;
	}

	.header[hidden],
	.description[hidden],
	.error[hidden] {
		display: none;
	}

	.legend-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		min-width: 0;
	}

	.legend {
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-tight);
		min-width: 0;
	}

	:host([size='lg']) .legend {
		font-size: var(--font-size-md);
	}

	.required {
		color: var(--status-danger);
	}

	.actions {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--z-fieldset-gap);
		min-width: 0;
	}

	:host([is-horizontal]) .content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	:host([is-horizontal]) .content ::slotted(*) {
		flex: 1 1 12rem;
	}

	.error {
		color: var(--status-danger);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	.fieldset.is-invalid.is-outline {
		border-color: color-mix(in oklab, var(--status-danger) 55%, var(--border-default));
	}

	:host([is-legend-hidden]) .header {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}
`

type DisableableT = HTMLElement & { isDisabled?: boolean; disabled?: boolean }

const NATIVE_CONTROL_SELECTOR = 'button, input, select, textarea'

const isZControl = (element: Element): boolean => {
	return 'isDisabled' in element
}

const isNativeControl = (element: Element): boolean => {
	return element.matches(NATIVE_CONTROL_SELECTOR)
}

const isAlreadyDisabled = (element: DisableableT): boolean => {
	const hasProperty = typeof element.isDisabled === 'boolean'
	const isZDisabled = hasProperty ? Boolean(element.isDisabled) : element.hasAttribute('is-disabled')
	if (isZControl(element)) return isZDisabled
	return Boolean(element.disabled)
}

const setControlDisabled = (element: DisableableT, isDisabled: boolean): void => {
	if (isZControl(element)) {
		element.isDisabled = isDisabled
		return
	}
	element.disabled = isDisabled
}

const readControls = (host: HTMLElement): DisableableT[] => {
	const descendants = [...host.querySelectorAll<DisableableT>('*')]
	return descendants.filter((element) => isZControl(element) || isNativeControl(element))
}

const readSlotText = (slot: HTMLSlotElement | undefined): string => {
	if (!slot) return ''
	const nodes = slot.assignedNodes({ flatten: true })
	const texts = nodes.map((node) => node.textContent ?? '')
	return texts.join(' ').trim()
}

const resolveKindClass = (kind?: string): string => {
	if (kind === 'outline') return 'is-outline'
	if (kind === 'soft') return 'is-soft'
	return 'is-plain'
}

export const ZFieldset = c(
	(props) => {
		const host = useHost()
		const legendSlotRef = useRef<HTMLSlotElement>()
		const disabledByFieldset = useRef(new Set<DisableableT>())
		const [slottedLegend, setSlottedLegend] = useState('')
		const [hasSlottedDescription, setHasSlottedDescription] = useState(false)
		const [hasSlottedError, setHasSlottedError] = useState(false)
		const [hasActions, setHasActions] = useState(false)

		const isDisabled = Boolean(props.isDisabled)

		const disableControls = () => {
			for (const control of readControls(host.current)) {
				const isTracked = disabledByFieldset.current.has(control)
				if (isTracked) continue
				if (isAlreadyDisabled(control)) continue
				setControlDisabled(control, true)
				disabledByFieldset.current.add(control)
			}
		}

		const enableControls = () => {
			for (const control of disabledByFieldset.current) setControlDisabled(control, false)
			disabledByFieldset.current.clear()
		}

		const syncDisabled = () => {
			if (isDisabled) {
				disableControls()
				return
			}
			enableControls()
		}

		useEffect(syncDisabled, [isDisabled])

		// Controls added while the group is disabled arrive disabled too.
		useEffect(() => {
			if (!isDisabled) return
			const canObserve = typeof MutationObserver !== 'undefined'
			if (!canObserve) return
			const observer = new MutationObserver(disableControls)
			observer.observe(host.current, { childList: true, subtree: true })
			return () => observer.disconnect()
		}, [isDisabled])

		const handleLegendSlotChange = () => setSlottedLegend(readSlotText(legendSlotRef.current))

		const handleDescriptionSlotChange = (slotEvent: Event) => {
			const slot = slotEvent.target as HTMLSlotElement
			setHasSlottedDescription(slot.assignedNodes().length > 0)
		}

		const handleErrorSlotChange = (slotEvent: Event) => {
			const slot = slotEvent.target as HTMLSlotElement
			setHasSlottedError(slot.assignedNodes().length > 0)
		}

		const handleActionsSlotChange = (slotEvent: Event) => {
			const slot = slotEvent.target as HTMLSlotElement
			setHasActions(slot.assignedNodes().length > 0)
		}

		const legendText = props.legend || slottedLegend
		const hasLegend = Boolean(legendText)
		const hasDescription = Boolean(props.description) || hasSlottedDescription
		const hasError = Boolean(props.error) || hasSlottedError
		const hasHeader = hasLegend || hasDescription || hasActions

		const isNamedByAuthor = host.current.hasAttribute('aria-labelledby')
		const accessibleName = isNamedByAuthor ? undefined : legendText || undefined
		const descriptionParts = [props.description, props.error].filter(Boolean)
		const accessibleDescription = descriptionParts.join(' ') || undefined

		const fieldsetClass = ['fieldset', resolveKindClass(props.kind)]
			.concat(hasError ? ['is-invalid'] : [])
			.join(' ')

		return (
			<host
				shadowDom
				role="group"
				aria-label={accessibleName}
				aria-description={accessibleDescription}
				aria-disabled={isDisabled ? 'true' : undefined}
				aria-invalid={hasError ? 'true' : undefined}
			>
				<div class={fieldsetClass} part="fieldset">
					<div class="header" hidden={!hasHeader}>
						<div class="legend-row">
							<span class="legend" part="legend">
								<slot ref={legendSlotRef} name="legend" onslotchange={handleLegendSlotChange}>
									{props.legend}
								</slot>
								{props.isRequired && (
									<span class="required" aria-hidden="true">
										{' *'}
									</span>
								)}
							</span>
							<span class="actions">
								<slot name="actions" onslotchange={handleActionsSlotChange} />
							</span>
						</div>
						<div class="description" hidden={!hasDescription}>
							<slot name="description" onslotchange={handleDescriptionSlotChange}>
								{props.description}
							</slot>
						</div>
					</div>
					<div class="content" part="content">
						<slot onslotchange={syncDisabled} />
					</div>
					<div class="error" role="alert" hidden={!hasError}>
						<slot name="error" onslotchange={handleErrorSlotChange}>
							{props.error}
						</slot>
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			legend: String,
			description: String,
			error: String,
			kind: { type: oneOf('plain', 'outline', 'soft'), reflect: true },
			size: { type: oneOf('md', 'lg'), reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHorizontal: { type: Boolean, reflect: true },
			isLegendHidden: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-fieldset', ZFieldset)
