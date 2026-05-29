'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { collapsibleProps, collapsibleTriggerProps, collapsibleContentProps } from './props'
import { examples } from './examples'

export default function CollapsibleDocsPage() {
	const [isControlledOpen, setIsControlledOpen] = useState(false)

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
				<span className='text-foreground'>Collapsible</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Collapsible</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					An accessible show/hide container built on Radix Collapsible. Supports controlled and uncontrolled modes, and
					integrates with any trigger element via asChild.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Collapsible className='w-72'>
					<CollapsibleTrigger asChild>
						<button className='flex items-center justify-between w-full px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors'>
							Toggle section
							<ChevronDown className='h-4 w-4' />
						</button>
					</CollapsibleTrigger>
					<CollapsibleContent className='pt-2 px-1'>
						<p className='text-sm text-muted-foreground'>
							This content is collapsed by default. Click the trigger above to reveal it.
						</p>
					</CollapsibleContent>
				</Collapsible>
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

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Pass open and onOpenChange to control state externally.'
					code={examples.controlled}
				>
					<Collapsible open={isControlledOpen} onOpenChange={setIsControlledOpen} className='w-72'>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium'>Dependencies</span>
							<CollapsibleTrigger asChild>
								<button className='p-1 rounded hover:bg-muted transition-colors'>
									<ChevronsUpDown className='h-4 w-4' />
									<span className='sr-only'>Toggle</span>
								</button>
							</CollapsibleTrigger>
						</div>
						<CollapsibleContent className='space-y-1 pt-2'>
							<div className='rounded-md border px-3 py-1.5 text-sm font-mono'>react@18</div>
							<div className='rounded-md border px-3 py-1.5 text-sm font-mono'>next@14</div>
							<div className='rounded-md border px-3 py-1.5 text-sm font-mono'>typescript@5</div>
						</CollapsibleContent>
					</Collapsible>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Collapsible' props={collapsibleProps} />
				<PropsTable title='CollapsibleTrigger' props={collapsibleTriggerProps} />
				<PropsTable title='CollapsibleContent' props={collapsibleContentProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>The trigger receives aria-expanded automatically — no manual ARIA needed</li>
								<li>Content is removed from the DOM when collapsed — use this for performance-sensitive content</li>
								<li>Keyboard: Space or Enter on the trigger toggles the panel</li>
								<li>Use asChild to promote the trigger onto a custom button or icon for full style control</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
