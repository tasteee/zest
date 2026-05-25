import { cn } from '@/lib/utils'
import * as React from 'react'
import './z-text.css'
import { createPropClassNameSwitch, createPropsClassNamesBuilder } from '@/lib/create-prop-classname-switch'

type ZColorSwitchPropsT = 'isOrange' | 'isWhite' | 'isPurple' | 'isPink' | 'isGreen'
type ZTextSizePropsT = 'isExtraSmall' | 'isSmall' | 'isMedium' | 'isLarge' | 'isExtraLarge'
type ZTextWeightPropsT = 'isThin' | 'isNormal' | 'isBold' | 'isVeryBold'

type ZTextStylePropsT = {
	isMuted?: boolean
	isItalic?: boolean
	isUnderlined?: boolean
}

type ZTextPropsT = ComponentPropsT &
	ZeroOrOneTruePropT<ZColorSwitchPropsT> &
	ZeroOrOneTruePropT<ZTextSizePropsT> &
	ZeroOrOneTruePropT<ZTextWeightPropsT> &
	ZTextStylePropsT

type ZTextComponentT = ((props: ZTextPropsT) => React.ReactElement) & {
	display: (props: ZTextPropsT) => React.ReactElement
	h1: (props: ZTextPropsT) => React.ReactElement
	h2: (props: ZTextPropsT) => React.ReactElement
	h3: (props: ZTextPropsT) => React.ReactElement
	h4: (props: ZTextPropsT) => React.ReactElement
	body: (props: ZTextPropsT) => React.ReactElement
	small: (props: ZTextPropsT) => React.ReactElement
	caption: (props: ZTextPropsT) => React.ReactElement
}

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
	isItalic: 'isItalic',
	isUnderlined: 'isUnderlined'
})

const getZTextElementProps = (props: ZTextPropsT): React.HTMLAttributes<HTMLElement> => {
	const elementProps: Record<string, unknown> = { ...props }
	const testIdentifier = props.testId

	if (testIdentifier != null) {
		elementProps['data-testid'] = testIdentifier
	}

	delete elementProps.as
	delete elementProps.children
	delete elementProps.className
	delete elementProps.style
	delete elementProps.testId
	delete elementProps.isOrange
	delete elementProps.isWhite
	delete elementProps.isPurple
	delete elementProps.isPink
	delete elementProps.isGreen
	delete elementProps.isMuted
	delete elementProps.isExtraSmall
	delete elementProps.isSmall
	delete elementProps.isMedium
	delete elementProps.isLarge
	delete elementProps.isExtraLarge
	delete elementProps.isThin
	delete elementProps.isNormal
	delete elementProps.isBold
	delete elementProps.isVeryBold
	delete elementProps.isItalic
	delete elementProps.isUnderlined

	return elementProps as React.HTMLAttributes<HTMLElement>
}

const ZTextBase = (props: ZTextPropsT): React.ReactElement => {
	const Element = props.as || 'span'

	const colorClass = getColorClass(props)
	const sizeClass = getSizeClass(props, 'isMedium')
	const weightClass = getWeightClass(props, 'isNormal')
	const styleClass = getStyleClass(props)
	const elementProps = getZTextElementProps(props)
	const classes = cn('zText', colorClass, sizeClass, weightClass, styleClass, props.className)

	return (
		<Element className={classes} style={props.style} {...elementProps}>
			{props.children}
		</Element>
	)
}

const ZTextDisplay = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='h1' className={cn('zTextDisplay', props.className)} />
}

const ZTextH1 = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='h1' className={cn('zTextH1', props.className)} />
}

const ZTextH2 = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='h2' className={cn('zTextH2', props.className)} />
}

const ZTextH3 = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='h3' className={cn('zTextH3', props.className)} />
}

const ZTextH4 = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='h4' className={cn('zTextH4', props.className)} />
}

const ZTextBody = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='p' className={cn('zTextBody', props.className)} />
}

const ZTextSmall = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='p' className={cn('zTextSmall', props.className)} />
}

const ZTextCaption = (props: ZTextPropsT): React.ReactElement => {
	return <ZTextBase {...props} as='p' className={cn('zTextCaption', props.className)} />
}

const ZText = Object.assign(ZTextBase, {
	display: ZTextDisplay,
	h1: ZTextH1,
	h2: ZTextH2,
	h3: ZTextH3,
	h4: ZTextH4,
	body: ZTextBody,
	small: ZTextSmall,
	caption: ZTextCaption
}) as ZTextComponentT

ZText.displayName = 'ZText'

export { ZText }
export type { ZTextPropsT }
