'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Inbox, FileX, ImageOff, BellOff } from 'lucide-react'
import { emptyProps, emptyMediaProps, emptyHeaderProps, emptyContentProps } from './props'
import { examples } from './examples'

export default function EmptyStateDocsPage() {
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
				<z.text className='text-foreground'>Empty State</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Empty State</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A structured placeholder displayed when a data region has no content. Communicates what's missing and guides users
					toward their next action.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.emptyState className='w-80'>
					<z.emptyStateMedia variant='icon'>
						<Inbox />
					</z.emptyStateMedia>
					<z.emptyStateHeader>
						<z.emptyStateTitle>No results</z.emptyStateTitle>
						<z.emptyStateDescription>There are no items to display at this time.</z.emptyStateDescription>
					</z.emptyStateHeader>
					<z.emptyStateContent>
						<z.button isSmall>Create item</z.button>
					</z.emptyStateContent>
				</z.emptyState>
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

				{/* With Icon */}
				<ComponentPreview
					title='With Icon'
					description='Use EmptyMedia with variant="icon" to render a small boxed icon above the header.'
					code={examples.withIllustration}
				>
					<z.emptyState className='w-80'>
						<z.emptyStateMedia variant='icon'>
							<ImageOff />
						</z.emptyStateMedia>
						<z.emptyStateHeader>
							<z.emptyStateTitle>No images found</z.emptyStateTitle>
							<z.emptyStateDescription>Upload your first image to get started.</z.emptyStateDescription>
						</z.emptyStateHeader>
					</z.emptyState>
				</ComponentPreview>

				{/* With CTA */}
				<ComponentPreview
					title='With Call to Action'
					description='EmptyContent renders action buttons and links below the header.'
					code={examples.withAction}
				>
					<z.emptyState className='w-80'>
						<z.emptyStateMedia variant='icon'>
							<FileX />
						</z.emptyStateMedia>
						<z.emptyStateHeader>
							<z.emptyStateTitle>No documents</z.emptyStateTitle>
							<z.emptyStateDescription>You haven't created any documents yet.</z.emptyStateDescription>
						</z.emptyStateHeader>
						<z.emptyStateContent>
							<z.button isSmall>New document</z.button>
							<z.button isSmall isGhost>
								Import from file
							</z.button>
						</z.emptyStateContent>
					</z.emptyState>
				</ComponentPreview>

				{/* Minimal */}
				<ComponentPreview
					title='Minimal'
					description='When there is no action to take, omit EmptyMedia and EmptyContent.'
					code={examples.minimal}
				>
					<z.emptyState className='w-80'>
						<z.emptyStateMedia variant='icon'>
							<BellOff />
						</z.emptyStateMedia>
						<z.emptyStateHeader>
							<z.emptyStateTitle>No notifications</z.emptyStateTitle>
							<z.emptyStateDescription>You're all caught up. Check back later.</z.emptyStateDescription>
						</z.emptyStateHeader>
					</z.emptyState>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Empty' props={emptyProps} />
				<PropsTable title='EmptyMedia' props={emptyMediaProps} />
				<PropsTable title='EmptyHeader' props={emptyHeaderProps} />
				<PropsTable title='EmptyContent' props={emptyContentProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always include an EmptyTitle so the empty region is announced clearly to screen readers</z.box>
								<z.box as='li'>Pair icon media with an EmptyDescription that explains what is missing and why</z.box>
								<z.box as='li'>Limit CTAs to one primary action to keep the next step obvious</z.box>
								<z.box as='li'>Avoid generic copy like "Nothing here" — explain the context and what the user can do</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
