import { c, css, event, useEffect, useHost, useProp, useRef } from 'atomico'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { interactionStyles } from '../shared/interaction-styles'
import { useLocale } from '../shared/locale'
import { oneOf } from '../shared/prop-types'
import { overlayPositionProps } from '../shared/overlay'
import { warnDeprecated } from '../shared/deprecate'
import { resolveAllowedFormats, resolveColor, type ColorDetailT, type ColorFormatT } from '../shared/color'
import './z-popover'
import './z-color-panel'
import './z-color-swatch'

// z-color-picker: a trigger that floats a z-color-panel.
//
// The trigger is a swatch button by default. Any focusable
// element in [slot="trigger"] replaces it:
//
//   <z-color-picker value="#BF40BF">
//     <z-button slot="trigger">Accent</z-button>
//   </z-color-picker>
//
// The current color is published on the host as
// --z-color-value, so a custom trigger can paint itself with
// background: var(--z-color-value) and no script.
//
// The picker owns the form value and the open state; the
// panel owns editing. Panel events are caught here and sent
// again from the picker, so listeners see one element.
const styles = css`
	:host {
		display: inline-flex;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	z-popover {
		--z-overlay-padding: var(--space-3);
		--z-overlay-max-width: none;
	}

	.color-picker-trigger {
		display: inline-flex;
		align-items: center;
		height: var(--control-height-md);
		max-width: 100%;
		padding-inline: var(--space-2-5) var(--space-3-5);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: transparent;
		cursor: pointer;
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.color-picker-trigger:hover {
		border-color: var(--border-strong);
	}

	.color-picker-trigger.isOpen {
		border-color: var(--tone);
	}

	.color-picker-trigger:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.color-picker-trigger:disabled {
		opacity: var(--control-disabled-opacity);
		cursor: not-allowed;
	}

	/* The value text is monospace, so a fixed width in characters
	   keeps the trigger still while the color moves. The widths are
	   the longest string each format can print, with alpha. */
	.color-picker-trigger z-color-swatch::part(value) {
		width: 28ch;
	}
	.color-picker-trigger[data-format='hex'] z-color-swatch::part(value) {
		width: 9ch;
	}
	.color-picker-trigger[data-format='rgb'] z-color-swatch::part(value),
	.color-picker-trigger[data-format='hsl'] z-color-swatch::part(value),
	.color-picker-trigger[data-format='hsb'] z-color-swatch::part(value),
	.color-picker-trigger[data-format='hwb'] z-color-swatch::part(value) {
		width: 24ch;
	}

	.color-picker-panel {
		width: 16rem;
	}
`

