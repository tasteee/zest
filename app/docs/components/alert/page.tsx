'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'import { ChevronRight, CircleAlert, Info, CheckCircle2, TriangleAlert, Terminal, Sparkles } from 'lucide-react'
import { alertProps } from './props'
import { examples } from './examples'
const AlertDocsPage = () => {
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
				<z.text className='text-foreground'>Alert</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZAlert</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a callout for user attention. Alerts provide contextual feedback messages for typical user actions.
				</z.text.body>
			</z.box>

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
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

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
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ZAlert' props={alertProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>ARIA Roles</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>
									The Alert component has <z.box as='code' className='text-primary'>role=&quot;alert&quot;</z.box> by default
								</z.box>
								<z.box as='li'>Screen readers will announce alert content immediately</z.box>
								<z.box as='li'>For non-urgent information, consider using a different role</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use descriptive titles that summarize the alert</z.box>
								<z.box as='li'>Keep alert descriptions concise and actionable</z.box>
								<z.box as='li'>Use one color prop at a time (isRed, isPurple, isPink, isPurple, isPink)</z.box>
								<z.box as='li'>Rely on the built-in icon and title defaults unless a custom alert needs more specific copy</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}

export default AlertDocsPage
