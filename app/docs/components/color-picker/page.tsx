'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ColorPicker } from '@/components/ui/color-picker'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { colorPickerProps } from './props'
import { examples } from './examples'

export default function ColorPickerDocsPage() {
	const [controlledColor, setControlledColor] = useState('#7c3aed')

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setControlledColor(event.target.value)
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
				<span className='text-foreground'>Color Picker</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ColorPicker</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A styled native color input for selecting hex colors. Useful for theme editors, design tooling, and any surface
					requiring precise color control.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<ColorPicker defaultValue='#7c3aed' />
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
					description='Manage color state externally and display the current hex value alongside the picker.'
					code={examples.controlled}
				>
					<div className='flex items-center gap-4'>
						<ColorPicker value={controlledColor} onChange={handleColorChange} />
						<span className='text-sm font-mono text-muted-foreground'>{controlledColor}</span>
					</div>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Associate a label with the color picker for accessible form fields.'
					code={examples.withLabel}
				>
					<div className='flex flex-col gap-2'>
						<label htmlFor='brand-color' className='text-sm font-medium'>
							Brand Color
						</label>
						<ColorPicker id='brand-color' defaultValue='#ec4899' />
					</div>
				</ComponentPreview>

				{/* Multiple Colors */}
				<ComponentPreview
					title='Multiple Pickers'
					description='Render several pickers side by side for palette editing or theme configuration.'
					code={examples.multipleColors}
				>
					<div className='flex items-center gap-4'>
						<div className='flex flex-col gap-2 items-center'>
							<ColorPicker defaultValue='#7c3aed' />
							<span className='text-xs text-muted-foreground'>Primary</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<ColorPicker defaultValue='#ec4899' />
							<span className='text-xs text-muted-foreground'>Secondary</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<ColorPicker defaultValue='#0ea5e9' />
							<span className='text-xs text-muted-foreground'>Accent</span>
						</div>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ColorPicker' props={colorPickerProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</kbd>
									<span className='text-muted-foreground'>Open the native color dialog</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always pair the picker with a visible hex value or label so users know the current selection</li>
								<li>Use a label element with a matching htmlFor id for screen reader support</li>
								<li>For design tools, display a text input alongside the picker so users can type an exact hex value</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
