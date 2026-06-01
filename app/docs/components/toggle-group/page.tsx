'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Bold, Italic, Underline } from 'lucide-react'
import { toggleGroupProps, toggleGroupItemProps } from './props'
import { examples } from './examples'

export default function ToggleGroupDocsPage() {
	const [alignment, setAlignment] = useState('left')

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
				<z.text className='text-foreground'>Toggle Group</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ToggleGroup</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A group of two-state buttons that share visual context. Supports single-select and multi-select modes, with color,
					size, and kind variants inherited from the group or overridden per item.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.toggleGroup type='multiple'>
					<z.toggleGroupItem value='bold'>
						<Bold className='h-4 w-4' />
					</z.toggleGroupItem>
					<z.toggleGroupItem value='italic'>
						<Italic className='h-4 w-4' />
					</z.toggleGroupItem>
					<z.toggleGroupItem value='underline'>
						<Underline className='h-4 w-4' />
					</z.toggleGroupItem>
				</z.toggleGroup>
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

				{/* Single Select */}
				<ComponentPreview
					title='Single Select'
					description='Only one item can be active at a time. Use type="single" for exclusive choices like alignment.'
					code={examples.singleSelect}
				>
					<z.toggleGroup type='single' defaultValue='center'>
						<z.toggleGroupItem value='left'>Left</z.toggleGroupItem>
						<z.toggleGroupItem value='center'>Center</z.toggleGroupItem>
						<z.toggleGroupItem value='right'>Right</z.toggleGroupItem>
					</z.toggleGroup>
				</ComponentPreview>

				{/* Multi Select */}
				<ComponentPreview
					title='Multi Select'
					description='Multiple items can be active simultaneously. Use type="multiple" for independent toggles like text formatting.'
					code={examples.multiSelect}
				>
					<z.toggleGroup type='multiple'>
						<z.toggleGroupItem value='bold'>
							<Bold className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='italic'>
							<Italic className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='underline'>
							<Underline className='h-4 w-4' />
						</z.toggleGroupItem>
					</z.toggleGroup>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Apply isNeutral, isPurple, or isPink to the group to theme all items together.'
					code={examples.colors}
				>
					<z.box className='flex flex-col gap-4'>
						<z.toggleGroup type='single' defaultValue='a' isNeutral>
							<z.toggleGroupItem value='a'>Neutral</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Option B</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' defaultValue='a' isPurple>
							<z.toggleGroupItem value='a'>Purple</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Option B</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' defaultValue='a' isPink>
							<z.toggleGroupItem value='a'>Pink</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Option B</z.toggleGroupItem>
						</z.toggleGroup>
					</z.box>
				</ComponentPreview>

				{/* Kinds */}
				<ComponentPreview
					title='Kinds'
					description='Switch between ghost (default) and outlined visual styles.'
					code={examples.kinds}
				>
					<z.box className='flex flex-col gap-4'>
						<z.toggleGroup type='single' defaultValue='a' isGhost>
							<z.toggleGroupItem value='a'>Ghost A</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Ghost B</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' defaultValue='a' isOutlined>
							<z.toggleGroupItem value='a'>Outlined A</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Outlined B</z.toggleGroupItem>
						</z.toggleGroup>
					</z.box>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Use isSmall, isMedium, or isLarge to control the height and padding of all items.'
					code={examples.sizes}
				>
					<z.box className='flex flex-col gap-4'>
						<z.toggleGroup type='single' defaultValue='a' isSmall>
							<z.toggleGroupItem value='a'>Small</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Option B</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' defaultValue='a' isMedium>
							<z.toggleGroupItem value='a'>Medium</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Option B</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' defaultValue='a' isLarge>
							<z.toggleGroupItem value='a'>Large</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Option B</z.toggleGroupItem>
						</z.toggleGroup>
					</z.box>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Drive the selected value from external state with value and onValueChange.'
					code={examples.controlled}
				>
					<z.box className='flex flex-col gap-4'>
						<z.toggleGroup type='single' value={alignment} onValueChange={setAlignment}>
							<z.toggleGroupItem value='left'>Left</z.toggleGroupItem>
							<z.toggleGroupItem value='center'>Center</z.toggleGroupItem>
							<z.toggleGroupItem value='right'>Right</z.toggleGroupItem>
						</z.toggleGroup>
						<z.text.body className='text-sm text-muted-foreground'>Alignment: {alignment}</z.text.body>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ToggleGroup' props={toggleGroupProps} />
				<PropsTable title='ToggleGroupItem' props={toggleGroupItemProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>← / →</z.text>
									<z.text className='text-muted-foreground'>Move focus between items</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space / Enter</z.text>
									<z.text className='text-muted-foreground'>Toggle the focused item</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use type="single" when options are mutually exclusive (alignment, view mode)</z.box>
								<z.box as='li'>Use type="multiple" when options are independent (text formatting, filters)</z.box>
								<z.box as='li'>Keep labels short — icon-only items must have an aria-label for screen readers</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
