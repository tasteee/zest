import { PropDefinition } from '@/components/docs/props-table'

export const tooltipProps: PropDefinition[] = [
	{
		name: 'delayDuration',
		type: 'number',
		defaultValue: '700',
		description: 'Override the duration in milliseconds to wait before showing the tooltip.'
	},
	{
		name: 'open',
		type: 'boolean',
		description: 'The controlled open state of the tooltip.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Event handler called when the open state changes.'
	},
	{
		name: 'disableHoverableContent',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, hovering over the content will not keep the tooltip open.'
	}
]

export const tooltipContentProps: PropDefinition[] = [
	{
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
		defaultValue: '"top"',
		description: 'The preferred side of the trigger to render against.'
	},
	{
		name: 'sideOffset',
		type: 'number',
		defaultValue: '4',
		description: 'The distance in pixels from the trigger.'
	},
	{
		name: 'align',
		type: '"start" | "center" | "end"',
		defaultValue: '"center"',
		description: 'The preferred alignment against the trigger.'
	},
	{
		name: 'alignOffset',
		type: 'number',
		defaultValue: '0',
		description: 'An offset in pixels from the "start" or "end" alignment options.'
	}
]
