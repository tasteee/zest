import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, describedBy, renderDescriptions, srOnlyStyles, useAccessibleName } from '../shared/accessible'
import { c, css, event, useHost, useProp, useRef, useEffect } from 'atomico'
import { themedScrollbarStyles } from '../shared/scrollbar-styles'
import { oneOf } from '../shared/prop-types'

/*
 * z-textarea, multi-line text field. Same hairline-to-accent focus treatment
 * as z-input. Supports auto-grow (is-auto-resize) so the field tracks content
 * height without a scrollbar.
 */
const styles = css`
	.field:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }

	:host {
		display: block;
		width: 100%;
	}

	:host([is-hidden]) {
		display: none;
	}

	.field {
		display: block;
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: inherit;
		line-height: var(--line-height-normal);
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
		--tone: var(--accent-primary);
	}

	/* sizes — same scale as z-input */
	.field.is-sm {
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
	}
	.field.is-md {
		padding: var(--space-3) var(--space-3-5);
		font-size: var(--font-size-sm);
	}
	.field.is-lg {
		padding: var(--space-3-5) var(--space-4);
		font-size: var(--font-size-md);
	}

	:host([tone='secondary']) .field {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) .field {
		--tone: var(--accent-tertiary);
	}

	textarea {
		display: block;
		width: 100%;
		box-sizing: border-box;
		resize: vertical;
		appearance: none;
		background: transparent;
		border: none;
		outline: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0;
		min-height: 1.6em;
	}

	textarea.is-auto-resize {
		resize: none;
		overflow: hidden;
	}

	textarea::placeholder {
		color: var(--text-secondary);
		user-select: none;
		-webkit-user-select: none;
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.field.is-focused {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
	}

	.field.is-invalid {
		border-color: var(--status-danger);
		--tone: var(--status-danger);
	}

	.field.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}
`

const autoGrow = (el: HTMLTextAreaElement) => {
	el.style.height = 'auto'
	el.style.height = `${el.scrollHeight}px`
}

const resolveSizeClass = (props: any): string => {
	if (props.size === 'sm') return 'is-sm'
	if (props.size === 'lg') return 'is-lg'
	return 'is-md'
}

export const ZTextarea = c(
	(props) => {
		const host = useHost()
		const accessibleName = useAccessibleName(props.label)
		const textareaRef = useRef<HTMLTextAreaElement>()
		const [value, setValue] = useProp<string>('value')
		const defaultValue = useRef(value ?? '')
		const committedValue = useRef(value ?? '')
		const [isFocused, setIsFocused] = useProp<boolean>('isFocused')
		const { isFormDisabled } = useFormControl({
			value: value ?? '',
			isDisabled: props.isDisabled,
			isReadonly: props.isReadonly,
			control: textareaRef,
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => { if (typeof state === 'string') setValue(state) }
		})
		const isDisabled = props.isDisabled || isFormDisabled
		useEffect(() => {
			const textarea = textareaRef.current
			if (!textarea) return
			if (props.isAutoResize) autoGrow(textarea)
			else textarea.style.removeProperty('height')
		}, [value, props.isAutoResize, props.rows, props.size])
		useEffect(() => {
			const textarea = textareaRef.current
			if (!textarea || !props.isAutoResize || typeof ResizeObserver === 'undefined') return
			let previousWidth = -1
			const observer = new ResizeObserver(([entry]) => {
				if (!entry || entry.contentRect.width === previousWidth) return
				previousWidth = entry.contentRect.width
				autoGrow(textarea)
			})
			observer.observe(textarea)
			return () => observer.disconnect()
		}, [props.isAutoResize])

		const fieldClass = ['field', resolveSizeClass(props)]
			.concat(isFocused ? ['is-focused'] : [])
			.concat(props.isInvalid ? ['is-invalid'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.join(' ')

		const textareaClass = props.isAutoResize ? 'is-auto-resize' : ''

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div class={fieldClass}>
					<textarea
						ref={textareaRef}
						class={textareaClass}
						value={value ?? ''}
						placeholder={props.placeholder}
						rows={props.rows || 3}
						disabled={isDisabled}
						readonly={props.isReadonly}
						required={props.isRequired}
						aria-label={accessibleName}
						aria-describedby={describedBy(props.description, props.error)}
						aria-invalid={props.isInvalid || props.error ? 'true' : undefined}
						onfocus={() => { committedValue.current = value ?? ''; setIsFocused(true) }}
						onblur={(e: Event) => {
							setIsFocused(false)
							// Read the control, not the render closure: a keystroke and a blur
							// in the same task would otherwise compare against a stale value.
							const next = (e.target as HTMLInputElement).value
							if (next !== committedValue.current) { committedValue.current = next; props.change({ value: next }) }
						}}
						onchange={(e: Event) => e.stopPropagation()}
						oninput={(e: any) => {
							e.stopPropagation()
							const next = e.target.value
							setValue(next)
							if (props.isAutoResize) autoGrow(e.target)
							props.input({ value: next })
						}}
					/>
				</div>
				{renderDescriptions(props.description, props.error)}
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: String, reflect: true },
			label: String,
			placeholder: String,
			name: { type: String, reflect: true },
			rows: Number,
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isFocused: { type: Boolean, reflect: true },
			isInvalid: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isReadonly: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isAutoResize: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: string }>({ bubbles: true, composed: true }),
			change: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles: [themedScrollbarStyles, styles, interactionStyles, srOnlyStyles],
		form: true
	}
)

defineFormElement('z-textarea', ZTextarea)
