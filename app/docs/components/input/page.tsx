'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Search, Mail, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { inputProps } from './props'
import { examples } from './examples'
export default function InputDocsPage() {
	const [showPassword, setShowPassword] = useState(false)

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
				<span className='text-foreground'>Input</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZInput</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A text input field that allows users to enter single-line text. Built with native input semantics and full
					accessibility support.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={examples.quickPreview}
			>
				<Input placeholder='Enter your email' className='max-w-sm' />
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
					code={examples.withLabel}
				>
					<div className='grid w-full max-w-sm gap-1.5'>
						<Label htmlFor='email-demo'>Email</Label>
						<Input type='email' id='email-demo' placeholder='Enter your email' />
					</div>
				</ComponentPreview>

				{/* Input Types */}
				<ComponentPreview
					code={examples.inputTypes}
				>
					<div className='grid gap-4 max-w-sm'>
						<Input type='text' placeholder='Text input' />
						<Input type='email' placeholder='Email input' />
						<Input type='number' placeholder='Number input' />
						<Input type='search' placeholder='Search input' />
						<Input type='tel' placeholder='Phone input' />
						<Input type='url' placeholder='URL input' />
					</div>
				</ComponentPreview>

				{/* With Icon */}
				<ComponentPreview
					code={examples.withIcon}
				>
					<div className='relative max-w-sm'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input placeholder='Search...' className='pl-10' />
					</div>
				</ComponentPreview>

				{/* Password Toggle */}
				<ComponentPreview
					code={examples.passwordToggle}
				>
					<div className='relative max-w-sm'>
						<Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='pl-10 pr-10' />
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
					</div>
				</ComponentPreview>

				{/* With Button */}
				<ComponentPreview
					code={examples.withButton}
				>
					<div className='flex max-w-sm gap-2'>
						<Input type='email' placeholder='Enter your email' />
						<z.button type='submit'>Subscribe</z.button>
					</div>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					code={examples.disabled}
				>
					<Input disabled placeholder='Disabled input' className='max-w-sm' />
				</ComponentPreview>

				{/* File Input */}
				<ComponentPreview
					code={examples.fileInput}
				>
					<div className='grid w-full max-w-sm gap-1.5'>
						<Label htmlFor='file-demo'>Upload file</Label>
						<Input id='file-demo' type='file' />
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<p className='text-muted-foreground'>
					The ZInput component extends the native HTML input element and accepts all standard input attributes.
				</p>
				<PropsTable title='ZInput' props={inputProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always pair inputs with visible labels using the ZLabel component</li>
								<li>Use the htmlFor attribute on labels to associate them with inputs</li>
								<li>Provide clear placeholder text that describes expected input</li>
								<li>Use appropriate input types (email, tel, etc.) for better mobile keyboards</li>
								<li>Include aria-describedby for error messages and help text</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Keyboard Navigation</h3>
							<div className='grid gap-2'>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus to the input</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
