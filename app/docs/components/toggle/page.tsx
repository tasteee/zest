'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'

const toggleProps: PropDefinition[] = [
	{
		name: 'isGhost',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Ghost kind — transparent background, fills on press.'
	},
	{
		name: 'isOutlined',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Outlined kind — bordered background, tinted fill on press.'
	},
	{
		name: 'isWhite',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Default neutral color.'
	},
	{
		name: 'isGreen',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Neon green color variant.'
	},
	{
		name: 'isPurple',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Neon purple color variant.'
	},
	{
		name: 'isPink',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Neon pink color variant.'
	},
	{
		name: 'isOrange',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Neon orange color variant.'
	},
	{
		name: 'isSmall',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Small size (2rem height).'
	},
	{
		name: 'isMedium',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Medium size (2.25rem height).'
	},
	{
		name: 'isLarge',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Large size (2.5rem height).'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents interaction and reduces opacity.'
	},
	{
		name: 'isHidden',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, sets display: none.'
	},
	{
		name: 'isPressed',
		type: 'boolean',
		description: 'Controlled pressed state.'
	},
	{
		name: 'isDefaultPressed',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The pressed state when initially rendered (uncontrolled).'
	},
	{
		name: 'onPressedChange',
		type: '(pressed: boolean) => void',
		description: 'Event handler called when the pressed state changes.'
	}
]

const toggleGroupProps: PropDefinition[] = [
	{
		name: 'type',
		type: '"single" | "multiple"',
		defaultValue: '"single"',
		description: 'Whether one or multiple items can be pressed at a time.'
	},
	{
		name: 'value',
		type: 'string | string[]',
		description: 'Controlled value of the pressed item(s).'
	},
	{
		name: 'defaultValue',
		type: 'string | string[]',
		description: 'Default value when uncontrolled.'
	},
	{
		name: 'onValueChange',
		type: '(value: string | string[]) => void',
		description: 'Called when the pressed value changes.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, disables all items in the group.'
	},
	{
		name: 'isGhost / isOutlined',
		type: 'boolean',
		defaultValue: 'isGhost',
		description: 'Kind variant applied to all items (overridable per item).'
	},
	{
		name: 'isWhite / isGreen / isPurple / isPink / isOrange',
		type: 'boolean',
		defaultValue: 'isWhite',
		description: 'Color variant applied to all items (overridable per item).'
	},
	{
		name: 'isSmall / isMedium / isLarge',
		type: 'boolean',
		defaultValue: 'isMedium',
		description: 'Size applied to all items (overridable per item).'
	}
]

