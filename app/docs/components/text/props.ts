import { PropDefinition } from '@/components/docs/props-table'

export const zTextProps: PropDefinition[] = [
	{
		name: 'as',
		type: 'React.ElementType',
		defaultValue: '"span"',
		description: 'The HTML element or component to render. Sub-components (ZText.h1, ZText.body, etc.) set this automatically.'
	},
	{
		name: 'isNeutral | isPurple | isPink | isMuted',
		type: 'boolean',
		defaultValue: 'isNeutral',
		description: 'Color of the text. isMuted renders subdued foreground.'
	},
	{
		name: 'isExtraSmall | isSmall | isMedium | isLarge | isExtraLarge',
		type: 'boolean',
		defaultValue: 'isMedium',
		description: 'Font size. Maps to design-system type scale tokens.'
	},
	{
		name: 'isThin | isNormal | isBold | isVeryBold',
		type: 'boolean',
		defaultValue: 'isNormal',
		description: 'Font weight.'
	},
	{
		name: 'isItalic',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, applies italic font style.'
	},
	{
		name: 'isUnderlined',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, underlines the text.'
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The text content to render.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]

export const zTextSubcomponentProps: PropDefinition[] = [
	{
		name: 'ZText.display',
		type: 'component',
		description: 'Renders an h1 with display-scale styling for hero headings.'
	},
	{
		name: 'ZText.h1 — ZText.h4',
		type: 'component',
		description: 'Semantic heading elements h1 through h4 with matching type scale.'
	},
	{
		name: 'ZText.body',
		type: 'component',
		description: 'Renders a p element at body size — the default reading size.'
	},
	{
		name: 'ZText.small',
		type: 'component',
		description: 'Renders a p element at small size for supporting text.'
	},
	{
		name: 'ZText.caption',
		type: 'component',
		description: 'Renders a p element at caption size for labels and footnotes.'
	}
]
