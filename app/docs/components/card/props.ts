import { PropDefinition } from '@/components/docs/props-table'

export const cardProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the card container.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		required: true,
		description: 'The content to render inside the card.'
	}
]

export const cardHeaderProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the header.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		required: true,
		description: 'Typically includes ZCard.Title and ZCard.Description.'
	}
]

export const cardTitleProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the title.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		required: true,
		description: 'The title text content.'
	}
]
