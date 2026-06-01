'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { scrollAreaProps, scrollBarProps } from './props'
import { examples } from './examples'

const VERTICAL_ITEMS = Array.from({ length: 30 }, (_, index) => `Item ${index + 1}`)
const HORIZONTAL_TAGS = Array.from({ length: 20 }, (_, index) => `Tag ${index + 1}`)

export default function ScrollAreaDocsPage() {
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
				<z.text className='text-foreground'>Scroll Area</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Scroll Area</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A custom-styled scrollable region built on Radix ScrollArea. Replaces the browser native scrollbar with a themed
					overlay track that works consistently across platforms.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.scrollArea className='h-64 w-72 rounded-md border'>
					<z.box className='p-4'>
						{VERTICAL_ITEMS.map((item) => (
							<z.text.body key={item} className='text-sm py-1.5 border-b last:border-0 text-muted-foreground'>
								{item}
							</z.text.body>
						))}
					</z.box>
				</z.scrollArea>
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

				{/* Horizontal */}
				<ComponentPreview
					title='Horizontal Scroll'
					description='Add ScrollBar with orientation="horizontal" for horizontally overflowing content. Ensure the content does not wrap with whitespace-nowrap.'
					code={examples.horizontal}
				>
					<z.scrollArea className='w-72 whitespace-nowrap rounded-md border'>
						<z.box className='flex gap-3 p-4'>
							{HORIZONTAL_TAGS.map((tag) => (
								<z.text key={tag} className='shrink-0 rounded-md border px-3 py-1 text-sm'>
									{tag}
								</z.text>
							))}
						</z.box>
						<z.scrollBar orientation='horizontal' />
					</z.scrollArea>
				</ComponentPreview>

				{/* Both Axes */}
				<ComponentPreview
					title='Both Axes'
					description='Include both a vertical (implicit) and horizontal ScrollBar for two-dimensional scrolling.'
					code={examples.bothAxes}
				>
					<z.scrollArea className='h-48 w-64 rounded-md border'>
						<z.box style={{ width: '500px', padding: '1rem' }}>
							<z.text.body className='text-sm text-muted-foreground whitespace-nowrap'>
								This content is much wider than the container. Scroll horizontally to see more.
							</z.text.body>
							{Array.from({ length: 10 }, (_, index) => (
								<z.text.body key={index} className='text-sm py-1 border-b last:border-0 whitespace-nowrap'>
									Row {index + 1} — wide content that extends beyond the boundary
								</z.text.body>
							))}
						</z.box>
						<z.scrollBar orientation='horizontal' />
					</z.scrollArea>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ScrollArea' props={scrollAreaProps} />
				<PropsTable title='ScrollBar' props={scrollBarProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always set an explicit fixed height (h-*) on ScrollArea — without it, content will not scroll</z.box>
								<z.box as='li'>ScrollArea is keyboard scrollable — users can navigate content without a mouse</z.box>
								<z.box as='li'>The custom scrollbar is purely visual; underlying scroll behaviour is native and accessible</z.box>
								<z.box as='li'>For long lists, prefer virtualization rather than rendering everything inside ScrollArea</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
