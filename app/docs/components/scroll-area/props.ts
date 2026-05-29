import { PropDefinition } from '@/components/docs/props-table'

export const scrollAreaProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Controls the outer dimensions. Must include a fixed height (e.g. h-64) for vertical scroll to work.'
	},
	{
		name: 'type',
		type: '"auto" | "always" | "scroll" | "hover"',
		defaultValue: '"hover"',
		description: 'Controls when the scrollbar is visible.'
	},
	{
		name: 'scrollHideDelay',
		type: 'number',
		defaultValue: '600',
		description: 'Delay in ms before the scrollbar hides after scrolling stops.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The scrollable content.'
	}
]

export const scrollBarProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: '"vertical" | "horizontal"',
		defaultValue: '"vertical"',
		description: 'Axis this scrollbar controls. Add a horizontal ScrollBar when content overflows horizontally.'
	}
]
