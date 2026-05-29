import { PropDefinition } from '@/components/docs/props-table'

export const comboboxProps: PropDefinition[] = [
	{
		name: 'options',
		type: 'string[]',
		description: 'The list of suggestion strings shown in the browser-native datalist dropdown.'
	},
	{
		name: 'listId',
		type: 'string',
		defaultValue: '"z-combobox-options"',
		description: 'The id linking the input to its datalist. Override when rendering multiple comboboxes on one page.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled input value. Use with onChange for controlled usage.'
	},
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The initial value for uncontrolled usage.'
	},
	{
		name: 'onChange',
		type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
		description: 'Called on every keystroke. Access the current value via event.target.value.'
	},
	{
		name: 'placeholder',
		type: 'string',
		description: 'Placeholder text shown when the input is empty.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from typing or selecting options.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the input element.'
	}
]
