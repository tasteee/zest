import { PropDefinition } from '@/components/docs/props-table'

export const checkboxProps: PropDefinition[] = [
	{
		name: 'isChecked',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Controls whether the checkbox is checked.'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the checkbox.'
	},
	{
		name: 'isNeutral | isPurple | isPink',
		type: 'boolean',
		defaultValue: 'isNeutral',
		description: 'Controls the checkbox color.'
	},
	{
		name: 'label',
		type: 'string',
		description: 'Label rendered next to the checkbox.'
	},
	{
		name: 'description',
		type: 'string',
		description: 'Optional descriptive text rendered beneath the label.'
	},
	{
		name: 'onChange',
		type: '(isNowChecked: boolean, event) => void',
		description: 'Event handler called when the checked state changes.'
	},
	{
		name: 'required',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, the checkbox is required for form submission.'
	},
	{
		name: 'name',
		type: 'string',
		description: 'The name of the checkbox for form submission.'
	},
	{
		name: 'value',
		type: 'string',
		defaultValue: '"on"',
		description: 'The value submitted with the form when checked.'
	}
]
