import { PropDefinition } from '@/components/docs/props-table'

export const collapsibleProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'Controlled open state. Pair with onOpenChange.'
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
		description: 'Uncontrolled initial open state.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the collapsible from being toggled.'
	}
]

export const collapsibleTriggerProps: PropDefinition[] = [
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Merges the trigger behavior onto the child element instead of rendering a button.'
	}
]

export const collapsibleContentProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Additional class names applied to the content container.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Content revealed when the collapsible is open.'
	}
]
