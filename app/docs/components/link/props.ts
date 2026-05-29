import { PropDefinition } from '@/components/docs/props-table'

export const linkProps: PropDefinition[] = [
	{
		name: 'color',
		type: '"default" | "purple" | "pink" | "neutral" | "muted"',
		defaultValue: '"default"',
		description: 'Controls the color of the link text.'
	},
	{
		name: 'as',
		type: 'React.ElementType',
		defaultValue: '"a"',
		description: 'Renders the link as a different element or component, e.g. a router link.'
	},
	{
		name: 'href',
		type: 'string',
		description: 'The URL the link points to. Standard anchor href.'
	},
	{
		name: 'to',
		type: 'string',
		description: 'Alternative to href. Promoted to href for anchor elements and passed through for custom elements.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the link.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		required: true,
		description: 'The content to render inside the link.'
	}
]
