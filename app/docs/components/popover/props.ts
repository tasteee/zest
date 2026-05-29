import { PropDefinition } from '@/components/docs/props-table'

export const popoverProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'Controlled open state.'
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
		name: 'modal',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, interaction outside the popover is blocked.'
	}
]

export const popoverContentProps: PropDefinition[] = [
	{
		name: 'align',
		type: '"start" | "center" | "end"',
		defaultValue: '"center"',
		description: 'Alignment of the content relative to the trigger.'
	},
	{
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
		defaultValue: '"bottom"',
		description: 'Which side of the trigger to render the content on.'
	},
	{
		name: 'sideOffset',
		type: 'number',
		defaultValue: '4',
		description: 'Distance in pixels from the trigger.'
	},
	{
		name: 'collisionPadding',
		type: 'number | Partial<Record<Side, number>>',
		defaultValue: '0',
		description: 'Padding to maintain from the viewport edges during collision avoidance.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes. Default width is w-72.'
	}
]
