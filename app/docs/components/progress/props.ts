import { PropDefinition } from '@/components/docs/props-table'

export const progressProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'number',
		defaultValue: '0',
		description: 'The progress value between 0 and 100.'
	},
	{
		name: 'variant',
		type: '"default" | "purple" | "pink"',
		defaultValue: '"default"',
		description: 'The color variant of the progress bar.'
	},
	{
		name: 'max',
		type: 'number',
		defaultValue: '100',
		description: 'The maximum value of the progress bar.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]
