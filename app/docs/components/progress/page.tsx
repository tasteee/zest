'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
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
				<z.text className='text-foreground'>Progress</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZProgress</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Progress'
				description='A basic progress bar showing completion status.'
				code={examples.quickPreview}
			>
				<z.progress value={progress} className='w-[60%]' />
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

				{/* Variants */}
				<ComponentPreview
					title='Color Variants'
					description='Progress bars come in different color variants matching the brand neons.'
					code={examples.colorVariants}
				>
					<z.box className='space-y-4 w-full'>
						<z.box className='space-y-1'>
							<z.text className='text-xs text-muted-foreground'>Default</z.text>
							<z.progress variant='default' value={60} />
						</z.box>
						<z.box className='space-y-1'>
							<z.text className='text-xs text-muted-foreground'>Purple</z.text>
							<z.progress variant='purple' value={75} />
						</z.box>
						<z.box className='space-y-1'>
							<z.text className='text-xs text-muted-foreground'>Purple</z.text>
							<z.progress variant='purple' value={45} />
						</z.box>
						<z.box className='space-y-1'>
							<z.text className='text-xs text-muted-foreground'>Pink</z.text>
							<z.progress variant='pink' value={90} />
						</z.box>
						<z.box className='space-y-1'>
							<z.text className='text-xs text-muted-foreground'>Pink</z.text>
							<z.progress variant='pink' value={30} />
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Add a label to show the exact progress percentage.'
					code={examples.withLabel}
				>
					<z.box className='space-y-2 w-full'>
						<z.box className='flex justify-between text-sm'>
							<z.text>Progress</z.text>
							<z.text className='text-muted-foreground'>66%</z.text>
						</z.box>
						<z.progress value={66} />
					</z.box>
				</ComponentPreview>

				{/* Animated */}
				<ComponentPreview
					title='Animated Progress'
					description='Animate the progress bar to show real-time updates.'
					code={examples.animated}
				>
					<z.box className='space-y-4 w-full'>
						<z.box className='flex justify-between text-sm'>
							<z.text>Uploading...</z.text>
							<z.text className='text-muted-foreground'>{animatedProgress}%</z.text>
						</z.box>
						<z.progress value={animatedProgress} variant='purple' />
						<z.button onClick={startAnimation} isSmall>
							<RotateCcw className='mr-2 h-4 w-4' />
							Start Animation
						</z.button>
					</z.box>
				</ComponentPreview>

				{/* Multiple Steps */}
				<ComponentPreview
					title='Multi-Step Progress'
					description='Show progress through multiple steps in a process.'
					code={examples.multiStep}
				>
					<z.box className='space-y-6 w-full'>
						<z.box className='space-y-2'>
							<z.box className='flex justify-between text-sm'>
								<z.text>Step 1: Account Setup</z.text>
								<z.text className='text-neon-purple'>Complete</z.text>
							</z.box>
							<z.progress value={100} variant='purple' />
						</z.box>
						<z.box className='space-y-2'>
							<z.box className='flex justify-between text-sm'>
								<z.text>Step 2: Profile Details</z.text>
								<z.text className='text-neon-pink'>In Progress</z.text>
							</z.box>
							<z.progress value={60} variant='pink' />
						</z.box>
						<z.box className='space-y-2'>
							<z.box className='flex justify-between text-sm'>
								<z.text>Step 3: Verification</z.text>
								<z.text className='text-muted-foreground'>Pending</z.text>
							</z.box>
							<z.progress value={0} />
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Progress' props={progressProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>ARIA Attributes</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								The Progress component uses{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>role=&quot;progressbar&quot;</z.box> with appropriate{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>aria-valuenow</z.box>,{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>aria-valuemin</z.box>, and{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>aria-valuemax</z.box> attributes.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Screen Readers</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Screen readers will announce the current progress value. Consider adding a text label for additional context about
								what the progress represents.
							</z.text.body>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
