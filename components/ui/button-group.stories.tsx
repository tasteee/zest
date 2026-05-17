import type { Meta, StoryObj } from '@storybook/nextjs'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group'
import { z } from '@/components/ui'

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
				<z.button>Bold</z.button>
				<ButtonGroupSeparator />
				<z.button>Italic</z.button>
				<ButtonGroupSeparator />
				<z.button>Underline</z.button>
			</ButtonGroup>
		)
	}
}

export const Vertical: StoryT = {
	render: () => {
		return (
			<ButtonGroup orientation='vertical'>
				<z.button>Top</z.button>
				<z.button>Middle</z.button>
				<z.button>Bottom</z.button>
			</ButtonGroup>
		)
	}
}

export const WithText: StoryT = {
	render: () => {
		return (
			<ButtonGroup>
				<z.button>Copy</z.button>
				<ButtonGroupText>or</ButtonGroupText>
				<z.button>Paste</z.button>
			</ButtonGroup>
		)
	}
}

