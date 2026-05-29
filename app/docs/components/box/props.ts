import { PropDefinition } from '@/components/docs/props-table'

export const zBoxLayoutProps: PropDefinition[] = [
	{
		name: 'as',
		type: 'React.ElementType',
		defaultValue: '"div"',
		description: 'The HTML element or component to render.'
	},
	{
		name: 'isFlex',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, sets display: flex.'
	},
	{
		name: 'isRow | isColumn',
		type: 'boolean',
		description: 'Sets flex-direction to row or column. Only applies when isFlex is true.'
	},
	{
		name: 'isInline | isInlineFlex | isInlineBlock | isBlock',
		type: 'boolean',
		description: 'Overrides the display value.'
	},
	{
		name: 'alignX',
		type: 'string',
		description: 'When isFlex + isRow: sets justifyContent. When isFlex + isColumn: sets alignItems.'
	},
	{
		name: 'alignY',
		type: 'string',
		description: 'When isFlex + isRow: sets alignItems. When isFlex + isColumn: sets justifyContent.'
	},
	{
		name: 'gap',
		type: 'string | number',
		description: 'Gap between flex or grid children.'
	}
]

export const zBoxSpacingProps: PropDefinition[] = [
	{
		name: 'padding | paddingX | paddingY | paddingTop | paddingRight | paddingBottom | paddingLeft',
		type: 'string | number',
		description: 'Padding shorthand and per-side overrides.'
	},
	{
		name: 'margin | marginX | marginY | marginTop | marginRight | marginBottom | marginLeft',
		type: 'string | number',
		description: 'Margin shorthand and per-side overrides.'
	}
]

export const zBoxVisualProps: PropDefinition[] = [
	{
		name: 'background',
		type: 'string',
		description: 'Background color or gradient. Use design-system CSS variables.'
	},
	{
		name: 'color',
		type: 'string',
		description: 'Text color. Use design-system CSS variables.'
	},
	{
		name: 'borderRadius',
		type: 'string | number',
		description: 'Border radius. Use design-system radius variables.'
	},
	{
		name: 'border | borderColor | borderWidth',
		type: 'string | number',
		description: 'Border shorthand and overrides.'
	},
	{
		name: 'boxShadow',
		type: 'string',
		description: 'Box shadow.'
	},
	{
		name: 'zIndex',
		type: 'string | number',
		description: 'z-index value.'
	}
]
