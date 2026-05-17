import { cn } from '@/lib/utils'
import * as React from 'react'
import './z-text.css'
import { createPropClassNameSwitch, createPropsClassNamesBuilder } from '@/lib/create-prop-classname-switch'

type ZColorSwitchPropsT = 'isOrange' | 'isWhite' | 'isPurple' | 'isPink' | 'isGreen'
type ZTextSizePropsT = 'isExtraSmall' | 'isSmall' | 'isMedium' | 'isLarge' | 'isExtraLarge'

type ZTextStylePropsT = {
	isMuted?: boolean
	isItalic?: boolean
	isBold?: boolean
	isVeryBold?: boolean
	isThin?: boolean
	isUnderlined?: boolean
}

type ZTextPropsT = ComponentPropsT &
	ZeroOrOneTruePropT<ZColorSwitchPropsT> &
	ZeroOrOneTruePropT<ZTextSizePropsT> &
	ZTextStylePropsT

const getColorClass = createPropClassNameSwitch({
	isOrange: 'isOrange',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isGreen: 'isGreen',
	isWhite: 'isWhite',
	isMuted: 'isMuted'
})

const getSizeClass = createPropClassNameSwitch({
	isExtraSmall: 'isExtraSmall',
	isSmall: 'isSmall',
	isMedium: 'isMedium',
	isLarge: 'isLarge',
	isExtraLarge: 'isExtraLarge'
})

const getWeightClass = createPropClassNameSwitch({
	isThin: 'isThin',
	isBold: 'isBold',
	isNormal: 'isNormal',
	isVeryBold: 'isVeryBold'
})

const getStyleClass = createPropsClassNamesBuilder({
	isMuted: 'isMuted',
	isItalic: 'isItalic',
	isUnderlined: 'isUnderlined'
})

export const ZText = (props: ZTextPropsT) => {
	const Element = props.as || 'span'

	const colorClass = getColorClass(props)
	const sizeClass = getSizeClass(props)
	const weightClass = getWeightClass(props)
	const styleClass = getStyleClass(props)
	const classes = cn('zText', colorClass, sizeClass, weightClass, styleClass, props.className)

	return (
		<Element className={classes} style={props.style}>
			{props.children}
		</Element>
	)
}

ZText.displayName = 'ZText'

ZText.display = (props: ZTextPropsT) => {
	return <ZText as='h1' {...props} className={cn('zTextDisplay', props.className)} />
}

ZText.h1 = (props: ZTextPropsT) => {
	return <ZText as='h1' {...props} className={cn('zTextH1', props.className)} />
}

ZText.h2 = (props: ZTextPropsT) => {
	return <ZText as='h2' {...props} className={cn('zTextH2', props.className)} />
}

ZText.h3 = (props: ZTextPropsT) => {
	return <ZText as='h3' {...props} className={cn('zTextH3', props.className)} />
}

ZText.h4 = (props: ZTextPropsT) => {
	return <ZText as='h4' {...props} className={cn('zTextH4', props.className)} />
}

ZText.body = (props: ZTextPropsT) => {
	return <ZText as='p' {...props} className={cn('zTextBody', props.className)} />
}

ZText.small = (props: ZTextPropsT) => {
	return <ZText as='p' {...props} className={cn('zTextSmall', props.className)} />
}

ZText.caption = (props: ZTextPropsT) => {
	return <ZText as='p' {...props} className={cn('zTextCaption', props.className)} />
}
