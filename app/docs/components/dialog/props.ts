import { PropDefinition } from '@/components/docs/props-table'

export const dialogProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'The controlled open state of the dialog.'
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
		description: 'The open state of the dialog when initially rendered.'
	},
	{
		name: 'modal',
		type: 'boolean',
		defaultValue: 'true',
		description:
			'When true, interaction with outside elements is disabled and only dialog content is visible to screen readers.'
	}
]

export const dialogContentProps: PropDefinition[] = [
	{
		name: 'onOpenAutoFocus',
		type: '(event: Event) => void',
		description: 'Event handler called when focus moves into the dialog after opening.'
	},
	{
		name: 'onCloseAutoFocus',
		type: '(event: Event) => void',
		description: 'Event handler called when focus moves to the trigger after closing.'
	},
	{
		name: 'onEscapeKeyDown',
		type: '(event: KeyboardEvent) => void',
		description: 'Event handler called when the escape key is pressed.'
	},
	{
		name: 'onPointerDownOutside',
		type: '(event: PointerDownOutsideEvent) => void',
		description: 'Event handler called when a pointer event occurs outside the dialog.'
	},
	{
		name: 'forceMount',
		type: 'boolean',
		description: 'Used to force mounting when more control is needed.'
	}
]
