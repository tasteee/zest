'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'import { ChevronRight } from 'lucide-react'
import { zBoxLayoutProps, zBoxSpacingProps, zBoxVisualProps } from './props'
import { examples } from './examples'

export default function BoxDocsPage() {
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
				<z.text className='text-foreground'>Box</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>z.box</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A primitive layout component that applies spacing, backgrounds, borders, and typography through props instead of class
					names. Composable, predictable, and entirely driven by design-system tokens.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.box
					isFlex
					isRow
					gap='1rem'
					padding='1.5rem'
					background='var(--card)'
					borderRadius='var(--radius-md)'
					border='1px solid var(--border)'
				>
					<z.box padding='0.5rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
						Item one
					</z.box>
					<z.box padding='0.5rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
						Item two
					</z.box>
				</z.box>
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

				{/* Flex Layout */}
				<ComponentPreview
					title='Flex Layout'
					description='Use isFlex with isRow or isColumn to create flex containers. alignX and alignY follow the axis direction.'
					code={examples.flex}
				>
					<z.box className='flex flex-col gap-4 w-full'>
						<z.box isFlex isRow gap='0.75rem' alignY='center'>
							<z.box padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Left
							</z.box>
							<z.box padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Right
							</z.box>
						</z.box>
						<z.box isFlex isColumn alignX='center' gap='0.5rem'>
							<z.box padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Top
							</z.box>
							<z.box padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Bottom
							</z.box>
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* Spacing */}
				<ComponentPreview
					title='Spacing'
					description='Padding and margin accept any CSS value. Use paddingX/paddingY for axis-level control.'
					code={examples.spacing}
				>
					<z.box className='flex flex-col gap-3'>
						<z.box padding='1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
							padding="1rem"
						</z.box>
						<z.box paddingX='2rem' paddingY='0.5rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
							paddingX="2rem" paddingY="0.5rem"
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* As Element */}
				<ComponentPreview
					title='Custom Element'
					description='Use the as prop to control the rendered HTML element.'
					code={examples.asElement}
				>
					<z.box as='section' padding='1.5rem' border='1px solid var(--border)' borderRadius='var(--radius-md)'>
						<z.box as='h2' fontSize='1.25rem' fontWeight='600' color='var(--foreground)'>
							Heading
						</z.box>
						<z.box as='p' color='var(--muted-foreground)' paddingTop='0.5rem'>
							Paragraph content here.
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Layout Props' props={zBoxLayoutProps} />
				<PropsTable title='Spacing Props' props={zBoxSpacingProps} />
				<PropsTable title='Visual Props' props={zBoxVisualProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use the as prop to render semantic HTML elements — never nest a div where a section or article belongs</z.box>
								<z.box as='li'>Always use design-system CSS variables for colors and spacing rather than hardcoded values</z.box>
								<z.box as='li'>z.box does not apply any roles — semantic meaning comes from the element you render via as</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
