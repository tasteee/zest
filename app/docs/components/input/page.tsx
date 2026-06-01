'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Search, Mail, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { inputProps } from './props'
import { examples } from './examples'
export default function InputDocsPage() {
	const [showPassword, setShowPassword] = useState(false)

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
				<z.text className='text-foreground'>Input</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZInput</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A text input field that allows users to enter single-line text. Built with native input semantics and full
					accessibility support.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.input placeholder='Enter your email' className='max-w-sm' />
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
				<ComponentPreview code={examples.withLabel}>
					<z.box className='grid w-full max-w-sm gap-1.5'>
						<z.label htmlFor='email-demo'>Email</z.label>
						<z.input type='email' id='email-demo' placeholder='Enter your email' />
					</z.box>
				</ComponentPreview>

				{/* Input Types */}
				<ComponentPreview code={examples.inputTypes}>
					<z.box className='grid gap-4 max-w-sm'>
						<z.input type='text' placeholder='Text input' />
						<z.input type='email' placeholder='Email input' />
						<z.input type='number' placeholder='Number input' />
						<z.input type='search' placeholder='Search input' />
						<z.input type='tel' placeholder='Phone input' />
						<z.input type='url' placeholder='URL input' />
					</z.box>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview code={examples.sizes}>
					<z.box className='grid gap-4 max-w-sm'>
						<z.input isExtraSmall placeholder='Extra small input' />
						<z.input isSmall placeholder='Small input' />
						<z.input isMedium placeholder='Medium input' />
						<z.input isLarge placeholder='Large input' />
						<z.input isExtraLarge placeholder='Extra large input' />
					</z.box>
				</ComponentPreview>

				{/* With Icon */}
				<ComponentPreview code={examples.withIcon}>
					<z.box className='relative max-w-sm'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<z.input placeholder='Search...' className='pl-10' />
					</z.box>
				</ComponentPreview>

				{/* Password Toggle */}
				<ComponentPreview code={examples.passwordToggle}>
					<z.box className='relative max-w-sm'>
						<Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<z.input type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='pl-10 pr-10' />
						<z.button
							type='button'
							isIcon
							className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className='h-4 w-4 text-muted-foreground' />
							) : (
								<Eye className='h-4 w-4 text-muted-foreground' />
							)}
						</z.button>
					</z.box>
				</ComponentPreview>

				{/* With Button */}
				<ComponentPreview code={examples.withButton}>
					<z.box className='flex max-w-sm gap-2'>
						<z.input type='email' placeholder='Enter your email' />
						<z.button type='submit'>Subscribe</z.button>
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview code={examples.disabled}>
					<z.input disabled placeholder='Disabled input' className='max-w-sm' />
				</ComponentPreview>

				{/* File Input */}
				<ComponentPreview code={examples.fileInput}>
					<z.box className='grid w-full max-w-sm gap-1.5'>
						<z.label htmlFor='file-demo'>Upload file</z.label>
						<z.input id='file-demo' type='file' />
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<z.text.body className='text-muted-foreground'>
					The ZInput component extends the native HTML input element and accepts all standard input attributes.
				</z.text.body>
				<PropsTable title='ZInput' props={inputProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always pair inputs with visible labels using the ZLabel component</z.box>
								<z.box as='li'>Use the htmlFor attribute on labels to associate them with inputs</z.box>
								<z.box as='li'>Provide clear placeholder text that describes expected input</z.box>
								<z.box as='li'>Use appropriate input types (email, tel, etc.) for better mobile keyboards</z.box>
								<z.box as='li'>Include aria-describedby for error messages and help text</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Keyboard Navigation</z.text.h3>
							<z.box className='grid gap-2'>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Tab
									</z.text>
									<z.text className='text-muted-foreground'>Move focus to the input</z.text>
								</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
