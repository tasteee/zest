import { cn } from '@/lib/utils'
import * as React from 'react'
import './z-text.css'

type ComponentPropsT = React.HTMLAttributes<HTMLElement> & {
	as?: React.ElementType
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

type ZTextPropsT = ComponentPropsT & {
	isOrange?: boolean
	isWhite?: boolean
	isPurple?: boolean
	isPink?: boolean
	isGreen?: boolean
	isSmall?: boolean
	isMedium?: boolean
	isLarge?: boolean
	isExtraLarge?: boolean
	isMuted?: boolean
	isItalic?: boolean
	isBold?: boolean
	isVeryBold?: boolean
	isThin?: boolean
	isUnderlined?: boolean
}

const getColorClass = (props: ZTextPropsT): string => {
	if (props.isOrange) return 'isOrange'
	if (props.isPurple) return 'isPurple'
	if (props.isPink) return 'isPink'
	if (props.isGreen) return 'isGreen'
	if (props.isWhite) return 'isWhite'
	if (props.isMuted) return 'isMuted'
	return ''
}

const getSizeClass = (props: ZTextPropsT): string => {
	if (props.isSmall) return 'isSmall'
	if (props.isMedium) return 'isMedium'
	if (props.isLarge) return 'isLarge'
	if (props.isExtraLarge) return 'isExtraLarge'
	return ''
}

const getWeightClass = (props: ZTextPropsT): string => {
	if (props.isThin) return 'isThin'
	if (props.isBold) return 'isBold'
	if (props.isVeryBold) return 'isVeryBold'
	return ''
}

export const ZText = (props: ZTextPropsT) => {
	const Element = props.as || 'span'

	const colorClass = getColorClass(props)
	const sizeClass = getSizeClass(props)
	const weightClass = getWeightClass(props)
	const italicClass = props.isItalic ? 'isItalic' : ''
	const underlinedClass = props.isUnderlined ? 'isUnderlined' : ''
	const classes = cn('zText', colorClass, sizeClass, weightClass, italicClass, underlinedClass, props.className)
	const styles = { ...props.style }

	return (
		<Element className={classes} style={styles}>
			{props.children}
		</Element>
	)
}
