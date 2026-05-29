'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/z-toggle-group'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Bold, Italic, Underline } from 'lucide-react'
import { toggleGroupProps, toggleGroupItemProps } from './props'
import { examples } from './examples'

export default function ToggleGroupDocsPage() {
	const [alignment, setAlignment] = useState('left')

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
				<span className='text-foreground'>Toggle Group</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ToggleGroup</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A group of two-state buttons that share visual context. Supports single-select and multi-select modes, with
					color, size, and kind variants inherited from the group or overridden per item.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<ToggleGroup type='multiple'>
					<ToggleGroupItem value='bold'>
						<Bold className='h-4 w-4' />
					</ToggleGroupItem>
					<ToggleGroupItem value='italic'>
						<Italic className='h-4 w-4' />
					</ToggleGroupItem>
					<ToggleGroupItem value='underline'>
						<Underline className='h-4 w-4' />
					</ToggleGroupItem>
				</ToggleGroup>
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

				{/* Single Select */}
				<ComponentPreview
					title='Single Select'
					description='Only one item can be active at a time. Use type="single" for exclusive choices like alignment.'
					code={examples.singleSelect}
				>
					<ToggleGroup type='single' defaultValue='center'>
						<ToggleGroupItem value='left'>Left</ToggleGroupItem>
						<ToggleGroupItem value='center'>Center</ToggleGroupItem>
						<ToggleGroupItem value='right'>Right</ToggleGroupItem>
					</ToggleGroup>
				</ComponentPreview>

				{/* Multi Select */}
				<ComponentPreview
					title='Multi Select'
					description='Multiple items can be active simultaneously. Use type="multiple" for independent toggles like text formatting.'
					code={examples.multiSelect}
				>
					<ToggleGroup type='multiple'>
						<ToggleGroupItem value='bold'>
							<Bold className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='italic'>
							<Italic className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='underline'>
							<Underline className='h-4 w-4' />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Apply isNeutral, isPurple, or isPink to the group to theme all items together.'
					code={examples.colors}
				>
					<div className='flex flex-col gap-4'>
						<ToggleGroup type='single' defaultValue='a' isNeutral>
							<ToggleGroupItem value='a'>Neutral</ToggleGroupItem>
							<ToggleGroupItem value='b'>Option B</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' defaultValue='a' isPurple>
							<ToggleGroupItem value='a'>Purple</ToggleGroupItem>
							<ToggleGroupItem value='b'>Option B</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' defaultValue='a' isPink>
							<ToggleGroupItem value='a'>Pink</ToggleGroupItem>
							<ToggleGroupItem value='b'>Option B</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</ComponentPreview>

				{/* Kinds */}
				<ComponentPreview
					title='Kinds'
					description='Switch between ghost (default) and outlined visual styles.'
					code={examples.kinds}
				>
					<div className='flex flex-col gap-4'>
						<ToggleGroup type='single' defaultValue='a' isGhost>
							<ToggleGroupItem value='a'>Ghost A</ToggleGroupItem>
							<ToggleGroupItem value='b'>Ghost B</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' defaultValue='a' isOutlined>
							<ToggleGroupItem value='a'>Outlined A</ToggleGroupItem>
							<ToggleGroupItem value='b'>Outlined B</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Use isSmall, isMedium, or isLarge to control the height and padding of all items.'
					code={examples.sizes}
				>
					<div className='flex flex-col gap-4'>
						<ToggleGroup type='single' defaultValue='a' isSmall>
							<ToggleGroupItem value='a'>Small</ToggleGroupItem>
							<ToggleGroupItem value='b'>Option B</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' defaultValue='a' isMedium>
							<ToggleGroupItem value='a'>Medium</ToggleGroupItem>
							<ToggleGroupItem value='b'>Option B</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' defaultValue='a' isLarge>
							<ToggleGroupItem value='a'>Large</ToggleGroupItem>
							<ToggleGroupItem value='b'>Option B</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Drive the selected value from external state with value and onValueChange.'
					code={examples.controlled}
				>
					<div className='flex flex-col gap-4'>
						<ToggleGroup type='single' value={alignment} onValueChange={setAlignment}>
							<ToggleGroupItem value='left'>Left</ToggleGroupItem>
							<ToggleGroupItem value='center'>Center</ToggleGroupItem>
							<ToggleGroupItem value='right'>Right</ToggleGroupItem>
						</ToggleGroup>
						<p className='text-sm text-muted-foreground'>Alignment: {alignment}</p>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ToggleGroup' props={toggleGroupProps} />
				<PropsTable title='ToggleGroupItem' props={toggleGroupItemProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>← / →</kbd>
									<span className='text-muted-foreground'>Move focus between items</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space / Enter</kbd>
									<span className='text-muted-foreground'>Toggle the focused item</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use type="single" when options are mutually exclusive (alignment, view mode)</li>
								<li>Use type="multiple" when options are independent (text formatting, filters)</li>
								<li>Keep labels short — icon-only items must have an aria-label for screen readers</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
