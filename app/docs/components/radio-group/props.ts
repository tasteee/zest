import { PropDefinition } from '@/components/docs/props-table'

export const radioGroupProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The controlled value of the selected radio item.'
	},
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The initially selected value for uncontrolled usage.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Called when the selected item changes.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, disables all items in the group.'
	},
	{
		name: 'required',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, marks the group as required in a form context.'
	},
	{
		name: 'name',
		type: 'string',
		description: 'The name submitted with the group in a form.'
	},
	{
		name: 'orientation',
		type: '"horizontal" | "vertical"',
		defaultValue: '"vertical"',
		description: 'The reading direction of the radio group, used for keyboard navigation.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the group wrapper.'
	}
]

export const radioGroupItemProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		description: 'The value this item represents. Must be unique within the group.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from selecting this option.'
	},
	{
		name: 'id',
		type: 'string',
		description: 'HTML id for associating with a label element via htmlFor.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the item.'
	}
]
