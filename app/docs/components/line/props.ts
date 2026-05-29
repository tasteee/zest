import { PropDefinition } from '@/components/docs/props-table'

export const lineProps: PropDefinition[] = [
	{
		name: 'isVertical',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, renders the line vertically.'
	},
	{
		name: 'isHorizontal',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Renders the line horizontally. This is the default.'
	},
	{
		name: 'decorative',
		type: 'boolean',
		defaultValue: 'true',
		description: 'When true, the line is purely visual and has no semantic meaning.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]
