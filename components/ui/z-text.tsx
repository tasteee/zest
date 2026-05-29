import { cn } from '@/lib/utils'
import * as React from 'react'
import './z-text.css'
import { prop } from '@/lib/prop'

type ZTextStylePropsT = {
	isMuted?: boolean
	isItalic?: boolean
	isUnderlined?: boolean
}

type ZTextPropsT = ComponentPropsT &
	ZeroOrOneTruePropT<FontT.ColorPropNames> &
	ZeroOrOneTruePropT<FontT.SizePropNames> &
	ZeroOrOneTruePropT<FontT.WeightPropNames> &
	ZeroOrOneTruePropT<FontT.StylePropNames> &
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
	displayName: string
}

const getColorClass = prop.classNameSwitch({
	isOrange: 'isOrange',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isGreen: 'isGreen',
	isWhite: 'isWhite',
	isMuted: 'isMuted',
	default: 'isWhite'
})

const getSizeClass = prop.classNameSwitch({
	isExtraSmall: 'isExtraSmall',
	isSmall: 'isSmall',
	isMedium: 'isMedium',
	isLarge: 'isLarge',
	isExtraLarge: 'isExtraLarge',
	default: 'isMedium'
})

const getWeightClass = prop.classNameSwitch({
	isThin: 'isThin',
	isBold: 'isBold',
	isNormal: 'isNormal',
	isVeryBold: 'isVeryBold',
	default: 'isNormal'
})

const getStyleClass = prop.classNamesBuilder({
	isItalic: 'isItalic',
	isUnderlined: 'isUnderlined'
})

const CUSTOM_PROPS = [
	'isWhite',
	'isGreen',
	'isPurple',
	'isPink',
	'isOrange',
	'isMuted',
	'isExtraSmall',
	'isSmall',
	'isMedium',
	'isLarge',
	'isExtraLarge',
	'isThin',
	'isNormal',
	'isBold',
	'isVeryBold',
	'isItalic',
	'isUnderlined',
	'testId',
	'as'
]

const getSplitProps = prop.splitter(CUSTOM_PROPS)

const getMappedProps = prop.nameMapper({
	testId: 'data-testid'
})

const ZTextBase = (props: ZTextPropsT): React.ReactElement => {
	const [customProps, otherProps] = getSplitProps(props)
	const Element = customProps.as || 'span'

	const mappedProps = getMappedProps(customProps)
	const colorClass = getColorClass(customProps)
	const sizeClass = getSizeClass(customProps)
	const weightClass = getWeightClass(customProps)
	const styleClass = getStyleClass(customProps)
	const classes = cn('zText', colorClass, sizeClass, weightClass, styleClass, customProps.className)

	return (
		<Element className={classes} style={props.style} {...mappedProps} {...otherProps}>
			{props.children}
		</Element>
	)
}

const configurableComponent = (options: AnyObjectT): React.FC<ZTextPropsT> => {
	const Component = options.component
	const { component, ...baseProps } = options

	return (props: ZTextPropsT): React.ReactElement => {
		const className = cn(baseProps.className, props.className)
		return <Component {...baseProps} {...props} className={className} />
	}
}

const ZTextDisplay = configurableComponent({
	component: ZTextBase,
	className: 'zTextDisplay',
	as: 'h1'
})

const ZTextH1 = configurableComponent({
	component: ZTextBase,
	className: 'zTextH1',
	as: 'h1'
})

const ZTextH2 = configurableComponent({
	component: ZTextBase,
	className: 'zTextH2',
	as: 'h2'
})

const ZTextH3 = configurableComponent({
	component: ZTextBase,
	className: 'zTextH3',
	as: 'h3'
})

const ZTextH4 = configurableComponent({
	component: ZTextBase,
	className: 'zTextH4',
	as: 'h4'
})

const ZTextBody = configurableComponent({
	component: ZTextBase,
	className: 'zTextBody',
	as: 'p'
})

const ZTextSmall = configurableComponent({
	component: ZTextBase,
	className: 'zTextSmall',
	as: 'p'
})

const ZTextCaption = configurableComponent({
	component: ZTextBase,
	className: 'zTextCaption',
	as: 'p'
})

const ZText = Object.assign(ZTextBase, {
	display: ZTextDisplay,
	h1: ZTextH1,
	h2: ZTextH2,
	h3: ZTextH3,
	h4: ZTextH4,
	body: ZTextBody,
	small: ZTextSmall,
	caption: ZTextCaption,
	displayName: 'ZText'
}) as ZTextComponentT

export { ZText }
export type { ZTextPropsT }
