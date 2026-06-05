'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Check, Clock, Palette, Zap } from 'lucide-react'
import { badgeProps } from './props'
import { examples } from './examples'
export default function BadgeDocsPage() {
	return (
		<div className='space-y-16'>
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>z.badge</span>
			</div>

			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>z.badge</h1>
					<z.badge isSolid isPurple>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Small visual labels for categorizing content, displaying status, or drawing attention to specific elements. Badges are
					non-interactive by default.
				</p>
			</div>

			<ComponentPreview
				code={examples.quickPreview}
			>
				<z.badge>z.badge</z.badge>
			</ComponentPreview>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				<ComponentPreview
					code={examples.kindsAndColors}
				>
					<div className='flex flex-wrap gap-2'>
						<z.badge isOutline isNeutral>
							Outline Neutral
						</z.badge>
						<z.badge isGhost isPurple>
							Ghost Purple
						</z.badge>
						<z.badge isSolid isPurple>
							Solid Purple
						</z.badge>
					</div>
				</ComponentPreview>

				<ComponentPreview
					code={examples.withIcons}
				>
					<div className='flex flex-wrap gap-2'>
						<z.badge isSolid isPurple>
							<Check className='h-3 w-3' />
							Verified
						</z.badge>
						<z.badge isGhost isPink>
							<Clock className='h-3 w-3' />
							Pending
						</z.badge>
						<z.badge isOutline isPink>
							<Zap className='h-3 w-3' />
							Featured
						</z.badge>
						<z.badge isSolid isNeutral asChild>
							<a href='#'>Action</a>
						</z.badge>
					</div>
				</ComponentPreview>

				<ComponentPreview
					code={examples.colorVariants}
				>
					<div className='grid grid-cols-2 gap-2 w-full max-w-xl'>
						<z.badge isOutline isNeutral>
							<Palette className='h-3 w-3' />
							neutral
						</z.badge>
						<z.badge isOutline isPurple>
							<Palette className='h-3 w-3' />
							purple
						</z.badge>
						<z.badge isOutline isPurple>
							<Palette className='h-3 w-3' />
							purple
						</z.badge>
						<z.badge isOutline isPink>
							<Palette className='h-3 w-3' />
							pink
						</z.badge>
						<z.badge isOutline isPink>
							<Palette className='h-3 w-3' />
							pink
						</z.badge>
					</div>
				</ComponentPreview>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='z.badge' props={badgeProps} />
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Best Practices</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Do</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use badges sparingly to avoid visual clutter</li>
								<li>Keep badge text short and concise (1-2 words)</li>
								<li>Use consistent color semantics across your app</li>
								<li>Reserve solid badges for high emphasis and outline/ghost for lower emphasis</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
