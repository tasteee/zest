'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ZBox } from '@/components/ui/z-box'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { zBoxLayoutProps, zBoxSpacingProps, zBoxVisualProps } from './props'
import { examples } from './examples'

export default function BoxDocsPage() {
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
				<span className='text-foreground'>Box</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZBox</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A primitive layout component that applies spacing, backgrounds, borders, and typography through props instead of
					class names. Composable, predictable, and entirely driven by design-system tokens.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<ZBox
					isFlex
					isRow
					gap='1rem'
					padding='1.5rem'
					background='var(--card)'
					borderRadius='var(--radius-md)'
					border='1px solid var(--border)'
				>
					<ZBox padding='0.5rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
						Item one
					</ZBox>
					<ZBox padding='0.5rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
						Item two
					</ZBox>
				</ZBox>
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

				{/* Flex Layout */}
				<ComponentPreview
					title='Flex Layout'
					description='Use isFlex with isRow or isColumn to create flex containers. alignX and alignY follow the axis direction.'
					code={examples.flex}
				>
					<div className='flex flex-col gap-4 w-full'>
						<ZBox isFlex isRow gap='0.75rem' alignY='center'>
							<ZBox padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Left
							</ZBox>
							<ZBox padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Right
							</ZBox>
						</ZBox>
						<ZBox isFlex isColumn alignX='center' gap='0.5rem'>
							<ZBox padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Top
							</ZBox>
							<ZBox padding='0.5rem 1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
								Bottom
							</ZBox>
						</ZBox>
					</div>
				</ComponentPreview>

				{/* Spacing */}
				<ComponentPreview
					title='Spacing'
					description='Padding and margin accept any CSS value. Use paddingX/paddingY for axis-level control.'
					code={examples.spacing}
				>
					<div className='flex flex-col gap-3'>
						<ZBox padding='1rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
							padding="1rem"
						</ZBox>
						<ZBox paddingX='2rem' paddingY='0.5rem' background='var(--muted)' borderRadius='var(--radius-sm)'>
							paddingX="2rem" paddingY="0.5rem"
						</ZBox>
					</div>
				</ComponentPreview>

				{/* As Element */}
				<ComponentPreview
					title='Custom Element'
					description='Use the as prop to control the rendered HTML element.'
					code={examples.asElement}
				>
					<ZBox as='section' padding='1.5rem' border='1px solid var(--border)' borderRadius='var(--radius-md)'>
						<ZBox as='h2' fontSize='1.25rem' fontWeight='600' color='var(--foreground)'>
							Heading
						</ZBox>
						<ZBox as='p' color='var(--muted-foreground)' paddingTop='0.5rem'>
							Paragraph content here.
						</ZBox>
					</ZBox>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Layout Props' props={zBoxLayoutProps} />
				<PropsTable title='Spacing Props' props={zBoxSpacingProps} />
				<PropsTable title='Visual Props' props={zBoxVisualProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use the as prop to render semantic HTML elements — never nest a div where a section or article belongs</li>
								<li>Always use design-system CSS variables for colors and spacing rather than hardcoded values</li>
								<li>ZBox does not apply any roles — semantic meaning comes from the element you render via as</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
