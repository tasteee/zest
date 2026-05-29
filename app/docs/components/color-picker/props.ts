import { PropDefinition } from '@/components/docs/props-table'

export const colorPickerProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The controlled hex color value (e.g. "#7c3aed"). Use with onChange for controlled usage.'
	},
	{
		name: 'defaultValue',
		type: 'string',
		defaultValue: '"#000000"',
		description: 'The initial color value for uncontrolled usage.'
	},
	{
		name: 'onChange',
		type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
		description: 'Called whenever the selected color changes. Access the new value via event.target.value.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from opening the color picker.'
	},
	{
		name: 'id',
		type: 'string',
		description: 'HTML id for associating with a label element.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the color input.'
	}
]
