'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { colorPickerProps } from './props'
import { examples } from './examples'

export default function ColorPickerDocsPage() {
	const [controlledColor, setControlledColor] = useState('#7c3aed')

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setControlledColor(event.target.value)
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
				<z.text className='text-foreground'>Color Picker</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ColorPicker</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A styled native color input for selecting hex colors. Useful for theme editors, design tooling, and any surface
					requiring precise color control.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.colorPicker defaultValue='#7c3aed' />
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
					description='Manage color state externally and display the current hex value alongside the picker.'
					code={examples.controlled}
				>
					<z.box className='flex items-center gap-4'>
						<z.colorPicker value={controlledColor} onChange={handleColorChange} />
						<z.text className='text-sm font-mono text-muted-foreground'>{controlledColor}</z.text>
					</z.box>
				</ComponentPreview>

				{/* With Label */}
				<ComponentPreview
					title='With Label'
					description='Associate a label with the color picker for accessible form fields.'
					code={examples.withLabel}
				>
					<z.box className='flex flex-col gap-2'>
						<z.label htmlFor='brand-color' className='text-sm font-medium'>
							Brand Color
						</z.label>
						<z.colorPicker id='brand-color' defaultValue='#ec4899' />
					</z.box>
				</ComponentPreview>

				{/* Multiple Colors */}
				<ComponentPreview
					title='Multiple Pickers'
					description='Render several pickers side by side for palette editing or theme configuration.'
					code={examples.multipleColors}
				>
					<z.box className='flex items-center gap-4'>
						<z.box className='flex flex-col gap-2 items-center'>
							<z.colorPicker defaultValue='#7c3aed' />
							<z.text className='text-xs text-muted-foreground'>Primary</z.text>
						</z.box>
						<z.box className='flex flex-col gap-2 items-center'>
							<z.colorPicker defaultValue='#ec4899' />
							<z.text className='text-xs text-muted-foreground'>Secondary</z.text>
						</z.box>
						<z.box className='flex flex-col gap-2 items-center'>
							<z.colorPicker defaultValue='#0ea5e9' />
							<z.text className='text-xs text-muted-foreground'>Accent</z.text>
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ColorPicker' props={colorPickerProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</z.text>
									<z.text className='text-muted-foreground'>Open the native color dialog</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always pair the picker with a visible hex value or label so users know the current selection</z.box>
								<z.box as='li'>Use a label element with a matching htmlFor id for screen reader support</z.box>
								<z.box as='li'>For design tools, display a text input alongside the picker so users can type an exact hex value</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
