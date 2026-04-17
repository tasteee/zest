import type { Meta, StoryObj } from '@storybook/nextjs'
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from './item'
import { ZButton } from './button'
import { User } from 'lucide-react'

const meta: Meta<typeof Item> = {
	title: 'UI/Item',
	component: Item,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'outline', 'muted']
		},
		size: {
			control: 'select',
			options: ['default', 'sm']
		}
	}
}

export default meta

type StoryT = StoryObj<typeof Item>

export const Default: StoryT = {
	render: () => {
		return (
			<Item className='w-80'>
				<ItemMedia variant='icon'>
					<User />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Shane Thomas</ItemTitle>
					<ItemDescription>shane@tasteink.com</ItemDescription>
				</ItemContent>
				<ItemActions>
					<ZButton size='sm' variant='ghost'>
						Edit
					</ZButton>
				</ItemActions>
			</Item>
		)
	}
}

export const Outline: StoryT = {
	render: () => {
		return (
			<Item variant='outline' className='w-80'>
				<ItemMedia variant='icon'>
					<User />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Outline Item</ItemTitle>
					<ItemDescription>With a border.</ItemDescription>
				</ItemContent>
			</Item>
		)
	}
}

export const WithGroup: StoryT = {
	render: () => {
		return (
			<ItemGroup className='w-80'>
				<Item>
					<ItemMedia variant='icon'>
						<User />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Item One</ItemTitle>
						<ItemDescription>First item in the group.</ItemDescription>
					</ItemContent>
				</Item>
				<Item>
					<ItemMedia variant='icon'>
						<User />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Item Two</ItemTitle>
						<ItemDescription>Second item in the group.</ItemDescription>
					</ItemContent>
				</Item>
			</ItemGroup>
		)
	}
}
