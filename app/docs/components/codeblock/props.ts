import { PropDefinition } from '@/components/docs/props-table'

export const codeBlockProps: PropDefinition[] = [
	{
		name: 'content',
		type: 'string',
		description: 'Code content to render.',
		required: true
	},
	{
		name: 'language',
		type: 'string',
		defaultValue: '"tsx"',
		description: 'Language hint used for syntax highlighting.'
	},
	{
		name: 'label',
		type: 'string',
		description: 'Optional uppercase label shown above the block.'
	},
	{
		name: 'tone',
		type: '"default" | "success" | "danger" | "muted"',
		defaultValue: '"default"',
		description: 'Label tone used for guidance states.'
	},
	{
		name: 'height',
		type: 'string | number',
		defaultValue: '220',
		description: 'Viewport height of the scroll container.'
	},
	{
		name: 'minHeight',
		type: 'string | number',
		description: 'Minimum visible height for the content viewport.'
	},
	{
		name: 'maxHeight',
		type: 'string | number',
		description: 'Maximum visible height before scrolling starts.'
	},
	{
		name: 'strikeThrough',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Applies line-through styling for anti-pattern examples.'
	}
]
