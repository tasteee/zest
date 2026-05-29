'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { prop } from '@/lib/prop'
import { cn } from '@/lib/utils'
import './slider.css'

type SliderColorPropsT = 'isNeutral' | 'isPurple' | 'isPink'
type SliderSizePropsT = 'isSmall' | 'isMedium' | 'isLarge'
type SliderKindPropsT = 'isGhost' | 'isOutlined'
type SliderOtherPropsT = {
	label?: React.ReactNode
	showValue?: boolean
	valueLabel?: React.ReactNode
	isDisabled?: boolean
	isHidden?: boolean
}

type SliderRootPropsT = Omit<
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
	'defaultValue' | 'onValueChange' | 'onValueCommit' | 'value'
>

type SliderSharedPropsT = SliderRootPropsT &
	ZeroOrOneTruePropT<SliderColorPropsT> & {
		label?: React.ReactNode
		showValue?: boolean
		valueLabel?: React.ReactNode
	} & ZeroOrOneTruePropT<SliderSizePropsT> &
	ZeroOrOneTruePropT<SliderKindPropsT> &
	SliderOtherPropsT

type SliderPropsT = SliderSharedPropsT & {
	defaultValue?: number
	formatValue?: (value: number) => React.ReactNode
	onValueChange?: (value: number) => void
	onValueCommit?: (value: number) => void
	value?: number
}

type SliderRangePropsT = SliderSharedPropsT & {
	defaultValues?: [number, number]
	formatValue?: (values: [number, number]) => React.ReactNode
	onValuesChange?: (values: [number, number]) => void
	onValuesCommit?: (values: [number, number]) => void
	values?: [number, number]
}

const CUSTOM_PROPS = [
	'isNeutral',
	'isPurple',
	'isPink',
	'isSmall',
	'isMedium',
	'isLarge',
	'isGhost',
	'isOutlined',
	'isDisabled',
	'isHidden',
	'label',
	'showValue',
	'valueLabel',
	'formatValue'
]

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

const getSplitProps = prop.splitter(CUSTOM_PROPS)

const defaultFormatValue = (value: number) => {
	return String(value)
}

const defaultFormatRangeValue = (values: [number, number]) => {
	return `${values[0]} - ${values[1]}`
}

const getSingleInitialValue = (value: number | undefined, defaultValue: number | undefined, minimum: number) => {
	return value ?? defaultValue ?? minimum
}

const getRangeInitialValues = (
	values: [number, number] | undefined,
	defaultValues: [number, number] | undefined,
	minimum: number,
	maximum: number
) => {
	return values ?? defaultValues ?? [minimum, maximum]
}

type SliderHeaderPropsT = {
	fieldId?: string
	label?: React.ReactNode
	value?: React.ReactNode
}

const SliderHeader = (props: SliderHeaderPropsT) => {
	const hasLabel = props.label !== undefined
	const hasValue = props.value !== undefined
	const hasContent = hasLabel || hasValue
	if (!hasContent) return null

	const labelElement = hasLabel ? (
		<label data-slot='slider-label' htmlFor={props.fieldId} className='zSliderLabel'>
			{props.label}
		</label>
	) : (
		<span aria-hidden />
	)

	const valueElement = hasValue ? (
		<span data-slot='slider-value' className='zSliderValue'>
			{props.value}
		</span>
	) : null

	return (
		<div data-slot='slider-header' className='zSliderHeader'>
			{labelElement}
			{valueElement}
		</div>
	)
}

type SliderControlPropsT = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
	customProps: Record<string, any>
	thumbCount: number
}

const SliderControl = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderControlPropsT>((props, ref) => {
	const mappedProps = getMappedProps(props.customProps)
	const colorClass = getColorClass(props.customProps)
	const sizeClass = getSizeClass(props.customProps)
	const kindClass = getKindClass(props.customProps)
	const styleClass = getStyleClass(props.customProps)
	const classNames = cn('z-slider', kindClass, colorClass, sizeClass, styleClass, props.className)
	const sliderRootProps = { ...props } as Record<string, unknown>
	delete sliderRootProps.customProps
	delete sliderRootProps.thumbCount
	delete sliderRootProps.className

	const thumbElements = Array.from({ length: props.thumbCount }, (unusedValue, index) => {
		void unusedValue
		return <SliderPrimitive.Thumb data-slot='slider-thumb' key={index} className='zSliderThumb' />
	})

	return (
		<SliderPrimitive.Root
			ref={ref}
			data-slot='slider'
			className={classNames}
			{...mappedProps}
			{...(sliderRootProps as React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>)}
		>
			<SliderPrimitive.Track data-slot='slider-track' className='zSliderTrack'>
				<SliderPrimitive.Range data-slot='slider-range' className='zSliderRange' />
			</SliderPrimitive.Track>
			{thumbElements}
		</SliderPrimitive.Root>
	)
})

SliderControl.displayName = 'SliderControl'

