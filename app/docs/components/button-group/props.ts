import { PropDefinition } from '@/components/docs/props-table'

export const buttonGroupProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: '"horizontal" | "vertical"',
		defaultValue: '"horizontal"',
		description: 'The layout direction of the group. Horizontal joins buttons side by side; vertical stacks them.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The buttons, separators, and text elements that make up the group.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the group wrapper.'
	}
]

export const buttonGroupTextProps: PropDefinition[] = [
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Merge props onto the child element instead of rendering a div.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The text or content to display inside the infix element.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]

export const buttonGroupSeparatorProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: '"horizontal" | "vertical"',
		defaultValue: '"vertical"',
		description: 'The orientation of the separator line between group items.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]
