'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { prop } from '@/lib/prop'
import { cn } from '@/lib/utils'
import './z-toggle.css'

type ToggleColorPropsT = 'isNeutral' | 'isPurple' | 'isPink'
type ToggleSizePropsT = 'isSmall' | 'isMedium' | 'isLarge'
type ToggleKindPropsT = 'isGhost' | 'isOutlined'

type ToggleOtherPropsT = {
	isDisabled?: boolean
	isHidden?: boolean
	isPressed?: boolean
	isDefaultPressed?: boolean
}

type IgnoredPropsT = 'disabled' | 'pressed' | 'defaultPressed'
type ToggleRootPropsT = React.ComponentProps<typeof TogglePrimitive.Root>
type BaseTogglePropsT = Omit<ToggleRootPropsT, IgnoredPropsT>

type TogglePropsT = BaseTogglePropsT &
	ZeroOrOneTruePropT<ToggleColorPropsT> &
	ZeroOrOneTruePropT<ToggleSizePropsT> &
	ZeroOrOneTruePropT<ToggleKindPropsT> &
	ToggleOtherPropsT

const CUSTOM_PROPS = [
	'isNeutral',
	'isPurple',
	'isPink',
	'isSmall',
	'isMedium',
	'isLarge',
	'isGhost',
	'isOutlined',
	'isDisabled',
	'isHidden',
	'isPressed',
	'isDefaultPressed'
]

const getColorClass = prop.classNameSwitch({
	isPurple: 'isPurple',
	isPink: 'isPink',
	isNeutral: 'isNeutral',
	default: 'isNeutral'
})

const getSizeClass = prop.classNameSwitch({
	isSmall: 'isSmall',
	isMedium: 'isMedium',
	isLarge: 'isLarge',
	default: 'isMedium'
})

const getKindClass = prop.classNameSwitch({
	isGhost: 'isGhost',
	isOutlined: 'isOutlined',
	default: 'isGhost'
})

const getStyleClass = prop.classNamesBuilder({
	isDisabled: 'isDisabled',
	isHidden: 'isHidden'
})

const getMappedProps = prop.nameMapper({
	isDisabled: 'disabled',
	isPressed: 'pressed',
	isDefaultPressed: 'defaultPressed'
})

const getSplitProps = prop.splitter(CUSTOM_PROPS)

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, TogglePropsT>((props, ref) => {
	const [customProps, otherProps] = getSplitProps(props)
	const colorClass = getColorClass(customProps)
	const sizeClass = getSizeClass(customProps)
	const kindClass = getKindClass(customProps)
	const styleClass = getStyleClass(customProps)
	const mappedProps = getMappedProps(customProps)
	const classNames = cn('z-toggle', kindClass, colorClass, sizeClass, styleClass, props.className)

	return <TogglePrimitive.Root ref={ref} data-slot='toggle' className={classNames} {...mappedProps} {...otherProps} />
})

Toggle.displayName = 'z.toggle'

export { Toggle }
export type { TogglePropsT, ToggleColorPropsT, ToggleSizePropsT, ToggleKindPropsT }
