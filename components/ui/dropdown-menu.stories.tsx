import type { Meta, StoryObj } from '@storybook/nextjs'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from './dropdown-menu'
import { ZButton } from './button'

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

export const Default: StoryT = {
	render: () => {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<ZButton variant='outline'>Open Menu</ZButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-48'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							Profile
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant='destructive'>
						Log out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
}
