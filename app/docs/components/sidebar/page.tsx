'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarInset,
	SidebarTrigger
} from '@/components/ui/sidebar'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Home, Settings, Users, BarChart3 } from 'lucide-react'
import { sidebarProviderProps, sidebarProps, sidebarMenuButtonProps, useSidebarReturn } from './props'
import { examples } from './examples'

const NAV_ITEMS = [
	{ title: 'Home', icon: Home },
	{ title: 'Analytics', icon: BarChart3 },
	{ title: 'Users', icon: Users },
	{ title: 'Settings', icon: Settings }
]

export default function SidebarDocsPage() {
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
				<span className='text-foreground'>Sidebar</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Sidebar</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A full-featured, collapsible app sidebar with mobile drawer support. Built for complete app shell layouts with
					navigation groups, menu items, and a keyboard shortcut (⌘B) built in.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<div className='rounded-lg border overflow-hidden' style={{ height: '320px' }}>
					<SidebarProvider style={{ '--sidebar-width': '200px' } as React.CSSProperties}>
						<Sidebar>
							<SidebarHeader className='px-4 py-3'>
								<span className='font-semibold text-sm'>My App</span>
							</SidebarHeader>
							<SidebarContent>
								<SidebarGroup>
									<SidebarGroupLabel>Navigation</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu>
											{NAV_ITEMS.map((item) => (
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton>
														<item.icon />
														<span>{item.title}</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
							<SidebarFooter className='px-4 py-3'>
								<span className='text-xs text-muted-foreground'>v1.0.0</span>
							</SidebarFooter>
						</Sidebar>
						<SidebarInset>
							<header className='flex h-12 items-center px-4 border-b gap-2'>
								<SidebarTrigger />
								<span className='text-sm font-medium'>Dashboard</span>
							</header>
							<main className='p-4'>
								<p className='text-sm text-muted-foreground'>Click the trigger or press ⌘B to collapse the sidebar.</p>
							</main>
						</SidebarInset>
					</SidebarProvider>
				</div>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			{/* useSidebar hook */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>useSidebar Hook</h2>
				<p className='text-muted-foreground'>
					Access sidebar state from any child component inside SidebarProvider using the useSidebar hook.
				</p>
				<CodeBlock code={examples.useSidebarHook} language='tsx' />
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='SidebarProvider' props={sidebarProviderProps} />
				<PropsTable title='Sidebar' props={sidebarProps} />
				<PropsTable title='SidebarMenuButton' props={sidebarMenuButtonProps} />
				<PropsTable title='useSidebar' props={useSidebarReturn} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>SidebarTrigger renders a button with an accessible label — always keep it visible in the layout header</li>
								<li>Keyboard shortcut ⌘B (Mac) / Ctrl+B (Windows) toggles the sidebar automatically</li>
								<li>On mobile the sidebar renders as a Drawer — no additional configuration needed</li>
								<li>Use SidebarMenuButton with asChild and an anchor tag to get correct link semantics and aria-current</li>
								<li>Set the isActive prop on the active SidebarMenuButton to convey current location to assistive technology</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
