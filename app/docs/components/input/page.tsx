'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ZButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Search, Mail, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'

const inputProps: PropDefinition[] = [
	{
		name: 'type',
		type: '"text" | "password" | "email" | "number" | "search" | "tel" | "url" | ...',
		defaultValue: '"text"',
		description: 'The type of input. Supports all standard HTML input types.'
	},
	{
		name: 'placeholder',
		type: 'string',
		description: 'Placeholder text displayed when the input is empty.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the input.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled value of the input.'
	},
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The default value for an uncontrolled input.'
	},
	{
		name: 'onChange',
		type: '(event: ChangeEvent<HTMLInputElement>) => void',
		description: 'Callback fired when the input value changes.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the input.'
	}
]

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
					<Badge kind='ghost' color='white'>Component</Badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A text input field that allows users to enter single-line text. Built with native input semantics and full
					accessibility support.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={`import { ZInput } from '@tasteee/zest'

export function InputDemo() {
  return <ZInput placeholder="Enter your email" />
}`}
			>
				<Input placeholder='Enter your email' className='max-w-sm' />
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={`import { ZInput } from '@tasteee/zest'`} language='tsx' />
				<CodeBlock code={`<ZInput type="email" placeholder="Email" />`} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* With Label */}
				<ComponentPreview
					code={`import { ZInput, ZLabel } from '@tasteee/zest'

<div className="grid w-full max-w-sm gap-1.5">
  <ZLabel htmlFor="email">Email</ZLabel>
  <ZInput type="email" id="email" placeholder="Enter your email" />
</div>`}
				>
					<div className='grid w-full max-w-sm gap-1.5'>
						<Label htmlFor='email-demo'>Email</Label>
						<Input type='email' id='email-demo' placeholder='Enter your email' />
					</div>
				</ComponentPreview>

				{/* Input Types */}
				<ComponentPreview
					code={`import { ZInput } from '@tasteee/zest'

<div className="grid gap-4 max-w-sm">
  <ZInput type="text" placeholder="Text input" />
  <ZInput type="email" placeholder="Email input" />
  <ZInput type="number" placeholder="Number input" />
  <ZInput type="search" placeholder="Search input" />
  <ZInput type="tel" placeholder="Phone input" />
  <ZInput type="url" placeholder="URL input" />
</div>`}
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
					code={`import { ZInput } from '@tasteee/zest'
import { Search } from 'lucide-react'

<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <ZInput placeholder="Search..." className="pl-10" />
</div>`}
				>
					<div className='relative max-w-sm'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input placeholder='Search...' className='pl-10' />
					</div>
				</ComponentPreview>

				{/* Password Toggle */}
				<ComponentPreview
					code={`import { ZInput, ZButton } from '@tasteee/zest'
import { Lock, Eye, EyeOff } from 'lucide-react'

const [showPassword, setShowPassword] = useState(false)

<div className="relative max-w-sm">
  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <ZInput 
    type={showPassword ? "text" : "password"} 
    placeholder="Enter password" 
    className="pl-10 pr-10" 
  />
  <ZButton
    type="button"
    variant="ghost"
    size="icon"
    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </ZButton>
</div>`}
				>
					<div className='relative max-w-sm'>
						<Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='pl-10 pr-10' />
						<ZButton
							type='button'
							variant='ghost'
							size='icon'
							className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className='h-4 w-4 text-muted-foreground' />
							) : (
								<Eye className='h-4 w-4 text-muted-foreground' />
							)}
						</ZButton>
					</div>
				</ComponentPreview>

				{/* With Button */}
				<ComponentPreview
					code={`import { ZInput, ZButton } from '@tasteee/zest'

<div className="flex max-w-sm gap-2">
  <ZInput type="email" placeholder="Enter your email" />
  <ZButton type="submit">Subscribe</ZButton>
</div>`}
				>
					<div className='flex max-w-sm gap-2'>
						<Input type='email' placeholder='Enter your email' />
						<ZButton type='submit'>Subscribe</ZButton>
					</div>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					code={`import { ZInput } from '@tasteee/zest'

<ZInput disabled placeholder="Disabled input" />`}
				>
					<Input disabled placeholder='Disabled input' className='max-w-sm' />
				</ComponentPreview>

				{/* File Input */}
				<ComponentPreview
					code={`import { ZInput, ZLabel } from '@tasteee/zest'

<div className="grid w-full max-w-sm gap-1.5">
  <ZLabel htmlFor="file">Upload file</ZLabel>
  <ZInput id="file" type="file" />
</div>`}
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
