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
				<z.text className='text-foreground'>Sidebar</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Sidebar</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A full-featured, collapsible app sidebar with mobile drawer support. Built for complete app shell layouts with
					navigation groups, menu items, and a keyboard shortcut (⌘B) built in.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.box className='rounded-lg border overflow-hidden' style={{ height: '320px' }}>
					<SidebarProvider style={{ '--sidebar-width': '200px' } as React.CSSProperties}>
						<Sidebar>
							<SidebarHeader className='px-4 py-3'>
								<z.text className='font-semibold text-sm'>My App</z.text>
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
														<z.text>{item.title}</z.text>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
							<SidebarFooter className='px-4 py-3'>
								<z.text className='text-xs text-muted-foreground'>v1.0.0</z.text>
							</SidebarFooter>
						</Sidebar>
						<SidebarInset>
							<z.box as='header' className='flex h-12 items-center px-4 border-b gap-2'>
								<SidebarTrigger />
								<z.text className='text-sm font-medium'>Dashboard</z.text>
							</z.box>
							<z.box as='main' className='p-4'>
								<z.text.body className='text-sm text-muted-foreground'>
									Click the trigger or press ⌘B to collapse the sidebar.
								</z.text.body>
							</z.box>
						</SidebarInset>
					</SidebarProvider>
				</z.box>
			</ComponentPreview>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			{/* useSidebar hook */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>useSidebar Hook</z.text.h2>
				<z.text.body className='text-muted-foreground'>
					Access sidebar state from any child component inside SidebarProvider using the useSidebar hook.
				</z.text.body>
				<CodeBlock code={examples.useSidebarHook} language='tsx' />
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='SidebarProvider' props={sidebarProviderProps} />
				<PropsTable title='Sidebar' props={sidebarProps} />
				<PropsTable title='SidebarMenuButton' props={sidebarMenuButtonProps} />
				<PropsTable title='useSidebar' props={useSidebarReturn} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>
									SidebarTrigger renders a button with an accessible label — always keep it visible in the layout header
								</z.box>
								<z.box as='li'>Keyboard shortcut ⌘B (Mac) / Ctrl+B (Windows) toggles the sidebar automatically</z.box>
								<z.box as='li'>On mobile the sidebar renders as a Drawer — no additional configuration needed</z.box>
								<z.box as='li'>
									Use SidebarMenuButton with asChild and an anchor tag to get correct link semantics and aria-current
								</z.box>
								<z.box as='li'>
									Set the isActive prop on the active SidebarMenuButton to convey current location to assistive technology
								</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
