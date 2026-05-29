'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Plus, HelpCircle, Info } from 'lucide-react'
import { tooltipProps, tooltipContentProps } from './props'
import { examples } from './examples'

export default function TooltipDocsPage() {
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
				<span className='text-foreground'>Tooltip</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>z.tooltip</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A popup that displays information related to an element when the element receives keyboard focus or mouse hover. Built
					on Radix UI Tooltip.
				</p>
			</div>

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
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock
					code={examples.usageImport}
					language='tsx'
				/>
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Positions */}
				<ComponentPreview
					title='Positions'
					description='Tooltips can be positioned on different sides of the trigger.'
					code={examples.positions}
				>
					<div className='flex gap-4'>
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
					</div>
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
							<span className='sr-only'>Add item</span>
						</z.button>
					</z.tooltip>
				</ComponentPreview>

				{/* Help Icon */}
				<ComponentPreview
					title='Help Icon'
					description='Using tooltips to provide help text.'
					code={examples.helpIcon}
				>
					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium'>Password</span>
						<z.tooltip tip='Password must be at least 8 characters'>
							<HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
						</z.tooltip>
					</div>
				</ComponentPreview>

				{/* Longer Content */}
				<ComponentPreview
					title='Longer Content'
					description='Tooltips can contain longer text content.'
					code={examples.longerContent}
				>
					<z.tooltip
						tip={
							<div className='max-w-xs'>
								<p>
									This is a longer tooltip that provides more detailed information about the feature. It can wrap to multiple lines.
								</p>
							</div>
						}
					>
						<z.button>
							<Info className='mr-2 h-4 w-4' />
							More info
						</z.button>
					</z.tooltip>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='z.tooltip' props={tooltipProps} />
				<PropsTable title='Positioning' props={tooltipContentProps} />
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
									<span className='text-muted-foreground'>Move focus to the trigger</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the tooltip</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Tooltips appear on hover and focus for accessibility</li>
								<li>Keep tooltip content brief and informative</li>
								<li>Use tooltips for supplementary information, not essential content</li>
								<li>For icon-only buttons, include sr-only text for screen readers</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
