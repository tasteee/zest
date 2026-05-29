'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { createPropClassNameSwitch, createPropsClassNamesBuilder } from '@/lib/prop'
import { cn } from '@/lib/utils'
import './checkbox.css'

type CheckboxColorPropsT = 'isWhite' | 'isGreen' | 'isPurple' | 'isPink' | 'isOrange'

type CheckboxOtherPropsT = {
	isChecked?: boolean
	isDisabled?: boolean
	isHidden?: boolean
	label?: string
	description?: string
	onChange?: (isNowChecked: boolean, event: React.SyntheticEvent<HTMLButtonElement> | undefined) => void
	onCheckedChange?: (checked: boolean | 'indeterminate') => void
}

type CheckboxPropsT = Omit<
	React.ComponentProps<typeof CheckboxPrimitive.Root>,
	'checked' | 'defaultChecked' | 'disabled' | 'color' | 'onChange' | 'onCheckedChange'
> &
	ZeroOrOneTruePropT<CheckboxColorPropsT> &
	CheckboxOtherPropsT

const getColorClass = createPropClassNameSwitch({
	isOrange: 'isOrange',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isGreen: 'isGreen',
	isWhite: 'isWhite'
})

const getStyleClass = createPropsClassNamesBuilder({
	isDisabled: 'isDisabled',
	isHidden: 'isHidden'
})

const hasColorProp = (props: CheckboxPropsT) => {
	return props.isGreen || props.isPurple || props.isPink || props.isOrange || props.isWhite
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxPropsT>((props, ref) => {
	const {
		'aria-describedby': ariaDescribedBy,
		className,
		description,
		id,
		isChecked,
		isDisabled,
		isGreen,
		isHidden,
		isOrange,
		isPink,
		isPurple,
		isWhite,
		label,
		onChange,
		onCheckedChange,
		onClick,
		...checkboxProps
	} = props
	const generatedId = React.useId()
	const hasLabel = label !== undefined
	const hasDescription = description !== undefined
	const checkboxId = id ?? (hasLabel || hasDescription ? generatedId : undefined)
	const descriptionId = hasDescription && checkboxId ? `${checkboxId}-description` : undefined
	const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined
	const colorClass = getColorClass(props)
	const styleClass = getStyleClass({ isDisabled, isHidden })
	const changeEventRef = React.useRef<React.SyntheticEvent<HTMLButtonElement> | undefined>(undefined)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		changeEventRef.current = event
		onClick?.(event)
	}
	const handleCheckedChange = (checked: boolean | 'indeterminate') => {
		onCheckedChange?.(checked)
		onChange?.(checked === true, changeEventRef.current)
		changeEventRef.current = undefined
	}
	const checkbox = (
		<CheckboxPrimitive.Root
			ref={ref}
			id={checkboxId}
			aria-describedby={describedBy}
			data-slot='checkbox'
			checked={isChecked}
			disabled={isDisabled}
			className={cn('zCheckbox', hasColorProp(props) ? colorClass : 'isWhite', styleClass, className)}
			onCheckedChange={handleCheckedChange}
			onClick={handleClick}
			{...checkboxProps}
		>
			<CheckboxPrimitive.Indicator data-slot='checkbox-indicator' className='zCheckboxIndicator'>
				<CheckIcon className='zCheckboxIcon' />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)

	if (!hasLabel && !hasDescription) return checkbox

	return (
		<div className={cn('zCheckboxField', hasDescription && 'hasDescription', isDisabled && 'isDisabled')}>
			{checkbox}
			<div className='zCheckboxText'>
				{hasLabel ? (
					<label className='zCheckboxLabel' htmlFor={checkboxId}>
						{label}
					</label>
				) : null}
				{hasDescription ? (
					<p className='zCheckboxDescription' id={descriptionId}>
						{description}
					</p>
				) : null}
			</div>
		</div>
	)
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
export type { CheckboxPropsT }
