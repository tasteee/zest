'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
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
				<z.toastAction altText='Undo delete' onClick={() => {}}>
					Undo
				</z.toastAction>
			)
		})
	}

	const handleDestructiveToast = () => {
		toast({
			isRed: true,
			title: 'Something went wrong',
			description: 'There was a problem with your request. Please try again.'
		})
	}

	const handleSimpleToast = () => {
		toast({ title: 'Profile updated' })
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
				<z.text className='text-foreground'>Toast</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Toast</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Transient notification messages triggered imperatively via the useToast hook. Supports titles, descriptions, action
					buttons, and a destructive variant.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.button onClick={handleDefaultToast}>Show toast</z.button>
			</ComponentPreview>

			{/* Setup */}
			<z.box as='section' className='space-y-4'>
				<z.text.h2>Setup</z.text.h2>
				<z.text.body className='text-muted-foreground'>
					Add the Toaster to your root layout. It renders the toast viewport and listens to the global toast state.
				</z.text.body>
				<CodeBlock code={examples.setup} language='tsx' />
			</z.box>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

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
					description='Use isRed for errors and irreversible operations.'
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
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='toast()' props={toastFnProps} />
				<PropsTable title='ToastAction' props={toastActionProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Toasts render inside a live region — screen readers announce them without requiring focus</z.box>
								<z.box as='li'>Always provide altText on ToastAction so the action is described to screen readers</z.box>
								<z.box as='li'>Keep toast messages brief — one short sentence for title, one for description</z.box>
								<z.box as='li'>Do not use toasts for critical errors that require immediate user action — use Dialog instead</z.box>
								<z.box as='li'>Only one toast is shown at a time by default (TOAST_LIMIT = 1)</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
