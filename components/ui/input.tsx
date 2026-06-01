'use client'

import * as React from 'react'
import * as Phosphor from '@phosphor-icons/react'

import { cn } from '@/lib/utils'
import { prop } from '@/lib/prop'
import './z-input.css'

type InputFocusColorT = 'neutral' | 'purple' | 'pink'
type InputSizePropsT = 'isExtraSmall' | 'isSmall' | 'isMedium' | 'isLarge' | 'isExtraLarge' | 'isIcon'

type InputVariantOptionsT = {
	focusColor?: InputFocusColorT | null
} & ZeroOrOneTruePropT<InputSizePropsT>

type InputPropsT = React.ComponentProps<'input'> & InputVariantOptionsT

const CUSTOM_PROPS = ['isExtraSmall', 'isSmall', 'isMedium', 'isLarge', 'isExtraLarge', 'isIcon', 'focusColor', 'className']

const getSizeClass = prop.classNameSwitch({
	isExtraSmall: 'isExtraSmall',
	isSmall: 'isSmall',
	isMedium: 'isMedium',
	isLarge: 'isLarge',
	isExtraLarge: 'isExtraLarge',
	isIcon: 'isIcon',
	default: 'isMedium'
})

const getFocusColorClass = prop.classNameSwitch({
	neutral: 'isFocusNeutral',
	purple: 'isFocusPurple',
	pink: 'isFocusPink',
	default: 'isFocusNeutral'
})

const getSplitProps = prop.splitter(CUSTOM_PROPS)

const inputVariants = (options?: InputVariantOptionsT): string => {
	const focusColor = options?.focusColor ?? 'neutral'
	const sizeClass = getSizeClass(options ?? {})
	const focusColorClass = getFocusColorClass({ [focusColor]: true })

	return cn('zInput', sizeClass, focusColorClass)
}

const dispatchInputChange = (input: HTMLInputElement): void => {
	input.dispatchEvent(new Event('input', { bubbles: true }))
	input.dispatchEvent(new Event('change', { bubbles: true }))
}

const Input = (props: InputPropsT) => {
	const [customProps, otherProps] = getSplitProps(props)
	const inputProps = otherProps as React.ComponentProps<'input'>
	const inputRef = React.useRef<HTMLInputElement>(null)
	const inputType = inputProps.type
	const inputClassNames = cn(inputVariants(customProps), customProps.className)
	const numberInputWrapperClassNames = cn('zInputNumber', getSizeClass(customProps), customProps.className)

	const handleStepNumberInput = (direction: 'up' | 'down'): void => {
		const input = inputRef.current
		const hasInputUnavailable = input === null || inputProps.disabled === true || inputProps.readOnly === true

		if (hasInputUnavailable) return

		input.focus()
		const shouldStepUp = direction === 'up'

		try {
			if (shouldStepUp) {
				input.stepUp()
				dispatchInputChange(input)
				return
			}

			input.stepDown()
		} catch {
			const stepValue = Number(input.step) || 1
			const currentValue = Number(input.value) || 0
			const nextValue = shouldStepUp ? currentValue + stepValue : currentValue - stepValue
			input.value = String(nextValue)
		}

		dispatchInputChange(input)
	}

	const isNumberInput = inputType === 'number'
	if (isNumberInput) {
		return (
			<div className={numberInputWrapperClassNames} data-slot='number-input'>
				<input
					ref={inputRef}
					type={inputType}
					data-slot='input'
					className={cn(inputVariants(customProps), 'zInputNumberControl')}
					{...inputProps}
				/>
				<div className='zInputStepper'>
					<button
						type='button'
						aria-label='Increment value'
						tabIndex={-1}
						disabled={inputProps.disabled || inputProps.readOnly}
						className='zInputStepperButton'
						onMouseDown={(mouseEvent) => mouseEvent.preventDefault()}
						onClick={() => handleStepNumberInput('up')}
					>
						<Phosphor.CaretUpIcon size={12} weight='bold' />
					</button>
					<button
						type='button'
						aria-label='Decrement value'
						tabIndex={-1}
						disabled={inputProps.disabled || inputProps.readOnly}
						className='zInputStepperButton'
						onMouseDown={(mouseEvent) => mouseEvent.preventDefault()}
						onClick={() => handleStepNumberInput('down')}
					>
						<Phosphor.CaretDownIcon size={12} weight='bold' />
					</button>
				</div>
			</div>
		)
	}

	return <input type={inputType} data-slot='input' className={inputClassNames} {...inputProps} />
}

export { Input, inputVariants }
export type { InputPropsT }
