'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { radioGroupProps, radioGroupItemProps } from './props'
import { examples } from './examples'

export default function RadioGroupDocsPage() {
	const [selectedPlan, setSelectedPlan] = useState('pro')

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
				<z.text className='text-foreground'>Radio Group</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>RadioGroup</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A set of mutually exclusive options where only one can be selected at a time. Built on Radix UI RadioGroup with full
					keyboard navigation.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.radioGroup defaultValue='option-1'>
					<z.box className='flex items-center gap-2'>
						<z.radioGroupItem value='option-1' id='preview-option-1' />
						<z.label htmlFor='preview-option-1'>Option 1</z.label>
					</z.box>
					<z.box className='flex items-center gap-2'>
						<z.radioGroupItem value='option-2' id='preview-option-2' />
						<z.label htmlFor='preview-option-2'>Option 2</z.label>
					</z.box>
					<z.box className='flex items-center gap-2'>
						<z.radioGroupItem value='option-3' id='preview-option-3' />
						<z.label htmlFor='preview-option-3'>Option 3</z.label>
					</z.box>
				</z.radioGroup>
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

				{/* Horizontal */}
				<ComponentPreview
					title='Horizontal Layout'
					description='Arrange options in a row using the flex className pattern.'
					code={examples.horizontal}
				>
					<z.radioGroup defaultValue='card' className='flex gap-6'>
						<z.box className='flex items-center gap-2'>
							<z.radioGroupItem value='card' id='h-pay-card' />
							<z.label htmlFor='h-pay-card'>Card</z.label>
						</z.box>
						<z.box className='flex items-center gap-2'>
							<z.radioGroupItem value='paypal' id='h-pay-paypal' />
							<z.label htmlFor='h-pay-paypal'>PayPal</z.label>
						</z.box>
						<z.box className='flex items-center gap-2'>
							<z.radioGroupItem value='apple' id='h-pay-apple' />
							<z.label htmlFor='h-pay-apple'>Apple Pay</z.label>
						</z.box>
					</z.radioGroup>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the selected value externally with value and onValueChange.'
					code={examples.controlled}
				>
					<z.box className='flex flex-col gap-4'>
						<z.radioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
							<z.box className='flex items-center gap-2'>
								<z.radioGroupItem value='free' id='c-plan-free' />
								<z.label htmlFor='c-plan-free'>Free</z.label>
							</z.box>
							<z.box className='flex items-center gap-2'>
								<z.radioGroupItem value='pro' id='c-plan-pro' />
								<z.label htmlFor='c-plan-pro'>Pro</z.label>
							</z.box>
							<z.box className='flex items-center gap-2'>
								<z.radioGroupItem value='enterprise' id='c-plan-enterprise' />
								<z.label htmlFor='c-plan-enterprise'>Enterprise</z.label>
							</z.box>
						</z.radioGroup>
						<z.text.body className='text-sm text-muted-foreground'>Selected plan: {selectedPlan}</z.text.body>
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled Item'
					description='Individual items can be disabled while keeping others interactive.'
					code={examples.disabled}
				>
					<z.radioGroup defaultValue='option-1'>
						<z.box className='flex items-center gap-2'>
							<z.radioGroupItem value='option-1' id='dis-opt-1' />
							<z.label htmlFor='dis-opt-1'>Available</z.label>
						</z.box>
						<z.box className='flex items-center gap-2'>
							<z.radioGroupItem value='option-2' id='dis-opt-2' disabled />
							<z.label htmlFor='dis-opt-2' className='opacity-50'>
								Unavailable
							</z.label>
						</z.box>
					</z.radioGroup>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='RadioGroup' props={radioGroupProps} />
				<PropsTable title='RadioGroupItem' props={radioGroupItemProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Move focus into and out of the group</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ / ↓</z.text>
									<z.text className='text-muted-foreground'>Move between items and select</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</z.text>
									<z.text className='text-muted-foreground'>Select the focused item</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always link each RadioGroupItem to a Label via matching id and htmlFor</z.box>
								<z.box as='li'>Use RadioGroup only when one option must be chosen — use Checkbox for multi-select</z.box>
								<z.box as='li'>Provide a defaultValue or controlled value so the group is never in an indeterminate state</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
