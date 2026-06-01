'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { breadcrumbLinkProps, breadcrumbPageProps, breadcrumbSeparatorProps } from './props'
import { examples } from './examples'

export default function BreadcrumbsDocsPage() {
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
				<z.text className='text-foreground'>Breadcrumbs</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Breadcrumb</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A hierarchical navigation trail that shows users where they are within the application structure. Fully accessible with
					landmark navigation and current-page semantics.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.breadcrumbs>
					<z.breadcrumbList>
						<z.breadcrumbItem>
							<z.breadcrumbLink href='/'>Home</z.breadcrumbLink>
						</z.breadcrumbItem>
						<z.breadcrumbSeparator />
						<z.breadcrumbItem>
							<z.breadcrumbLink href='/docs/components'>Components</z.breadcrumbLink>
						</z.breadcrumbItem>
						<z.breadcrumbSeparator />
						<z.breadcrumbItem>
							<z.breadcrumbPage>Breadcrumb</z.breadcrumbPage>
						</z.breadcrumbItem>
					</z.breadcrumbList>
				</z.breadcrumbs>
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

				{/* With Ellipsis */}
				<ComponentPreview
					title='With Ellipsis'
					description='Use BreadcrumbEllipsis to collapse deeply nested paths on small screens.'
					code={examples.withEllipsis}
				>
					<z.breadcrumbs>
						<z.breadcrumbList>
							<z.breadcrumbItem>
								<z.breadcrumbLink href='/'>Home</z.breadcrumbLink>
							</z.breadcrumbItem>
							<z.breadcrumbSeparator />
							<z.breadcrumbItem>
								<z.breadcrumbEllipsis />
							</z.breadcrumbItem>
							<z.breadcrumbSeparator />
							<z.breadcrumbItem>
								<z.breadcrumbLink href='/docs/components'>Components</z.breadcrumbLink>
							</z.breadcrumbItem>
							<z.breadcrumbSeparator />
							<z.breadcrumbItem>
								<z.breadcrumbPage>Breadcrumb</z.breadcrumbPage>
							</z.breadcrumbItem>
						</z.breadcrumbList>
					</z.breadcrumbs>
				</ComponentPreview>

				{/* asChild with Next Link */}
				<ComponentPreview
					title='With Next.js Link'
					description='Use asChild to delegate rendering to a Next.js Link for client-side navigation.'
					code={examples.asChild}
				>
					<z.breadcrumbs>
						<z.breadcrumbList>
							<z.breadcrumbItem>
								<z.breadcrumbLink asChild>
									<Link href='/'>Home</Link>
								</z.breadcrumbLink>
							</z.breadcrumbItem>
							<z.breadcrumbSeparator />
							<z.breadcrumbItem>
								<z.breadcrumbLink asChild>
									<Link href='/docs/components'>Components</Link>
								</z.breadcrumbLink>
							</z.breadcrumbItem>
							<z.breadcrumbSeparator />
							<z.breadcrumbItem>
								<z.breadcrumbPage>Current Page</z.breadcrumbPage>
							</z.breadcrumbItem>
						</z.breadcrumbList>
					</z.breadcrumbs>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='BreadcrumbLink' props={breadcrumbLinkProps} />
				<PropsTable title='BreadcrumbPage' props={breadcrumbPageProps} />
				<PropsTable title='BreadcrumbSeparator' props={breadcrumbSeparatorProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Keyboard Interactions</z.text.h3>
							<z.box className='grid gap-2'>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Move focus between breadcrumb links</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</z.text>
									<z.text className='text-muted-foreground'>Navigate to the focused link</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>The Breadcrumb root renders a nav element with aria-label="breadcrumb" automatically</z.box>
								<z.box as='li'>BreadcrumbPage marks the current item with aria-current="page" — do not make it a link</z.box>
								<z.box as='li'>Always include the Home entry as the first item in the trail</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
