'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ToastAction } from '@/components/ui/toast'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { toastFnProps, toastActionProps } from './props'
import { examples } from './examples'

export default function ToastDocsPage() {
	const { toast } = useToast()

	const handleDefaultToast = () => {
		toast({
			title: 'Event created',
			description: 'Your event has been scheduled for tomorrow.'
		})
	}

	const handleWithActionToast = () => {
		toast({
			title: 'File deleted',
			description: 'This action can be undone.',
			action: (
				<ToastAction altText='Undo delete' onClick={() => {}}>
					Undo
				</ToastAction>
			)
		})
	}

	const handleDestructiveToast = () => {
		toast({
			variant: 'destructive',
			title: 'Something went wrong',
			description: 'There was a problem with your request. Please try again.'
		})
	}

	const handleSimpleToast = () => {
		toast({ title: 'Profile updated' })
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
				<span className='text-foreground'>Toast</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Toast</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Transient notification messages triggered imperatively via the useToast hook. Supports titles, descriptions,
					action buttons, and a destructive variant.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.button onClick={handleDefaultToast}>Show toast</z.button>
			</ComponentPreview>

			{/* Setup */}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Setup</h2>
				<p className='text-muted-foreground'>
					Add the Toaster to your root layout. It renders the toast viewport and listens to the global toast state.
				</p>
				<CodeBlock code={examples.setup} language='tsx' />
			</section>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* With Action */}
				<ComponentPreview
					title='With Action'
					description='Include a ToastAction to give users an inline undo or follow-up button.'
					code={examples.withAction}
				>
					<z.button onClick={handleWithActionToast}>Show with action</z.button>
				</ComponentPreview>

				{/* Destructive */}
				<ComponentPreview
					title='Destructive'
					description='Use variant="destructive" for errors and irreversible operations.'
					code={examples.destructive}
				>
					<z.button onClick={handleDestructiveToast}>Show error toast</z.button>
				</ComponentPreview>

				{/* Simple */}
				<ComponentPreview
					title='Title Only'
					description='A toast with just a title is appropriate for brief confirmations.'
					code={examples.simple}
				>
					<z.button onClick={handleSimpleToast}>Show simple toast</z.button>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='toast()' props={toastFnProps} />
				<PropsTable title='ToastAction' props={toastActionProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Toasts render inside a live region — screen readers announce them without requiring focus</li>
								<li>Always provide altText on ToastAction so the action is described to screen readers</li>
								<li>Keep toast messages brief — one short sentence for title, one for description</li>
								<li>Do not use toasts for critical errors that require immediate user action — use Dialog instead</li>
								<li>Only one toast is shown at a time by default (TOAST_LIMIT = 1)</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
