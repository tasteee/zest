'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { sliderProps, sliderRangeProps } from './props'
import { examples } from './examples'

export default function SliderDocsPage() {
	const [volume, setVolume] = useState(50)

	return (
		<z.box className='space-y-16'>
			{/* Breadcrumb */}
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Slider</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Slider</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A drag-based control for selecting a numeric value within a defined range. Supports single-value and two-thumb range
					modes, multiple colors, and a formatted value display.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.slider defaultValue={50} label='Volume' min={0} max={100} className='w-64' />
			</ComponentPreview>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Use isNeutral, isPurple, or isPink to theme the track and thumb.'
					code={examples.colors}
				>
					<z.box className='flex flex-col gap-6 w-64'>
						<z.slider defaultValue={50} isNeutral label='Neutral' />
						<z.slider defaultValue={50} isPurple label='Purple' />
						<z.slider defaultValue={50} isPink label='Pink' />
					</z.box>
				</ComponentPreview>

				{/* With Value */}
				<ComponentPreview
					title='With Formatted Value'
					description='Provide formatValue to display the current value alongside the label.'
					code={examples.withValue}
				>
					<z.slider defaultValue={75} label='Opacity' formatValue={(value) => `${value}%`} min={0} max={100} className='w-64' />
				</ComponentPreview>

				{/* Range */}
				<ComponentPreview title='Range' description='Use Slider.Range for two-thumb range selection.' code={examples.range}>
					<z.slider.Range defaultValues={[20, 80]} label='Price range' min={0} max={100} className='w-64' />
				</ComponentPreview>

				{/* Range with value */}
				<ComponentPreview
					title='Range with Formatted Value'
					description='Format both endpoints of the range as a single display string.'
					code={examples.rangeWithValue}
				>
					<z.slider.Range
						defaultValues={[30, 70]}
						isPurple
						label='Budget'
						formatValue={([minimum, maximum]) => `$${minimum} – $${maximum}`}
						min={0}
						max={500}
						className='w-64'
					/>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the slider value externally with value and onValueChange.'
					code={examples.controlled}
				>
					<z.box className='flex flex-col gap-2'>
						<z.slider
							value={volume}
							onValueChange={setVolume}
							label='Volume'
							formatValue={(currentValue) => `${currentValue}%`}
							min={0}
							max={100}
							className='w-64'
						/>
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview title='Disabled' description='Prevent interaction with isDisabled.' code={examples.disabled}>
					<z.slider defaultValue={40} label='Disabled' isDisabled className='w-64' />
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Slider' props={sliderProps} />
				<PropsTable title='Slider.Range' props={sliderRangeProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Keyboard Interactions</z.text.h3>
							<z.box className='grid gap-2'>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										← / →
									</z.text>
									<z.text className='text-muted-foreground'>Decrease or increase value by one step</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Home / End
									</z.text>
									<z.text className='text-muted-foreground'>Jump to the minimum or maximum value</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Page Up / Page Down
									</z.text>
									<z.text className='text-muted-foreground'>Increase or decrease value by a larger step</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always provide a label so the slider has an accessible name</z.box>
								<z.box as='li'>Use formatValue to give context to the current value (units, currency, percentages)</z.box>
								<z.box as='li'>Prefer step values that divide evenly into the min–max range</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
