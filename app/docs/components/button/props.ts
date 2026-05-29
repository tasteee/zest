import { PropDefinition } from '@/components/docs/props-table'

export const buttonProps: PropDefinition[] = [
	{
		name: 'kind',
		type: '"outlined" | "solid" | "ghost"',
		defaultValue: '"outlined"',
		description: 'The visual style kind of the button.'
	},
	{
		name: 'size',
		type: '"xs" | "sm" | "md" | "lg" | "xl"',
		defaultValue: '"md"',
		description: 'The size of the button.'
	},
	{
		name: 'color',
		type: '"purple" | "pink" | "neutral"',
		defaultValue: '"neutral"',
		description: 'The color theme of the button.'
	},
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the button.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the button.'
	}
]
