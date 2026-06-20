import { c, event, useProp } from 'atomico'
import { toggleVariantProps, resolveToggleButtonClass } from '../shared/toggle-schema'
import { toggleStyles } from '../shared/toggle-styles'

export const ZToggle = c(
	(props) => {
		const [isPressed, setIsPressed] = useProp<boolean>('isPressed')
		const buttonClass = resolveToggleButtonClass(props)

		return (
			<host shadowDom>
				<button
					type="button"
					class={buttonClass}
					data-state={isPressed ? 'on' : 'off'}
					aria-pressed={isPressed ? 'true' : 'false'}
					disabled={props.isDisabled}
					onclick={() => {
						const nextPressed = !isPressed
						setIsPressed(nextPressed)
						props.press({ pressed: nextPressed })
					}}
				>
					<slot />
				</button>
			</host>
		)
	},
	{
		props: {
			...toggleVariantProps,
			isPressed: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			press: event<{ pressed: boolean }>({ bubbles: true, composed: true })
		},
		styles: toggleStyles
	}
)

customElements.define('z-toggle', ZToggle)
