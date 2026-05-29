import { PropDefinition } from '@/components/docs/props-table'

export const toggleProps: PropDefinition[] = [
	{
		name: 'isGhost',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Ghost kind — transparent background, fills on press.'
	},
	{
		name: 'isOutlined',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Outlined kind — bordered background, tinted fill on press.'
	},
	{
		name: 'isNeutral',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Default neutral color.'
	},
	{
		name: 'isPurple',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Neon purple color variant.'
	},
	{
		name: 'isPink',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Neon pink color variant.'
	},
	{
		name: 'isSmall',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Small size (2rem height).'
	},
	{
		name: 'isMedium',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Medium size (2.25rem height).'
	},
	{
		name: 'isLarge',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Large size (2.5rem height).'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents interaction and reduces opacity.'
	},
	{
		name: 'isHidden',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, sets display: none.'
	},
	{
		name: 'isPressed',
		type: 'boolean',
		description: 'Controlled pressed state.'
	},
	{
		name: 'isDefaultPressed',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The pressed state when initially rendered (uncontrolled).'
	},
	{
		name: 'onPressedChange',
		type: '(pressed: boolean) => void',
		description: 'Event handler called when the pressed state changes.'
	}
]

export const toggleGroupProps: PropDefinition[] = [
	{
		name: 'type',
		type: '"single" | "multiple"',
		defaultValue: '"single"',
		description: 'Whether one or multiple items can be pressed at a time.'
	},
	{
		name: 'value',
		type: 'string | string[]',
		description: 'Controlled value of the pressed item(s).'
	},
	{
		name: 'defaultValue',
		type: 'string | string[]',
		description: 'Default value when uncontrolled.'
	},
	{
		name: 'onValueChange',
		type: '(value: string | string[]) => void',
		description: 'Called when the pressed value changes.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, disables all items in the group.'
	},
	{
		name: 'isGhost / isOutlined',
		type: 'boolean',
		defaultValue: 'isGhost',
		description: 'Kind variant applied to all items (overridable per item).'
	},
	{
		name: 'isNeutral / isPurple / isPink',
		type: 'boolean',
		defaultValue: 'isNeutral',
		description: 'Color variant applied to all items (overridable per item).'
	},
	{
		name: 'isSmall / isMedium / isLarge',
		type: 'boolean',
		defaultValue: 'isMedium',
		description: 'Size applied to all items (overridable per item).'
	}
]
