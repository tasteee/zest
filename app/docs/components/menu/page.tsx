'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarSeparator,
	MenubarLabel,
	MenubarItem,
	MenubarShortcut,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent
} from '@/components/ui/menubar'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { menubarItemProps, menubarCheckboxItemProps, menubarRadioGroupProps } from './props'
import { examples } from './examples'

export default function MenuDocsPage() {
	const [showStatusBar, setShowStatusBar] = useState(true)
	const [showActivityBar, setShowActivityBar] = useState(false)
	const [zoomLevel, setZoomLevel] = useState('100')

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
				<z.text className='text-foreground'>Menu</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Menubar</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					An application-style horizontal menu bar with full keyboard navigation. Supports grouped items, checkboxes, radio
					groups, keyboard shortcuts, and nested submenus.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								New File <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Open <MenubarShortcut>⌘O</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								Quit <MenubarShortcut>⌘Q</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
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

				{/* Full Menubar */}
				<ComponentPreview
					title='Full Menubar'
					description='A complete menubar with checkboxes, radio groups, and shortcuts across multiple menus.'
					code={examples.full}
				>
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>File</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									New File <MenubarShortcut>⌘N</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Open <MenubarShortcut>⌘O</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									Save <MenubarShortcut>⌘S</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Save As <MenubarShortcut>⇧⌘S</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									Quit <MenubarShortcut>⌘Q</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>

						<MenubarMenu>
							<MenubarTrigger>View</MenubarTrigger>
							<MenubarContent>
								<MenubarCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
									Status Bar
								</MenubarCheckboxItem>
								<MenubarCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
									Activity Bar
								</MenubarCheckboxItem>
								<MenubarSeparator />
								<MenubarLabel>Zoom</MenubarLabel>
								<MenubarRadioGroup value={zoomLevel} onValueChange={setZoomLevel}>
									<MenubarRadioItem value='75'>75%</MenubarRadioItem>
									<MenubarRadioItem value='100'>100%</MenubarRadioItem>
									<MenubarRadioItem value='150'>150%</MenubarRadioItem>
								</MenubarRadioGroup>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</ComponentPreview>

				{/* With Submenu */}
				<ComponentPreview
					title='With Submenu'
					description='Nest a MenubarSub inside MenubarContent to create flyout sub-menus.'
					code={examples.withSubmenu}
				>
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>Edit</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									Undo <MenubarShortcut>⌘Z</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarSub>
									<MenubarSubTrigger>Find</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem>
											Find <MenubarShortcut>⌘F</MenubarShortcut>
										</MenubarItem>
										<MenubarItem>
											Find Next <MenubarShortcut>⌘G</MenubarShortcut>
										</MenubarItem>
										<MenubarItem>
											Find Previous <MenubarShortcut>⇧⌘G</MenubarShortcut>
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='MenubarItem' props={menubarItemProps} />
				<PropsTable title='MenubarCheckboxItem' props={menubarCheckboxItemProps} />
				<PropsTable title='MenubarRadioGroup' props={menubarRadioGroupProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>← →</z.text>
									<z.text className='text-muted-foreground'>Move between top-level menu triggers</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ ↓</z.text>
									<z.text className='text-muted-foreground'>Move between items in an open menu</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</z.text>
									<z.text className='text-muted-foreground'>Select the focused item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the open menu</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Menubar uses role="menubar" — each MenubarMenu uses role="menu"</z.box>
								<z.box as='li'>Use MenubarShortcut to document but not enforce keyboard shortcuts</z.box>
								<z.box as='li'>Keep menu depth to two levels (submenu) to avoid navigation confusion</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
