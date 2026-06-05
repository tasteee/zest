'use client'

import { useState } from 'react'
import { Link } from '@/components/ui/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Loader2, Mail, Plus, ArrowRight, Download, ExternalLink, Check, X } from 'lucide-react'
import { buttonProps } from './props'
import { examples } from './examples'

export default function ButtonDocsPage() {
	const [isLoading, setIsLoading] = useState(false)

	const handleLoadingClick = () => {
		setIsLoading(true)
		setTimeout(() => setIsLoading(false), 2000)
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
				<span className='text-foreground'>Button</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>z.button</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a button or a component that looks like a button. Supports multiple kinds, sizes, and states for different use
					cases.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.button>Click me</z.button>
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

				{/* kinds */}
				<ComponentPreview code={examples.kinds}>
					<div className='flex flex-wrap gap-4'>
						<z.button isOutlined isNeutral>
							Outlined
						</z.button>
						<z.button isSolid isNeutral>
							Solid
						</z.button>
						<z.button isGhost isNeutral>
							Ghost
						</z.button>
					</div>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview code={examples.colors}>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isPurple isOutlined>
								Purple Outlined
							</z.button>
							<z.button isPurple isSolid>
								Purple Solid
							</z.button>
							<z.button isPurple isGhost>
								Purple Ghost
							</z.button>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isPurple isOutlined>
								Purple Outlined
							</z.button>
							<z.button isPurple isSolid>
								Purple Solid
							</z.button>
							<z.button isPurple isGhost>
								Purple Ghost
							</z.button>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isPink isOutlined>
								Pink Outlined
							</z.button>
							<z.button isPink isSolid>
								Pink Solid
							</z.button>
							<z.button isPink isGhost>
								Pink Ghost
							</z.button>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isPink isOutlined>
								Pink Outlined
							</z.button>
							<z.button isPink isSolid>
								Pink Solid
							</z.button>
							<z.button isPink isGhost>
								Pink Ghost
							</z.button>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isNeutral isOutlined>
								Neutral Outlined
							</z.button>
							<z.button isNeutral isSolid>
								Neutral Solid
							</z.button>
							<z.button isNeutral isGhost>
								Neutral Ghost
							</z.button>
						</div>
					</div>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview code={examples.sizes}>
					<div className='flex items-center gap-4'>
						<z.button isSmall>Small</z.button>
						<z.button isMedium>Default</z.button>
						<z.button isLarge>Large</z.button>
						<z.button isIcon>
							<Plus className='h-4 w-4' />
						</z.button>
					</div>
				</ComponentPreview>

				{/* With Icons */}
				<ComponentPreview code={examples.withIcons}>
					<div className='flex flex-wrap gap-4'>
						<z.button>
							<Mail className='mr-2 h-4 w-4' />
							Login with Email
						</z.button>
						<z.button>
							Download
							<Download className='ml-2 h-4 w-4' />
						</z.button>
						<z.button>
							<ExternalLink className='mr-2 h-4 w-4' />
							Open Link
						</z.button>
					</div>
				</ComponentPreview>

				{/* Loading State */}
				<ComponentPreview code={examples.loadingState}>
					<z.button isDisabled={isLoading} onClick={handleLoadingClick}>
						{isLoading ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Please wait
							</>
						) : (
							'Click me'
						)}
					</z.button>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview code={examples.disabled}>
					<div className='flex gap-4'>
						<z.button isDisabled>Disabled</z.button>
						<z.button isDisabled>Disabled Outline</z.button>
						<z.button isDisabled>Disabled Secondary</z.button>
					</div>
				</ComponentPreview>

				{/* As Child */}
				<ComponentPreview code={examples.asChild}>
					<z.button>
						<Link href='/docs'>
							Go to Docs
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</z.button>
				</ComponentPreview>

				{/* Icon Buttons */}
				<ComponentPreview code={examples.iconButtons}>
					<div className='flex gap-2'>
						<z.button isIcon>
							<Check className='h-4 w-4' />
						</z.button>
						<z.button isIcon>
							<X className='h-4 w-4' />
						</z.button>
						<z.button isIcon>
							<Plus className='h-4 w-4' />
						</z.button>
						<z.button isIcon>
							<X className='h-4 w-4' />
						</z.button>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable props={buttonProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Keyboard Interactions</h3>
							<div className='grid gap-2'>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</kbd>
									<span className='text-muted-foreground'>Activates the button</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</kbd>
									<span className='text-muted-foreground'>Activates the button</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Screen Readers</h3>
							<ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
								<li>Uses native button semantics for proper accessibility</li>
								<li>Disabled state is communicated via aria-disabled</li>
								<li>Focus ring is visible for keyboard navigation</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Related Components */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Related Components</h2>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{[
						{ name: 'ZDropdownMenu', href: '/docs/components/dropdown-menu', description: 'Menus triggered by buttons' },
						{ name: 'ZDialog', href: '/docs/components/dialog', description: 'Modal dialogs triggered by buttons' },
						{ name: 'z.tooltip', href: '/docs/components/tooltip', description: 'Tooltips for button hints' }
					].map((component) => (
						<Link key={component.name} href={component.href}>
							<Card className='h-full transition-colors hover:border-primary/50'>
								<CardContent className='p-4'>
									<h3 className='font-semibold text-foreground'>{component.name}</h3>
									<p className='text-sm text-muted-foreground mt-1'>{component.description}</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>
		</div>
	)
}
