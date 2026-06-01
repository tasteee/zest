import './z-badge.css'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { prop } from '@/lib/prop'
import { cn } from '@/lib/utils'
import { COLOR_PROPS, KIND_PROPS } from './constants'

type BadgeColorPropsT = (typeof COLOR_PROPS)[number]
type BadgeKindPropsT = (typeof KIND_PROPS)[number]

type BaseBadgePropsT = {
	isHidden?: boolean
	label?: string
	isDisabled?: boolean
	asChild?: boolean
}

type BadgePropsT = ComponentPropsT &
	ZeroOrOneTruePropT<BadgeColorPropsT> &
	ZeroOrOneTruePropT<BadgeKindPropsT> &
	BaseBadgePropsT

const CUSTOM_PROPS = [
	'isNeutral',
	'isPurple',
	'isPink',
	'isSolid',
	'isGhost',
	'isOutline',
	'isHidden',
	'isDisabled',
	'label',
	'asChild',
	'className',
	'children'
]

const getColorClass = prop.classNameSwitch({
	isPurple: 'isPurple',
	isPink: 'isPink',
	isNeutral: 'isNeutral',
	default: 'isNeutral'
})

const getKindClass = prop.classNameSwitch({
	isSolid: 'isSolid',
	isGhost: 'isGhost',
	isOutline: 'isOutline',
	default: 'isOutline'
})

const getOtherClasses = prop.classNamesBuilder({
	isHidden: 'isHidden',
	isDisabled: 'isDisabled'
})

const getSplitProps = prop.splitter(CUSTOM_PROPS)

const badge = React.forwardRef<React.ElementRef<'span'>, BadgePropsT>((props, ref) => {
	const [customProps, otherProps] = getSplitProps(props)
	const Comp = customProps.asChild ? Slot : 'span'
	const kindClass = getKindClass(customProps)
	const colorClass = getColorClass(customProps)
	const styleClass = getOtherClasses(customProps)
	const classNames = cn('z.badge', kindClass, colorClass, styleClass, customProps.className)
	const badgeContent = customProps.label ?? props.children

	return (
		<Comp ref={ref} data-slot='badge' className={classNames} {...otherProps}>
			{badgeContent}
		</Comp>
	)
})

badge.displayName = 'z.badge'

export { badge }
export type { BadgePropsT }
