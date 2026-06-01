'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { collapsibleProps, collapsibleTriggerProps, collapsibleContentProps } from './props'
import { examples } from './examples'

export default function CollapsibleDocsPage() {
	const [isControlledOpen, setIsControlledOpen] = useState(false)

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
				<z.text className='text-foreground'>Collapsible</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Collapsible</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					An accessible show/hide container built on Radix Collapsible. Supports controlled and uncontrolled modes, and
					integrates with any trigger element via asChild.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.collapsible className='w-72'>
					<z.collapsibleTrigger asChild>
						<z.button className='flex items-center justify-between w-full px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors'>
							Toggle section
							<ChevronDown className='h-4 w-4' />
						</z.button>
					</z.collapsibleTrigger>
					<z.collapsibleContent className='pt-2 px-1'>
						<z.text.small className='text-sm text-muted-foreground'>
							This content is collapsed by default. Click the trigger above to reveal it.
						</z.text.small>
					</z.collapsibleContent>
				</z.collapsible>
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

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Pass open and onOpenChange to control state externally.'
					code={examples.controlled}
				>
					<z.collapsible open={isControlledOpen} onOpenChange={setIsControlledOpen} className='w-72'>
						<z.box className='flex items-center justify-between'>
							<z.text className='text-sm font-medium'>Dependencies</z.text>
							<z.collapsibleTrigger asChild>
								<z.button className='p-1 rounded hover:bg-muted transition-colors'>
									<ChevronsUpDown className='h-4 w-4' />
									<z.text className='sr-only'>Toggle</z.text>
								</z.button>
							</z.collapsibleTrigger>
						</z.box>
						<z.collapsibleContent className='space-y-1 pt-2'>
							<z.box className='rounded-md border px-3 py-1.5 text-sm font-mono'>react@18</z.box>
							<z.box className='rounded-md border px-3 py-1.5 text-sm font-mono'>next@14</z.box>
							<z.box className='rounded-md border px-3 py-1.5 text-sm font-mono'>typescript@5</z.box>
						</z.collapsibleContent>
					</z.collapsible>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Collapsible' props={collapsibleProps} />
				<PropsTable title='CollapsibleTrigger' props={collapsibleTriggerProps} />
				<PropsTable title='CollapsibleContent' props={collapsibleContentProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>The trigger receives aria-expanded automatically — no manual ARIA needed</z.box>
								<z.box as='li'>Content is removed from the DOM when collapsed — use this for performance-sensitive content</z.box>
								<z.box as='li'>Keyboard: Space or Enter on the trigger toggles the panel</z.box>
								<z.box as='li'>Use asChild to promote the trigger onto a custom button or icon for full style control</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
