import Link from 'next/link'
import { z } from '@/components/ui'
import {
	DocsTitle,
	DocsDescription,
	DocsSection,
	DocsSectionTitle,
	DocsText,
	DocsGrid
} from '@/components/docs/mdx-components'
import { ArrowRightIcon } from 'lucide-react'

const sections = [
	{
		title: 'Foundations',
		description: 'The core building blocks of our design language.',
		href: '/docs/foundations/colors',
		color: 'neon-pink',
		items: ['Colors', 'Typography', 'Spacing', 'Voice & Tone']
	},
	{
		title: 'Components',
		description: 'A complete library of accessible, customizable components.',
		href: '/docs/components',
		color: 'neon-purple',
		items: ['50+ Components', 'Radix Primitives', 'Full Variants']
	}
]

const quickLinks = [
	{ title: 'Button', href: '/docs/components/button', badge: 'Popular' },
	{ title: 'Card', href: '/docs/components/card', badge: null },
	{ title: 'Dialog', href: '/docs/components/dialog', badge: null },
	{ title: 'Input', href: '/docs/components/input', badge: null },
	{ title: 'z.badge', href: '/docs/components/badge', badge: null },
	{ title: 'Alert', href: '/docs/components/alert', badge: null }
]

export default function DocsPage() {
	return (
		<z.box>
			<DocsTitle badge='v1.0'>Documentation</DocsTitle>
			<DocsDescription>
				Comprehensive documentation for the tasteink design system. Everything you need to build interfaces that hit different.
			</DocsDescription>

			<DocsSection>
				<DocsGrid columns={2}>
					{sections.map((section) => (
						<Link
							key={section.title}
							href={section.href}
							className='group block rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/30 hover:bg-card/80'
						>
							<z.box className='flex items-start justify-between mb-4'>
								<z.text.h3 className={`text-${section.color}`}>{section.title}</z.text.h3>
								<ArrowRightIcon className='h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1' />
							</z.box>
							<z.text.body className='text-foreground text-sm mb-4'>{section.description}</z.text.body>
							<z.box className='flex flex-wrap gap-2'>
								{section.items.map((item) => (
									<z.badge key={item} isOutline isNeutral className='text-xs'>
										{item}
									</z.badge>
								))}
							</z.box>
						</Link>
					))}
				</DocsGrid>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Quick Start</DocsSectionTitle>
				<DocsText>Jump straight into the most commonly used components.</DocsText>
				<z.box className='grid grid-cols-2 md:grid-cols-3 gap-3'>
					{quickLinks.map((link) => (
						<Link
							key={link.title}
							href={link.href}
							className='flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted/50 hover:border-foreground/30'
						>
							<z.text className='text-foreground font-medium'>{link.title}</z.text>
							{link.badge && (
								<z.badge isSolid isPurple className='text-[10px]'>
									{link.badge}
								</z.badge>
							)}
						</Link>
					))}
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Design Principles</DocsSectionTitle>
				<z.box className='grid gap-6 md:grid-cols-2'>
					<z.box className='rounded-lg border border-border p-6'>
						<z.box className='flex items-center gap-3 mb-3'>
							<z.box className='w-2 h-2 rounded-full bg-neon-purple' />
							<z.text.h4 isPrimary isBold>Unapologetic</z.text.h4>
						</z.box>
						<z.text.body className='text-sm text-foreground'>Bold choices, confident execution. We don&apos;t follow trends—we set them.</z.text.body>
					</z.box>
					<z.box className='rounded-lg border border-border p-6'>
						<z.box className='flex items-center gap-3 mb-3'>
							<z.box className='w-2 h-2 rounded-full bg-neon-pink' />
							<z.text.h4 isPrimary isBold>Accessible</z.text.h4>
						</z.box>
						<z.text.body className='text-sm text-foreground'>Every component is built with accessibility in mind. No exceptions.</z.text.body>
					</z.box>
					<z.box className='rounded-lg border border-border p-6'>
						<z.box className='flex items-center gap-3 mb-3'>
							<z.box className='w-2 h-2 rounded-full bg-neon-purple' />
							<z.text.h4 isPrimary isBold>Composable</z.text.h4>
						</z.box>
						<z.text.body className='text-sm text-foreground'>Small, focused components that compose into complex interfaces.</z.text.body>
					</z.box>
					<z.box className='rounded-lg border border-border p-6'>
						<z.box className='flex items-center gap-3 mb-3'>
							<z.box className='w-2 h-2 rounded-full bg-neon-pink' />
							<z.text.h4 isPrimary isBold>Themeable</z.text.h4>
						</z.box>
						<z.text.body className='text-sm text-foreground'>CSS variables and variant props make customization effortless.</z.text.body>
					</z.box>
				</z.box>
			</DocsSection>
		</z.box>
	)
}
