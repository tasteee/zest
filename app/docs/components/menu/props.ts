import { PropDefinition } from '@/components/docs/props-table'

export const menubarItemProps: PropDefinition[] = [
	{
		name: 'inset',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, adds left padding to align with items that have an icon or checkbox.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Prevents the item from being selected.'
	},
	{
		name: 'onSelect',
		type: '(event: Event) => void',
		description: 'Callback fired when the item is selected.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Item label and optional MenubarShortcut.'
	}
]

export const menubarCheckboxItemProps: PropDefinition[] = [
	{
		name: 'checked',
		type: 'boolean',
		description: 'The controlled checked state of the item.'
	},
	{
		name: 'onCheckedChange',
		type: '(checked: boolean) => void',
		description: 'Callback fired when the checked state changes.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Prevents the item from being toggled.'
	}
]

export const menubarRadioGroupProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The controlled selected value of the radio group.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Callback fired when the selected value changes.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'MenubarRadioItem elements.'
	}
]
