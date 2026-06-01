'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
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
				<z.text className='text-foreground'>Dropdown Menu</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZDropdownMenu</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Displays a menu to the user triggered by a button. Supports submenus, checkboxes, and radio groups. Built on Radix UI
					Dropdown Menu.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Dropdown Menu'
				description='A basic dropdown menu with various item types.'
				code={examples.quickPreview}
			>
				<z.menu>
					<z.menu.Trigger asChild>
						<z.button>Open Menu</z.button>
					</z.menu.Trigger>
					<z.menu.Content className='w-56'>
						<z.menu.Label>My Account</z.menu.Label>
						<z.menu.Separator />
						<z.menu.Item>
							<User className='mr-2 h-4 w-4' />
							<z.text>Profile</z.text>
						</z.menu.Item>
						<z.menu.Item>
							<CreditCard className='mr-2 h-4 w-4' />
							<z.text>Billing</z.text>
						</z.menu.Item>
						<z.menu.Item>
							<Settings className='mr-2 h-4 w-4' />
							<z.text>Settings</z.text>
						</z.menu.Item>
						<z.menu.Separator />
						<z.menu.Item>
							<LogOut className='mr-2 h-4 w-4' />
							<z.text>Log out</z.text>
						</z.menu.Item>
					</z.menu.Content>
				</z.menu>
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

				{/* With Shortcuts */}
				<ComponentPreview
					title='With Shortcuts'
					description='Menu items can display keyboard shortcuts.'
					code={examples.withShortcuts}
				>
					<z.menu>
						<z.menu.Trigger asChild>
							<z.button>Edit</z.button>
						</z.menu.Trigger>
						<z.menu.Content className='w-56'>
							<z.menu.Item>
								<Copy className='mr-2 h-4 w-4' />
								<z.text>Copy</z.text>
								<z.menu.Shortcut>Ctrl+C</z.menu.Shortcut>
							</z.menu.Item>
							<z.menu.Item>
								<Pencil className='mr-2 h-4 w-4' />
								<z.text>Edit</z.text>
								<z.menu.Shortcut>Ctrl+E</z.menu.Shortcut>
							</z.menu.Item>
							<z.menu.Separator />
							<z.menu.Item className='text-destructive'>
								<Trash className='mr-2 h-4 w-4' />
								<z.text>Delete</z.text>
								<z.menu.Shortcut>Ctrl+Del</z.menu.Shortcut>
							</z.menu.Item>
						</z.menu.Content>
					</z.menu>
				</ComponentPreview>

				{/* Checkbox Items */}
				<ComponentPreview
					title='Checkbox Items'
					description='Menu items that can be checked or unchecked.'
					code={examples.checkboxItems}
				>
					<z.menu>
						<z.menu.Trigger asChild>
							<z.button>View</z.button>
						</z.menu.Trigger>
						<z.menu.Content className='w-56'>
							<z.menu.Label>Appearance</z.menu.Label>
							<z.menu.Separator />
							<z.menu.CheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
								Status Bar
							</z.menu.CheckboxItem>
							<z.menu.CheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
								Activity Bar
							</z.menu.CheckboxItem>
						</z.menu.Content>
					</z.menu>
				</ComponentPreview>

				{/* Radio Items */}
				<ComponentPreview
					title='Radio Items'
					description='A group of items where only one can be selected.'
					code={examples.radioItems}
				>
					<z.menu>
						<z.menu.Trigger asChild>
							<z.button>Position</z.button>
						</z.menu.Trigger>
						<z.menu.Content className='w-56'>
							<z.menu.Label>Panel Position</z.menu.Label>
							<z.menu.Separator />
							<z.menu.RadioGroup value={position} onValueChange={setPosition}>
								<z.menu.RadioItem value='top'>Top</z.menu.RadioItem>
								<z.menu.RadioItem value='bottom'>Bottom</z.menu.RadioItem>
								<z.menu.RadioItem value='right'>Right</z.menu.RadioItem>
							</z.menu.RadioGroup>
						</z.menu.Content>
					</z.menu>
				</ComponentPreview>

				{/* Icon Trigger */}
				<ComponentPreview
					title='Icon Trigger'
					description='A common pattern using an icon button as the trigger.'
					code={examples.iconTrigger}
				>
					<z.menu>
						<z.menu.Trigger asChild>
							<z.button isIcon>
								<MoreHorizontal className='h-4 w-4' />
								<z.text className='sr-only'>Open menu</z.text>
							</z.button>
						</z.menu.Trigger>
						<z.menu.Content align='end'>
							<z.menu.Item>Edit</z.menu.Item>
							<z.menu.Item>Duplicate</z.menu.Item>
							<z.menu.Separator />
							<z.menu.Item className='text-destructive'>Delete</z.menu.Item>
						</z.menu.Content>
					</z.menu>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='DropdownMenu' props={dropdownMenuProps} />
				<PropsTable title='DropdownMenuItem' props={dropdownMenuItemProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Space / Enter
									</z.text>
									<z.text className='text-muted-foreground'>Open menu or select focused item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Arrow Down
									</z.text>
									<z.text className='text-muted-foreground'>Move focus to next item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Arrow Up
									</z.text>
									<z.text className='text-muted-foreground'>Move focus to previous item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Escape
									</z.text>
									<z.text className='text-muted-foreground'>Close the menu</z.text>
								</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
