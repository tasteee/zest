import { PropDefinition } from '@/components/docs/props-table'

export const dropdownMenuProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'The controlled open state of the dropdown menu.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Event handler called when the open state changes.'
	},
	{
		name: 'defaultOpen',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The open state of the dropdown menu when initially rendered.'
	},
	{
		name: 'modal',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Whether the menu should be modal (blocking interaction with outside elements).'
	}
]

export const dropdownMenuItemProps: PropDefinition[] = [
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the item.'
	},
	{
		name: 'onSelect',
		type: '(event: Event) => void',
		description: 'Event handler called when the user selects an item.'
	},
	{
		name: 'textValue',
		type: 'string',
		description: 'Optional text used for typeahead purposes.'
	}
]
