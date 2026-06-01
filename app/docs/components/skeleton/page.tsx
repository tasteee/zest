'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { skeletonProps } from './props'
import { examples } from './examples'
export default function SkeletonDocsPage() {
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
				<z.text className='text-foreground'>Skeleton</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZSkeleton</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Use to show a placeholder while content is loading. Skeletons provide a low-fidelity preview of the content that will
					eventually appear.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Skeleton'
				description='A basic skeleton loading placeholder.'
				code={examples.quickPreview}
			>
				<z.skeleton className='h-4 w-62.5' />
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

				{/* Card Skeleton */}
				<ComponentPreview
					title='Card Skeleton'
					description='A skeleton placeholder for a card component.'
					code={examples.cardSkeleton}
				>
					<z.box className='flex items-center space-x-4'>
						<z.skeleton className='h-12 w-12 rounded-full' />
						<z.box className='space-y-2'>
							<z.skeleton className='h-4 w-62.5' />
							<z.skeleton className='h-4 w-50' />
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* Article Skeleton */}
				<ComponentPreview
					title='Article Skeleton'
					description='A skeleton for article or blog post content.'
					code={examples.articleSkeleton}
				>
					<z.box className='space-y-6 w-full max-w-md'>
						<z.skeleton className='h-48 w-full rounded-lg' />
						<z.box className='space-y-3'>
							<z.skeleton className='h-6 w-3/4' />
							<z.skeleton className='h-4 w-full' />
							<z.skeleton className='h-4 w-full' />
							<z.skeleton className='h-4 w-2/3' />
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* List Skeleton */}
				<ComponentPreview title='List Skeleton' description='A skeleton for a list of items.' code={examples.listSkeleton}>
					<z.box className='space-y-4 w-full max-w-sm'>
						{[1, 2, 3].map((i) => (
							<z.box key={i} className='flex items-center gap-4'>
								<z.skeleton className='h-10 w-10 rounded-full' />
								<z.box className='space-y-2 flex-1'>
									<z.skeleton className='h-4 w-full' />
									<z.skeleton className='h-3 w-3/4' />
								</z.box>
							</z.box>
						))}
					</z.box>
				</ComponentPreview>

				{/* Table Skeleton */}
				<ComponentPreview title='Table Skeleton' description='A skeleton for tabular data.' code={examples.tableSkeleton}>
					<z.box className='w-full space-y-3'>
						<z.box className='flex gap-4 pb-2 border-b border-border'>
							<z.skeleton className='h-4 w-1/4' />
							<z.skeleton className='h-4 w-1/4' />
							<z.skeleton className='h-4 w-1/4' />
							<z.skeleton className='h-4 w-1/4' />
						</z.box>
						{[1, 2, 3, 4].map((row) => (
							<z.box key={row} className='flex gap-4 py-2'>
								<z.skeleton className='h-4 w-1/4' />
								<z.skeleton className='h-4 w-1/4' />
								<z.skeleton className='h-4 w-1/4' />
								<z.skeleton className='h-4 w-1/4' />
							</z.box>
						))}
					</z.box>
				</ComponentPreview>

				{/* Form Skeleton */}
				<ComponentPreview title='Form Skeleton' description='A skeleton for form inputs.' code={examples.formSkeleton}>
					<z.box className='w-full max-w-sm space-y-4'>
						<z.box className='space-y-2'>
							<z.skeleton className='h-4 w-16' />
							<z.skeleton className='h-10 w-full rounded-md' />
						</z.box>
						<z.box className='space-y-2'>
							<z.skeleton className='h-4 w-20' />
							<z.skeleton className='h-10 w-full rounded-md' />
						</z.box>
						<z.box className='space-y-2'>
							<z.skeleton className='h-4 w-24' />
							<z.skeleton className='h-24 w-full rounded-md' />
						</z.box>
						<z.skeleton className='h-10 w-full rounded-md' />
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Skeleton' props={skeletonProps} />
			</z.box>

			{/* Best Practices */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Best Practices</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Match Content Dimensions</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Size your skeletons to match the expected dimensions of the content they&apos;re replacing. This prevents layout
								shifts when content loads.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Use Realistic Shapes</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Use <z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>rounded-full</z.box> for avatars,{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>rounded-md</z.box> for cards, and appropriate widths for text
								to give users a preview of the layout.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Avoid Overuse</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Too many skeleton elements can be as distracting as a spinner. Focus on the main content areas that users will be
								looking at.
							</z.text.body>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Animation</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								The pulse animation respects the{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>prefers-reduced-motion</z.box> media query. Users who have
								reduced motion preferences will see a static skeleton.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Loading State</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Consider adding <z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>aria-busy=&quot;true&quot;</z.box> to the
								container element and <z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>aria-live=&quot;polite&quot;</z.box> to
								announce when content has loaded.
							</z.text.body>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
