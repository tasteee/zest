'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { FormInput, LayoutGrid, Navigation, UserCircle, FileText, MessageSquare, Settings, CreditCard } from 'lucide-react'

const patterns = [
	{
		name: 'Forms',
		description: 'Best practices for building accessible, user-friendly forms with validation and error handling.',
		href: '/docs/patterns/forms',
		icon: FormInput,
		status: 'available'
	},
	{
		name: 'Authentication',
		description: 'Login, signup, and password reset flows with proper security considerations.',
		href: '/docs/patterns/authentication',
		icon: UserCircle,
		status: 'coming-soon'
	},
	{
		name: 'Navigation',
		description: 'Sidebar, navbar, and mobile navigation patterns for different app structures.',
		href: '/docs/patterns/navigation',
		icon: Navigation,
		status: 'coming-soon'
	},
	{
		name: 'Data Tables',
		description: 'Tables with sorting, filtering, pagination, and row selection.',
		href: '/docs/patterns/data-tables',
		icon: LayoutGrid,
		status: 'coming-soon'
	},
	{
		name: 'Settings Pages',
		description: 'Account settings, preferences, and configuration interfaces.',
		href: '/docs/patterns/settings',
		icon: Settings,
		status: 'coming-soon'
	},
	{
		name: 'Content Pages',
		description: 'Blog posts, articles, and documentation page layouts.',
		href: '/docs/patterns/content',
		icon: FileText,
		status: 'coming-soon'
	},
	{
		name: 'Chat Interfaces',
		description: 'Real-time messaging and conversation UI patterns.',
		href: '/docs/patterns/chat',
		icon: MessageSquare,
		status: 'coming-soon'
	},
	{
		name: 'Checkout',
		description: 'E-commerce checkout flows, payment forms, and order summaries.',
		href: '/docs/patterns/checkout',
		icon: CreditCard,
		status: 'coming-soon'
	}
]

export default function PatternsPage() {
	return (
		<z.box className='space-y-16'>
			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-2'>
					<z.badge isGhost isNeutral className='font-mono text-xs'>
						Patterns
					</z.badge>
				</z.box>
				<z.text.h1>UI Patterns</z.text.h1>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Common UI patterns and best practices for building consistent, accessible interfaces. Each pattern demonstrates how to
					combine components effectively.
				</z.text.body>
			</z.box>

			{/* Pattern Grid */}
			<z.box className='grid gap-6 sm:grid-cols-2'>
				{patterns.map((pattern) => (
					<Link
						key={pattern.name}
						href={pattern.status === 'available' ? pattern.href : '#'}
						className={pattern.status === 'coming-soon' ? 'cursor-not-allowed' : ''}
					>
						<z.card
							className={`h-full transition-all duration-200 ${
								pattern.status === 'available' ? 'hover:border-primary/50 hover:shadow-md' : 'opacity-60'
							}`}
						>
							<z.cardHeader>
								<z.box className='flex items-start justify-between'>
									<z.box className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted'>
										<pattern.icon className='h-5 w-5 text-foreground' />
									</z.box>
									{pattern.status === 'coming-soon' && (
										<z.badge isOutline isNeutral className='text-xs'>
											Coming Soon
										</z.badge>
									)}
								</z.box>
								<z.cardTitle className='text-lg'>{pattern.name}</z.cardTitle>
								<z.cardDescription className='leading-relaxed'>{pattern.description}</z.cardDescription>
							</z.cardHeader>
						</z.card>
					</Link>
				))}
			</z.box>

			{/* Contributing */}
			<z.card className='border-dashed'>
				<z.cardContent className='p-8 text-center space-y-4'>
					<z.text.h3>Want to contribute a pattern?</z.text.h3>
					<z.text.body className='text-muted-foreground max-w-md mx-auto'>
						We welcome contributions! If you have a UI pattern that could help others, consider submitting it to our
						documentation.
					</z.text.body>
				</z.cardContent>
			</z.card>
		</z.box>
	)
}
