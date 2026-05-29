'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Inbox, FileX, ImageOff, BellOff } from 'lucide-react'
import { emptyProps, emptyMediaProps, emptyHeaderProps, emptyContentProps } from './props'
import { examples } from './examples'

export default function EmptyStateDocsPage() {
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
				<span className='text-foreground'>Empty State</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Empty State</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A structured placeholder displayed when a data region has no content. Communicates what's missing and guides
					users toward their next action.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Empty className='w-80'>
					<EmptyMedia variant='icon'>
						<Inbox />
					</EmptyMedia>
					<EmptyHeader>
						<EmptyTitle>No results</EmptyTitle>
						<EmptyDescription>There are no items to display at this time.</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<z.button isSmall>Create item</z.button>
					</EmptyContent>
				</Empty>
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

				{/* With Icon */}
				<ComponentPreview
					title='With Icon'
					description='Use EmptyMedia with variant="icon" to render a small boxed icon above the header.'
					code={examples.withIllustration}
				>
					<Empty className='w-80'>
						<EmptyMedia variant='icon'>
							<ImageOff />
						</EmptyMedia>
						<EmptyHeader>
							<EmptyTitle>No images found</EmptyTitle>
							<EmptyDescription>Upload your first image to get started.</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</ComponentPreview>

				{/* With CTA */}
				<ComponentPreview
					title='With Call to Action'
					description='EmptyContent renders action buttons and links below the header.'
					code={examples.withAction}
				>
					<Empty className='w-80'>
						<EmptyMedia variant='icon'>
							<FileX />
						</EmptyMedia>
						<EmptyHeader>
							<EmptyTitle>No documents</EmptyTitle>
							<EmptyDescription>You haven't created any documents yet.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<z.button isSmall>New document</z.button>
							<z.button isSmall isGhost>Import from file</z.button>
						</EmptyContent>
					</Empty>
				</ComponentPreview>

				{/* Minimal */}
				<ComponentPreview
					title='Minimal'
					description='When there is no action to take, omit EmptyMedia and EmptyContent.'
					code={examples.minimal}
				>
					<Empty className='w-80'>
						<EmptyMedia variant='icon'>
							<BellOff />
						</EmptyMedia>
						<EmptyHeader>
							<EmptyTitle>No notifications</EmptyTitle>
							<EmptyDescription>You're all caught up. Check back later.</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Empty' props={emptyProps} />
				<PropsTable title='EmptyMedia' props={emptyMediaProps} />
				<PropsTable title='EmptyHeader' props={emptyHeaderProps} />
				<PropsTable title='EmptyContent' props={emptyContentProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always include an EmptyTitle so the empty region is announced clearly to screen readers</li>
								<li>Pair icon media with an EmptyDescription that explains what is missing and why</li>
								<li>Limit CTAs to one primary action to keep the next step obvious</li>
								<li>Avoid generic copy like "Nothing here" — explain the context and what the user can do</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
