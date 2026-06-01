import { PropDefinition } from '@/components/docs/props-table'

export const toastFnProps: PropDefinition[] = [
	{
		name: 'title',
		type: 'React.ReactNode',
		description: 'The primary message shown in the toast.'
	},
	{
		name: 'description',
		type: 'React.ReactNode',
		description: 'Supporting detail shown below the title.'
	},
	{
		name: 'variant',
		type: '"default" | "destructive"',
		defaultValue: '"default"',
		description: 'Legacy visual style option. "destructive" maps to isRed.'
	},
	{
		name: 'isNeutral',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Applies the neutral toast style.'
	},
	{
		name: 'isPurple',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Applies the purple toast style.'
	},
	{
		name: 'isPink',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Applies the pink toast style.'
	},
	{
		name: 'isRed',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Applies the red danger style to the toast.'
	},
	{
		name: 'action',
		type: 'ToastActionElementT',
		description: 'A ToastAction element rendered on the right side of the toast.'
	},
	{
		name: 'duration',
		type: 'number',
		description: 'How long the toast stays visible in ms. Omit to use the default.'
	}
]

export const toastActionProps: PropDefinition[] = [
	{
		name: 'altText',
		type: 'string',
		description: 'Required accessible description of the action for screen readers.'
	},
	{
		name: 'onClick',
		type: '() => void',
		description: 'Callback fired when the action button is pressed.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The visible label of the action button.'
	}
]
