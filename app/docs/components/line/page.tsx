'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { lineProps } from './props'
import { examples } from './examples'
export default function LineDocsPage() {
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
				<z.text className='text-foreground'>Line</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Line</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Visually or semantically separates content. Horizontal by default, vertical when needed.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Line'
				description='A horizontal line that separates content.'
				code={examples.quickPreview}
			>
				<z.box>
					<z.box className='space-y-1'>
						<z.text as='h4' isSmall isBold>tasteink Design System</z.text>
						<z.text.body className='text-sm text-muted-foreground'>A comprehensive component library.</z.text.body>
					</z.box>
					<z.line className='my-4' />
					<z.box className='flex h-5 items-center space-x-4 text-sm'>
						<z.box>Blog</z.box>
						<z.line isVertical />
						<z.box>Docs</z.box>
						<z.line isVertical />
						<z.box>Source</z.box>
					</z.box>
				</z.box>
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
					title='Horizontal Line'
					description='The default horizontal line.'
					code={examples.horizontal}
				>
					<z.box className='space-y-4 w-full'>
						<z.text.body className='text-sm'>Section One Content</z.text.body>
						<z.line />
						<z.text.body className='text-sm'>Section Two Content</z.text.body>
					</z.box>
				</ComponentPreview>

				{/* Vertical */}
				<ComponentPreview
					title='Vertical Line'
					description='A vertical line for inline content.'
					code={examples.vertical}
				>
					<z.box className='flex h-5 items-center space-x-4 text-sm'>
						<z.text>Home</z.text>
						<z.line isVertical />
						<z.text>Products</z.text>
						<z.line isVertical />
						<z.text>About</z.text>
						<z.line isVertical />
						<z.text>Contact</z.text>
					</z.box>
				</ComponentPreview>

				{/* In a Card */}
				<ComponentPreview
					title='In a Card'
					description='Separating content sections within a card.'
					code={examples.inACard}
				>
					<z.card className='w-full max-w-sm'>
						<z.cardContent className='p-6'>
							<z.box className='space-y-1'>
								<z.text.h3>Account Settings</z.text.h3>
								<z.text.body className='text-sm text-muted-foreground'>Manage your account preferences</z.text.body>
							</z.box>
							<z.line className='my-4' />
							<z.box className='space-y-2'>
								<z.box className='flex justify-between text-sm'>
									<z.text>Email Notifications</z.text>
									<z.text className='text-muted-foreground'>Enabled</z.text>
								</z.box>
								<z.box className='flex justify-between text-sm'>
									<z.text>Two-Factor Auth</z.text>
									<z.text className='text-muted-foreground'>Active</z.text>
								</z.box>
							</z.box>
							<z.line className='my-4' />
							<z.text.body className='text-xs text-muted-foreground'>Last updated: 2 days ago</z.text.body>
						</z.cardContent>
					</z.card>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Line' props={lineProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Decorative vs Semantic</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								By default, the line is decorative and has no semantic meaning. Set{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>decorative=false</z.box> when the line has semantic
								meaning (e.g., separating sections of content).
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>ARIA Role</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								When <z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>decorative</z.box> is false, the line uses{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>role=&quot;separator&quot;</z.box> for assistive technologies.
							</z.text.body>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
