import { PropDefinition } from '@/components/docs/props-table'

export const textareaProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The controlled text value. Use with onChange for controlled usage.'
	},
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The initial value for uncontrolled usage.'
	},
	{
		name: 'onChange',
		type: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void',
		description: 'Called on every keystroke with the current textarea event.'
	},
	{
		name: 'placeholder',
		type: 'string',
		description: 'Placeholder text shown when the textarea is empty.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from typing in the textarea.'
	},
	{
		name: 'required',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, marks the field as required for form submission.'
	},
	{
		name: 'maxLength',
		type: 'number',
		description: 'Maximum number of characters allowed.'
	},
	{
		name: 'rows',
		type: 'number',
		description: 'The initial visible number of text rows. The textarea grows automatically beyond this.'
	},
	{
		name: 'name',
		type: 'string',
		description: 'The name submitted with the textarea value in a form.'
	},
	{
		name: 'id',
		type: 'string',
		description: 'HTML id for associating with a label element via htmlFor.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the textarea element.'
	}
]
