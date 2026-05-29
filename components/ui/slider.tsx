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

const EmptyLabel = () => <span aria-hidden />

const HeaderLabel = (props: SliderHeaderPropsT) => {
	if (!props.label) return <EmptyLabel />

	return (
		<label data-slot='slider-label' htmlFor={props.fieldId} className='zSliderLabel'>
			{props.label}
		</label>
	)
}

const SliderHeader = (props: SliderHeaderPropsT) => {
	// If there is no label and no value, we don't render
	// the header at all to save vertical space.
	const hasLabel = props.label !== undefined
	const hasValue = props.value !== undefined
	const hasContent = hasLabel || hasValue
	if (!hasContent) return null

	return (
		<div data-slot='slider-header' className='zSliderHeader'>
			<HeaderLabel label={props.label} fieldId={props.fieldId} />

			{hasValue && (
				<span data-slot='slider-value' className='zSliderValue'>
					{props.value}
				</span>
			)}
		</div>
	)
}

type SliderControBasePropsT = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

type SliderControlPropsT = SliderControBasePropsT & {
	customProps: Record<string, any>
	thumbCount: number
}

type SliderRefT = React.ElementRef<typeof SliderPrimitive.Root>

const getSliderControlSplitProps = prop.splitter(['customProps', 'thumbCount'])

const SliderControl = React.forwardRef<SliderRefT, SliderControlPropsT>((props, ref) => {
	const mappedProps = getMappedProps(props.customProps)
	const colorClass = getColorClass(props.customProps)
	const sizeClass = getSizeClass(props.customProps)
	const kindClass = getKindClass(props.customProps)
	const styleClass = getStyleClass(props.customProps)
	const classNames = cn('z-slider', kindClass, colorClass, sizeClass, styleClass, props.className)
	const [otherProps, sliderRootProps] = getSliderControlSplitProps(props)

	const thumbElements = Array.from({ length: props.thumbCount }, (_, index) => {
		return <SliderPrimitive.Thumb data-slot='slider-thumb' key={index} className='zSliderThumb' />
	})

	return (
		<SliderPrimitive.Root ref={ref} data-slot='slider' className={classNames} {...mappedProps} {...sliderRootProps}>
			<SliderPrimitive.Track data-slot='slider-track' className='zSliderTrack'>
				<SliderPrimitive.Range data-slot='slider-range' className='zSliderRange' />
			</SliderPrimitive.Track>
			{thumbElements}
		</SliderPrimitive.Root>
	)
})

SliderControl.displayName = 'SliderControl'

const SliderBase = React.forwardRef<SliderRefT, SliderPropsT>((props, ref) => {
	const [customProps, otherProps] = getSplitProps(props)
	const minimum = props.min ?? 0
	const maximum = props.max ?? 100

	const [uncontrolledValue, setUncontrolledValue] = React.useState(() => {
		return getSingleInitialValue(props.value, props.defaultValue, minimum)
	})

	const currentValue = props.value ?? uncontrolledValue
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
	} as Record<string, unknown>
	delete sliderRootProps.value
	delete sliderRootProps.defaultValue
	delete sliderRootProps.onValueChange
	delete sliderRootProps.onValueCommit

	const handleValueChange = (nextValues: number[]) => {
		const nextValue = nextValues[0] ?? minimum
		const isUncontrolled = props.value === undefined
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
				defaultValue={[getSingleInitialValue(props.value, props.defaultValue, minimum)]}
				max={maximum}
				min={minimum}
				onValueChange={handleValueChange}
				onValueCommit={handleValueCommit}
				thumbCount={1}
				value={props.value === undefined ? undefined : [props.value]}
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
	} as Record<string, unknown>
	delete sliderRootProps.values
	delete sliderRootProps.defaultValues
	delete sliderRootProps.onValuesChange
	delete sliderRootProps.onValuesCommit

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
