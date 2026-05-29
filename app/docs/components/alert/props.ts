import { PropDefinition } from '@/components/docs/props-table'

export const alertProps: PropDefinition[] = [
	{
		name: 'title',
		type: 'string',
		defaultValue: '',
		required: true,
		description: 'The title of the alert.'
	},
	{
		name: 'message',
		type: 'string',
		defaultValue: '',
		required: false,
		description: 'The message of the alert.'
	},
	{
		name: 'isNeutral',
		type: 'boolean',
		defaultValue: 'false',
		required: false,
		description: 'Applies the neutral theme to the alert.'
	},
	{
		name: 'isPurple',
		type: 'boolean',
		defaultValue: 'false',
		required: false,
		description: 'Applies the purple theme to the alert.'
	},
	{
		name: 'isPink',
		type: 'boolean',
		defaultValue: 'false',
		required: false,
		description: 'Applies the pink theme to the alert.'
	},
	{
		name: 'isRed',
		type: 'boolean',
		defaultValue: 'false',
		required: false,
		description: 'Applies the red theme to the alert.'
	}
]
