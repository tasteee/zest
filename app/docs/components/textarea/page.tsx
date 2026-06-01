'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { textareaProps } from './props'
import { examples } from './examples'

const MAX_CHAR_COUNT = 200

export default function TextareaDocsPage() {
	const [bioText, setBioText] = useState('')

	const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBioText(event.target.value)
	}

	const remainingChars = MAX_CHAR_COUNT - bioText.length

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
				<z.text className='text-foreground'>Textarea</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Textarea</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A multi-line text input that grows to fit its content. Ideal for messages, descriptions, and freeform input that
					exceeds a single line.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.textarea placeholder='Type your message here...' className='w-80' />
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

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Always pair a textarea with a visible label for accessibility.'
					code={examples.withLabel}
				>
					<z.box className='flex flex-col gap-2 w-80'>
						<z.label htmlFor='message-field'>Message</z.label>
						<z.textarea id='message-field' placeholder='Write your message...' />
					</z.box>
				</ComponentPreview>

				{/* With Character Count */}
				<ComponentPreview
					title='With Character Count'
					description='Track remaining characters to inform users of input limits.'
					code={examples.withCharCount}
				>
					<z.box className='flex flex-col gap-1 w-80'>
						<z.textarea value={bioText} onChange={handleBioChange} placeholder='Write a bio...' maxLength={MAX_CHAR_COUNT} />
						<z.text.body className='text-xs text-muted-foreground text-right'>{remainingChars} characters remaining</z.text.body>
					</z.box>
				</ComponentPreview>

				{/* In Form */}
				<ComponentPreview
					title='In a Form'
					description='Use with a label and submit button for complete form patterns.'
					code={examples.inForm}
				>
					<z.box as='form' className='flex flex-col gap-4 w-80'>
						<z.box className='flex flex-col gap-2'>
							<z.label htmlFor='form-feedback'>Feedback</z.label>
							<z.textarea id='form-feedback' name='feedback' placeholder='Tell us what you think...' required />
						</z.box>
						<z.button type='submit'>Submit</z.button>
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Prevent interaction when the field is not applicable.'
					code={examples.disabled}
				>
					<z.textarea placeholder='This field is disabled' disabled className='w-80' />
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Textarea' props={textareaProps} />
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
									<z.text className='text-muted-foreground'>Move focus into and out of the textarea</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always associate a label with the textarea using htmlFor and matching id</z.box>
								<z.box as='li'>Avoid setting a fixed height — the component grows with content automatically</z.box>
								<z.box as='li'>Show a character count when imposing a maxLength limit</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
