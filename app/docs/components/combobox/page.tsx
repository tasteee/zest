'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { Combobox } from '@/components/ui/combobox'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { comboboxProps } from './props'
import { examples } from './examples'

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Mango', 'Orange', 'Strawberry']
const LANGUAGES = ['TypeScript', 'JavaScript', 'Rust', 'Go', 'Python', 'Swift']
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia']

export default function ComboboxDocsPage() {
	const [controlledValue, setControlledValue] = useState('')

	const handleControlledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setControlledValue(event.target.value)
	}

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
				<span className='text-foreground'>Combobox</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Combobox</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A text input enhanced with a browser-native suggestion list. Users can type freely or pick from predefined options,
					making it ideal for search fields and flexible selection inputs.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Combobox options={FRUITS} placeholder='Search fruits...' listId='fruits-preview' />
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

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the input value externally and react to changes.'
					code={examples.controlled}
				>
					<div className='flex flex-col gap-2 w-64'>
						<Combobox
							value={controlledValue}
							onChange={handleControlledChange}
							options={LANGUAGES}
							placeholder='Pick a language'
							listId='languages-controlled'
						/>
						{controlledValue && <p className='text-sm text-muted-foreground'>Selected: {controlledValue}</p>}
					</div>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Associate a label for accessible form fields.'
					code={examples.withLabel}
				>
					<div className='flex flex-col gap-2'>
						<label htmlFor='country-input' className='text-sm font-medium'>
							Country
						</label>
						<Combobox id='country-input' options={COUNTRIES} placeholder='Search countries...' listId='countries-label' />
					</div>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Prevent interaction when the field is not applicable.'
					code={examples.disabled}
				>
					<Combobox options={['Option 1', 'Option 2']} placeholder='Disabled' disabled listId='combobox-disabled' />
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Combobox' props={comboboxProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ / ↓</kbd>
									<span className='text-muted-foreground'>Navigate through suggestions</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</kbd>
									<span className='text-muted-foreground'>Select the highlighted suggestion</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the suggestion list</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always provide a unique listId when rendering multiple comboboxes on the same page</li>
								<li>Pair with a label element using matching htmlFor and id attributes</li>
								<li>Keep the options list focused — use Select for exhaustive fixed lists</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
