'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { z } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, RotateCcw } from 'lucide-react'
import { progressProps } from './props'
import { examples } from './examples'
export default function ProgressDocsPage() {
	const [progress, setProgress] = useState(13)
	const [animatedProgress, setAnimatedProgress] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500)
		return () => clearTimeout(timer)
	}, [])

	const startAnimation = () => {
		setAnimatedProgress(0)
		const interval = setInterval(() => {
			setAnimatedProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					return 100
				}
				return prev + 5
			})
		}, 100)
	}

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
				<span className='text-foreground'>Progress</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZProgress</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Progress'
				description='A basic progress bar showing completion status.'
				code={examples.quickPreview}
			>
				<Progress value={progress} className='w-[60%]' />
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

				{/* Variants */}
				<ComponentPreview
					title='Color Variants'
					description='Progress bars come in different color variants matching the brand neons.'
					code={examples.colorVariants}
				>
					<div className='space-y-4 w-full'>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Default</span>
							<Progress variant='default' value={60} />
						</div>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Purple</span>
							<Progress variant='purple' value={75} />
						</div>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Purple</span>
							<Progress variant='purple' value={45} />
						</div>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Pink</span>
							<Progress variant='pink' value={90} />
						</div>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Pink</span>
							<Progress variant='pink' value={30} />
						</div>
					</div>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Add a label to show the exact progress percentage.'
					code={examples.withLabel}
				>
					<div className='space-y-2 w-full'>
						<div className='flex justify-between text-sm'>
							<span>Progress</span>
							<span className='text-muted-foreground'>66%</span>
						</div>
						<Progress value={66} />
					</div>
				</ComponentPreview>

				{/* Animated */}
				<ComponentPreview
					title='Animated Progress'
					description='Animate the progress bar to show real-time updates.'
					code={examples.animated}
				>
					<div className='space-y-4 w-full'>
						<div className='flex justify-between text-sm'>
							<span>Uploading...</span>
							<span className='text-muted-foreground'>{animatedProgress}%</span>
						</div>
						<Progress value={animatedProgress} variant='purple' />
						<z.button onClick={startAnimation} isSmall>
							<RotateCcw className='mr-2 h-4 w-4' />
							Start Animation
						</z.button>
					</div>
				</ComponentPreview>

				{/* Multiple Steps */}
				<ComponentPreview
					title='Multi-Step Progress'
					description='Show progress through multiple steps in a process.'
					code={examples.multiStep}
				>
					<div className='space-y-6 w-full'>
						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span>Step 1: Account Setup</span>
								<span className='text-neon-purple'>Complete</span>
							</div>
							<Progress value={100} variant='purple' />
						</div>
						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span>Step 2: Profile Details</span>
								<span className='text-neon-pink'>In Progress</span>
							</div>
							<Progress value={60} variant='pink' />
						</div>
						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span>Step 3: Verification</span>
								<span className='text-muted-foreground'>Pending</span>
							</div>
							<Progress value={0} />
						</div>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Progress' props={progressProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>ARIA Attributes</h3>
							<p className='text-sm text-muted-foreground'>
								The Progress component uses{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>role=&quot;progressbar&quot;</code> with appropriate{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>aria-valuenow</code>,{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>aria-valuemin</code>, and{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>aria-valuemax</code> attributes.
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Screen Readers</h3>
							<p className='text-sm text-muted-foreground'>
								Screen readers will announce the current progress value. Consider adding a text label for additional context about
								what the progress represents.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
