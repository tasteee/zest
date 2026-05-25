'use client'

import { useState } from 'react'
import { Link } from '@/components/ui/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Loader2, Mail, Plus, ArrowRight, Download, ExternalLink, Check, X } from 'lucide-react'

const buttonProps = [
	{
		name: 'kind',
		type: '"outlined" | "solid" | "ghost"',
		defaultValue: '"outlined"',
		description: 'The visual style kind of the button.'
	},
	{
		name: 'size',
		type: '"xs" | "sm" | "md" | "lg" | "xl"',
		defaultValue: '"md"',
		description: 'The size of the button.'
	},
	{
		name: 'color',
		type: '"green" | "purple" | "pink" | "orange" | "white"',
		defaultValue: '"white"',
		description: 'The color theme of the button.'
	},
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the button.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the button.'
	}
]

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
					<z.badge isGhost isWhite>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a button or a component that looks like a button. Supports multiple kinds, sizes, and states for different use
					cases.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={`import { z } from '@tasteee/zest'

export function ButtonDemo() {
  return <z.button>Click me</z.button>
}`}
			>
				<z.button>Click me</z.button>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={`import { z } from '@tasteee/zest'`} language='tsx' />
				<CodeBlock code={`<z.button>Click me</z.button>`} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* kinds */}
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'

<div className="flex flex-wrap gap-4">
  <z.button isOutlined>Outlined</z.button>
  <z.button>Solid</z.button>
  <z.button>Ghost</z.button>
</div>`}
				>
					<div className='flex flex-wrap gap-4'>
						<z.button isOutlined isWhite>
							Outlined
						</z.button>
						<z.button isSolid isWhite>
							Solid
						</z.button>
						<z.button isGhost isWhite>
							Ghost
						</z.button>
					</div>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'

{/* Green */}
<z.button isGreen isOutlined>Green Outlined</z.button>
<z.button isGreen isSolid>Green Solid</z.button>
<z.button isGreen isGhost>Green Ghost</z.button>

{/* Purple */}
<z.button isPurple isOutlined>Purple Outlined</z.button>
<z.button isPurple isSolid>Purple Solid</z.button>
<z.button isPurple isGhost>Purple Ghost</z.button>

{/* Pink */}
<z.button isPink isOutlined>Pink Outlined</z.button>
<z.button isPink isSolid>Pink Solid</z.button>
<z.button isPink isGhost>Pink Ghost</z.button>

{/* Orange */}
<z.button isOrange isOutlined>Orange Outlined</z.button>
<z.button isOrange isSolid>Orange Solid</z.button>
<z.button isOrange isGhost>Orange Ghost</z.button>

{/* White */}
<z.button isWhite isOutlined>White Outlined</z.button>
<z.button isWhite isSolid>White Solid</z.button>
<z.button isWhite isGhost>White Ghost</z.button>`}
				>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isGreen isOutlined>
								Green Outlined
							</z.button>
							<z.button isGreen isSolid>
								Green Solid
							</z.button>
							<z.button isGreen isGhost>
								Green Ghost
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
							<z.button isOrange isOutlined>
								Orange Outlined
							</z.button>
							<z.button isOrange isSolid>
								Orange Solid
							</z.button>
							<z.button isOrange isGhost>
								Orange Ghost
							</z.button>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<z.button isWhite isOutlined>
								White Outlined
							</z.button>
							<z.button isWhite isSolid>
								White Solid
							</z.button>
							<z.button isWhite isGhost>
								White Ghost
							</z.button>
						</div>
					</div>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'
import { Plus } from 'lucide-react'

<div className="flex items-center gap-4">
  <z.button isSmall>Small</z.button>
  <z.button isMedium>Default</z.button>
  <z.button isLarge>Large</z.button>
  <z.button isIcon>
    <Plus className="h-4 w-4" />
  </z.button>
</div>`}
				>
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
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'
import { Mail, Download, ExternalLink } from 'lucide-react'

<div className="flex flex-wrap gap-4">
  <z.button>
    <Mail className="mr-2 h-4 w-4" />
    Login with Email
  </z.button>
  <z.button>
    Download
    <Download className="ml-2 h-4 w-4" />
  </z.button>
  <z.button>
    <ExternalLink className="mr-2 h-4 w-4" />
    Open Link
  </z.button>
</div>`}
				>
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
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'
import { Loader2 } from 'lucide-react'

<z.button disabled={isLoading} onClick={handleLoadingClick}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </>
  ) : (
    "Click me"
  )}
</z.button>`}
				>
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
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'

<div className="flex gap-4">
  <z.button disabled>Disabled</z.button>
  <z.button disabled>Disabled Outline</z.button>
  <z.button disabled>Disabled Secondary</z.button>
</div>`}
				>
					<div className='flex gap-4'>
						<z.button isDisabled>Disabled</z.button>
						<z.button isDisabled>Disabled Outline</z.button>
						<z.button isDisabled>Disabled Secondary</z.button>
					</div>
				</ComponentPreview>

				{/* As Child */}
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

<z.button asChild>
  <Link href="/docs">
    Go to Docs
    <ArrowRight className="ml-2 h-4 w-4" />
  </Link>
</z.button>`}
				>
					<z.button>
						<Link href='/docs'>
							Go to Docs
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</z.button>
				</ComponentPreview>

				{/* Icon Buttons */}
				<ComponentPreview
					code={`import { z } from '@tasteee/zest'
import { Check, X, Plus } from 'lucide-react'

<div className="flex gap-2">
  <z.button isIcon>
    <Check className="h-4 w-4" />
  </z.button>
  <z.button isIcon>
    <X className="h-4 w-4" />
  </z.button>
  <z.button isIcon>
    <Plus className="h-4 w-4" />
  </z.button>
  <z.button isIcon>
    <X className="h-4 w-4" />
  </z.button>
</div>`}
				>
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
