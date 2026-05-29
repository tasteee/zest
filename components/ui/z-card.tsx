import { cn } from '@/lib/utils'
import { prop } from '@/lib/prop'
import { ZBox } from './z-box'
import './z-card.css'

type CardColorPropsT = 'isNeutral' | 'isPurple' | 'isPink'

type CardOtherPropsT = {
	isHidden?: boolean
}

type ZCardPropsT = ComponentPropsT & ZeroOrOneTruePropT<CardColorPropsT> & CardOtherPropsT

const CUSTOM_PROPS = ['isNeutral', 'isPurple', 'isPink', 'isHidden']

const getColorClass = prop.classNameSwitch({
	isPurple: 'isPurple',
	isPink: 'isPink',
	isNeutral: 'isNeutral',
	default: 'isNeutral'
})

const getStyleClass = prop.classNamesBuilder({
	isHidden: 'isHidden'
})

const getSplitProps = prop.splitter(CUSTOM_PROPS)

export const ZCard = (props: ZCardPropsT) => {
	const [customProps, otherProps] = getSplitProps(props)
	const colorClass = getColorClass(customProps)
	const styleClass = getStyleClass(customProps)
	const classes = cn('z-card', colorClass, styleClass, props.className)

	return (
		<ZBox className={classes} {...otherProps}>
			{props.children}
		</ZBox>
	)
}

export type { ZCardPropsT, CardColorPropsT }
