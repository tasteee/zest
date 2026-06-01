'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { popoverProps, popoverContentProps } from './props'
import { examples } from './examples'

export default function PopoverDocsPage() {
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
				<z.text className='text-foreground'>Popover</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Popover</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A floating panel anchored to a trigger element. Ideal for inline settings, quick actions, and contextual information
					that doesn't require full dialog treatment.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.popover>
					<z.popoverTrigger asChild>
						<z.button>Open Popover</z.button>
					</z.popoverTrigger>
					<z.popoverContent>
						<z.text.body className='text-sm text-muted-foreground'>This is a popover. Add any content here.</z.text.body>
					</z.popoverContent>
				</z.popover>
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

				{/* Alignment */}
				<ComponentPreview
					title='Alignment'
					description='Control how the content panel aligns with the trigger using the align prop.'
					code={examples.alignment}
				>
					<z.box className='flex items-center gap-3'>
						<z.popover>
							<z.popoverTrigger asChild>
								<z.button isGhost>Align Start</z.button>
							</z.popoverTrigger>
							<z.popoverContent align='start'>
								<z.text.body className='text-sm text-muted-foreground'>Aligned to the start of the trigger.</z.text.body>
							</z.popoverContent>
						</z.popover>
						<z.popover>
							<z.popoverTrigger asChild>
								<z.button isGhost>Align Center</z.button>
							</z.popoverTrigger>
							<z.popoverContent align='center'>
								<z.text.body className='text-sm text-muted-foreground'>Aligned to the center (default).</z.text.body>
							</z.popoverContent>
						</z.popover>
						<z.popover>
							<z.popoverTrigger asChild>
								<z.button isGhost>Align End</z.button>
							</z.popoverTrigger>
							<z.popoverContent align='end'>
								<z.text.body className='text-sm text-muted-foreground'>Aligned to the end of the trigger.</z.text.body>
							</z.popoverContent>
						</z.popover>
					</z.box>
				</ComponentPreview>

				{/* With Form */}
				<ComponentPreview
					title='With Form Content'
					description='Popovers can contain form elements for inline editing workflows.'
					code={examples.withForm}
				>
					<z.popover>
						<z.popoverTrigger asChild>
							<z.button>Edit Settings</z.button>
						</z.popoverTrigger>
						<z.popoverContent className='w-80'>
							<z.box className='flex flex-col gap-3'>
								<z.box className='space-y-1'>
									<z.label className='text-sm font-medium'>Name</z.label>
									<z.input defaultValue='John Doe' />
								</z.box>
								<z.box className='space-y-1'>
									<z.label className='text-sm font-medium'>Username</z.label>
									<z.input defaultValue='@johndoe' />
								</z.box>
								<z.button isSmall className='self-end'>
									Save changes
								</z.button>
							</z.box>
						</z.popoverContent>
					</z.popover>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Popover' props={popoverProps} />
				<PropsTable title='PopoverContent' props={popoverContentProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</z.text>
									<z.text className='text-muted-foreground'>Open the popover when the trigger is focused</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the popover and return focus to the trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Move focus through interactive elements inside the popover</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use popovers for contextual actions — use Dialog for destructive or blocking operations</z.box>
								<z.box as='li'>The content panel repositions automatically when it would overflow the viewport</z.box>
								<z.box as='li'>Avoid deeply nested interactive elements that may trap focus unexpectedly</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
