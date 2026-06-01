'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { selectProps, selectItemProps } from './props'
import { examples } from './examples'

export default function SelectDocsPage() {
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
				<z.text className='text-foreground'>Select</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZSelect</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A dropdown menu for selecting a single value from a list of options. Built on Radix UI Select primitive with full
					keyboard support.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Select'
				description='A basic select with placeholder and options.'
				code={examples.quickPreview}
			>
				<z.select>
					<z.select.trigger className='w-45'>
						<z.select.value placeholder='Select a fruit' />
					</z.select.trigger>
					<z.select.content>
						<z.select.item value='apple'>Apple</z.select.item>
						<z.select.item value='banana'>Banana</z.select.item>
						<z.select.item value='pink'>Pink</z.select.item>
						<z.select.item value='grape'>Grape</z.select.item>
					</z.select.content>
				</z.select>
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
				<ComponentPreview
					title='With Label'
					description='A select paired with a label for better accessibility.'
					code={examples.withLabel}
				>
					<z.box className='grid gap-2'>
						<z.label htmlFor='timezone'>Timezone</z.label>
						<z.select>
							<z.select.trigger id='timezone' className='w-70'>
								<z.select.value placeholder='Select your timezone' />
							</z.select.trigger>
							<z.select.content>
								<z.select.item value='pst'>Pacific Time (PST)</z.select.item>
								<z.select.item value='mst'>Mountain Time (MST)</z.select.item>
								<z.select.item value='cst'>Central Time (CST)</z.select.item>
								<z.select.item value='est'>Eastern Time (EST)</z.select.item>
							</z.select.content>
						</z.select>
					</z.box>
				</ComponentPreview>

				{/* With Groups */}
				<ComponentPreview title='With Groups' description='Organize options into labeled groups.' code={examples.withGroups}>
					<z.select>
						<z.select.trigger className='w-70'>
							<z.select.value placeholder='Select a framework' />
						</z.select.trigger>
						<z.select.content>
							<z.select.group>
								<z.select.label>Frontend</z.select.label>
								<z.select.item value='react'>React</z.select.item>
								<z.select.item value='vue'>Vue</z.select.item>
								<z.select.item value='angular'>Angular</z.select.item>
								<z.select.item value='svelte'>Svelte</z.select.item>
							</z.select.group>
							<z.select.group>
								<z.select.label>Backend</z.select.label>
								<z.select.item value='express'>Express</z.select.item>
								<z.select.item value='fastify'>Fastify</z.select.item>
								<z.select.item value='hono'>Hono</z.select.item>
							</z.select.group>
						</z.select.content>
					</z.select>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview
					title='Disabled'
					description='A disabled select and individual disabled items.'
					code={examples.disabled}
				>
					<z.box className='flex flex-col gap-4'>
						<z.select disabled>
							<z.select.trigger className='w-45'>
								<z.select.value placeholder='Disabled select' />
							</z.select.trigger>
							<z.select.content>
								<z.select.item value='option'>Option</z.select.item>
							</z.select.content>
						</z.select>

						<z.select>
							<z.select.trigger className='w-45'>
								<z.select.value placeholder='Select an option' />
							</z.select.trigger>
							<z.select.content>
								<z.select.item value='available'>Available</z.select.item>
								<z.select.item value='disabled' disabled>
									Disabled Option
								</z.select.item>
								<z.select.item value='another'>Another</z.select.item>
							</z.select.content>
						</z.select>
					</z.box>
				</ComponentPreview>

				{/* Default Value */}
				<ComponentPreview title='Default Value' description='A select with a default value set.' code={examples.defaultValue}>
					<z.select defaultValue='medium'>
						<z.select.trigger className='w-45'>
							<z.select.value />
						</z.select.trigger>
						<z.select.content>
							<z.select.item value='small'>Small</z.select.item>
							<z.select.item value='medium'>Medium</z.select.item>
							<z.select.item value='large'>Large</z.select.item>
						</z.select.content>
					</z.select>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Select' props={selectProps} />
				<PropsTable title='SelectItem' props={selectItemProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space / Enter</z.text>
									<z.text className='text-muted-foreground'>Open the select and select the focused item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Up/Down</z.text>
									<z.text className='text-muted-foreground'>Move focus between items</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Home / End</z.text>
									<z.text className='text-muted-foreground'>Jump to first or last item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the select</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>A-Z</z.text>
									<z.text className='text-muted-foreground'>Jump to items starting with that letter</z.text>
								</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
