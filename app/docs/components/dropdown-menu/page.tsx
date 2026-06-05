'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import {
	ChevronRight,
	User,
	CreditCard,
	Settings,
	Keyboard,
	Users,
	UserPlus,
	Mail,
	MessageSquare,
	PlusCircle,
	Plus,
	Github,
	LifeBuoy,
	Cloud,
	LogOut,
	MoreHorizontal,
	Pencil,
	Trash,
	Copy
} from 'lucide-react'
import { useState } from 'react'
import { dropdownMenuProps, dropdownMenuItemProps } from './props'
import { examples } from './examples'

export default function DropdownMenuDocsPage() {
	const [showStatusBar, setShowStatusBar] = useState(true)
	const [showActivityBar, setShowActivityBar] = useState(false)
	const [position, setPosition] = useState('bottom')

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
				<span className='text-foreground'>Dropdown Menu</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZDropdownMenu</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a menu to the user triggered by a button. Supports submenus, checkboxes, and radio groups. Built on Radix UI
					Dropdown Menu.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Dropdown Menu'
				description='A basic dropdown menu with various item types.'
				code={examples.quickPreview}
			>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<z.button>Open Menu</z.button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>Billing</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Settings</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock
					code={examples.usageImport}
					language='tsx'
				/>
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* With Shortcuts */}
				<ComponentPreview
					title='With Shortcuts'
					description='Menu items can display keyboard shortcuts.'
					code={examples.withShortcuts}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<z.button>Edit</z.button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56'>
							<DropdownMenuItem>
								<Copy className='mr-2 h-4 w-4' />
								<span>Copy</span>
								<DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Pencil className='mr-2 h-4 w-4' />
								<span>Edit</span>
								<DropdownMenuShortcut>Ctrl+E</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='text-destructive'>
								<Trash className='mr-2 h-4 w-4' />
								<span>Delete</span>
								<DropdownMenuShortcut>Ctrl+Del</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</ComponentPreview>

				{/* Checkbox Items */}
				<ComponentPreview
					title='Checkbox Items'
					description='Menu items that can be checked or unchecked.'
					code={examples.checkboxItems}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<z.button>View</z.button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56'>
							<DropdownMenuLabel>Appearance</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
								Status Bar
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
								Activity Bar
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</ComponentPreview>

				{/* Radio Items */}
				<ComponentPreview
					title='Radio Items'
					description='A group of items where only one can be selected.'
					code={examples.radioItems}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<z.button>Position</z.button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56'>
							<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
								<DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</ComponentPreview>

				{/* Icon Trigger */}
				<ComponentPreview
					title='Icon Trigger'
					description='A common pattern using an icon button as the trigger.'
					code={examples.iconTrigger}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<z.button isIcon>
								<MoreHorizontal className='h-4 w-4' />
								<span className='sr-only'>Open menu</span>
							</z.button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Duplicate</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='text-destructive'>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='DropdownMenu' props={dropdownMenuProps} />
				<PropsTable title='DropdownMenuItem' props={dropdownMenuItemProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space / Enter</kbd>
									<span className='text-muted-foreground'>Open menu or select focused item</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Down</kbd>
									<span className='text-muted-foreground'>Move focus to next item</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Up</kbd>
									<span className='text-muted-foreground'>Move focus to previous item</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the menu</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
