import { PropDefinition } from '@/components/docs/props-table'

export const inputProps: PropDefinition[] = [
	{
		name: 'type',
		type: '"text" | "password" | "email" | "number" | "search" | "tel" | "url" | ...',
		defaultValue: '"text"',
		description: 'The type of input. Supports all standard HTML input types.'
	},
	{
		name: 'placeholder',
		type: 'string',
		description: 'Placeholder text displayed when the input is empty.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the input.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled value of the input.'
	},
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The default value for an uncontrolled input.'
	},
	{
		name: 'onChange',
		type: '(event: ChangeEvent<HTMLInputElement>) => void',
		description: 'Callback fired when the input value changes.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the input.'
	}
]
