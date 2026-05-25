'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { createPropClassNameSwitch } from '@/lib/create-prop-classname-switch'
import { cn } from '@/lib/utils'
import './toggle.css'
import './toggle-group.css'

type ToggleGroupContextT = {
	isGhost?: boolean
	isOutlined?: boolean
	isWhite?: boolean
	isGreen?: boolean
	isPurple?: boolean
	isPink?: boolean
	isOrange?: boolean
	isSmall?: boolean
	isMedium?: boolean
	isLarge?: boolean
}

type ToggleGroupRootPropsT = React.HTMLAttributes<HTMLDivElement> & {
	type?: 'single' | 'multiple'
	value?: string | string[]
	defaultValue?: string | string[]
	onValueChange?: ((value: string) => void) | ((value: string[]) => void)
	disabled?: boolean
	rovingFocus?: boolean
	orientation?: 'horizontal' | 'vertical'
	dir?: 'ltr' | 'rtl'
	loop?: boolean
}

type ToggleGroupPropsT = ToggleGroupRootPropsT & ToggleGroupContextT

type ToggleGroupItemPropsT = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleGroupContextT

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

const ToggleGroupContext = React.createContext<ToggleGroupContextT>({})

const ToggleGroup = (props: ToggleGroupPropsT) => {
	const {
		children,
		className,
		isGhost,
		isGreen,
		isLarge,
		isMedium,
		isOrange,
		isOutlined,
		isPink,
		isPurple,
		isSmall,
		isWhite,
		...toggleGroupProps
	} = props

	const kindClass = getKindClass(props) || 'isGhost'
	const classNames = cn('zToggleGroup', kindClass, className)

	const contextValue: ToggleGroupContextT = {
		isGhost,
		isOutlined,
		isWhite,
		isGreen,
		isPurple,
		isPink,
		isOrange,
		isSmall,
		isMedium,
		isLarge
	}

	return (
		<ToggleGroupPrimitive.Root
			data-slot='toggle-group'
			className={classNames}
			{...(toggleGroupProps as React.ComponentProps<typeof ToggleGroupPrimitive.Root>)}
		>
			<ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	)
}

const ToggleGroupItem = (props: ToggleGroupItemPropsT) => {
	const context = React.useContext(ToggleGroupContext)
	const {
		children,
		className,
		isGhost,
		isGreen,
		isLarge,
		isMedium,
		isOrange,
		isOutlined,
		isPink,
		isPurple,
		isSmall,
		isWhite,
		...toggleGroupItemProps
	} = props

	const mergedProps: ToggleGroupContextT = {
		isGhost: isGhost || context.isGhost,
		isOutlined: isOutlined || context.isOutlined,
		isWhite: isWhite || context.isWhite,
		isGreen: isGreen || context.isGreen,
		isPurple: isPurple || context.isPurple,
		isPink: isPink || context.isPink,
		isOrange: isOrange || context.isOrange,
		isSmall: isSmall || context.isSmall,
		isMedium: isMedium || context.isMedium,
		isLarge: isLarge || context.isLarge
	}

	const colorClass = getColorClass(mergedProps) || 'isWhite'
	const sizeClass = getSizeClass(mergedProps) || 'isMedium'
	const kindClass = getKindClass(mergedProps) || 'isGhost'
	const classNames = cn('zToggle', 'zToggleGroupItem', kindClass, colorClass, sizeClass, className)

	return (
		<ToggleGroupPrimitive.Item data-slot='toggle-group-item' className={classNames} {...toggleGroupItemProps}>
			{children}
		</ToggleGroupPrimitive.Item>
	)
}

export { ToggleGroup, ToggleGroupItem }
