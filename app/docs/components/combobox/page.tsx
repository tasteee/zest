'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
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
				<z.text className='text-foreground'>Combobox</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Combobox</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A text input enhanced with a browser-native suggestion list. Users can type freely or pick from predefined options,
					making it ideal for search fields and flexible selection inputs.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.combobox options={FRUITS} placeholder='Search fruits...' listId='fruits-preview' />
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

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the input value externally and react to changes.'
					code={examples.controlled}
				>
					<z.box className='flex flex-col gap-2 w-64'>
						<z.combobox
							value={controlledValue}
							onChange={handleControlledChange}
							options={LANGUAGES}
							placeholder='Pick a language'
							listId='languages-controlled'
						/>
						{controlledValue && <z.text.body className='text-sm text-muted-foreground'>Selected: {controlledValue}</z.text.body>}
					</z.box>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Associate a label for accessible form fields.'
					code={examples.withLabel}
				>
					<z.box className='flex flex-col gap-2'>
						<z.label htmlFor='country-input' className='text-sm font-medium'>
							Country
						</z.label>
						<z.combobox id='country-input' options={COUNTRIES} placeholder='Search countries...' listId='countries-label' />
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Prevent interaction when the field is not applicable.'
					code={examples.disabled}
				>
					<z.combobox options={['Option 1', 'Option 2']} placeholder='Disabled' disabled listId='combobox-disabled' />
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Combobox' props={comboboxProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ / ↓</z.text>
									<z.text className='text-muted-foreground'>Navigate through suggestions</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</z.text>
									<z.text className='text-muted-foreground'>Select the highlighted suggestion</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the suggestion list</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always provide a unique listId when rendering multiple comboboxes on the same page</z.box>
								<z.box as='li'>Pair with a label element using matching htmlFor and id attributes</z.box>
								<z.box as='li'>Keep the options list focused — use Select for exhaustive fixed lists</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
