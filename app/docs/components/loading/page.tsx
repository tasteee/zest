'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Spinner } from '@/components/ui/spinner'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
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
				<span className='text-foreground'>Loading</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Loading / Spinner</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A lightweight animated spinner for conveying async loading states. Accessible by default with a role and
					aria-label. Scalable via className.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Spinner className='size-8' />
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

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Use size-* classes to scale the spinner. Default is size-4.'
					code={examples.sizes}
				>
					<div className='flex items-end gap-6'>
						<Spinner />
						<Spinner className='size-6' />
						<Spinner className='size-8' />
						<Spinner className='size-12' />
					</div>
				</ComponentPreview>

				{/* In Button */}
				<ComponentPreview
					title='In Button'
					description='Combine with isLoading prop or manual state for async button feedback.'
					code={examples.inButton}
				>
					<z.button onClick={handleLoadingButtonClick} isDisabled={isButtonLoading}>
						{isButtonLoading ? <Spinner className='mr-2' /> : null}
						{isButtonLoading ? 'Saving...' : 'Save changes'}
					</z.button>
				</ComponentPreview>

				{/* Inline in Card */}
				<ComponentPreview
					title='Inline Loading State'
					description='Use inside content regions to indicate data is being fetched.'
					code={examples.inlineInCard}
				>
					<div className='rounded-lg border p-6 flex items-center justify-center h-40 w-72'>
						<div className='flex flex-col items-center gap-2'>
							<Spinner className='size-6' />
							<p className='text-sm text-muted-foreground'>Fetching data...</p>
						</div>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Spinner' props={spinnerProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>
									The Spinner renders with role="status" and aria-label="Loading" — screen readers announce it
									automatically
								</li>
								<li>
									Override aria-label with a specific description when context matters, e.g. "Submitting form"
								</li>
								<li>
									For buttons, use z.button's built-in isLoading prop which handles the spinner and disabled state
									together
								</li>
								<li>Pair the spinner with a visible text label when used in larger loading regions</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
