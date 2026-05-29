import { PropDefinition } from '@/components/docs/props-table'

export const emptyProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'EmptyMedia, EmptyHeader, and EmptyContent slots.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes. The root is a flex column with centred items and dashed border.'
	}
]

export const emptyMediaProps: PropDefinition[] = [
	{
		name: 'variant',
		type: '"default" | "icon"',
		defaultValue: '"default"',
		description: 'When "icon", wraps the child in a small boxed container with a rounded background. When "default", renders transparently.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Icon or image element. SVG icons are automatically sized.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes.'
	}
]

export const emptyHeaderProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Typically EmptyTitle and EmptyDescription.'
	}
]

export const emptyContentProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Call-to-action elements such as buttons and links.'
	}
]
