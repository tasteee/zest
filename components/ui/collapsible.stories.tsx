import type { Meta, StoryObj } from '@storybook/nextjs'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'
import { ZButton } from './button'

const meta: Meta<typeof Collapsible> = {
	title: 'UI/Collapsible',
	component: Collapsible,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof Collapsible>

export const Default: StoryT = {
	render: () => {
		return (
			<Collapsible className='w-72'>
				<CollapsibleTrigger asChild>
					<ZButton variant='outline' className='w-full justify-between'>
						Toggle section
					</ZButton>
				</CollapsibleTrigger>
				<CollapsibleContent className='pt-2'>
					<p className='text-sm text-muted-foreground'>This content is collapsed by default.</p>
				</CollapsibleContent>
			</Collapsible>
		)
	}
}
