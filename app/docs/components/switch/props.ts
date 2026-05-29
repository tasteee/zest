import { PropDefinition } from '@/components/docs/props-table'

export const switchProps: PropDefinition[] = [
	{
		name: 'checked',
		type: 'boolean',
		description: 'The controlled checked state of the switch.'
	},
	{
		name: 'defaultChecked',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The checked state of the switch when initially rendered.'
	},
	{
		name: 'onCheckedChange',
		type: '(checked: boolean) => void',
		description: 'Event handler called when the switch is toggled.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the switch.'
	},
	{
		name: 'required',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, the switch must be checked for form submission.'
	},
	{
		name: 'name',
		type: 'string',
		description: 'The name of the switch, submitted with the form.'
	},
	{
		name: 'value',
		type: 'string',
		defaultValue: '"on"',
		description: 'The value submitted when the switch is checked.'
	}
]
