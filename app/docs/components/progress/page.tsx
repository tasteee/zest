'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ZButton } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, RotateCcw } from 'lucide-react'

const progressProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'number',
		defaultValue: '0',
		description: 'The progress value between 0 and 100.'
	},
	{
		name: 'variant',
		type: '"default" | "green" | "purple" | "pink" | "orange"',
		defaultValue: '"default"',
		description: 'The color variant of the progress bar.'
	},
	{
		name: 'max',
		type: 'number',
		defaultValue: '100',
		description: 'The maximum value of the progress bar.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]

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
					<Badge variant='secondary'>Component</Badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Progress'
				description='A basic progress bar showing completion status.'
				code={`import { ZProgress } from '@tasteee/zest'

export function ProgressDemo() {
  return <ZProgress value={66} />
}`}
			>
				<Progress value={progress} className='w-[60%]' />
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={`import { ZProgress } from '@tasteee/zest'`} language='tsx' />
				<CodeBlock code={`<ZProgress value={33} />`} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Variants */}
				<ComponentPreview
					title='Color Variants'
					description='Progress bars come in different color variants matching the brand neons.'
					code={`<div className="space-y-4 w-full">
  <Progress variant="default" value={60} />
  <Progress variant="green" value={75} />
  <Progress variant="purple" value={45} />
  <Progress variant="pink" value={90} />
  <Progress variant="orange" value={30} />
</div>`}
				>
					<div className='space-y-4 w-full'>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Default</span>
							<Progress variant='default' value={60} />
						</div>
						<div className='space-y-1'>
							<span className='text-xs text-muted-foreground'>Green</span>
							<Progress variant='green' value={75} />
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
							<span className='text-xs text-muted-foreground'>Orange</span>
							<Progress variant='orange' value={30} />
						</div>
					</div>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Add a label to show the exact progress percentage.'
					code={`<div className="space-y-2 w-full">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span className="text-muted-foreground">66%</span>
  </div>
  <Progress value={66} />
</div>`}
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
					code={`const [progress, setProgress] = useState(0)

// Animate progress
const startAnimation = () => {
  setProgress(0)
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval)
        return 100
      }
      return prev + 5
    })
  }, 100)
}

<div className="space-y-4 w-full">
  <Progress value={progress} variant="green" />
  <Button onClick={startAnimation}>
    <RotateCcw className="mr-2 h-4 w-4" />
    Start
  </Button>
</div>`}
				>
					<div className='space-y-4 w-full'>
						<div className='flex justify-between text-sm'>
							<span>Uploading...</span>
							<span className='text-muted-foreground'>{animatedProgress}%</span>
						</div>
						<Progress value={animatedProgress} variant='green' />
						<ZButton onClick={startAnimation} size='sm'>
							<RotateCcw className='mr-2 h-4 w-4' />
							Start Animation
						</ZButton>
					</div>
				</ComponentPreview>

				{/* Multiple Steps */}
				<ComponentPreview
					title='Multi-Step Progress'
					description='Show progress through multiple steps in a process.'
					code={`<div className="space-y-6 w-full">
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Step 1: Account Setup</span>
      <span className="text-neon-green">Complete</span>
    </div>
    <Progress value={100} variant="green" />
  </div>
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Step 2: Profile Details</span>
      <span className="text-neon-orange">In Progress</span>
    </div>
    <Progress value={60} variant="orange" />
  </div>
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Step 3: Verification</span>
      <span className="text-muted-foreground">Pending</span>
    </div>
    <Progress value={0} />
  </div>
</div>`}
				>
					<div className='space-y-6 w-full'>
						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span>Step 1: Account Setup</span>
								<span className='text-neon-green'>Complete</span>
							</div>
							<Progress value={100} variant='green' />
						</div>
						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span>Step 2: Profile Details</span>
								<span className='text-neon-orange'>In Progress</span>
							</div>
							<Progress value={60} variant='orange' />
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
