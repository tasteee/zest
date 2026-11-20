import { buildJsxComponentSource } from '@app/docs/frameworks/convert-react'
import { formatJsxAttributeValue } from '@app/docs/frameworks/print-jsx'
import type { MarkupAttributeT, MarkupElementT, MarkupNodeT } from '@app/docs/frameworks/markup-tree'

// HTML → Solid. A plain string in Solid JSX is written as an attribute, so
// the demo's attributes carry over exactly as the HTML spells them. This is
// the one form both Solid 1 and Solid 2 compile the same way: Solid 2 drops
// the `attr:` and `on:` prefixes, and Solid 1 lowercases expression props
// on custom elements. Dynamic values (`prop:isOpen={…}`) only appear in the
// hand-written versions.

const printSolidAttribute = (element: MarkupElementT, attribute: MarkupAttributeT): string => {
	const isCustomElement = element.tag.includes('-')
	const isBareFlag = attribute.value === ''

	// a bare `disabled` is fine natively; on a z element keep it a string
	// so it stays an attribute rather than becoming an expression
	const isNativeFlag = isBareFlag && !isCustomElement
	if (isNativeFlag) return attribute.name
	return `${attribute.name}=${formatJsxAttributeValue(attribute.value)}`
}

export const printSolidAttributes = (element: MarkupElementT): string[] => {
	return element.attributes.map((attribute) => printSolidAttribute(element, attribute))
}

export const convertToSolid = (nodes: MarkupNodeT[], hasStyles: boolean): string => {
	return buildJsxComponentSource({ nodes, hasStyles, printAttributes: printSolidAttributes })
}