const SliderBase = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderPropsT>((props, ref) => {
	const [customProps, otherProps] = getSplitProps(props)
	const minimum = props.min ?? 0
	const maximum = props.max ?? 100
	const defaultValue = props.defaultValue
	const controlledValue = props.value
	const [uncontrolledValue, setUncontrolledValue] = React.useState(() => {
		return getSingleInitialValue(controlledValue, defaultValue, minimum)
	})
	const currentValue = controlledValue ?? uncontrolledValue
	const formatValue = (customProps.formatValue as SliderPropsT['formatValue']) ?? defaultFormatValue
	const hasValueLabel = customProps.valueLabel !== undefined
	const hasShowValue = customProps.showValue === true
	const hasLabel = customProps.label !== undefined
	const isShowValueDisabled = customProps.showValue === false
	const shouldShowValue = hasValueLabel || hasShowValue || (hasLabel && !isShowValueDisabled)
	const renderedValue = hasValueLabel ? customProps.valueLabel : shouldShowValue ? formatValue(currentValue) : undefined
	const mappedProps = getMappedProps(customProps)

	const sliderRootProps = {
		...(otherProps as SliderRootPropsT),
		...mappedProps
	}

	const handleValueChange = (nextValues: number[]) => {
		const nextValue = nextValues[0] ?? minimum
		const isUncontrolled = controlledValue === undefined
		if (isUncontrolled) setUncontrolledValue(nextValue)
		if (props.onValueChange) props.onValueChange(nextValue)
	}

	const handleValueCommit = (nextValues: number[]) => {
		const committedValue = nextValues[0] ?? minimum
		if (props.onValueCommit) props.onValueCommit(committedValue)
	}

	const fieldClassNames = cn('zSliderField', props.className)

	return (
		<div data-slot='slider-field' className={fieldClassNames}>
			<SliderHeader fieldId={sliderRootProps.id} label={customProps.label} value={renderedValue} />
			<SliderControl
				ref={ref}
				customProps={customProps}
				defaultValue={[getSingleInitialValue(controlledValue, defaultValue, minimum)]}
				max={maximum}
				min={minimum}
				onValueChange={handleValueChange}
				onValueCommit={handleValueCommit}
				thumbCount={1}
				value={controlledValue === undefined ? undefined : [controlledValue]}
				{...sliderRootProps}
			/>
		</div>
	)
})

SliderBase.displayName = 'Slider'

const SliderRange = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderRangePropsT>((props, ref) => {
	const [customProps, otherProps] = getSplitProps(props)
	const minimum = props.min ?? 0
	const maximum = props.max ?? 100
	const defaultValues = props.defaultValues
	const controlledValues = props.values
	const [uncontrolledValues, setUncontrolledValues] = React.useState<[number, number]>(() => {
		return getRangeInitialValues(controlledValues, defaultValues, minimum, maximum)
	})
	const currentValues = controlledValues ?? uncontrolledValues
	const formatValue = (customProps.formatValue as SliderRangePropsT['formatValue']) ?? defaultFormatRangeValue
	const hasValueLabel = customProps.valueLabel !== undefined
	const hasShowValue = customProps.showValue === true
	const hasLabel = customProps.label !== undefined
	const isShowValueDisabled = customProps.showValue === false
	const shouldShowValue = hasValueLabel || hasShowValue || (hasLabel && !isShowValueDisabled)
	const renderedValue = hasValueLabel ? customProps.valueLabel : shouldShowValue ? formatValue(currentValues) : undefined
	const mappedProps = getMappedProps(customProps)

	const sliderRootProps = {
		...(otherProps as SliderRootPropsT),
		...mappedProps
	}

	const handleValueChange = (nextValues: number[]) => {
		const nextRange: [number, number] = [nextValues[0] ?? minimum, nextValues[1] ?? maximum]
		const isUncontrolled = controlledValues === undefined
		if (isUncontrolled) setUncontrolledValues(nextRange)
		if (props.onValuesChange) props.onValuesChange(nextRange)
	}

	const handleValueCommit = (nextValues: number[]) => {
		const committedRange: [number, number] = [nextValues[0] ?? minimum, nextValues[1] ?? maximum]
		if (props.onValuesCommit) props.onValuesCommit(committedRange)
	}

	const fieldClassNames = cn('zSliderField', props.className)

	return (
		<div data-slot='slider-field' className={fieldClassNames}>
			<SliderHeader fieldId={sliderRootProps.id} label={customProps.label} value={renderedValue} />
			<SliderControl
				ref={ref}
				customProps={customProps}
				defaultValue={getRangeInitialValues(controlledValues, defaultValues, minimum, maximum)}
				max={maximum}
				min={minimum}
				onValueChange={handleValueChange}
				onValueCommit={handleValueCommit}
				thumbCount={2}
				value={controlledValues}
				{...sliderRootProps}
			/>
		</div>
	)
})

SliderRange.displayName = 'Slider.Range'

const Slider = Object.assign(SliderBase, {
	Range: SliderRange
})

export { Slider, SliderRange }
export type { SliderPropsT, SliderRangePropsT }
