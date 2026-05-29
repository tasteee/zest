import { PropDefinition } from '@/components/docs/props-table'

export const commandProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The controlled selected value of the command palette.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Callback fired when the selected value changes.'
	},
	{
		name: 'filter',
		type: '(value: string, search: string) => number',
		description: 'Custom search filter. Receives the item value and current search string, returns 0 or 1.'
	},
	{
		name: 'shouldFilter',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Whether to auto-filter items based on the search input.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes.'
	}
]

export const commandDialogProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'Controlled open state of the dialog.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Callback fired when the open state changes.'
	},
	{
		name: 'title',
		type: 'string',
		description: 'Accessible title for the dialog, surfaced to screen readers.'
	},
	{
		name: 'description',
		type: 'string',
		description: 'Accessible description for the dialog, surfaced to screen readers.'
	},
	{
		name: 'showCloseButton',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, renders an explicit close button inside the dialog.'
	}
]

export const commandGroupProps: PropDefinition[] = [
	{
		name: 'heading',
		type: 'string | React.ReactNode',
		description: 'Label rendered above the group.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'CommandItem elements to render inside the group.'
	}
]