export const ZColorPicker = c(
	(props) => {
		const translate = useLocale()
		const host = useHost()
		const [value, setValue] = useProp<string>('value')
		const [format, setFormat] = useProp<ColorFormatT>('format')
		const [isOpen, setIsOpen] = useProp<boolean>('isOpen')
		const defaultValue = useRef(value)
		const triggerRef = useRef<HTMLButtonElement>()

		const allowedFormats = resolveAllowedFormats(props.formats)
		const resolved = resolveColor(value, format, allowedFormats)
		const displayValue = resolved.text

		const { isFormDisabled } = useFormControl({
			value: displayValue,
			isDisabled: props.isDisabled,
			control: triggerRef,
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => {
				const isRestorable = typeof state === 'string' && state !== ''
				if (isRestorable) setValue(state as string)
			}
		})
		const isDisabled = Boolean(props.isDisabled || isFormDisabled)

		// `presets` was the name before swatches became opt-in.
		const hasLegacyPresets = Array.isArray(props.presets)
		if (hasLegacyPresets) warnDeprecated('z-color-picker presets', 'swatches')
		const swatches = hasLegacyPresets ? props.presets : props.swatches

		useEffect(() => {
			host.current.style.setProperty('--z-color-value', displayValue)
		}, [displayValue])

		// Panel events stop here and leave again from the picker.
		const handlePanelInput = (panelEvent: CustomEvent<ColorDetailT>) => {
			const isPanelEvent = panelEvent instanceof CustomEvent
			if (!isPanelEvent) return
			panelEvent.stopPropagation()
			setValue(panelEvent.detail.value)
			props.input(panelEvent.detail)
		}

		const handlePanelChange = (panelEvent: CustomEvent<ColorDetailT>) => {
			panelEvent.stopPropagation()
			setValue(panelEvent.detail.value)
			props.change(panelEvent.detail)
		}

		const handlePanelFormatChange = (panelEvent: CustomEvent<{ value: string; format: ColorFormatT }>) => {
			panelEvent.stopPropagation()
			setFormat(panelEvent.detail.format)
			setValue(panelEvent.detail.value)
			props.formatchange(panelEvent.detail)
		}

		// A native ClipboardEvent from the value field is also
		// called "copy"; only the panel's own event is relayed.
		const handlePanelCopy = (panelEvent: CustomEvent<{ value: string }>) => {
			const isPanelEvent = panelEvent instanceof CustomEvent
			if (!isPanelEvent) return
			panelEvent.stopPropagation()
			props.copy(panelEvent.detail)
		}

		const handlePopoverToggle = (popoverEvent: CustomEvent<{ open: boolean }>) => {
			popoverEvent.stopPropagation()
			setIsOpen(popoverEvent.detail.open)
			props.toggle(popoverEvent.detail)
		}

		// The value is the trigger's only text, so a bare
		// aria-label would hide it. Name what is colored, then
		// say what it is now.
		const providedLabel = props.label || host.current?.getAttribute('aria-label')
		const triggerLabel = providedLabel ? `${providedLabel}, ${displayValue}` : undefined
		const triggerClass = isOpen ? 'color-picker-trigger isOpen' : 'color-picker-trigger'
		const placement = props.placement || 'bottom-start'

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<z-popover
					placement={placement}
					offset={props.offset ?? 6}
					label={translate('chooseColor')}
					isOpen={Boolean(isOpen)}
					isDisabled={isDisabled}
					tone={props.tone}
					ontoggle={handlePopoverToggle}
				>
					<slot name="trigger" slot="trigger">
						<button ref={triggerRef} type="button" class={triggerClass} data-format={resolved.format} disabled={isDisabled} aria-label={triggerLabel}>
							<z-color-swatch value={displayValue}></z-color-swatch>
						</button>
					</slot>
					<z-color-panel
						class="color-picker-panel"
						value={displayValue}
						format={resolved.format}
						formats={props.formats}
						swatches={swatches}
						tone={props.tone}
						hasAlpha={props.hasAlpha}
						hasEyedropper={props.hasEyedropper}
						isChannelsHidden={props.isChannelsHidden}
						isCopyHidden={props.isCopyHidden}
						isDisabled={isDisabled}
						oninput={handlePanelInput}
						onchange={handlePanelChange}
						onformatchange={handlePanelFormatChange}
						oncopy={handlePanelCopy}
					></z-color-panel>
				</z-popover>
			</host>
		)
	},
	{
		props: {
			...overlayPositionProps,
			value: { type: String, reflect: true },
			format: { type: oneOf('hex', 'rgb', 'hsl', 'hsb', 'hwb', 'oklch', 'oklab', 'lch', 'lab', 'p3'), reflect: true },
			formats: { type: Array },
			swatches: { type: Array },
			presets: { type: Array },
			name: { type: String, reflect: true },
			label: String,
			hasAlpha: { type: Boolean, reflect: true },
			hasEyedropper: { type: Boolean, reflect: true },
			isChannelsHidden: { type: Boolean, reflect: true },
			isCopyHidden: { type: Boolean, reflect: true },
			isOpen: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			input: event<ColorDetailT>({ bubbles: true, composed: true }),
			change: event<ColorDetailT>({ bubbles: true, composed: true }),
			formatchange: event<{ value: string; format: ColorFormatT }>({ bubbles: true, composed: true }),
			copy: event<{ value: string }>({ bubbles: true, composed: true }),
			toggle: event<{ open: boolean }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-color-picker', ZColorPicker)
