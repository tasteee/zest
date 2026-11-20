// A demo's HTML as a small plain-data tree, so each framework printer can
// walk it without touching the DOM. The browser's own parser does the
// parsing, so entities, void tags and SVG attribute casing all come out
// exactly as the preview sees them.

export type MarkupAttributeT = { name: string; value: string }

export type MarkupElementT = {
	kind: 'element'
	tag: string
	attributes: MarkupAttributeT[]
	children: MarkupNodeT[]
	isSvg: boolean
}

export type MarkupTextT = { kind: 'text'; value: string }

export type MarkupCommentT = { kind: 'comment'; value: string }

export type MarkupNodeT = MarkupElementT | MarkupTextT | MarkupCommentT

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

const readAttributes = (element: Element): MarkupAttributeT[] => {
	const attributes = Array.from(element.attributes)
	return attributes.map((attribute) => ({ name: attribute.name, value: attribute.value }))
}

const getChildNodes = (element: Element): ChildNode[] => {
	const isTemplate = element instanceof HTMLTemplateElement
	if (isTemplate) return Array.from(element.content.childNodes)
	return Array.from(element.childNodes)
}

const readElement = (element: Element): MarkupElementT => {
	const childNodes = getChildNodes(element)
	const children = readNodes(childNodes)
	const isSvg = element.namespaceURI === SVG_NAMESPACE

	return {
		kind: 'element',
		tag: element.localName,
		attributes: readAttributes(element),
		children,
		isSvg
	}
}

const readNode = (node: ChildNode): MarkupNodeT | null => {
	const isElement = node.nodeType === Node.ELEMENT_NODE
	if (isElement) return readElement(node as Element)

	const isText = node.nodeType === Node.TEXT_NODE
	if (isText) return { kind: 'text', value: node.textContent ?? '' }

	const isComment = node.nodeType === Node.COMMENT_NODE
	if (isComment) return { kind: 'comment', value: (node.textContent ?? '').trim() }

	return null
}

const checkIsNode = (node: MarkupNodeT | null): node is MarkupNodeT => node !== null

const readNodes = (childNodes: ChildNode[]): MarkupNodeT[] => {
	const nodes = childNodes.map(readNode)
	return nodes.filter(checkIsNode)
}

export const parseMarkup = (html: string): MarkupNodeT[] => {
	const template = document.createElement('template')
	template.innerHTML = html
	const childNodes = Array.from(template.content.childNodes)
	return readNodes(childNodes)
}
