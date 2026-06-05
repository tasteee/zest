'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, CircleAlert, Info, CheckCircle2, TriangleAlert, Terminal, Sparkles } from 'lucide-react'
import { alertProps } from './props'
import { examples } from './examples'
const AlertDocsPage = () => {
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
				<span className='text-foreground'>Alert</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZAlert</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a callout for user attention. Alerts provide contextual feedback messages for typical user actions.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={examples.quickPreview}
			>
				<z.alert className='max-w-lg'>
					<Info className='h-4 w-4' />
					<z.alert.title>Default Alert</z.alert.title>
					<z.alert.description>You can add components to your app using the CLI.</z.alert.description>
				</z.alert>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Error */}
				<ComponentPreview
					title='Error Alert'
					description='Use isRed for destructive or blocking errors.'
					code={examples.error}
				>
					<z.alert isRed className='max-w-lg'>
						<CircleAlert className='h-4 w-4' />
						<z.alert.title>Error</z.alert.title>
						<z.alert.description>Your session has expired. Please log in again.</z.alert.description>
					</z.alert>
				</ComponentPreview>

				{/* Success */}
				<ComponentPreview
					title='Success Alert'
					description='Use isPurple for successful outcomes and confirmations.'
					code={examples.success}
				>
					<z.alert isPurple className='max-w-lg'>
						<CheckCircle2 className='h-4 w-4' />
						<z.alert.title>Success</z.alert.title>
						<z.alert.description>Your changes have been saved successfully.</z.alert.description>
					</z.alert>
				</ComponentPreview>

				{/* Warning */}
				<ComponentPreview
					title='Warning Alert'
					description='Use isPink to warn users before risky actions.'
					code={examples.warning}
				>
					<z.alert isPink className='max-w-lg'>
						<TriangleAlert className='h-4 w-4' />
						<z.alert.title>Warning</z.alert.title>
						<z.alert.description>Your storage is almost full. Consider upgrading your plan.</z.alert.description>
					</z.alert>
				</ComponentPreview>

				{/* Information */}
				<ComponentPreview
					title='Info Alert'
					description='Use isPurple for neutral or educational callouts.'
					code={examples.information}
				>
					<z.alert isPurple className='max-w-lg'>
						<Terminal className='h-4 w-4' />
						<z.alert.title>Information</z.alert.title>
						<z.alert.description>Your account is pending verification. Check your email for next steps.</z.alert.description>
					</z.alert>
				</ComponentPreview>

				{/* Featured */}
				<ComponentPreview
					title='Featured Alert'
					description='Use isPink for highlighted content and featured notices.'
					code={examples.featured}
				>
					<z.alert isPink className='max-w-lg'>
						<Sparkles className='h-4 w-4' />
						<z.alert.title>Featured</z.alert.title>
						<z.alert.description>This content has been marked as featured.</z.alert.description>
					</z.alert>
				</ComponentPreview>

				{/* Automatic Defaults */}
				<ComponentPreview
					title='Automatic Defaults'
					description='Alerts add a matching icon and title for the selected color.'
					code={examples.automaticDefaults}
				>
					<z.alert className='max-w-lg'>
						<z.alert.description>This alert uses the default icon and title.</z.alert.description>
					</z.alert>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ZAlert' props={alertProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>ARIA Roles</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>
									The Alert component has <code className='text-primary'>role=&quot;alert&quot;</code> by default
								</li>
								<li>Screen readers will announce alert content immediately</li>
								<li>For non-urgent information, consider using a different role</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use descriptive titles that summarize the alert</li>
								<li>Keep alert descriptions concise and actionable</li>
								<li>Use one color prop at a time (isRed, isPurple, isPink, isPurple, isPink)</li>
								<li>Rely on the built-in icon and title defaults unless a custom alert needs more specific copy</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}

export default AlertDocsPage
