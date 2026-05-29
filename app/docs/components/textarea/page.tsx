'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
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
				<span className='text-foreground'>Textarea</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Textarea</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A multi-line text input that grows to fit its content. Ideal for messages, descriptions, and freeform input that
					exceeds a single line.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Textarea placeholder='Type your message here...' className='w-80' />
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

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Always pair a textarea with a visible label for accessibility.'
					code={examples.withLabel}
				>
					<div className='flex flex-col gap-2 w-80'>
						<Label htmlFor='message-field'>Message</Label>
						<Textarea id='message-field' placeholder='Write your message...' />
					</div>
				</ComponentPreview>

				{/* With Character Count */}
				<ComponentPreview
					title='With Character Count'
					description='Track remaining characters to inform users of input limits.'
					code={examples.withCharCount}
				>
					<div className='flex flex-col gap-1 w-80'>
						<Textarea
							value={bioText}
							onChange={handleBioChange}
							placeholder='Write a bio...'
							maxLength={MAX_CHAR_COUNT}
						/>
						<p className='text-xs text-muted-foreground text-right'>{remainingChars} characters remaining</p>
					</div>
				</ComponentPreview>

				{/* In Form */}
				<ComponentPreview
					title='In a Form'
					description='Use with a label and submit button for complete form patterns.'
					code={examples.inForm}
				>
					<form className='flex flex-col gap-4 w-80'>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='form-feedback'>Feedback</Label>
							<Textarea id='form-feedback' name='feedback' placeholder='Tell us what you think...' required />
						</div>
						<z.button type='submit'>Submit</z.button>
					</form>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Prevent interaction when the field is not applicable.'
					code={examples.disabled}
				>
					<Textarea placeholder='This field is disabled' disabled className='w-80' />
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Textarea' props={textareaProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus into and out of the textarea</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always associate a label with the textarea using htmlFor and matching id</li>
								<li>Avoid setting a fixed height — the component grows with content automatically</li>
								<li>Show a character count when imposing a maxLength limit</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
