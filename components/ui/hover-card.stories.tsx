import type { Meta, StoryObj } from '@storybook/nextjs'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'
import { ZButton } from './button'

const meta: Meta<typeof HoverCard> = {
	title: 'UI/HoverCard',
	component: HoverCard,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof HoverCard>

export const Default: StoryT = {
	render: () => {
		return (
			<HoverCard>
				<HoverCardTrigger asChild>
					<ZButton variant='link'>@tasteink</ZButton>
				</HoverCardTrigger>
				<HoverCardContent>
					<div className='flex flex-col gap-1'>
						<p className='text-sm font-semibold'>Tasteink Design</p>
						<p className='text-xs text-muted-foreground'>Joined April 2024</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		)
	}
}
