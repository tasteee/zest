'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { radioGroupProps, radioGroupItemProps } from './props'
import { examples } from './examples'

export default function RadioGroupDocsPage() {
	const [selectedPlan, setSelectedPlan] = useState('pro')

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
				<span className='text-foreground'>Radio Group</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>RadioGroup</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A set of mutually exclusive options where only one can be selected at a time. Built on Radix UI RadioGroup with full
					keyboard navigation.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<RadioGroup defaultValue='option-1'>
					<div className='flex items-center gap-2'>
						<RadioGroupItem value='option-1' id='preview-option-1' />
						<Label htmlFor='preview-option-1'>Option 1</Label>
					</div>
					<div className='flex items-center gap-2'>
						<RadioGroupItem value='option-2' id='preview-option-2' />
						<Label htmlFor='preview-option-2'>Option 2</Label>
					</div>
					<div className='flex items-center gap-2'>
						<RadioGroupItem value='option-3' id='preview-option-3' />
						<Label htmlFor='preview-option-3'>Option 3</Label>
					</div>
				</RadioGroup>
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

				{/* Horizontal */}
				<ComponentPreview
					title='Horizontal Layout'
					description='Arrange options in a row using the flex className pattern.'
					code={examples.horizontal}
				>
					<RadioGroup defaultValue='card' className='flex gap-6'>
						<div className='flex items-center gap-2'>
							<RadioGroupItem value='card' id='h-pay-card' />
							<Label htmlFor='h-pay-card'>Card</Label>
						</div>
						<div className='flex items-center gap-2'>
							<RadioGroupItem value='paypal' id='h-pay-paypal' />
							<Label htmlFor='h-pay-paypal'>PayPal</Label>
						</div>
						<div className='flex items-center gap-2'>
							<RadioGroupItem value='apple' id='h-pay-apple' />
							<Label htmlFor='h-pay-apple'>Apple Pay</Label>
						</div>
					</RadioGroup>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the selected value externally with value and onValueChange.'
					code={examples.controlled}
				>
					<div className='flex flex-col gap-4'>
						<RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
							<div className='flex items-center gap-2'>
								<RadioGroupItem value='free' id='c-plan-free' />
								<Label htmlFor='c-plan-free'>Free</Label>
							</div>
							<div className='flex items-center gap-2'>
								<RadioGroupItem value='pro' id='c-plan-pro' />
								<Label htmlFor='c-plan-pro'>Pro</Label>
							</div>
							<div className='flex items-center gap-2'>
								<RadioGroupItem value='enterprise' id='c-plan-enterprise' />
								<Label htmlFor='c-plan-enterprise'>Enterprise</Label>
							</div>
						</RadioGroup>
						<p className='text-sm text-muted-foreground'>Selected plan: {selectedPlan}</p>
					</div>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled Item'
					description='Individual items can be disabled while keeping others interactive.'
					code={examples.disabled}
				>
					<RadioGroup defaultValue='option-1'>
						<div className='flex items-center gap-2'>
							<RadioGroupItem value='option-1' id='dis-opt-1' />
							<Label htmlFor='dis-opt-1'>Available</Label>
						</div>
						<div className='flex items-center gap-2'>
							<RadioGroupItem value='option-2' id='dis-opt-2' disabled />
							<Label htmlFor='dis-opt-2' className='opacity-50'>
								Unavailable
							</Label>
						</div>
					</RadioGroup>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='RadioGroup' props={radioGroupProps} />
				<PropsTable title='RadioGroupItem' props={radioGroupItemProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus into and out of the group</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ / ↓</kbd>
									<span className='text-muted-foreground'>Move between items and select</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</kbd>
									<span className='text-muted-foreground'>Select the focused item</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always link each RadioGroupItem to a Label via matching id and htmlFor</li>
								<li>Use RadioGroup only when one option must be chosen — use Checkbox for multi-select</li>
								<li>Provide a defaultValue or controlled value so the group is never in an indeterminate state</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
