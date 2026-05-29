import { PropDefinition } from '@/components/docs/props-table'

export const toggleGroupProps: PropDefinition[] = [
	{
		name: 'type',
		type: '"single" | "multiple"',
		description: 'Whether only one item or multiple items can be pressed at a time.'
	},
	{
		name: 'value',
		type: 'string | string[]',
		description: 'The controlled pressed value(s). String for single, string[] for multiple.'
	},
	{
		name: 'defaultValue',
		type: 'string | string[]',
		description: 'The initially pressed value(s) for uncontrolled usage.'
	},
	{
		name: 'onValueChange',
		type: '(value: string | string[]) => void',
		description: 'Called when the pressed state changes.'
	},
	{
		name: 'isNeutral | isPurple | isPink',
		type: 'boolean',
		defaultValue: 'isNeutral',
		description: 'The color theme applied to all items in the group. Can be overridden per item.'
	},
	{
		name: 'isGhost | isOutlined',
		type: 'boolean',
		defaultValue: 'isGhost',
		description: 'The visual kind of all items in the group.'
	},
	{
		name: 'isSmall | isMedium | isLarge',
		type: 'boolean',
		defaultValue: 'isMedium',
		description: 'The size of all items in the group.'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, disables all items in the group.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the group wrapper.'
	}
]

export const toggleGroupItemProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The value that identifies this item within the group.'
	},
	{
		name: 'isNeutral | isPurple | isPink',
		type: 'boolean',
		description: 'Override the group color for this specific item.'
	},
	{
		name: 'isGhost | isOutlined',
		type: 'boolean',
		description: 'Override the group kind for this specific item.'
	},
	{
		name: 'isSmall | isMedium | isLarge',
		type: 'boolean',
		description: 'Override the group size for this specific item.'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from pressing this item.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The label or icon rendered inside the item.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to this item.'
	}
]
