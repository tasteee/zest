'use client'

import NextLink from 'next/link'
import { Link } from '@/components/ui/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, ExternalLink, ArrowRight } from 'lucide-react'
import { linkProps } from './props'
import { examples } from './examples'

export default function LinkDocsPage() {
	return (
		<div className='space-y-16'>
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<NextLink href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</NextLink>
				<ChevronRight className='h-4 w-4' />
				<NextLink href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</NextLink>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>Link</span>
			</div>

			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Link</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Navigational text with semantic affordance. Supports color variants, icon composition, and custom router link elements.
				</p>
			</div>

			<ComponentPreview code={examples.quickPreview}>
				<Link href='#'>Read the docs</Link>
			</ComponentPreview>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium text-foreground'>Color Variants</h3>
					<ComponentPreview code={examples.colorVariants}>
						<div className='flex flex-wrap gap-4'>
							<Link href='#' color='default'>
								Default link
							</Link>
							<Link href='#' color='purple'>
								Purple link
							</Link>
							<Link href='#' color='pink'>
								Pink link
							</Link>
							<Link href='#' color='neutral'>
								Neutral link
							</Link>
							<Link href='#' color='muted'>
								Muted link
							</Link>
						</div>
					</ComponentPreview>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium text-foreground'>With Icons</h3>
					<ComponentPreview code={examples.withIcons}>
						<div className='flex flex-wrap gap-4'>
							<Link href='#' color='purple'>
								Visit site
								<ExternalLink className='h-3.5 w-3.5' />
							</Link>
							<Link href='#' color='pink'>
								Learn more
								<ArrowRight className='h-3.5 w-3.5' />
							</Link>
						</div>
					</ComponentPreview>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium text-foreground'>With Router Link</h3>
					<p className='text-sm text-muted-foreground'>
						Use the <code>as</code> prop to render with a router-aware link component, such as Next.js <code>Link</code>. Pass the
						destination via <code>href</code> or <code>to</code>.
					</p>
					<ComponentPreview code={examples.withRouterLink}>
						<div className='flex flex-wrap gap-4'>
							<Link as={NextLink} href='/docs/components/button' color='purple'>
								Button docs
							</Link>
							<Link as={NextLink} to='/docs/components/badge' color='pink'>
								Badge docs
							</Link>
						</div>
					</ComponentPreview>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium text-foreground'>Inline in Text</h3>
					<ComponentPreview code={examples.inlineInText}>
						<p className='text-muted-foreground'>
							Read the{' '}
							<Link href='#' color='purple'>
								full documentation
							</Link>{' '}
							to learn more about the design system and its principles.
						</p>
					</ComponentPreview>
				</div>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Props</h2>
				<PropsTable props={linkProps} />
			</section>
		</div>
	)
}
