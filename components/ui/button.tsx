import React from 'react'
import { cn } from '@/lib/utils'
import { createPropClassNameSwitch, createPropsClassNamesBuilder } from '@/lib/create-prop-classname-switch'
import './z-button.css'

type ZColorSwitchPropsT = 'isOrange' | 'isWhite' | 'isPurple' | 'isPink' | 'isGreen'
type ZButtonSizePropsT = 'isExtraSmall' | 'isSmall' | 'isMedium' | 'isLarge' | 'isExtraLarge' | 'isIcon'
type ZButtonKindPropsT = 'isGhost' | 'isOutlined' | 'isSolid'

type ZButtonOtherPropsT = {
	isHidden?: boolean
	isDisabled?: boolean
	isLoading?: boolean
	label?: string
}

type ZButtonPropsT = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
	Omit<ComponentPropsT, 'color'> &
	ZeroOrOneTruePropT<ZColorSwitchPropsT> &
	ZeroOrOneTruePropT<ZButtonSizePropsT> &
	ZeroOrOneTruePropT<ZButtonKindPropsT> &
	ZButtonOtherPropsT

const getColorClass = createPropClassNameSwitch({
	isOrange: 'isOrange',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isGreen: 'isGreen',
	isWhite: 'isWhite'
})

const getSizeClass = createPropClassNameSwitch({
	isExtraSmall: 'isExtraSmall',
	isSmall: 'isSmall',
	isMedium: 'isMedium',
	isLarge: 'isLarge',
	isExtraLarge: 'isExtraLarge',
	isIcon: 'isIcon'
})

const getKindClass = createPropClassNameSwitch({
	isGhost: 'isGhost',
	isOutlined: 'isOutlined',
	isSolid: 'isSolid'
})

const getStyleClass = createPropsClassNamesBuilder({
	isDisabled: 'isDisabled',
	isHidden: 'isHidden',
	isLoading: 'isLoading'
})

const hasKindProp = (props: ZButtonPropsT) => {
	return props.isGhost || props.isOutlined || props.isSolid
}

const ZButton = React.forwardRef<HTMLButtonElement, ZButtonPropsT>((props, ref) => {
	const {
		as,
		children,
		className,
		disabled,
		isDisabled,
		isExtraLarge,
		isExtraSmall,
		isGreen,
		isHidden,
		isIcon,
		isLarge,
		isLoading,
		isMedium,
		isOrange,
		isOutlined,
		isPink,
		isPurple,
		isSmall,
		isSolid,
		isGhost,
		isWhite,
		label,
		testId,
		type,
		...buttonProps
	} = props

	const colorClass = getColorClass(props) ?? 'isWhite'
	const sizeClass = getSizeClass(props) ?? 'isMedium'
	const kindClass = getKindClass(props) ?? 'isOutlined'
	const styleClass = getStyleClass(props) ?? ''
	const classNames = cn('zButton', kindClass, colorClass, sizeClass, styleClass, className)

	return (
		<button
			ref={ref}
			className={classNames}
			data-testid={testId}
			disabled={disabled || isDisabled || isLoading}
			type={type ?? 'button'}
			{...buttonProps}
		>
			{isLoading ? <span className='zButtonSpinner' aria-hidden /> : null}
			{label ?? children}
		</button>
	)
})

ZButton.displayName = 'ZButton'

export { ZButton }
export type { ZButtonPropsT }
