'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ZButton } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Plus, HelpCircle, Info } from 'lucide-react'

const tooltipProps: PropDefinition[] = [
	{
		name: 'delayDuration',
		type: 'number',
		defaultValue: '400',
		description: 'The duration in milliseconds to wait before showing the tooltip.'
	},
	{
		name: 'skipDelayDuration',
		type: 'number',
		defaultValue: '300',
		description: 'How much time a user has to enter another trigger without incurring a delay.'
	},
	{
		name: 'disableHoverableContent',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Prevents the tooltip from remaining open while hovering over the content.'
	}
]

const tooltipContentProps: PropDefinition[] = [
	{
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
		defaultValue: '"top"',
		description: 'The preferred side of the trigger to render against.'
	},
	{
		name: 'sideOffset',
		type: 'number',
		defaultValue: '0',
		description: 'The distance in pixels from the trigger.'
	},
	{
		name: 'align',
		type: '"start" | "center" | "end"',
		defaultValue: '"center"',
		description: 'The preferred alignment against the trigger.'
	},
	{
		name: 'alignOffset',
		type: 'number',
		defaultValue: '0',
		description: 'An offset in pixels from the align value.'
	}
]

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
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZTooltip</h1>
					<Badge variant='secondary'>Component</Badge>
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
				code={`import {
  ZTooltip,
  ZTooltipContent,
  ZTooltipProvider,
  ZTooltipTrigger,
  ZButton,
} from '@tasteee/zest'

export function TooltipDemo() {
  return (
    <ZTooltipProvider>
      <ZTooltip>
        <ZTooltipTrigger asChild>
          <ZButton variant="outline">Hover me</ZButton>
        </ZTooltipTrigger>
        <ZTooltipContent>
          <p>Add to library</p>
        </ZTooltipContent>
      </ZTooltip>
    </ZTooltipProvider>
  )
}`}
			>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<ZButton variant='outline'>Hover me</ZButton>
						</TooltipTrigger>
						<TooltipContent>
							<p>Add to library</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock
					code={`import {
  ZTooltip,
  ZTooltipContent,
  ZTooltipProvider,
  ZTooltipTrigger,
} from '@tasteee/zest'`}
					language='tsx'
				/>
				<CodeBlock
					code={`<ZTooltipProvider>
  <ZTooltip>
    <ZTooltipTrigger>Hover</ZTooltipTrigger>
    <ZTooltipContent>
      <p>Tooltip content</p>
    </ZTooltipContent>
  </ZTooltip>
</ZTooltipProvider>`}
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
					code={`<div className="flex gap-4">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>Tooltip on top</p>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Right</Button>
    </TooltipTrigger>
    <TooltipContent side="right">
      <p>Tooltip on right</p>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Bottom</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <p>Tooltip on bottom</p>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Left</Button>
    </TooltipTrigger>
    <TooltipContent side="left">
      <p>Tooltip on left</p>
    </TooltipContent>
  </Tooltip>
</div>`}
				>
					<TooltipProvider>
						<div className='flex gap-4'>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Top</ZButton>
								</TooltipTrigger>
								<TooltipContent side='top'>
									<p>Tooltip on top</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Right</ZButton>
								</TooltipTrigger>
								<TooltipContent side='right'>
									<p>Tooltip on right</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Bottom</ZButton>
								</TooltipTrigger>
								<TooltipContent side='bottom'>
									<p>Tooltip on bottom</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Left</ZButton>
								</TooltipTrigger>
								<TooltipContent side='left'>
									<p>Tooltip on left</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</ComponentPreview>

				{/* Icon Button */}
				<ComponentPreview
					title='Icon Button Tooltip'
					description='Common pattern for icon-only buttons.'
					code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" variant="outline">
      <Plus className="h-4 w-4" />
      <span className="sr-only">Add item</span>
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add item</p>
  </TooltipContent>
</Tooltip>`}
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<ZButton size='icon' variant='outline'>
									<Plus className='h-4 w-4' />
									<span className='sr-only'>Add item</span>
								</ZButton>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add item</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</ComponentPreview>

				{/* Help Icon */}
				<ComponentPreview
					title='Help Icon'
					description='Using tooltips to provide help text.'
					code={`<div className="flex items-center gap-2">
  <span className="text-sm font-medium">Password</span>
  <Tooltip>
    <TooltipTrigger asChild>
      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Password must be at least 8 characters</p>
    </TooltipContent>
  </Tooltip>
</div>`}
				>
					<TooltipProvider>
						<div className='flex items-center gap-2'>
							<span className='text-sm font-medium'>Password</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
								</TooltipTrigger>
								<TooltipContent>
									<p>Password must be at least 8 characters</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</ComponentPreview>

				{/* Longer Content */}
				<ComponentPreview
					title='Longer Content'
					description='Tooltips can contain longer text content.'
					code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">
      <Info className="mr-2 h-4 w-4" />
      More info
    </Button>
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <p>
      This is a longer tooltip that provides more detailed information
      about the feature. It can wrap to multiple lines.
    </p>
  </TooltipContent>
</Tooltip>`}
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<ZButton variant='outline'>
									<Info className='mr-2 h-4 w-4' />
									More info
								</ZButton>
							</TooltipTrigger>
							<TooltipContent className='max-w-xs'>
								<p>
									This is a longer tooltip that provides more detailed information about the feature. It can wrap to multiple lines.
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='TooltipProvider' props={tooltipProps} />
				<PropsTable title='TooltipContent' props={tooltipContentProps} />
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
