'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { createPropClassNameSwitch } from '@/lib/create-prop-classname-switch'
import { cn } from '@/lib/utils'

type SliderColorPropsT = 'isOrange' | 'isWhite' | 'isPurple' | 'isPink' | 'isGreen'

type SliderRootPropsT = Omit<
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
	'defaultValue' | 'onValueChange' | 'onValueCommit' | 'value'
>

type SliderSharedPropsT = SliderRootPropsT &
	ZeroOrOneTruePropT<SliderColorPropsT> & {
		label?: React.ReactNode
		showValue?: boolean
		valueLabel?: React.ReactNode
	}

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

const getRangeColorClass = createPropClassNameSwitch({
	isOrange: 'bg-neon-orange',
	isPurple: 'bg-neon-purple',
	isPink: 'bg-neon-pink',
	isGreen: 'bg-neon-green',
	isWhite: 'bg-primary'
})

const getThumbColorClass = createPropClassNameSwitch({
	isOrange: 'border-neon-orange',
	isPurple: 'border-neon-purple',
	isPink: 'border-neon-pink',
	isGreen: 'border-neon-green',
	isWhite: 'border-primary'
})

const defaultFormatValue = (value: number) => String(value)
const defaultFormatRangeValue = (values: [number, number]) => `${values[0]} - ${values[1]}`

function getSingleInitialValue(value: number | undefined, defaultValue: number | undefined, min: number) {
	return value ?? defaultValue ?? min
}

function getRangeInitialValues(values: [number, number] | undefined, defaultValues: [number, number] | undefined, min: number, max: number) {
	return values ?? defaultValues ?? [min, max]
}

function SliderHeader({
	htmlFor,
	label,
	value
}: {
	htmlFor?: string
	label?: React.ReactNode
	value?: React.ReactNode
}) {
	if (!label && !value) {
		return null
	}

	return (
		<div data-slot='slider-header' className='flex min-h-5 items-center justify-between gap-3'>
			{label ? (
				<label data-slot='slider-label' htmlFor={htmlFor} className='text-sm font-medium text-foreground'>
					{label}
				</label>
			) : (
				<span aria-hidden />
			)}
			{value ? (
				<span data-slot='slider-value' className='text-sm tabular-nums text-muted-foreground'>
					{value}
				</span>
			) : null}
		</div>
	)
}

const SliderControl = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
		colorProps: Partial<Record<SliderColorPropsT, boolean | undefined>>
		thumbCount: number
	}
>(({ className, colorProps, thumbCount, ...props }, ref) => {
	const rangeColorClass = getRangeColorClass(colorProps, 'bg-primary')
	const thumbColorClass = getThumbColorClass(colorProps, 'border-primary')

	return (
		<SliderPrimitive.Root
			ref={ref}
			data-slot='slider'
			className={cn(
				'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
				className
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot='slider-track'
				className='relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
			>
				<SliderPrimitive.Range
					data-slot='slider-range'
					className={cn('absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full', rangeColorClass)}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: thumbCount }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot='slider-thumb'
					key={index}
					className={cn(
						'block size-4 shrink-0 rounded-full border-2 bg-background shadow-sm transition-[border-color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
						thumbColorClass
					)}
				/>
			))}
		</SliderPrimitive.Root>
	)
})

SliderControl.displayName = 'SliderControl'

const SliderBase = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderPropsT>((props, ref) => {
	const {
		className,
		defaultValue,
		formatValue = defaultFormatValue,
		isGreen,
		isOrange,
		isPink,
		isPurple,
		isWhite,
		label,
		max = 100,
		min = 0,
		onValueChange,
		onValueCommit,
		showValue,
		value,
		valueLabel,
		...sliderProps
	} = props
	const [uncontrolledValue, setUncontrolledValue] = React.useState(() => getSingleInitialValue(value, defaultValue, min))
	const currentValue = value ?? uncontrolledValue
	const shouldShowValue = valueLabel !== undefined || showValue === true || (label !== undefined && showValue !== false)
	const renderedValue = valueLabel ?? (shouldShowValue ? formatValue(currentValue) : undefined)
	const colorProps = { isGreen, isOrange, isPink, isPurple, isWhite }

	const handleValueChange = (nextValues: number[]) => {
		const nextValue = nextValues[0] ?? min

		if (value === undefined) {
			setUncontrolledValue(nextValue)
		}

		onValueChange?.(nextValue)
	}

	const handleValueCommit = (nextValues: number[]) => {
		onValueCommit?.(nextValues[0] ?? min)
	}

	return (
		<div data-slot='slider-field' className={cn('flex w-full flex-col gap-2', className)}>
			<SliderHeader htmlFor={sliderProps.id} label={label} value={renderedValue} />
			<SliderControl
				ref={ref}
				colorProps={colorProps}
				defaultValue={[getSingleInitialValue(value, defaultValue, min)]}
				max={max}
				min={min}
				onValueChange={handleValueChange}
				onValueCommit={handleValueCommit}
				thumbCount={1}
				value={value === undefined ? undefined : [value]}
				{...sliderProps}
			/>
		</div>
	)
})

SliderBase.displayName = 'Slider'

const SliderRange = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderRangePropsT>((props, ref) => {
	const {
		className,
		defaultValues,
		formatValue = defaultFormatRangeValue,
		isGreen,
		isOrange,
		isPink,
		isPurple,
		isWhite,
		label,
		max = 100,
		min = 0,
		onValuesChange,
		onValuesCommit,
		showValue,
		valueLabel,
		values,
		...sliderProps
	} = props
	const [uncontrolledValues, setUncontrolledValues] = React.useState<[number, number]>(() =>
		getRangeInitialValues(values, defaultValues, min, max)
	)
	const currentValues = values ?? uncontrolledValues
	const shouldShowValue = valueLabel !== undefined || showValue === true || (label !== undefined && showValue !== false)
	const renderedValue = valueLabel ?? (shouldShowValue ? formatValue(currentValues) : undefined)
	const colorProps = { isGreen, isOrange, isPink, isPurple, isWhite }

	const handleValueChange = (nextValues: number[]) => {
		const nextRange: [number, number] = [nextValues[0] ?? min, nextValues[1] ?? max]

		if (values === undefined) {
			setUncontrolledValues(nextRange)
		}

		onValuesChange?.(nextRange)
	}

	const handleValueCommit = (nextValues: number[]) => {
		onValuesCommit?.([nextValues[0] ?? min, nextValues[1] ?? max])
	}

	return (
		<div data-slot='slider-field' className={cn('flex w-full flex-col gap-2', className)}>
			<SliderHeader htmlFor={sliderProps.id} label={label} value={renderedValue} />
			<SliderControl
				ref={ref}
				colorProps={colorProps}
				defaultValue={getRangeInitialValues(values, defaultValues, min, max)}
				max={max}
				min={min}
				onValueChange={handleValueChange}
				onValueCommit={handleValueCommit}
				thumbCount={2}
				value={values}
				{...sliderProps}
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
