'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight } from 'lucide-react'
import { popoverProps, popoverContentProps } from './props'
import { examples } from './examples'

export default function PopoverDocsPage() {
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
				<span className='text-foreground'>Popover</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Popover</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A floating panel anchored to a trigger element. Ideal for inline settings, quick actions, and contextual information
					that doesn't require full dialog treatment.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Popover>
					<PopoverTrigger asChild>
						<z.button>Open Popover</z.button>
					</PopoverTrigger>
					<PopoverContent>
						<p className='text-sm text-muted-foreground'>This is a popover. Add any content here.</p>
					</PopoverContent>
				</Popover>
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

				{/* Alignment */}
				<ComponentPreview
					title='Alignment'
					description='Control how the content panel aligns with the trigger using the align prop.'
					code={examples.alignment}
				>
					<div className='flex items-center gap-3'>
						<Popover>
							<PopoverTrigger asChild>
								<z.button isGhost>Align Start</z.button>
							</PopoverTrigger>
							<PopoverContent align='start'>
								<p className='text-sm text-muted-foreground'>Aligned to the start of the trigger.</p>
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger asChild>
								<z.button isGhost>Align Center</z.button>
							</PopoverTrigger>
							<PopoverContent align='center'>
								<p className='text-sm text-muted-foreground'>Aligned to the center (default).</p>
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger asChild>
								<z.button isGhost>Align End</z.button>
							</PopoverTrigger>
							<PopoverContent align='end'>
								<p className='text-sm text-muted-foreground'>Aligned to the end of the trigger.</p>
							</PopoverContent>
						</Popover>
					</div>
				</ComponentPreview>

				{/* With Form */}
				<ComponentPreview
					title='With Form Content'
					description='Popovers can contain form elements for inline editing workflows.'
					code={examples.withForm}
				>
					<Popover>
						<PopoverTrigger asChild>
							<z.button>Edit Settings</z.button>
						</PopoverTrigger>
						<PopoverContent className='w-80'>
							<div className='flex flex-col gap-3'>
								<div className='space-y-1'>
									<Label className='text-sm font-medium'>Name</Label>
									<Input defaultValue='John Doe' />
								</div>
								<div className='space-y-1'>
									<Label className='text-sm font-medium'>Username</Label>
									<Input defaultValue='@johndoe' />
								</div>
								<z.button isSmall className='self-end'>
									Save changes
								</z.button>
							</div>
						</PopoverContent>
					</Popover>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Popover' props={popoverProps} />
				<PropsTable title='PopoverContent' props={popoverContentProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</kbd>
									<span className='text-muted-foreground'>Open the popover when the trigger is focused</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the popover and return focus to the trigger</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus through interactive elements inside the popover</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use popovers for contextual actions — use Dialog for destructive or blocking operations</li>
								<li>The content panel repositions automatically when it would overflow the viewport</li>
								<li>Avoid deeply nested interactive elements that may trap focus unexpectedly</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
