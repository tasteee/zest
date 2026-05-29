'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { prop } from '@/lib/prop'
import { cn } from '@/lib/utils'
import './z-toggle.css'
import './z-toggle-group.css'

type ToggleGroupColorPropsT = 'isNeutral' | 'isPurple' | 'isPink'
type ToggleGroupSizePropsT = 'isSmall' | 'isMedium' | 'isLarge'
type ToggleGroupKindPropsT = 'isGhost' | 'isOutlined'

type ToggleGroupOtherPropsT = {
	isDisabled?: boolean
	isHidden?: boolean
}

type ToggleGroupContextT = ZeroOrOneTruePropT<ToggleGroupColorPropsT> &
	ZeroOrOneTruePropT<ToggleGroupSizePropsT> &
	ZeroOrOneTruePropT<ToggleGroupKindPropsT> &
	ToggleGroupOtherPropsT

type ToggleGroupRootPropsT = React.ComponentProps<typeof ToggleGroupPrimitive.Root>
type ToggleGroupItemRootPropsT = React.ComponentProps<typeof ToggleGroupPrimitive.Item>

type ToggleGroupPropsT = ToggleGroupRootPropsT & ToggleGroupContextT
type ToggleGroupItemPropsT = ToggleGroupItemRootPropsT & ToggleGroupContextT

const ROOT_CUSTOM_PROPS = [
	'isNeutral',
	'isPurple',
	'isPink',
	'isSmall',
	'isMedium',
	'isLarge',
	'isGhost',
	'isOutlined',
	'isDisabled',
	'isHidden'
]

const ITEM_CUSTOM_PROPS = [...ROOT_CUSTOM_PROPS]

const COLOR_PROP_NAMES = ['isNeutral', 'isPurple', 'isPink']
const SIZE_PROP_NAMES = ['isSmall', 'isMedium', 'isLarge']
const KIND_PROP_NAMES = ['isGhost', 'isOutlined']

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
	isDisabled: 'disabled'
})

const getSplitRootProps = prop.splitter(ROOT_CUSTOM_PROPS)
const getSplitItemProps = prop.splitter(ITEM_CUSTOM_PROPS)

const mergeVariantGroup = (
	itemCustomProps: Record<string, any>,
	contextCustomProps: Record<string, any>,
	variantPropNames: string[]
) => {
	const mergedVariantProps = {} as Record<string, boolean | undefined>
	let hasItemVariant = false

	for (const variantPropName of variantPropNames) {
		const hasItemVariantValue = itemCustomProps[variantPropName] === true
		if (hasItemVariantValue) hasItemVariant = true
	}

	for (const variantPropName of variantPropNames) {
		const itemVariantValue = itemCustomProps[variantPropName] === true
		const contextVariantValue = contextCustomProps[variantPropName] === true

		if (hasItemVariant) mergedVariantProps[variantPropName] = itemVariantValue
		if (!hasItemVariant) mergedVariantProps[variantPropName] = contextVariantValue
	}

	return mergedVariantProps
}

const ToggleGroupContext = React.createContext<ToggleGroupContextT>({})

const ToggleGroup = (props: ToggleGroupPropsT) => {
	const [customProps, otherProps] = getSplitRootProps(props)
	const toggleGroupType = props.type ?? 'single'
	const colorClass = getColorClass(customProps)
	const sizeClass = getSizeClass(customProps)
	const kindClass = getKindClass(customProps)
	const styleClass = getStyleClass(customProps)
	const mappedProps = getMappedProps(customProps)
	const classNames = cn('zToggleGroup', kindClass, colorClass, sizeClass, styleClass, props.className)
	const toggleGroupRootProps = {
		'data-slot': 'toggle-group',
		type: toggleGroupType,
		className: classNames,
		...mappedProps,
		...otherProps
	} as React.ComponentProps<typeof ToggleGroupPrimitive.Root>

	const contextValue = customProps as ToggleGroupContextT

	return (
		<ToggleGroupPrimitive.Root {...toggleGroupRootProps}>
			<ToggleGroupContext.Provider value={contextValue}>{props.children}</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	)
}

const ToggleGroupItem = (props: ToggleGroupItemPropsT) => {
	const contextCustomProps = React.useContext(ToggleGroupContext)
	const [customProps, otherProps] = getSplitItemProps(props)
	const mergedColorProps = mergeVariantGroup(customProps, contextCustomProps as Record<string, any>, COLOR_PROP_NAMES)
	const mergedSizeProps = mergeVariantGroup(customProps, contextCustomProps as Record<string, any>, SIZE_PROP_NAMES)
	const mergedKindProps = mergeVariantGroup(customProps, contextCustomProps as Record<string, any>, KIND_PROP_NAMES)

	const mergedCustomProps = {
		...mergedColorProps,
		...mergedSizeProps,
		...mergedKindProps,
		isDisabled: customProps.isDisabled || contextCustomProps.isDisabled,
		isHidden: customProps.isHidden || contextCustomProps.isHidden
	}

	const colorClass = getColorClass(mergedCustomProps)
	const sizeClass = getSizeClass(mergedCustomProps)
	const kindClass = getKindClass(mergedCustomProps)
	const styleClass = getStyleClass(mergedCustomProps)
	const mappedProps = getMappedProps(mergedCustomProps)
	const classNames = cn('z-toggle', 'zToggleGroupItem', kindClass, colorClass, sizeClass, styleClass, props.className)

	return (
		<ToggleGroupPrimitive.Item
			data-slot='toggle-group-item'
			className={classNames}
			{...mappedProps}
			{...(otherProps as ToggleGroupItemRootPropsT)}
		>
			{props.children}
		</ToggleGroupPrimitive.Item>
	)
}

export { ToggleGroup, ToggleGroupItem }
export type {
	ToggleGroupPropsT,
	ToggleGroupItemPropsT,
	ToggleGroupColorPropsT,
	ToggleGroupSizePropsT,
	ToggleGroupKindPropsT
}
