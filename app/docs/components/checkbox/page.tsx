'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

const checkboxProps: PropDefinition[] = [
	{
		name: 'isChecked',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Controls whether the checkbox is checked.'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the checkbox.'
	},
	{
		name: 'isWhite | isGreen | isPurple | isPink | isOrange',
		type: 'boolean',
		defaultValue: 'isWhite',
		description: 'Controls the checkbox color.'
	},
	{
		name: 'label',
		type: 'string',
		description: 'Label rendered next to the checkbox.'
	},
	{
		name: 'description',
		type: 'string',
		description: 'Optional descriptive text rendered beneath the label.'
	},
	{
		name: 'onChange',
		type: '(isNowChecked: boolean, event) => void',
		description: 'Event handler called when the checked state changes.'
	},
	{
		name: 'required',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, the checkbox is required for form submission.'
	},
	{
		name: 'name',
		type: 'string',
		description: 'The name of the checkbox for form submission.'
	},
	{
		name: 'value',
		type: 'string',
		defaultValue: '"on"',
		description: 'The value submitted with the form when checked.'
	}
]

export default function CheckboxDocsPage() {
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
				<span className='text-foreground'>Checkbox</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZCheckbox</h1>
					<z.badge isGhost isWhite>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A control that allows the user to toggle between checked, unchecked, and indeterminate states. Built on Radix UI
					Checkbox primitive.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Checkbox'
				description='A basic checkbox with label.'
				code={`import { z } from '@tasteee/zest'

export function CheckboxDemo() {
  return (
    <z.checkbox
      id="terms"
      label="Accept terms and conditions"
    />
  )
}`}
			>
				<Checkbox id='terms' label='Accept terms and conditions' />
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={`import { ZCheckbox } from '@tasteee/zest'`} language='tsx' />
				<CodeBlock
					code={`<z.checkbox
  isChecked={isSubscribed}
  label="Subscribe to newsletter"
  onChange={(isNowChecked, event) => {
    setIsSubscribed(isNowChecked)
  }}
/>`}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Default Checked */}
				<ComponentPreview
					title='Default Checked'
					description='A checkbox that starts checked.'
					code={`<Checkbox
  id="subscribed"
  isChecked
  label="Subscribe to newsletter"
/>`}
				>
					<Checkbox id='subscribed' isChecked label='Subscribe to newsletter' />
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Disabled checkboxes cannot be toggled.'
					code={`<div className="flex flex-col gap-4">
  <Checkbox id="disabled" isDisabled label="Disabled" />
  <Checkbox
    id="disabled-checked"
    isDisabled
    isChecked
    label="Disabled checked"
  />
</div>`}
				>
					<div className='flex flex-col gap-4'>
						<Checkbox id='disabled' isDisabled label='Disabled' />
						<Checkbox id='disabled-checked' isDisabled isChecked label='Disabled checked' />
					</div>
				</ComponentPreview>

				{/* With Description */}
				<ComponentPreview
					title='With Description'
					description='A checkbox with additional descriptive text.'
					code={`<Checkbox
  id="terms-desc"
  label="Accept terms and conditions"
  description="You agree to our Terms of Service and Privacy Policy."
/>`}
				>
					<Checkbox
						id='terms-desc'
						label='Accept terms and conditions'
						description='You agree to our Terms of Service and Privacy Policy.'
					/>
				</ComponentPreview>

				{/* Checkbox Group */}
				<ComponentPreview
					title='Checkbox Group'
					description='Multiple checkboxes for selecting multiple options.'
					code={`<div className="space-y-4">
  <h4 className="text-sm font-medium">Select your interests</h4>
  <div className="space-y-2">
    <Checkbox id="interest-1" label="Technology" />
    <Checkbox id="interest-2" isChecked label="Design" />
    <Checkbox id="interest-3" label="Business" />
    <Checkbox id="interest-4" isChecked label="Marketing" />
  </div>
</div>`}
				>
					<div className='space-y-4'>
						<h4 className='text-sm font-medium'>Select your interests</h4>
						<div className='space-y-2'>
							<Checkbox id='interest-1' label='Technology' />
							<Checkbox id='interest-2' isChecked label='Design' />
							<Checkbox id='interest-3' label='Business' />
							<Checkbox id='interest-4' isChecked label='Marketing' />
						</div>
					</div>
				</ComponentPreview>

				{/* Indeterminate */}
				<ComponentPreview
					title='Indeterminate State'
					description='A checkbox can have an indeterminate state for partial selections.'
					code={`// Controlled example
const [checked, setChecked] = useState(false)

<Checkbox 
  isChecked={checked} 
  label="Controlled checked state"
  onChange={(isNowChecked) => setChecked(isNowChecked)}
/>`}
				>
					<Checkbox id='controlled' isChecked label='Controlled checked state' />
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Checkbox' props={checkboxProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</kbd>
									<span className='text-muted-foreground'>Toggle the checkbox</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always pair checkboxes with visible labels</li>
								<li>Use checkboxes for yes/no choices that require submission</li>
								<li>Use switches instead for settings that take immediate effect</li>
								<li>Group related checkboxes together</li>
								<li>Use indeterminate state for parent checkboxes with partial child selections</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
