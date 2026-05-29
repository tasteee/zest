import { PropDefinition } from '@/components/docs/props-table'

export const badgeProps: PropDefinition[] = [
	{
		name: 'isOutline | isGhost | isSolid',
		type: 'boolean',
		defaultValue: 'isOutline',
		description: 'Controls the visual treatment of the badge container.'
	},
	{
		name: 'isNeutral | isPurple | isPink',
		type: 'boolean',
		defaultValue: 'isNeutral',
		description: 'Controls the color palette used by the badge.'
	},
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Renders the badge as a child component (e.g. anchor) using Radix Slot.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the badge.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		required: true,
		description: 'The content to display inside the badge.'
	}
]
