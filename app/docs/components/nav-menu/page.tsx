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
import { CodeBlock } from '@/components/docs/code-block'import { ChevronRight } from 'lucide-react'
import { navigationMenuProps, navigationMenuLinkProps } from './props'
import { examples } from './examples'

export default function NavMenuDocsPage() {
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
				<z.text className='text-foreground'>Navigation Menu</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Navigation Menu</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A structured primary navigation component built on Radix NavigationMenu. Supports simple link lists and rich dropdown
					content panels with animated viewport transitions.
				</z.text.body>
			</z.box>

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
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

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
									<z.box as='ul' className='grid gap-3 p-4 w-64'>
										<z.box as='li'>
											<NavigationMenuLink href='/docs' className='block rounded-md p-2 hover:bg-accent transition-colors'>
												<z.box className='font-medium mb-1'>Overview</z.box>
												<z.text.body className='text-sm text-muted-foreground'>Introduction to the design system.</z.text.body>
											</NavigationMenuLink>
										</z.box>
										<z.box as='li'>
											<NavigationMenuLink href='/docs' className='block rounded-md p-2 hover:bg-accent transition-colors'>
												<z.box className='font-medium mb-1'>Installation</z.box>
												<z.text.body className='text-sm text-muted-foreground'>How to install and configure.</z.text.body>
											</NavigationMenuLink>
										</z.box>
									</z.box>
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
									<z.box as='ul' className='grid grid-cols-2 gap-2 p-4 w-80'>
										{['Button', 'Card', 'Input', 'Dialog', 'Select', 'Switch'].map((name) => {
											return (
												<z.box as='li' key={name}>
													<NavigationMenuLink
														href='/docs/components'
														className='block rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors'
													>
														{name}
													</NavigationMenuLink>
												</z.box>
											)
										})}
									</z.box>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='NavigationMenu' props={navigationMenuProps} />
				<PropsTable title='NavigationMenuLink' props={navigationMenuLinkProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Keyboard Interactions</z.text.h3>
							<z.box className='grid gap-2'>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Move focus to the next menu item or trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</z.text>
									<z.text className='text-muted-foreground'>Open the focused trigger's content panel</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the open content panel</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>← →</z.text>
									<z.text className='text-muted-foreground'>Navigate between top-level triggers</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>NavigationMenu renders a nav element — use it as the primary site navigation landmark</z.box>
								<z.box as='li'>Set active={true} on NavigationMenuLink for the current route to expose aria-current="page"</z.box>
								<z.box as='li'>Use navigationMenuTriggerStyle() on simple link items for visual consistency with trigger items</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
