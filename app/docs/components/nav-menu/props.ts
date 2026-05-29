import { PropDefinition } from '@/components/docs/props-table'

export const navigationMenuProps: PropDefinition[] = [
	{
		name: 'viewport',
		type: 'boolean',
		defaultValue: 'true',
		description: 'When true, renders the NavigationMenuViewport used to animate dropdown content panels.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled open menu item value.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Callback fired when the active menu item changes.'
	},
	{
		name: 'delayDuration',
		type: 'number',
		defaultValue: '200',
		description: 'Delay in ms before the dropdown opens on hover.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes applied to the root nav element.'
	}
]

export const navigationMenuLinkProps: PropDefinition[] = [
	{
		name: 'href',
		type: 'string',
		description: 'The URL the link navigates to.'
	},
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Merge props onto the child element. Use with Next.js Link for client-side navigation.'
	},
	{
		name: 'active',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Marks the link as the currently active route. Sets aria-current="page".'
	},
	{
		name: 'onSelect',
		type: '(event: Event) => void',
		description: 'Callback fired when the link is selected.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes. Use navigationMenuTriggerStyle() for consistent trigger styling.'
	}
]
