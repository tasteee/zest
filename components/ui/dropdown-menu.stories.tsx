import type { Meta, StoryObj } from '@storybook/nextjs'
import * as React from 'react'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from './dropdown-menu'
import { z } from '@/components/ui'

const meta: Meta<typeof DropdownMenu> = {
	title: 'UI/DropdownMenu',
	component: DropdownMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof DropdownMenu>

function DropdownMenuExamples() {
	const [showStatusBar, setShowStatusBar] = React.useState(true)
	const [showActivityBar, setShowActivityBar] = React.useState(false)
	const [panelPosition, setPanelPosition] = React.useState('right')

	return (
		<div className='grid w-[560px] grid-cols-2 gap-6'>
			<div className='flex flex-col gap-3'>
				<span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Account menu</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<z.button isOutlined isWhite>
							Open Menu
						</z.button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								Profile
								<DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Settings
								<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem disabled>Billing</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant='destructive'>
							Log out
							<DropdownMenuShortcut>Ctrl+Q</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex flex-col gap-3'>
				<span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>View options</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<z.button isOutlined isGreen>
							Toggle Panels
						</z.button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>Workspace</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
							Status Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
							Activity Bar
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex flex-col gap-3'>
				<span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Radio group</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<z.button isOutlined isPurple>
							Panel Position
						</z.button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={panelPosition} onValueChange={setPanelPosition}>
							<DropdownMenuRadioItem value='left'>Left</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex flex-col gap-3'>
				<span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Nested actions</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<z.button isOutlined isPink>
							Create
						</z.button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuItem>New Project</DropdownMenuItem>
						<DropdownMenuItem>New Team</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Import</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className='w-44'>
								<DropdownMenuItem>CSV File</DropdownMenuItem>
								<DropdownMenuItem>JSON File</DropdownMenuItem>
								<DropdownMenuItem>From URL</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Use Template</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='col-span-2 flex flex-col gap-3'>
				<span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Row action menu</span>
				<div className='flex items-center justify-between rounded-md border border-border px-4 py-3'>
					<div>
						<div className='text-sm font-medium text-foreground'>Brand refresh brief</div>
						<div className='text-xs text-muted-foreground'>Updated 12 minutes ago</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<z.button isGhost isWhite isSmall>
								Actions
							</z.button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-44'>
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Duplicate</DropdownMenuItem>
							<DropdownMenuItem>Archive</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}

export const Default: StoryT = {
	render: () => <DropdownMenuExamples />
}

