'use client'

import NextLink from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, ExternalLink, ArrowRight } from 'lucide-react'
import { linkProps } from './props'
import { examples } from './examples'

export default function LinkDocsPage() {
	return (
		<z.box className='space-y-16'>
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<NextLink href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</NextLink>
				<ChevronRight className='h-4 w-4' />
				<NextLink href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</NextLink>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Link</z.text>
			</z.box>

			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Link</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Navigational text with semantic affordance. Supports color variants, icon composition, and custom router link elements.
				</z.text.body>
			</z.box>

			<ComponentPreview code={examples.quickPreview}>
				<z.link href='#'>Read the docs</z.link>
			</ComponentPreview>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				<z.box className='space-y-4'>
					<z.text.h3>Color Variants</z.text.h3>
					<ComponentPreview code={examples.colorVariants}>
						<z.box className='flex flex-wrap gap-4'>
							<z.link href='#' color='default'>
								Default link
							</z.link>
							<z.link href='#' color='purple'>
								Purple link
							</z.link>
							<z.link href='#' color='pink'>
								Pink link
							</z.link>
							<z.link href='#' color='neutral'>
								Neutral link
							</z.link>
							<z.link href='#' color='muted'>
								Muted link
							</z.link>
						</z.box>
					</ComponentPreview>
				</z.box>

				<z.box className='space-y-4'>
					<z.text.h3>With Icons</z.text.h3>
					<ComponentPreview code={examples.withIcons}>
						<z.box className='flex flex-wrap gap-4'>
							<z.link href='#' color='purple'>
								Visit site
								<ExternalLink className='h-3.5 w-3.5' />
							</z.link>
							<z.link href='#' color='pink'>
								Learn more
								<ArrowRight className='h-3.5 w-3.5' />
							</z.link>
						</z.box>
					</ComponentPreview>
				</z.box>

				<z.box className='space-y-4'>
					<z.text.h3>With Router Link</z.text.h3>
					<z.text.body className='text-sm text-muted-foreground'>
						Use the <z.box as='code'>as</z.box> prop to render with a router-aware link component, such as Next.js{' '}
						<z.box as='code'>Link</z.box>. Pass the destination via <z.box as='code'>href</z.box> or <z.box as='code'>to</z.box>.
					</z.text.body>
					<ComponentPreview code={examples.withRouterLink}>
						<z.box className='flex flex-wrap gap-4'>
							<z.link as={NextLink} href='/docs/components/button' color='purple'>
								Button docs
							</z.link>
							<z.link as={NextLink} to='/docs/components/badge' color='pink'>
								Badge docs
							</z.link>
						</z.box>
					</ComponentPreview>
				</z.box>

				<z.box className='space-y-4'>
					<z.text.h3>Inline in Text</z.text.h3>
					<ComponentPreview code={examples.inlineInText}>
						<z.text.body className='text-muted-foreground'>
							Read the{' '}
							<z.link href='#' color='purple'>
								full documentation
							</z.link>{' '}
							to learn more about the design system and its principles.
						</z.text.body>
					</ComponentPreview>
				</z.box>
			</z.box>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>Props</z.text.h2>
				<PropsTable props={linkProps} />
			</z.box>
		</z.box>
	)
}
