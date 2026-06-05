'use client'

import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { z } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { labelProps } from './props'
import { examples } from './examples'
export default function LabelDocsPage() {
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
				<span className='text-foreground'>Label</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZLabel</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Renders an accessible label associated with controls. Labels provide context for form inputs and improve accessibility.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Label'
				description='A basic label associated with an input.'
				code={examples.quickPreview}
			>
				<div className='grid w-full max-w-sm items-center gap-1.5'>
					<Label htmlFor='email'>Email</Label>
					<Input type='email' id='email' placeholder='Enter your email' />
				</div>
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

				{/* With Input */}
				<ComponentPreview
					title='With Input'
					description='Label paired with an input field.'
					code={examples.withInput}
				>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='username'>Username</Label>
						<Input id='username' placeholder='Enter username' />
					</div>
				</ComponentPreview>

				{/* With Checkbox */}
				<ComponentPreview
					title='With Checkbox'
					description='Label paired with a checkbox for click-to-toggle behavior.'
					code={examples.withCheckbox}
				>
					<div className='flex items-center space-x-2'>
						<Checkbox id='terms' />
						<Label htmlFor='terms'>Accept terms and conditions</Label>
					</div>
				</ComponentPreview>

				{/* With Required Indicator */}
				<ComponentPreview
					title='Required Field'
					description='Indicate required fields with an asterisk.'
					code={examples.requiredField}
				>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='name'>
							Full Name <span className='text-destructive'>*</span>
						</Label>
						<Input id='name' placeholder='John Doe' required />
					</div>
				</ComponentPreview>

				{/* With Description */}
				<ComponentPreview
					title='With Description'
					description='Add helper text below the input.'
					code={examples.withDescription}
				>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='password'>Password</Label>
						<Input id='password' type='password' placeholder='Enter password' />
						<p className='text-xs text-muted-foreground'>Must be at least 8 characters long</p>
					</div>
				</ComponentPreview>

				{/* Disabled State */}
				<ComponentPreview
					title='Disabled State'
					description='Labels automatically style when their associated input is disabled.'
					code={examples.disabledState}
				>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='disabled-input'>Disabled Field</Label>
						<Input id='disabled-input' disabled placeholder='Cannot edit' />
					</div>
				</ComponentPreview>

				{/* Form Group */}
				<ComponentPreview
					title='Form Group'
					description='Multiple labeled inputs in a form layout.'
					code={examples.formGroup}
				>
					<div className='space-y-4 w-full max-w-sm'>
						<div className='grid items-center gap-1.5'>
							<Label htmlFor='first-name'>First Name</Label>
							<Input id='first-name' placeholder='John' />
						</div>
						<div className='grid items-center gap-1.5'>
							<Label htmlFor='last-name'>Last Name</Label>
							<Input id='last-name' placeholder='Doe' />
						</div>
						<div className='grid items-center gap-1.5'>
							<Label htmlFor='email-form'>Email</Label>
							<Input id='email-form' type='email' placeholder='john@example.com' />
						</div>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Label' props={labelProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Association</h3>
							<p className='text-sm text-muted-foreground'>
								Always use <code className='text-xs bg-muted px-1 py-0.5 rounded'>htmlFor</code> to associate the label with its
								form control. This allows clicking the label to focus the input.
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Screen Readers</h3>
							<p className='text-sm text-muted-foreground'>
								Screen readers announce the label when the associated input receives focus, providing context for the user.
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Required Fields</h3>
							<p className='text-sm text-muted-foreground'>
								When marking required fields, use both visual indicators (like an asterisk) and the{' '}
								<code className='text-xs bg-muted px-1 py-0.5 rounded'>required</code> attribute on the input.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
