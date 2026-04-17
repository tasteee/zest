import type { Meta, StoryObj } from '@storybook/nextjs'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group'
import { ZButton } from './button'

const meta: Meta<typeof ButtonGroup> = {
	title: 'UI/ButtonGroup',
	component: ButtonGroup,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		}
	}
}

export default meta

type StoryT = StoryObj<typeof ButtonGroup>

export const Horizontal: StoryT = {
	render: () => {
		return (
			<ButtonGroup>
				<ZButton variant='outline'>Bold</ZButton>
				<ButtonGroupSeparator />
				<ZButton variant='outline'>Italic</ZButton>
				<ButtonGroupSeparator />
				<ZButton variant='outline'>Underline</ZButton>
			</ButtonGroup>
		)
	}
}

export const Vertical: StoryT = {
	render: () => {
		return (
			<ButtonGroup orientation='vertical'>
				<ZButton variant='outline'>Top</ZButton>
				<ZButton variant='outline'>Middle</ZButton>
				<ZButton variant='outline'>Bottom</ZButton>
			</ButtonGroup>
		)
	}
}

export const WithText: StoryT = {
	render: () => {
		return (
			<ButtonGroup>
				<ZButton variant='outline'>Copy</ZButton>
				<ButtonGroupText>or</ButtonGroupText>
				<ZButton variant='outline'>Paste</ZButton>
			</ButtonGroup>
		)
	}
}
