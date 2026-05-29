'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { scrollAreaProps, scrollBarProps } from './props'
import { examples } from './examples'

const VERTICAL_ITEMS = Array.from({ length: 30 }, (_, index) => `Item ${index + 1}`)
const HORIZONTAL_TAGS = Array.from({ length: 20 }, (_, index) => `Tag ${index + 1}`)

export default function ScrollAreaDocsPage() {
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
				<span className='text-foreground'>Scroll Area</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Scroll Area</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A custom-styled scrollable region built on Radix ScrollArea. Replaces the browser native scrollbar with a
					themed overlay track that works consistently across platforms.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<ScrollArea className='h-64 w-72 rounded-md border'>
					<div className='p-4'>
						{VERTICAL_ITEMS.map((item) => (
							<p key={item} className='text-sm py-1.5 border-b last:border-0 text-muted-foreground'>
								{item}
							</p>
						))}
					</div>
				</ScrollArea>
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
					title='Horizontal Scroll'
					description='Add ScrollBar with orientation="horizontal" for horizontally overflowing content. Ensure the content does not wrap with whitespace-nowrap.'
					code={examples.horizontal}
				>
					<ScrollArea className='w-72 whitespace-nowrap rounded-md border'>
						<div className='flex gap-3 p-4'>
							{HORIZONTAL_TAGS.map((tag) => (
								<span key={tag} className='shrink-0 rounded-md border px-3 py-1 text-sm'>
									{tag}
								</span>
							))}
						</div>
						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				</ComponentPreview>

				{/* Both Axes */}
				<ComponentPreview
					title='Both Axes'
					description='Include both a vertical (implicit) and horizontal ScrollBar for two-dimensional scrolling.'
					code={examples.bothAxes}
				>
					<ScrollArea className='h-48 w-64 rounded-md border'>
						<div style={{ width: '500px', padding: '1rem' }}>
							<p className='text-sm text-muted-foreground whitespace-nowrap'>
								This content is much wider than the container. Scroll horizontally to see more.
							</p>
							{Array.from({ length: 10 }, (_, index) => (
								<p key={index} className='text-sm py-1 border-b last:border-0 whitespace-nowrap'>
									Row {index + 1} — wide content that extends beyond the boundary
								</p>
							))}
						</div>
						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ScrollArea' props={scrollAreaProps} />
				<PropsTable title='ScrollBar' props={scrollBarProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always set an explicit fixed height (h-*) on ScrollArea — without it, content will not scroll</li>
								<li>ScrollArea is keyboard scrollable — users can navigate content without a mouse</li>
								<li>The custom scrollbar is purely visual; underlying scroll behaviour is native and accessible</li>
								<li>For long lists, prefer virtualization rather than rendering everything inside ScrollArea</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
