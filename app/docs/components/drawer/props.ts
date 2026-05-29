import { PropDefinition } from '@/components/docs/props-table'

export const drawerProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'Controlled open state of the drawer.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Callback fired when the open state changes.'
	},
	{
		name: 'defaultOpen',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The uncontrolled open state on initial render.'
	},
	{
		name: 'direction',
		type: '"top" | "bottom" | "left" | "right"',
		defaultValue: '"bottom"',
		description: 'The edge from which the drawer slides in.'
	},
	{
		name: 'modal',
		type: 'boolean',
		defaultValue: 'true',
		description: 'When true, interaction with content outside the drawer is blocked.'
	},
	{
		name: 'dismissible',
		type: 'boolean',
		defaultValue: 'true',
		description: 'When true, the drawer can be closed by clicking the overlay or dragging it away.'
	}
]

export const drawerContentProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Typically DrawerHeader, content area, and DrawerFooter.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes. The direction data attribute controls layout automatically.'
	}
]
