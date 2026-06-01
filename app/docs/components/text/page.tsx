'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { zTextProps, zTextSubcomponentProps } from './props'
import { examples } from './examples'

export default function TextDocsPage() {
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
				<z.text className='text-foreground'>Text</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZText</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Semantic typography primitives that map directly to the design-system type scale. Use sub-components for headings and
					prose, and prop modifiers for color, size, weight, and style.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.box className='flex flex-col gap-3'>
					<z.text.display>Display heading</z.text.display>
					<z.text.h1>Heading one</z.text.h1>
					<z.text.body>Body text for readable content.</z.text.body>
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

				{/* Typography scale */}
				<ComponentPreview
					title='Typography Scale'
					description='The full type hierarchy from display down to caption.'
					code={examples.typographyScale}
				>
					<z.box className='flex flex-col gap-4'>
						<z.text.display>Display — design language speaks in systems</z.text.display>
						<z.text.h1>Heading One</z.text.h1>
						<z.text.h2>Heading Two</z.text.h2>
						<z.text.h3>Heading Three</z.text.h3>
						<z.text.h4>Heading Four</z.text.h4>
						<z.text.body>Body — readable prose and descriptions</z.text.body>
						<z.text.small>Small — supporting metadata</z.text.small>
						<z.text.caption>Caption — labels and footnotes</z.text.caption>
					</z.box>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Use isMuted, isPurple, or isPink to shift the text color.'
					code={examples.colors}
				>
					<z.box className='flex flex-col gap-3'>
						<z.text>Neutral (default)</z.text>
						<z.text isMuted>Muted — subdued supporting text</z.text>
						<z.text isPurple>Purple — accent emphasis</z.text>
						<z.text isPink>Pink — accent emphasis</z.text>
					</z.box>
				</ComponentPreview>

				{/* Weights */}
				<ComponentPreview
					title='Weights'
					description='Control font weight with isThin, isNormal, isBold, and isVeryBold.'
					code={examples.weights}
				>
					<z.box className='flex flex-col gap-3'>
						<z.text isThin>Thin weight</z.text>
						<z.text isNormal>Normal weight (default)</z.text>
						<z.text isBold>Bold weight</z.text>
						<z.text isVeryBold>Very bold weight</z.text>
					</z.box>
				</ComponentPreview>

				{/* Styles */}
				<ComponentPreview
					title='Styles'
					description='Apply italic and underline independently or together.'
					code={examples.styles}
				>
					<z.box className='flex flex-col gap-3'>
						<z.text isItalic>Italic text</z.text>
						<z.text isUnderlined>Underlined text</z.text>
						<z.text isItalic isUnderlined>
							Italic and underlined
						</z.text>
					</z.box>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Override the default size with isExtraSmall through isExtraLarge.'
					code={examples.sizes}
				>
					<z.box className='flex flex-col gap-3'>
						<z.text isExtraSmall>Extra small</z.text>
						<z.text isSmall>Small</z.text>
						<z.text isMedium>Medium (default)</z.text>
						<z.text isLarge>Large</z.text>
						<z.text isExtraLarge>Extra large</z.text>
					</z.box>
				</ComponentPreview>

				{/* As element */}
				<ComponentPreview
					title='Custom Element'
					description='Use the as prop to control the rendered HTML element on the base component.'
					code={examples.asElement}
				>
					<z.box className='flex flex-col gap-3'>
						<z.text as='p'>Rendered as a paragraph</z.text>
						<z.text as='span'>Rendered as a span</z.text>
						<z.text.h2 isMuted>ZText.h2 with isMuted modifier</z.text.h2>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ZText' props={zTextProps} />
				<PropsTable title='Sub-components' props={zTextSubcomponentProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use semantic sub-components (ZText.h1 – ZText.h4) to preserve document heading hierarchy</z.box>
								<z.box as='li'>
									Reserve display size for hero headings only — do not use multiple display-scale elements per page
								</z.box>
								<z.box as='li'>Do not convey meaning through color alone — pair color modifiers with contextual copy</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