export default function ToggleDocsPage() {
	const [alignment, setAlignment] = useState('left')
	const [formatting, setFormatting] = useState<string[]>([])

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
				<span className='text-foreground'>Toggle</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>z.toggle</h1>
					<z.badge isGhost isWhite>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A two-state pressable button. Supports ghost and outlined kinds, neon color variants, and three sizes. Built on Radix
					UI Toggle.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={`import { z } from '@tasteee/zest'

export function ToggleDemo() {
  return <z.toggle>Press me</z.toggle>
}`}
			>
				<z.toggle>Press me</z.toggle>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={`import { z } from '@tasteee/zest'`} language='tsx' />
				<CodeBlock code={`<z.toggle>Press me</z.toggle>`} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Kinds */}
				<ComponentPreview
					title='Kinds'
					description='Ghost fills on press. Outlined shows a tinted border fill.'
					code={`<z.toggle isGhost>Ghost</z.toggle>
<z.toggle isOutlined>Outlined</z.toggle>`}
				>
					<div className='flex flex-wrap gap-4'>
						<z.toggle isGhost>Ghost</z.toggle>
						<z.toggle isOutlined>Outlined</z.toggle>
					</div>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Five color variants across both kinds. Neon colors activate on press.'
					code={`{/* Ghost */}
<z.toggle isGhost isWhite>White</z.toggle>
<z.toggle isGhost isGreen>Green</z.toggle>
<z.toggle isGhost isPurple>Purple</z.toggle>
<z.toggle isGhost isPink>Pink</z.toggle>
<z.toggle isGhost isOrange>Orange</z.toggle>

{/* Outlined */}
<z.toggle isOutlined isWhite>White</z.toggle>
<z.toggle isOutlined isGreen>Green</z.toggle>
<z.toggle isOutlined isPurple>Purple</z.toggle>
<z.toggle isOutlined isPink>Pink</z.toggle>
<z.toggle isOutlined isOrange>Orange</z.toggle>`}
				>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-wrap items-center gap-3'>
							<z.toggle isGhost isWhite>
								White
							</z.toggle>
							<z.toggle isGhost isGreen>
								Green
							</z.toggle>
							<z.toggle isGhost isPurple>
								Purple
							</z.toggle>
							<z.toggle isGhost isPink>
								Pink
							</z.toggle>
							<z.toggle isGhost isOrange>
								Orange
							</z.toggle>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<z.toggle isOutlined isWhite>
								White
							</z.toggle>
							<z.toggle isOutlined isGreen>
								Green
							</z.toggle>
							<z.toggle isOutlined isPurple>
								Purple
							</z.toggle>
							<z.toggle isOutlined isPink>
								Pink
							</z.toggle>
							<z.toggle isOutlined isOrange>
								Orange
							</z.toggle>
						</div>
					</div>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Three sizes: small, medium (default), and large.'
					code={`<z.toggle isSmall>Small</z.toggle>
<z.toggle isMedium>Medium</z.toggle>
<z.toggle isLarge>Large</z.toggle>`}
				>
					<div className='flex flex-wrap items-center gap-4'>
						<z.toggle isSmall>Small</z.toggle>
						<z.toggle isMedium>Medium</z.toggle>
						<z.toggle isLarge>Large</z.toggle>
					</div>
				</ComponentPreview>

				{/* With Icons */}
				<ComponentPreview
					title='With Icons'
					description='Icon-only toggles work well for compact toolbars.'
					code={`import { Bold, Italic, Underline } from 'lucide-react'

<z.toggle aria-label="Bold">
  <Bold className="h-4 w-4" />
</z.toggle>
<z.toggle aria-label="Italic">
  <Italic className="h-4 w-4" />
</z.toggle>
<z.toggle aria-label="Underline">
  <Underline className="h-4 w-4" />
</z.toggle>`}
				>
					<div className='flex flex-wrap gap-2'>
						<z.toggle aria-label='Bold'>
							<Bold className='h-4 w-4' />
						</z.toggle>
						<z.toggle aria-label='Italic'>
							<Italic className='h-4 w-4' />
						</z.toggle>
						<z.toggle aria-label='Underline'>
							<Underline className='h-4 w-4' />
						</z.toggle>
					</div>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='Disabled toggles are non-interactive and visually dimmed.'
					code={`<z.toggle isDisabled>Disabled Ghost</z.toggle>
<z.toggle isOutlined isDisabled>Disabled Outlined</z.toggle>
<z.toggle isGreen isDisabled>Disabled Green</z.toggle>`}
				>
					<div className='flex flex-wrap gap-3'>
						<z.toggle isDisabled>Disabled Ghost</z.toggle>
						<z.toggle isOutlined isDisabled>
							Disabled Outlined
						</z.toggle>
						<z.toggle isGreen isDisabled>
							Disabled Green
						</z.toggle>
					</div>
				</ComponentPreview>
			</section>

			{/* Toggle Group */}
			<section className='space-y-8'>
				<div className='space-y-2'>
					<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Toggle Group</h2>
					<p className='text-muted-foreground'>
						Group multiple toggles that share visual props. Supports single and multiple selection modes.
					</p>
				</div>

				{/* Single selection */}
				<ComponentPreview
					title='Single Selection'
					description='Only one item can be active at a time. Ideal for alignment, view modes, and exclusive options.'
					code={`import { z } from '@tasteee/zest'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'

const [alignment, setAlignment] = useState('left')

<z.toggleGroup
  type="single"
  value={alignment}
  onValueChange={(value) => { if (value) setAlignment(value) }}
  isOutlined
>
  <z.toggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="justify" aria-label="Justify">
    <AlignJustify className="h-4 w-4" />
  </z.toggleGroupItem>
</z.toggleGroup>`}
				>
					<ToggleGroup
						type='single'
						value={alignment}
						onValueChange={(value) => {
							const hasValue = value !== ''
							if (hasValue) setAlignment(value)
						}}
						isOutlined
					>
						<ToggleGroupItem value='left' aria-label='Align left'>
							<AlignLeft className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='center' aria-label='Align center'>
							<AlignCenter className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='right' aria-label='Align right'>
							<AlignRight className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='justify' aria-label='Justify'>
							<AlignJustify className='h-4 w-4' />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentPreview>

				{/* Multiple selection */}
				<ComponentPreview
					title='Multiple Selection'
					description='Any number of items can be active simultaneously. Ideal for formatting controls.'
					code={`import { z } from '@tasteee/zest'
import { Bold, Italic, Underline } from 'lucide-react'

const [formatting, setFormatting] = useState<string[]>([])

<z.toggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  isOutlined
  isGreen
>
  <z.toggleGroupItem value="bold" aria-label="Bold">
    <Bold className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="italic" aria-label="Italic">
    <Italic className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="underline" aria-label="Underline">
    <Underline className="h-4 w-4" />
  </z.toggleGroupItem>
</z.toggleGroup>`}
				>
					<ToggleGroup type='multiple' value={formatting} onValueChange={setFormatting} isOutlined isGreen>
						<ToggleGroupItem value='bold' aria-label='Bold'>
							<Bold className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='italic' aria-label='Italic'>
							<Italic className='h-4 w-4' />
						</ToggleGroupItem>
						<ToggleGroupItem value='underline' aria-label='Underline'>
							<Underline className='h-4 w-4' />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentPreview>

				{/* Color variants on group */}
				<ComponentPreview
					title='Group Color Variants'
					description='Color and kind props cascade from the group down to all items.'
					code={`<z.toggleGroup type="single" isOutlined isGreen>
  <z.toggleGroupItem value="a">One</z.toggleGroupItem>
  <z.toggleGroupItem value="b">Two</z.toggleGroupItem>
  <z.toggleGroupItem value="c">Three</z.toggleGroupItem>
</z.toggleGroup>

<z.toggleGroup type="single" isOutlined isPurple>
  <z.toggleGroupItem value="a">One</z.toggleGroupItem>
  <z.toggleGroupItem value="b">Two</z.toggleGroupItem>
  <z.toggleGroupItem value="c">Three</z.toggleGroupItem>
</z.toggleGroup>

<z.toggleGroup type="single" isOutlined isPink>
  <z.toggleGroupItem value="a">One</z.toggleGroupItem>
  <z.toggleGroupItem value="b">Two</z.toggleGroupItem>
  <z.toggleGroupItem value="c">Three</z.toggleGroupItem>
</z.toggleGroup>`}
				>
					<div className='flex flex-col gap-4'>
						<ToggleGroup type='single' isOutlined isGreen>
							<ToggleGroupItem value='a'>One</ToggleGroupItem>
							<ToggleGroupItem value='b'>Two</ToggleGroupItem>
							<ToggleGroupItem value='c'>Three</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' isOutlined isPurple>
							<ToggleGroupItem value='a'>One</ToggleGroupItem>
							<ToggleGroupItem value='b'>Two</ToggleGroupItem>
							<ToggleGroupItem value='c'>Three</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup type='single' isOutlined isPink>
							<ToggleGroupItem value='a'>One</ToggleGroupItem>
							<ToggleGroupItem value='b'>Two</ToggleGroupItem>
							<ToggleGroupItem value='c'>Three</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference — Toggle */}
			<section className='space-y-6'>
				<div className='space-y-2'>
					<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
					<h3 className='text-lg font-medium text-foreground'>Toggle</h3>
				</div>
				<PropsTable props={toggleProps} />
			</section>

			{/* API Reference — ToggleGroup */}
			<section className='space-y-6'>
				<h3 className='text-lg font-medium text-foreground'>ToggleGroup</h3>
				<PropsTable props={toggleGroupProps} />
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
									<span className='text-muted-foreground'>Toggles the pressed state of the focused item</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</kbd>
									<span className='text-muted-foreground'>Toggles the pressed state of the focused item</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Moves focus to the next interactive element</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow keys</kbd>
									<span className='text-muted-foreground'>Moves focus between items within a ToggleGroup</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>ARIA</h3>
							<ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
								<li>Toggle has role="button" with aria-pressed reflecting the current state</li>
								<li>ToggleGroup uses role="group" to associate related items</li>
								<li>Always provide aria-label for icon-only toggles</li>
								<li>Disabled state is communicated via aria-disabled</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
