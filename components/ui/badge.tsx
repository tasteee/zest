import './z-badge.css'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { createPropClassNameSwitch, createPropsClassNamesBuilder } from '@/lib/prop'
import { cn } from '@/lib/utils'
import { COLOR_PROPS, KIND_PROPS } from './constants'

type BadgeColorPropsT = (typeof COLOR_PROPS)[number]
type BadgeKindPropsT = (typeof KIND_PROPS)[number]

type BaseBadgePropsT = {
	isHidden?: boolean
	label?: string
}

type BadgePropsT = ComponentPropsT &
	ZeroOrOneTruePropT<BadgeColorPropsT> &
	ZeroOrOneTruePropT<BadgeKindPropsT> &
	BaseBadgePropsT

const getColorClass = createPropClassNameSwitch({
	isOrange: 'isOrange',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isGreen: 'isGreen',
	isWhite: 'isWhite'
})

const getKindClass = createPropClassNameSwitch({
	isSolid: 'isSolid',
	isGhost: 'isGhost',
	isOutline: 'isOutline'
})

const getOtherClasses = createPropsClassNamesBuilder({
	isHidden: 'isHidden',
	isDisabled: 'isDisabled'
})

const badge = React.forwardRef<React.ElementRef<'span'>, BadgePropsT>((props, ref) => {
	const {
		asChild = false,
		children,
		className,
		isGhost,
		isGreen,
		isHidden,
		isOrange,
		isOutline,
		isPink,
		isPurple,
		isSolid,
		isWhite,
		label,
		...badgeProps
	} = props
	const Comp = asChild ? Slot : 'span'
	const kindClass = getKindClass(props, 'isOutline')
	const colorClass = getColorClass(props, 'isWhite')
	const styleClass = getOtherClasses(props)
	const classNames = cn('z.badge', kindClass, colorClass, styleClass, className)

	return (
		<Comp ref={ref} data-slot='badge' className={classNames} {...badgeProps}>
			{label ?? children}
		</Comp>
	)
})

badge.displayName = 'z.badge'

export { badge }
export type { BadgePropsT }
