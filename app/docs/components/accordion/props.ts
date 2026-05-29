import { PropDefinition } from '@/components/docs/props-table'

export const accordionProps: PropDefinition[] = [
	{
		name: 'type',
		type: '"single" | "multiple"',
		required: true,
		description: 'Determines whether one or multiple items can be opened at the same time.'
	},
	{
		name: 'collapsible',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When type is "single", allows closing content by clicking the open item.'
	},
	{
		name: 'defaultValue',
		type: 'string | string[]',
		description: 'The value(s) of the item(s) to expand when initially rendered.'
	},
	{
		name: 'value',
		type: 'string | string[]',
		description: 'The controlled value of the item(s) to expand.'
	},
	{
		name: 'onValueChange',
		type: '(value: string | string[]) => void',
		description: 'Event handler called when the expanded state changes.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the accordion.'
	}
]

export const accordionItemProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		required: true,
		description: 'A unique value for the item.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the item.'
	}
]
