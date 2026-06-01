'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { spinnerProps } from './props'
import { examples } from './examples'

export default function LoadingDocsPage() {
	const [isButtonLoading, setIsButtonLoading] = useState(false)

	const handleLoadingButtonClick = () => {
		setIsButtonLoading(true)
		setTimeout(() => {
			setIsButtonLoading(false)
		}, 2000)
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
				<z.text className='text-foreground'>Loading</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Loading / Spinner</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A lightweight animated spinner for conveying async loading states. Accessible by default with a role and aria-label.
					Scalable via className.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.loading className='size-8' />
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

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Use size-* classes to scale the spinner. Default is size-4.'
					code={examples.sizes}
				>
					<z.box className='flex items-end gap-6'>
						<z.loading />
						<z.loading className='size-6' />
						<z.loading className='size-8' />
						<z.loading className='size-12' />
					</z.box>
				</ComponentPreview>

				{/* In Button */}
				<ComponentPreview
					title='In Button'
					description='Combine with isLoading prop or manual state for async button feedback.'
					code={examples.inButton}
				>
					<z.button onClick={handleLoadingButtonClick} isDisabled={isButtonLoading}>
						{isButtonLoading ? <z.loading className='mr-2' /> : null}
						{isButtonLoading ? 'Saving...' : 'Save changes'}
					</z.button>
				</ComponentPreview>

				{/* Inline in Card */}
				<ComponentPreview
					title='Inline Loading State'
					description='Use inside content regions to indicate data is being fetched.'
					code={examples.inlineInCard}
				>
					<z.box className='rounded-lg border p-6 flex items-center justify-center h-40 w-72'>
						<z.box className='flex flex-col items-center gap-2'>
							<z.loading className='size-6' />
							<z.text.body className='text-sm text-muted-foreground'>Fetching data...</z.text.body>
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Spinner' props={spinnerProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>The Spinner renders with role="status" and aria-label="Loading" — screen readers announce it automatically</z.box>
								<z.box as='li'>Override aria-label with a specific description when context matters, e.g. "Submitting form"</z.box>
								<z.box as='li'>For buttons, use z.button's built-in isLoading prop which handles the spinner and disabled state together</z.box>
								<z.box as='li'>Pair the spinner with a visible text label when used in larger loading regions</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
