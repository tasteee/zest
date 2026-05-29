import { PropDefinition } from '@/components/docs/props-table'

export const selectProps: PropDefinition[] = [
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The value of the select when initially rendered.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled value of the select.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Event handler called when the value changes.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the select.'
	},
	{
		name: 'required',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, the select is required for form submission.'
	},
	{
		name: 'name',
		type: 'string',
		description: 'The name of the select for form submission.'
	}
]

export const selectItemProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		required: true,
		description: 'The value of the item.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from selecting the item.'
	},
	{
		name: 'textValue',
		type: 'string',
		description: 'Optional text used for typeahead purposes.'
	}
]
