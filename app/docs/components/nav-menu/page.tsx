'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { navigationMenuProps, navigationMenuLinkProps } from './props'
import { examples } from './examples'

export default function NavMenuDocsPage() {
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
				<span className='text-foreground'>Navigation Menu</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Navigation Menu</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A structured primary navigation component built on Radix NavigationMenu. Supports simple link lists and rich dropdown
					content panels with animated viewport transitions.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href='/' className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href='/docs' className={navigationMenuTriggerStyle()}>
								Docs
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href='/docs/components' className={navigationMenuTriggerStyle()}>
								Components
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
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

				{/* With Dropdown */}
				<ComponentPreview
					title='With Dropdown Content'
					description='Use NavigationMenuTrigger and NavigationMenuContent to create rich dropdown panels.'
					code={examples.withDropdown}
				>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='grid gap-3 p-4 w-64'>
										<li>
											<NavigationMenuLink href='/docs' className='block rounded-md p-2 hover:bg-accent transition-colors'>
												<div className='font-medium mb-1'>Overview</div>
												<p className='text-sm text-muted-foreground'>Introduction to the design system.</p>
											</NavigationMenuLink>
										</li>
										<li>
											<NavigationMenuLink href='/docs' className='block rounded-md p-2 hover:bg-accent transition-colors'>
												<div className='font-medium mb-1'>Installation</div>
												<p className='text-sm text-muted-foreground'>How to install and configure.</p>
											</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink href='/docs/components' className={navigationMenuTriggerStyle()}>
									Components
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</ComponentPreview>

				{/* Grid Content */}
				<ComponentPreview
					title='Grid Content Panel'
					description='Content panels accept any layout — use a grid to display many items compactly.'
					code={examples.withGrid}
				>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Components</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='grid grid-cols-2 gap-2 p-4 w-80'>
										{['Button', 'Card', 'Input', 'Dialog', 'Select', 'Switch'].map((name) => {
											return (
												<li key={name}>
													<NavigationMenuLink
														href='/docs/components'
														className='block rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors'
													>
														{name}
													</NavigationMenuLink>
												</li>
											)
										})}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='NavigationMenu' props={navigationMenuProps} />
				<PropsTable title='NavigationMenuLink' props={navigationMenuLinkProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Keyboard Interactions</h3>
							<div className='grid gap-2'>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus to the next menu item or trigger</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</kbd>
									<span className='text-muted-foreground'>Open the focused trigger's content panel</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the open content panel</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>← →</kbd>
									<span className='text-muted-foreground'>Navigate between top-level triggers</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>NavigationMenu renders a nav element — use it as the primary site navigation landmark</li>
								<li>Set active={true} on NavigationMenuLink for the current route to expose aria-current="page"</li>
								<li>Use navigationMenuTriggerStyle() on simple link items for visual consistency with trigger items</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
