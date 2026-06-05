'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Line } from '@/components/ui/line'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { lineProps } from './props'
import { examples } from './examples'
export default function LineDocsPage() {
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
				<span className='text-foreground'>Line</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Line</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Visually or semantically separates content. Horizontal by default, vertical when needed.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Line'
				description='A horizontal line that separates content.'
				code={examples.quickPreview}
			>
				<div>
					<div className='space-y-1'>
						<h4 className='text-sm font-medium leading-none'>tasteink Design System</h4>
						<p className='text-sm text-muted-foreground'>A comprehensive component library.</p>
					</div>
					<Line className='my-4' />
					<div className='flex h-5 items-center space-x-4 text-sm'>
						<div>Blog</div>
						<Line isVertical />
						<div>Docs</div>
						<Line isVertical />
						<div>Source</div>
					</div>
				</div>
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
					title='Horizontal Line'
					description='The default horizontal line.'
					code={examples.horizontal}
				>
					<div className='space-y-4 w-full'>
						<p className='text-sm'>Section One Content</p>
						<Line />
						<p className='text-sm'>Section Two Content</p>
					</div>
				</ComponentPreview>

				{/* Vertical */}
				<ComponentPreview
					title='Vertical Line'
					description='A vertical line for inline content.'
					code={examples.vertical}
				>
					<div className='flex h-5 items-center space-x-4 text-sm'>
						<span>Home</span>
						<Line isVertical />
						<span>Products</span>
						<Line isVertical />
						<span>About</span>
						<Line isVertical />
						<span>Contact</span>
					</div>
				</ComponentPreview>

				{/* In a Card */}
				<ComponentPreview
					title='In a Card'
					description='Separating content sections within a card.'
					code={examples.inACard}
				>
					<Card className='w-full max-w-sm'>
						<CardContent className='p-6'>
							<div className='space-y-1'>
								<h3 className='font-semibold'>Account Settings</h3>
								<p className='text-sm text-muted-foreground'>Manage your account preferences</p>
							</div>
							<Line className='my-4' />
							<div className='space-y-2'>
								<div className='flex justify-between text-sm'>
									<span>Email Notifications</span>
									<span className='text-muted-foreground'>Enabled</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span>Two-Factor Auth</span>
									<span className='text-muted-foreground'>Active</span>
								</div>
							</div>
							<Line className='my-4' />
							<p className='text-xs text-muted-foreground'>Last updated: 2 days ago</p>
						</CardContent>
					</Card>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Line' props={lineProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Decorative vs Semantic</h3>
							<p className='text-sm text-muted-foreground'>
								By default, the line is decorative and has no semantic meaning. Set{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>decorative=false</code> when the line has semantic
								meaning (e.g., separating sections of content).
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>ARIA Role</h3>
							<p className='text-sm text-muted-foreground'>
								When <code className='text-xs bg-muted px-1 py-0.5 rounded'>decorative</code> is false, the line uses{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>role=&quot;separator&quot;</code> for assistive technologies.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
