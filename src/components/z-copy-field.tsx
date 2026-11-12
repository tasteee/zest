import { c, css, event, useEffect, useRef, useState } from 'atomico'
import { defineElement } from '../shared/define-element'
import { interactionStyles } from '../shared/interaction-styles'
import { useLocale } from '../shared/locale'

const styles = css`
	:host { display: block; }
	:host([is-hidden]) { display: none; }
	.copyField { display: flex; align-items: stretch; border: 1px solid var(--border-default); border-radius: var(--radius-md); overflow: hidden; }
	.value { min-width: 0; flex: 1; border: 0; background: transparent; color: var(--text-primary); font: inherit; padding: var(--space-3); }
	.copyButton { border: 0; border-inline-start: 1px solid var(--border-default); background: var(--surface-default); color: var(--text-primary); font: inherit; padding-inline: var(--space-4); cursor: pointer; }
	.copyButton:hover { background: var(--surface-subtle); }
	.copyButton:focus-visible, .value:focus-visible { outline: 2px solid var(--border-focus); outline-offset: -2px; }
`

export const ZCopyField = c(
	(props) => {
		const translate = useLocale()
		const inputRef = useRef<HTMLInputElement>()
		const [wasCopied, setWasCopied] = useState(false)
		useEffect(() => {
			setWasCopied(false)
		}, [props.value])

		useEffect(() => {
			if (!wasCopied) return
			const timeout = setTimeout(() => { setWasCopied(false) }, 1600)
			return () => { clearTimeout(timeout) }
		}, [wasCopied])

		const copyLabel = wasCopied ? translate('copied') : translate('copy')
		const accessibleLabel = props.label || translate('copyValue')

		const handleCopy = async () => {
			const hasClipboard = Boolean(navigator.clipboard)
			if (!hasClipboard) {
				inputRef.current?.select()
				return
			}
			try {
				await navigator.clipboard.writeText(props.value || '')
				setWasCopied(true)
				props.copy({ value: props.value || '' })
			} catch (copyError) {
				console.warn('z-copy-field: copy failed', copyError)
				inputRef.current?.select()
			}
		}

		return (
			<host shadowDom>
				<div class="copyField">
					<input ref={inputRef} class="value" value={props.value || ''} readonly aria-label={accessibleLabel} />
					<button class="copyButton" type="button" onclick={handleCopy} aria-live="polite">{copyLabel}</button>
				</div>
			</host>
		)
	},
	{
		props: {
			value: String,
			label: String,
			isHidden: { type: Boolean, reflect: true },
			copy: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-copy-field', ZCopyField)
