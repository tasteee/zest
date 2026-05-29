import { PropDefinition } from '@/components/docs/props-table'

export const sliderProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'number',
		description: 'The controlled slider value. Use with onValueChange for controlled usage.'
	},
	{
		name: 'defaultValue',
		type: 'number',
		description: 'The initial value for uncontrolled usage.'
	},
	{
		name: 'onValueChange',
		type: '(value: number) => void',
		description: 'Called as the user drags the thumb.'
	},
	{
		name: 'onValueCommit',
		type: '(value: number) => void',
		description: 'Called when the user releases the thumb after dragging.'
	},
	{
		name: 'min',
		type: 'number',
		defaultValue: '0',
		description: 'The minimum value the slider can reach.'
	},
	{
		name: 'max',
		type: 'number',
		defaultValue: '100',
		description: 'The maximum value the slider can reach.'
	},
	{
		name: 'step',
		type: 'number',
		defaultValue: '1',
		description: 'The step increment between each selectable value.'
	},
	{
		name: 'label',
		type: 'React.ReactNode',
		description: 'Label rendered above the slider track.'
	},
	{
		name: 'formatValue',
		type: '(value: number) => React.ReactNode',
		description: 'Format the displayed value in the header. Shown alongside the label.'
	},
	{
		name: 'isNeutral | isPurple | isPink',
		type: 'boolean',
		defaultValue: 'isNeutral',
		description: 'The color theme of the slider track and thumb.'
	},
	{
		name: 'isSmall | isMedium | isLarge',
		type: 'boolean',
		defaultValue: 'isMedium',
		description: 'The size of the slider thumb and track.'
	},
	{
		name: 'isGhost | isOutlined',
		type: 'boolean',
		defaultValue: 'isGhost',
		description: 'The visual kind of the slider.'
	},
	{
		name: 'isDisabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the slider.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the slider field wrapper.'
	}
]

export const sliderRangeProps: PropDefinition[] = [
	{
		name: 'values',
		type: '[number, number]',
		description: 'The controlled range values. Use with onValuesChange for controlled usage.'
	},
	{
		name: 'defaultValues',
		type: '[number, number]',
		description: 'The initial range values for uncontrolled usage.'
	},
	{
		name: 'onValuesChange',
		type: '(values: [number, number]) => void',
		description: 'Called as the user drags either thumb.'
	},
	{
		name: 'onValuesCommit',
		type: '(values: [number, number]) => void',
		description: 'Called when the user releases a thumb after dragging.'
	},
	{
		name: 'formatValue',
		type: '(values: [number, number]) => React.ReactNode',
		description: 'Format both range values as a single display string.'
	}
]
