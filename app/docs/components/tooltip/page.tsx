'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'import { ChevronRight, Plus, HelpCircle, Info } from 'lucide-react'
import { tooltipProps, tooltipContentProps } from './props'
import { examples } from './examples'

export default function TooltipDocsPage() {
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
				<z.text className='text-foreground'>Tooltip</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>z.tooltip</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A popup that displays information related to an element when the element receives keyboard focus or mouse hover. Built
					on Radix UI Tooltip.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Tooltip'
				description='Hover over the button to see the tooltip.'
				code={examples.quickPreview}
			>
				<z.tooltip tip='Add to library'>
					<z.button>Hover me</z.button>
				</z.tooltip>
			</ComponentPreview>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock
					code={examples.usageImport}
					language='tsx'
				/>
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				{/* Positions */}
				<ComponentPreview
					title='Positions'
					description='Tooltips can be positioned on different sides of the trigger.'
					code={examples.positions}
				>
					<z.box className='flex gap-4'>
						<z.tooltip tip='Tooltip on top' side='top'>
							<z.button>Top</z.button>
						</z.tooltip>
						<z.tooltip tip='Tooltip on right' side='right'>
							<z.button>Right</z.button>
						</z.tooltip>
						<z.tooltip tip='Tooltip on bottom' side='bottom'>
							<z.button>Bottom</z.button>
						</z.tooltip>
						<z.tooltip tip='Tooltip on left' side='left'>
							<z.button>Left</z.button>
						</z.tooltip>
					</z.box>
				</ComponentPreview>

				{/* Icon Button */}
				<ComponentPreview
					title='Icon Button Tooltip'
					description='Common pattern for icon-only buttons.'
					code={examples.iconButton}
				>
					<z.tooltip tip='Add item'>
						<z.button isIcon>
							<Plus className='h-4 w-4' />
							<z.text className='sr-only'>Add item</z.text>
						</z.button>
					</z.tooltip>
				</ComponentPreview>

				{/* Help Icon */}
				<ComponentPreview
					title='Help Icon'
					description='Using tooltips to provide help text.'
					code={examples.helpIcon}
				>
					<z.box className='flex items-center gap-2'>
						<z.text className='text-sm font-medium'>Password</z.text>
						<z.tooltip tip='Password must be at least 8 characters'>
							<HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
						</z.tooltip>
					</z.box>
				</ComponentPreview>

				{/* Longer Content */}
				<ComponentPreview
					title='Longer Content'
					description='Tooltips can contain longer text content.'
					code={examples.longerContent}
				>
					<z.tooltip
						tip={
							<z.box className='max-w-xs'>
								<z.text.body>
									This is a longer tooltip that provides more detailed information about the feature. It can wrap to multiple lines.
								</z.text.body>
							</z.box>
						}
					>
						<z.button>
							<Info className='mr-2 h-4 w-4' />
							More info
						</z.button>
					</z.tooltip>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='z.tooltip' props={tooltipProps} />
				<PropsTable title='Positioning' props={tooltipContentProps} />
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
									<z.text className='text-muted-foreground'>Move focus to the trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the tooltip</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Tooltips appear on hover and focus for accessibility</z.box>
								<z.box as='li'>Keep tooltip content brief and informative</z.box>
								<z.box as='li'>Use tooltips for supplementary information, not essential content</z.box>
								<z.box as='li'>For icon-only buttons, include sr-only text for screen readers</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
