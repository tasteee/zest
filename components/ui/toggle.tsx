'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { createPropClassNameSwitch, createPropsClassNamesBuilder } from '@/lib/create-prop-classname-switch'
import { cn } from '@/lib/utils'
import './toggle.css'

type ToggleColorPropsT = 'isWhite' | 'isGreen' | 'isPurple' | 'isPink' | 'isOrange'
type ToggleSizePropsT = 'isSmall' | 'isMedium' | 'isLarge'
type ToggleKindPropsT = 'isGhost' | 'isOutlined'

type ToggleOtherPropsT = {
	isDisabled?: boolean
	isHidden?: boolean
	isPressed?: boolean
	isDefaultPressed?: boolean
}

type TogglePropsT = Omit<React.ComponentProps<typeof TogglePrimitive.Root>, 'pressed' | 'defaultPressed' | 'disabled'> &
	ZeroOrOneTruePropT<ToggleColorPropsT> &
	ZeroOrOneTruePropT<ToggleSizePropsT> &
	ZeroOrOneTruePropT<ToggleKindPropsT> &
	ToggleOtherPropsT

const getColorClass = createPropClassNameSwitch({
	isOrange: 'isOrange',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isGreen: 'isGreen',
	isWhite: 'isWhite'
})

const getSizeClass = createPropClassNameSwitch({
	isSmall: 'isSmall',
	isMedium: 'isMedium',
	isLarge: 'isLarge'
})

const getKindClass = createPropClassNameSwitch({
	isGhost: 'isGhost',
	isOutlined: 'isOutlined'
})

const getStyleClass = createPropsClassNamesBuilder({
	isDisabled: 'isDisabled',
	isHidden: 'isHidden'
})

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, TogglePropsT>((props, ref) => {
	const {
		className,
		isDefaultPressed,
		isDisabled,
		isGhost,
		isGreen,
		isHidden,
		isLarge,
		isMedium,
		isOrange,
		isOutlined,
		isPink,
		isPressed,
		isPurple,
		isSmall,
		isWhite,
		...toggleProps
	} = props

	const colorClass = getColorClass(props) || 'isWhite'
	const sizeClass = getSizeClass(props) || 'isMedium'
	const kindClass = getKindClass(props) || 'isGhost'
	const styleClass = getStyleClass(props)
	const classNames = cn('zToggle', kindClass, colorClass, sizeClass, styleClass, className)

	return (
		<TogglePrimitive.Root
			ref={ref}
			data-slot='toggle'
			className={classNames}
			disabled={isDisabled}
			pressed={isPressed}
			defaultPressed={isDefaultPressed}
			{...toggleProps}
		/>
	)
})

Toggle.displayName = 'z.toggle'

export { Toggle }
export type { TogglePropsT, ToggleColorPropsT, ToggleSizePropsT, ToggleKindPropsT }
