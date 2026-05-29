import { PropDefinition } from '@/components/docs/props-table'

export const spinnerProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes. Use size-* utilities to control dimensions. Default size is size-4.'
	},
	{
		name: 'aria-label',
		type: 'string',
		defaultValue: '"Loading"',
		description:
			'Accessible label announced to screen readers. Override when the context requires a more specific description.'
	}
]
