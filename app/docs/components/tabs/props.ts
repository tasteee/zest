import { PropDefinition } from '@/components/docs/props-table'

export const tabsProps: PropDefinition[] = [
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The value of the tab that should be active when initially rendered.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled value of the active tab.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Event handler called when the active tab changes.'
	},
	{
		name: 'orientation',
		type: '"horizontal" | "vertical"',
		defaultValue: '"horizontal"',
		description: 'The orientation of the tabs.'
	},
	{
		name: 'activationMode',
		type: '"automatic" | "manual"',
		defaultValue: '"automatic"',
		description: 'Whether tabs are activated automatically on focus or manually on Enter/Space key.'
	}
]

export const tabsTriggerProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		required: true,
		description: 'A unique value that associates the trigger with a content panel.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the tab.'
	}
]
