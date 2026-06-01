'use client'

import { useState } from 'react'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
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
		<z.box className='space-y-16'>
			{/* Breadcrumb */}
			<z.box.row yCenter gap={2} className='text-sm text-muted-foreground'>
				<z.link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</z.link>
				<ChevronRight className='h-4 w-4' />
				<z.link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</z.link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Button</z.text>
			</z.box.row>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box.row yCenter gap={3}>
					<z.text.h1>z.button</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box.row>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a button or a component that looks like a button. Supports multiple kinds, sizes, and states for different use
					cases.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.button>Click me</z.button>
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

				{/* kinds */}
				<ComponentPreview code={examples.kinds}>
					<z.box.row className='yoooooooo' doesWrap gap={4}>
						<z.button isOutlined isNeutral>
							Outlined
						</z.button>
						<z.button isSolid isNeutral>
							Solid
						</z.button>
						<z.button isGhost isNeutral>
							Ghost
						</z.button>
					</z.box.row>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview code={examples.colors}>
					<z.box.column gap={6}>
						<z.box.row doesWrap yCenter gap={3}>
							<z.button isPurple isOutlined>
								Purple Outlined
							</z.button>
							<z.button isPurple isSolid>
								Purple Solid
							</z.button>
							<z.button isPurple isGhost>
								Purple Ghost
							</z.button>
						</z.box.row>
						<z.box.row doesWrap yCenter gap={3}>
							<z.button isPurple isOutlined>
								Purple Outlined
							</z.button>
							<z.button isPurple isSolid>
								Purple Solid
							</z.button>
							<z.button isPurple isGhost>
								Purple Ghost
							</z.button>
						</z.box.row>
						<z.box.row doesWrap yCenter gap={3}>
							<z.button isPink isOutlined>
								Pink Outlined
							</z.button>
							<z.button isPink isSolid>
								Pink Solid
							</z.button>
							<z.button isPink isGhost>
								Pink Ghost
							</z.button>
						</z.box.row>
						<z.box.row doesWrap yCenter gap={3}>
							<z.button isPink isOutlined>
								Pink Outlined
							</z.button>
							<z.button isPink isSolid>
								Pink Solid
							</z.button>
							<z.button isPink isGhost>
								Pink Ghost
							</z.button>
						</z.box.row>
						<z.box.row doesWrap yCenter gap={3}>
							<z.button isNeutral isOutlined>
								Neutral Outlined
							</z.button>
							<z.button isNeutral isSolid>
								Neutral Solid
							</z.button>
							<z.button isNeutral isGhost>
								Neutral Ghost
							</z.button>
						</z.box.row>
					</z.box.column>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview code={examples.sizes}>
					<z.box.row yCenter gap={4}>
						<z.button isSmall>Small</z.button>
						<z.button isMedium>Default</z.button>
						<z.button isLarge>Large</z.button>
						<z.button isIcon>
							<Plus className='h-4 w-4' />
						</z.button>
					</z.box.row>
				</ComponentPreview>

				{/* With Icons */}
				<ComponentPreview code={examples.withIcons}>
					<z.box.row doesWrap gap={4}>
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
					</z.box.row>
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
					<z.box.row gap={4}>
						<z.button isDisabled>Disabled</z.button>
						<z.button isDisabled>Disabled Outline</z.button>
						<z.button isDisabled>Disabled Secondary</z.button>
					</z.box.row>
				</ComponentPreview>

				{/* As Child */}
				<ComponentPreview code={examples.asChild}>
					<z.button>
						<z.link href='/docs'>
							Go to Docs
							<ArrowRight className='ml-2 h-4 w-4' />
						</z.link>
					</z.button>
				</ComponentPreview>

				{/* Icon Buttons */}
				<ComponentPreview code={examples.iconButtons}>
					<z.box.row gap={2}>
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
					</z.box.row>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable props={buttonProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Keyboard Interactions</z.text.h3>
							<z.box.column gap={2}>
								<z.box.row yCenter gap={4} className='text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</z.text>
									<z.text className='text-muted-foreground'>Activates the button</z.text>
								</z.box.row>
								<z.box.row yCenter gap={4} className='text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</z.text>
									<z.text className='text-muted-foreground'>Activates the button</z.text>
								</z.box.row>
							</z.box.column>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Screen Readers</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
								<z.box as='li'>Uses native button semantics for proper accessibility</z.box>
								<z.box as='li'>Disabled state is communicated via aria-disabled</z.box>
								<z.box as='li'>Focus ring is visible for keyboard navigation</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>

			{/* Related Components */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Related Components</z.text.h2>
				<z.box className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{[
						{ name: 'ZDropdownMenu', href: '/docs/components/dropdown-menu', description: 'Menus triggered by buttons' },
						{ name: 'ZDialog', href: '/docs/components/dialog', description: 'Modal dialogs triggered by buttons' },
						{ name: 'z.tooltip', href: '/docs/components/tooltip', description: 'Tooltips for button hints' }
					].map((component) => (
						<z.link key={component.name} href={component.href}>
							<z.card className='h-full transition-colors hover:border-primary/50'>
								<z.cardContent className='p-4'>
									<z.text.h3>{component.name}</z.text.h3>
									<z.text.body className='text-sm text-muted-foreground mt-1'>{component.description}</z.text.body>
								</z.cardContent>
							</z.card>
						</z.link>
					))}
				</z.box>
			</z.box>
		</z.box>
	)
}
