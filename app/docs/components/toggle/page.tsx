'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import { toggleProps, toggleGroupProps } from './props'
import { examples } from './examples'
import { useDatass } from 'datass'

export default function ToggleDocsPage() {
	const alignment = useDatass.string('left')
	const formatting = useDatass.array<string>([])

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
				<z.text className='text-foreground'>Toggle</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>z.toggle</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A two-state pressable button. Supports ghost and outlined kinds, neon color variants, and three sizes. Built on Radix
					UI Toggle.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.toggle>Press me</z.toggle>
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

				{/* Kinds */}
				<ComponentPreview
					title='Kinds'
					description='Ghost fills on press. Outlined shows a tinted border fill.'
					code={examples.kinds}
				>
					<z.box className='flex flex-wrap gap-4'>
						<z.toggle isGhost>Ghost</z.toggle>
						<z.toggle isOutlined>Outlined</z.toggle>
					</z.box>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Five color variants across both kinds. Neon colors activate on press.'
					code={examples.colors}
				>
					<z.box className='flex flex-col gap-6'>
						<z.box className='flex flex-wrap items-center gap-3'>
							<z.toggle isGhost isNeutral>
								Neutral
							</z.toggle>
							<z.toggle isGhost isPurple>
								Purple
							</z.toggle>
							<z.toggle isGhost isPurple>
								Purple
							</z.toggle>
							<z.toggle isGhost isPink>
								Pink
							</z.toggle>
							<z.toggle isGhost isPink>
								Pink
							</z.toggle>
						</z.box>
						<z.box className='flex flex-wrap items-center gap-3'>
							<z.toggle isOutlined isNeutral>
								Neutral
							</z.toggle>
							<z.toggle isOutlined isPurple>
								Purple
							</z.toggle>
							<z.toggle isOutlined isPurple>
								Purple
							</z.toggle>
							<z.toggle isOutlined isPink>
								Pink
							</z.toggle>
							<z.toggle isOutlined isPink>
								Pink
							</z.toggle>
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview title='Sizes' description='Three sizes: small, medium (default), and large.' code={examples.sizes}>
					<z.box className='flex flex-wrap items-center gap-4'>
						<z.toggle isSmall>Small</z.toggle>
						<z.toggle isMedium>Medium</z.toggle>
						<z.toggle isLarge>Large</z.toggle>
					</z.box>
				</ComponentPreview>

				{/* With Icons */}
				<ComponentPreview
					title='With Icons'
					description='Icon-only toggles work well for compact toolbars.'
					code={examples.withIcons}
				>
					<z.box className='flex flex-wrap gap-2'>
						<z.toggle aria-label='Bold'>
							<Bold className='h-4 w-4' />
						</z.toggle>
						<z.toggle aria-label='Italic'>
							<Italic className='h-4 w-4' />
						</z.toggle>
						<z.toggle aria-label='Underline'>
							<Underline className='h-4 w-4' />
						</z.toggle>
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Disabled toggles are non-interactive and visually dimmed.'
					code={examples.disabled}
				>
					<z.box className='flex flex-wrap gap-3'>
						<z.toggle isDisabled>Disabled Ghost</z.toggle>
						<z.toggle isOutlined isDisabled>
							Disabled Outlined
						</z.toggle>
						<z.toggle isPurple isDisabled>
							Disabled Purple
						</z.toggle>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* Toggle Group */}
			<z.box as='section' className='space-y-8'>
				<z.box className='space-y-2'>
					<z.text.h2>Toggle Group</z.text.h2>
					<z.text.body className='text-muted-foreground'>
						Group multiple toggles that share visual props. Supports single and multiple selection modes.
					</z.text.body>
				</z.box>

				{/* Single selection */}
				<ComponentPreview
					title='Single Selection'
					description='Only one item can be active at a time. Ideal for alignment, view modes, and exclusive options.'
					code={examples.singleSelection}
				>
					<z.toggleGroup
						type='single'
						value={alignment.state}
						onValueChange={(value: string) => {
							const hasValue = value !== ''
							if (hasValue) alignment.set(value)
						}}
						isOutlined
					>
						<z.toggleGroupItem value='left' aria-label='Align left'>
							<AlignLeft className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='center' aria-label='Align center'>
							<AlignCenter className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='right' aria-label='Align right'>
							<AlignRight className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='justify' aria-label='Justify'>
							<AlignJustify className='h-4 w-4' />
						</z.toggleGroupItem>
					</z.toggleGroup>
				</ComponentPreview>

				{/* Multiple selection */}
				<ComponentPreview
					title='Multiple Selection'
					description='Any number of items can be active simultaneously. Ideal for formatting controls.'
					code={examples.multipleSelection}
				>
					<z.toggleGroup type='multiple' value={formatting.state} onValueChange={formatting.set} isOutlined isPurple>
						<z.toggleGroupItem value='bold' aria-label='Bold'>
							<Bold className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='italic' aria-label='Italic'>
							<Italic className='h-4 w-4' />
						</z.toggleGroupItem>
						<z.toggleGroupItem value='underline' aria-label='Underline'>
							<Underline className='h-4 w-4' />
						</z.toggleGroupItem>
					</z.toggleGroup>
				</ComponentPreview>

				{/* Color variants on group */}
				<ComponentPreview
					title='Group Color Variants'
					description='Color and kind props cascade from the group down to all items.'
					code={examples.groupColorVariants}
				>
					<z.box className='flex flex-col gap-4'>
						<z.toggleGroup type='single' isOutlined isPurple isPurple>
							<z.toggleGroupItem value='a'>One</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Two</z.toggleGroupItem>
							<z.toggleGroupItem value='c'>Three</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' isOutlined isPurple>
							<z.toggleGroupItem value='a'>One</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Two</z.toggleGroupItem>
							<z.toggleGroupItem value='c'>Three</z.toggleGroupItem>
						</z.toggleGroup>
						<z.toggleGroup type='single' isOutlined isPink>
							<z.toggleGroupItem value='a'>One</z.toggleGroupItem>
							<z.toggleGroupItem value='b'>Two</z.toggleGroupItem>
							<z.toggleGroupItem value='c'>Three</z.toggleGroupItem>
						</z.toggleGroup>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference — Toggle */}
			<z.box as='section' className='space-y-6'>
				<z.box className='space-y-2'>
					<z.text.h2>API Reference</z.text.h2>
					<z.text.h3>Toggle</z.text.h3>
				</z.box>
				<PropsTable props={toggleProps} />
			</z.box>

			{/* API Reference — ToggleGroup */}
			<z.box as='section' className='space-y-6'>
				<z.text.h3>ToggleGroup</z.text.h3>
				<PropsTable props={toggleGroupProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space</z.text>
									<z.text className='text-muted-foreground'>Toggles the pressed state of the focused item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</z.text>
									<z.text className='text-muted-foreground'>Toggles the pressed state of the focused item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Moves focus to the next interactive element</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow keys</z.text>
									<z.text className='text-muted-foreground'>Moves focus between items within a ToggleGroup</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>ARIA</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
								<z.box as='li'>Toggle has role="button" with aria-pressed reflecting the current state</z.box>
								<z.box as='li'>ToggleGroup uses role="group" to associate related items</z.box>
								<z.box as='li'>Always provide aria-label for icon-only toggles</z.box>
								<z.box as='li'>Disabled state is communicated via aria-disabled</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
