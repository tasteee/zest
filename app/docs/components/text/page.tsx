'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ZText } from '@/components/ui/z-text'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { zTextProps, zTextSubcomponentProps } from './props'
import { examples } from './examples'

export default function TextDocsPage() {
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
				<span className='text-foreground'>Text</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZText</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Semantic typography primitives that map directly to the design-system type scale. Use sub-components for headings
					and prose, and prop modifiers for color, size, weight, and style.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<div className='flex flex-col gap-3'>
					<ZText.display>Display heading</ZText.display>
					<ZText.h1>Heading one</ZText.h1>
					<ZText.body>Body text for readable content.</ZText.body>
				</div>
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

				{/* Typography scale */}
				<ComponentPreview
					title='Typography Scale'
					description='The full type hierarchy from display down to caption.'
					code={examples.typographyScale}
				>
					<div className='flex flex-col gap-4'>
						<ZText.display>Display — design language speaks in systems</ZText.display>
						<ZText.h1>Heading One</ZText.h1>
						<ZText.h2>Heading Two</ZText.h2>
						<ZText.h3>Heading Three</ZText.h3>
						<ZText.h4>Heading Four</ZText.h4>
						<ZText.body>Body — readable prose and descriptions</ZText.body>
						<ZText.small>Small — supporting metadata</ZText.small>
						<ZText.caption>Caption — labels and footnotes</ZText.caption>
					</div>
				</ComponentPreview>

				{/* Colors */}
				<ComponentPreview
					title='Colors'
					description='Use isMuted, isPurple, or isPink to shift the text color.'
					code={examples.colors}
				>
					<div className='flex flex-col gap-3'>
						<ZText>Neutral (default)</ZText>
						<ZText isMuted>Muted — subdued supporting text</ZText>
						<ZText isPurple>Purple — accent emphasis</ZText>
						<ZText isPink>Pink — accent emphasis</ZText>
					</div>
				</ComponentPreview>

				{/* Weights */}
				<ComponentPreview
					title='Weights'
					description='Control font weight with isThin, isNormal, isBold, and isVeryBold.'
					code={examples.weights}
				>
					<div className='flex flex-col gap-3'>
						<ZText isThin>Thin weight</ZText>
						<ZText isNormal>Normal weight (default)</ZText>
						<ZText isBold>Bold weight</ZText>
						<ZText isVeryBold>Very bold weight</ZText>
					</div>
				</ComponentPreview>

				{/* Styles */}
				<ComponentPreview
					title='Styles'
					description='Apply italic and underline independently or together.'
					code={examples.styles}
				>
					<div className='flex flex-col gap-3'>
						<ZText isItalic>Italic text</ZText>
						<ZText isUnderlined>Underlined text</ZText>
						<ZText isItalic isUnderlined>Italic and underlined</ZText>
					</div>
				</ComponentPreview>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Override the default size with isExtraSmall through isExtraLarge.'
					code={examples.sizes}
				>
					<div className='flex flex-col gap-3'>
						<ZText isExtraSmall>Extra small</ZText>
						<ZText isSmall>Small</ZText>
						<ZText isMedium>Medium (default)</ZText>
						<ZText isLarge>Large</ZText>
						<ZText isExtraLarge>Extra large</ZText>
					</div>
				</ComponentPreview>

				{/* As element */}
				<ComponentPreview
					title='Custom Element'
					description='Use the as prop to control the rendered HTML element on the base component.'
					code={examples.asElement}
				>
					<div className='flex flex-col gap-3'>
						<ZText as='p'>Rendered as a paragraph</ZText>
						<ZText as='span'>Rendered as a span</ZText>
						<ZText.h2 isMuted>ZText.h2 with isMuted modifier</ZText.h2>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ZText' props={zTextProps} />
				<PropsTable title='Sub-components' props={zTextSubcomponentProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use semantic sub-components (ZText.h1 – ZText.h4) to preserve document heading hierarchy</li>
								<li>Reserve display size for hero headings only — do not use multiple display-scale elements per page</li>
								<li>Do not convey meaning through color alone — pair color modifiers with contextual copy</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
