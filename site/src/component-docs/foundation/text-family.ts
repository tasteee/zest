// Flexible text variants share this attribute builder. z-label deliberately
// has a smaller, fixed API matching z-field and documents its attributes
// separately.

import type { ApiRowT } from '../types'

type TextFamilyOptionsT = {
	sizes: string
	defaultSize: string
	defaultWeight: string
	defaultTag: string
	defaultColor: string
	sizeDescription: string
}

export const buildTextFamilyAttributes = (options: TextFamilyOptionsT): ApiRowT[] => {
	return [
		{ name: 'size', type: options.sizes, defaultValue: options.defaultSize, description: options.sizeDescription },
		{
			name: 'color',
			type: 'neutral | dom | sub | muted | strong | success | warning | error',
			defaultValue: options.defaultColor,
			description: 'Text colour, drawn from the theme rather than a raw value.'
		},
		{
			name: 'weight',
			type: 'number (1–1000)',
			defaultValue: options.defaultWeight,
			description: 'Overrides the variant default weight, including continuous variable-font values.'
		},
		{
			name: 'tag',
			type: 'string',
			defaultValue: options.defaultTag,
			description: 'The element actually rendered, when the semantic tag needs to differ from the visual one.'
		},
		{ name: 'is-italic', type: 'boolean', defaultValue: '—', description: 'Italicises the text.' },
		{ name: 'is-underlined', type: 'boolean', defaultValue: '—', description: 'Underlines the text.' },
		{
			name: 'is-strikethrough',
			type: 'boolean',
			defaultValue: '—',
			description: 'Strikes the text through. Combine with is-underlined for both.'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the element from layout.' }
	]
}

export const TEXT_FAMILY_RELATED = {
	text: { tag: 'z-text', route: '/c/foundation/z-text', description: 'Body copy and paragraphs.' },
	heading: { tag: 'z-heading', route: '/c/foundation/z-heading', description: 'Bold headings, h1 through h6.' },
	subheading: { tag: 'z-subheading', route: '/c/foundation/z-subheading', description: 'Uppercase tracked overlines.' },
	label: { tag: 'z-label', route: '/c/foundation/z-label', description: 'Short UI labels.' },
	inline: { tag: 'z-inline', route: '/c/foundation/z-inline', description: 'Style a fragment without resetting its size.' },
	display: { tag: 'z-display', route: '/c/foundation/z-display', description: 'Viewport-clamped hero type.' },
	eyebrow: { tag: 'z-eyebrow', route: '/c/foundation/z-eyebrow', description: 'The mono kicker above a title.' }
}
