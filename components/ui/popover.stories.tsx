import type { Meta, StoryObj } from '@storybook/nextjs'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { z } from '@/components/ui'

const meta: Meta<typeof Popover> = {
	title: 'UI/Popover',
	component: Popover,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof Popover>

export const Default: StoryT = {
	render: () => {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<z.button>Open Popover</z.button>
				</PopoverTrigger>
				<PopoverContent>
					<p className='text-sm'>Popover content goes here.</p>
				</PopoverContent>
			</Popover>
		)
	}
}

