'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { Slider } from '@/components/ui/slider'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { sliderProps, sliderRangeProps } from './props'
import { examples } from './examples'

export default function SliderDocsPage() {
	const [volume, setVolume] = useState(50)

	return (
		<div className='space-y-16'>
			{/* Breadcrumb */}
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>Slider</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Slider</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A drag-based control for selecting a numeric value within a defined range. Supports single-value and two-thumb range
					modes, multiple colors, and a formatted value display.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Slider defaultValue={50} label='Volume' min={0} max={100} className='w-64' />
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Use isNeutral, isPurple, or isPink to theme the track and thumb.'
					code={examples.colors}
				>
					<div className='flex flex-col gap-6 w-64'>
						<Slider defaultValue={50} isNeutral label='Neutral' />
						<Slider defaultValue={50} isPurple label='Purple' />
						<Slider defaultValue={50} isPink label='Pink' />
					</div>
				</ComponentPreview>

				{/* With Value */}
				<ComponentPreview
					title='With Formatted Value'
					description='Provide formatValue to display the current value alongside the label.'
					code={examples.withValue}
				>
					<Slider
						defaultValue={75}
						label='Opacity'
						formatValue={(value) => `${value}%`}
						min={0}
						max={100}
						className='w-64'
					/>
				</ComponentPreview>

				{/* Range */}
				<ComponentPreview
					title='Range'
					description='Use Slider.Range for two-thumb range selection.'
					code={examples.range}
				>
					<Slider.Range defaultValues={[20, 80]} label='Price range' min={0} max={100} className='w-64' />
				</ComponentPreview>

				{/* Range with value */}
				<ComponentPreview
					title='Range with Formatted Value'
					description='Format both endpoints of the range as a single display string.'
					code={examples.rangeWithValue}
				>
					<Slider.Range
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
					<div className='flex flex-col gap-2'>
						<Slider
							value={volume}
							onValueChange={setVolume}
							label='Volume'
							formatValue={(currentValue) => `${currentValue}%`}
							min={0}
							max={100}
							className='w-64'
						/>
					</div>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Prevent interaction with isDisabled.'
					code={examples.disabled}
				>
					<Slider defaultValue={40} label='Disabled' isDisabled className='w-64' />
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Slider' props={sliderProps} />
				<PropsTable title='Slider.Range' props={sliderRangeProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Keyboard Interactions</h3>
							<div className='grid gap-2'>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>← / →</kbd>
									<span className='text-muted-foreground'>Decrease or increase value by one step</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Home / End</kbd>
									<span className='text-muted-foreground'>Jump to the minimum or maximum value</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Page Up / Page Down</kbd>
									<span className='text-muted-foreground'>Increase or decrease value by a larger step</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always provide a label so the slider has an accessible name</li>
								<li>Use formatValue to give context to the current value (units, currency, percentages)</li>
								<li>Prefer step values that divide evenly into the min–max range</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
