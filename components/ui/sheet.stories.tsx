import type { Meta, StoryObj } from '@storybook/nextjs'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'
import { ZButton } from './button'

const meta: Meta<typeof Sheet> = {
	title: 'UI/Sheet',
	component: Sheet,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof Sheet>

export const Right: StoryT = {
	render: () => {
		return (
			<Sheet>
				<SheetTrigger asChild>
					<ZButton variant='outline'>Open Sheet</ZButton>
				</SheetTrigger>
				<SheetContent side='right'>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>Make changes to your profile here.</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		)
	}
}

export const Left: StoryT = {
	render: () => {
		return (
			<Sheet>
				<SheetTrigger asChild>
					<ZButton variant='outline'>Open Left</ZButton>
				</SheetTrigger>
				<SheetContent side='left'>
					<SheetHeader>
						<SheetTitle>Navigation</SheetTitle>
						<SheetDescription>App navigation menu.</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		)
	}
}
