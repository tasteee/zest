import { PropDefinition } from '@/components/docs/props-table'

export const chipProps: PropDefinition[] = [
	{
		name: 'isSelected',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, renders the chip in its selected/active state with an accent color highlight.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the chip and dims it visually.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The label or content inside the chip. Icons placed as children are auto-sized.'
	},
	{
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
		description: 'Called when the chip is clicked.'
	},
	{
		name: 'type',
		type: '"button" | "submit" | "reset"',
		defaultValue: '"button"',
		description: 'The HTML button type. Defaults to "button" to prevent accidental form submission.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the chip element.'
	}
]
