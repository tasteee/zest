'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ZButton } from '@/components/ui/button'
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
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
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

const dropdownMenuProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'The controlled open state of the dropdown menu.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Event handler called when the open state changes.'
	},
	{
		name: 'defaultOpen',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The open state of the dropdown menu when initially rendered.'
	},
	{
		name: 'modal',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Whether the menu should be modal (blocking interaction with outside elements).'
	}
]

const dropdownMenuItemProps: PropDefinition[] = [
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the item.'
	},
	{
		name: 'onSelect',
		type: '(event: Event) => void',
		description: 'Event handler called when the user selects an item.'
	},
	{
		name: 'textValue',
		type: 'string',
		description: 'Optional text used for typeahead purposes.'
	}
]

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
					<Badge variant='secondary'>Component</Badge>
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
				code={`import {
  ZDropdownMenu,
  ZDropdownMenuContent,
  ZDropdownMenuItem,
  ZDropdownMenuLabel,
  ZDropdownMenuSeparator,
  ZDropdownMenuTrigger,
  ZButton,
} from '@tasteee/zest'
import { User, CreditCard, Settings, LogOut } from 'lucide-react'

export function DropdownMenuDemo() {
  return (
    <ZDropdownMenu>
      <ZDropdownMenuTrigger asChild>
        <ZButton variant="outline">Open Menu</ZButton>
      </ZDropdownMenuTrigger>
      <ZDropdownMenuContent className="w-56">
        <ZDropdownMenuLabel>My Account</ZDropdownMenuLabel>
        <ZDropdownMenuSeparator />
        <ZDropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </ZDropdownMenuItem>
        <ZDropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </ZDropdownMenuItem>
        <ZDropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </ZDropdownMenuItem>
        <ZDropdownMenuSeparator />
        <ZDropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </ZDropdownMenuItem>
      </ZDropdownMenuContent>
    </ZDropdownMenu>
  )
}`}
			>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<ZButton variant='outline'>Open Menu</ZButton>
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
					code={`import {
  ZDropdownMenu,
  ZDropdownMenuContent,
  ZDropdownMenuItem,
  ZDropdownMenuLabel,
  ZDropdownMenuSeparator,
  ZDropdownMenuTrigger,
} from '@tasteee/zest'`}
					language='tsx'
				/>
				<CodeBlock
					code={`<ZDropdownMenu>
  <ZDropdownMenuTrigger>Open</ZDropdownMenuTrigger>
  <ZDropdownMenuContent>
    <ZDropdownMenuLabel>My Account</ZDropdownMenuLabel>
    <ZDropdownMenuSeparator />
    <ZDropdownMenuItem>Profile</ZDropdownMenuItem>
    <ZDropdownMenuItem>Billing</ZDropdownMenuItem>
    <ZDropdownMenuItem>Settings</ZDropdownMenuItem>
  </ZDropdownMenuContent>
</ZDropdownMenu>`}
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
					code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Edit</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>
      <Copy className="mr-2 h-4 w-4" />
      <span>Copy</span>
      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Pencil className="mr-2 h-4 w-4" />
      <span>Edit</span>
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <Trash className="mr-2 h-4 w-4" />
      <span>Delete</span>
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ZButton variant='outline'>Edit</ZButton>
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
					code={`const [showStatusBar, setShowStatusBar] = useState(true)
const [showActivityBar, setShowActivityBar] = useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showStatusBar}
      onCheckedChange={setShowStatusBar}
    >
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showActivityBar}
      onCheckedChange={setShowActivityBar}
    >
      Activity Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ZButton variant='outline'>View</ZButton>
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
					code={`const [position, setPosition] = useState("bottom")

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Position</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ZButton variant='outline'>Position</ZButton>
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
					code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Open menu</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ZButton variant='ghost' size='icon'>
								<MoreHorizontal className='h-4 w-4' />
								<span className='sr-only'>Open menu</span>
							</ZButton>
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
