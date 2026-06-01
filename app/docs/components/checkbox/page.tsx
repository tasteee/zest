'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { checkboxProps } from './props'
import { examples } from './examples'
export default function CheckboxDocsPage() {
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
				<z.text className='text-foreground'>Checkbox</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZCheckbox</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A control that allows the user to toggle between checked, unchecked, and indeterminate states. Built on Radix UI
					Checkbox primitive.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Checkbox'
				description='A basic checkbox with label.'
				code={examples.quickPreview}
			>
				<z.checkbox id='terms' label='Accept terms and conditions' />
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

				{/* Default Checked */}
				<ComponentPreview
					title='Default Checked'
					description='A checkbox that starts checked.'
					code={examples.defaultChecked}
				>
					<z.checkbox id='subscribed' isChecked label='Subscribe to newsletter' />
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Disabled checkboxes cannot be toggled.'
					code={examples.disabled}
				>
					<z.box className='flex flex-col gap-4'>
						<z.checkbox id='disabled' isDisabled label='Disabled' />
						<z.checkbox id='disabled-checked' isDisabled isChecked label='Disabled checked' />
					</z.box>
				</ComponentPreview>

				{/* With Description */}
				<ComponentPreview
					title='With Description'
					description='A checkbox with additional descriptive text.'
					code={examples.withDescription}
				>
					<z.checkbox
						id='terms-desc'
						label='Accept terms and conditions'
						description='You agree to our Terms of Service and Privacy Policy.'
					/>
				</ComponentPreview>

				{/* Checkbox Group */}
				<ComponentPreview
					title='Checkbox Group'
					description='Multiple checkboxes for selecting multiple options.'
					code={examples.checkboxGroup}
				>
					<z.box className='space-y-4'>
						<z.text as='h4' isSmall isBold>Select your interests</z.text>
						<z.box className='space-y-2'>
							<z.checkbox id='interest-1' label='Technology' />
							<z.checkbox id='interest-2' isChecked label='Design' />
							<z.checkbox id='interest-3' label='Business' />
							<z.checkbox id='interest-4' isChecked label='Marketing' />
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* Indeterminate */}
				<ComponentPreview
					title='Indeterminate State'
					description='A checkbox can have an indeterminate state for partial selections.'
					code={examples.indeterminate}
				>
					<z.checkbox id='controlled' isChecked label='Controlled checked state' />
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Checkbox' props={checkboxProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</z.text>
									<z.text className='text-muted-foreground'>Toggle the checkbox</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always pair checkboxes with visible labels</z.box>
								<z.box as='li'>Use checkboxes for yes/no choices that require submission</z.box>
								<z.box as='li'>Use switches instead for settings that take immediate effect</z.box>
								<z.box as='li'>Group related checkboxes together</z.box>
								<z.box as='li'>Use indeterminate state for parent checkboxes with partial child selections</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
