'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { labelProps } from './props'
import { examples } from './examples'
export default function LabelDocsPage() {
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
				<z.text className='text-foreground'>Label</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZLabel</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Renders an accessible label associated with controls. Labels provide context for form inputs and improve accessibility.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Label'
				description='A basic label associated with an input.'
				code={examples.quickPreview}
			>
				<z.box className='grid w-full max-w-sm items-center gap-1.5'>
					<z.label htmlFor='email'>Email</z.label>
					<z.input type='email' id='email' placeholder='Enter your email' />
				</z.box>
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

				{/* With Input */}
				<ComponentPreview
					title='With Input'
					description='Label paired with an input field.'
					code={examples.withInput}
				>
					<z.box className='grid w-full max-w-sm items-center gap-1.5'>
						<z.label htmlFor='username'>Username</z.label>
						<z.input id='username' placeholder='Enter username' />
					</z.box>
				</ComponentPreview>

				{/* With Checkbox */}
				<ComponentPreview
					title='With Checkbox'
					description='Label paired with a checkbox for click-to-toggle behavior.'
					code={examples.withCheckbox}
				>
					<z.box className='flex items-center space-x-2'>
						<z.checkbox id='terms' />
						<z.label htmlFor='terms'>Accept terms and conditions</z.label>
					</z.box>
				</ComponentPreview>

				{/* With Required Indicator */}
				<ComponentPreview
					title='Required Field'
					description='Indicate required fields with an asterisk.'
					code={examples.requiredField}
				>
					<z.box className='grid w-full max-w-sm items-center gap-1.5'>
						<z.label htmlFor='name'>
							Full Name <z.text className='text-destructive'>*</z.text>
						</z.label>
						<z.input id='name' placeholder='John Doe' required />
					</z.box>
				</ComponentPreview>

				{/* With Description */}
				<ComponentPreview
					title='With Description'
					description='Add helper text below the input.'
					code={examples.withDescription}
				>
					<z.box className='grid w-full max-w-sm items-center gap-1.5'>
						<z.label htmlFor='password'>Password</z.label>
						<z.input id='password' type='password' placeholder='Enter password' />
						<z.text.body className='text-xs text-muted-foreground'>Must be at least 8 characters long</z.text.body>
					</z.box>
				</ComponentPreview>

				{/* Disabled State */}
				<ComponentPreview
					title='Disabled State'
					description='Labels automatically style when their associated input is disabled.'
					code={examples.disabledState}
				>
					<z.box className='grid w-full max-w-sm items-center gap-1.5'>
						<z.label htmlFor='disabled-input'>Disabled Field</z.label>
						<z.input id='disabled-input' disabled placeholder='Cannot edit' />
					</z.box>
				</ComponentPreview>

				{/* Form Group */}
				<ComponentPreview
					title='Form Group'
					description='Multiple labeled inputs in a form layout.'
					code={examples.formGroup}
				>
					<z.box className='space-y-4 w-full max-w-sm'>
						<z.box className='grid items-center gap-1.5'>
							<z.label htmlFor='first-name'>First Name</z.label>
							<z.input id='first-name' placeholder='John' />
						</z.box>
						<z.box className='grid items-center gap-1.5'>
							<z.label htmlFor='last-name'>Last Name</z.label>
							<z.input id='last-name' placeholder='Doe' />
						</z.box>
						<z.box className='grid items-center gap-1.5'>
							<z.label htmlFor='email-form'>Email</z.label>
							<z.input id='email-form' type='email' placeholder='john@example.com' />
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Label' props={labelProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Association</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Always use <z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>htmlFor</z.box> to associate the label with its
								form control. This allows clicking the label to focus the input.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Screen Readers</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Screen readers announce the label when the associated input receives focus, providing context for the user.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Required Fields</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								When marking required fields, use both visual indicators (like an asterisk) and the{' '}
								<z.box as='code' className='text-xs bg-muted px-1 py-0.5 rounded'>required</z.box> attribute on the input.
							</z.text.body>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
