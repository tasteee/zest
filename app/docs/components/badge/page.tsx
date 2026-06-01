'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'import { ChevronRight, Check, Clock, Palette, Zap } from 'lucide-react'
import { badgeProps } from './props'
import { examples } from './examples'
export default function BadgeDocsPage() {
	return (
		<z.box className='space-y-16'>
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>z.badge</z.text>
			</z.box>

			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>z.badge</z.text.h1>
					<z.badge isSolid isPurple>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Small visual labels for categorizing content, displaying status, or drawing attention to specific elements. Badges are
					non-interactive by default.
				</z.text.body>
			</z.box>

			<ComponentPreview
				code={examples.quickPreview}
			>
				<z.badge>z.badge</z.badge>
			</ComponentPreview>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				<ComponentPreview
					code={examples.kindsAndColors}
				>
					<z.box className='flex flex-wrap gap-2'>
						<z.badge isOutline isNeutral>
							Outline Neutral
						</z.badge>
						<z.badge isGhost isPurple>
							Ghost Purple
						</z.badge>
						<z.badge isSolid isPurple>
							Solid Purple
						</z.badge>
					</z.box>
				</ComponentPreview>

				<ComponentPreview
					code={examples.withIcons}
				>
					<z.box className='flex flex-wrap gap-2'>
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
							<z.link href='#'>Action</z.link>
						</z.badge>
					</z.box>
				</ComponentPreview>

				<ComponentPreview
					code={examples.colorVariants}
				>
					<z.box className='grid grid-cols-2 gap-2 w-full max-w-xl'>
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
					</z.box>
				</ComponentPreview>
			</z.box>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='z.badge' props={badgeProps} />
			</z.box>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>Best Practices</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Do</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use badges sparingly to avoid visual clutter</z.box>
								<z.box as='li'>Keep badge text short and concise (1-2 words)</z.box>
								<z.box as='li'>Use consistent color semantics across your app</z.box>
								<z.box as='li'>Reserve solid badges for high emphasis and outline/ghost for lower emphasis</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
