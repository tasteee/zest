import type { MarkupCommentT, MarkupElementT, MarkupNodeT } from '@app/docs/frameworks/markup-tree'

// Prints a markup tree as JSX. React and Solid share it and differ only in
// how an element's attributes are spelled, which the caller supplies.

export type AttributePrinterT = (element: MarkupElementT) => string[]

type PrintContextT = {
	printAttributes: AttributePrinterT
	indent: string
}

type ChildTokenT =
	| { kind: 'node'; node: MarkupElementT | MarkupCommentT }
	| { kind: 'text'; text: string }
	| { kind: 'blankLine' }

const MAX_LINE_LENGTH = 100
const SPACE_TOKEN = "{' '}"
const JSX_UNSAFE_TEXT = /[{}<>]/

const quoteSingle = (value: string): string => {
	const escapedValue = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
	return `'${escapedValue}'`
}

const quoteTemplate = (value: string): string => {
	const escapedValue = value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
	return `\`${escapedValue}\``
}

/** An attribute value as JSX: a plain string when it can be, an expression when it can't. */
export const formatJsxAttributeValue = (value: string): string => {
	const hasNewline = value.includes('\n')
	if (hasNewline) return `{${quoteTemplate(value)}}`
	const hasDoubleQuote = value.includes('"')
	if (hasDoubleQuote) return `{${quoteSingle(value)}}`
	return `"${value}"`
}

const escapeJsxText = (text: string): string => {
	const isUnsafe = JSX_UNSAFE_TEXT.test(text)
	if (isUnsafe) return `{${quoteSingle(text)}}`
	return text.replace(/ /g, '&nbsp;')
}

const collapseWhitespace = (text: string): string => text.replace(/\s+/g, ' ')

const checkIsBlankWithNewline = (node: MarkupNodeT | undefined): boolean => {
	const isText = node?.kind === 'text'
	if (!isText) return false
	const isBlank = node.value.trim() === ''
	return isBlank && node.value.includes('\n')
}

// ── block layout: one child per line ──────────────────────────────

// Text beside the elements means they flow like prose, where any whitespace
// between two siblings (a line break included) still renders as a space.
const checkHasProseText = (children: MarkupNodeT[]): boolean => {
	return children.some((child) => child.kind === 'text' && child.value.trim() !== '')
}

const buildTextToken = (children: MarkupNodeT[], index: number, value: string): ChildTokenT[] => {
	const previousNode = children[index - 1]
	const nextNode = children[index + 1]
	const hasPrevious = previousNode !== undefined && !checkIsBlankWithNewline(previousNode)
	const hasNext = nextNode !== undefined && !checkIsBlankWithNewline(nextNode)
	const trimmedValue = value.trim()
	const isBlank = trimmedValue === ''

	if (isBlank) {
		// a space between two siblings is real; a line break is layout, unless
		// the siblings sit in prose
		const isLayoutBreak = value.includes('\n') && !checkHasProseText(children)
		const hasBothNeighbors = index > 0 && index < children.length - 1
		const isSignificantSpace = hasBothNeighbors && !isLayoutBreak
		if (isSignificantSpace) return [{ kind: 'text', text: SPACE_TOKEN }]

		// an empty line the author left between groups is kept
		const lineBreakCount = value.split('\n').length - 1
		const isGroupBreak = hasBothNeighbors && isLayoutBreak && lineBreakCount > 1
		if (isGroupBreak) return [{ kind: 'blankLine' }]
		return []
	}

	const hasLeadingSpace = hasPrevious && /^\s/.test(value)
	const hasTrailingSpace = hasNext && /\s$/.test(value)
	const leadingText = hasLeadingSpace ? SPACE_TOKEN : ''
	const trailingText = hasTrailingSpace ? SPACE_TOKEN : ''
	const bodyText = escapeJsxText(collapseWhitespace(trimmedValue))
	return [{ kind: 'text', text: leadingText + bodyText + trailingText }]
}

const buildChildTokens = (children: MarkupNodeT[]): ChildTokenT[] => {
	const tokens: ChildTokenT[] = []

	for (const [index, child] of children.entries()) {
		const isText = child.kind === 'text'
		if (isText) tokens.push(...buildTextToken(children, index, child.value))
		if (!isText) tokens.push({ kind: 'node', node: child })
	}

	return tokens
}

// ── inline layout: the whole element on one line ─────────────────

// Inline only where the author wrote it inline: a line break anywhere in
// the source means the layout was meant to be read vertically.
const checkWasWrittenInline = (element: MarkupElementT): boolean => {
	for (const child of element.children) {
		const isComment = child.kind === 'comment'
		if (isComment) return false
		const isText = child.kind === 'text'
		const hasNewline = isText && child.value.includes('\n')
		if (hasNewline) return false
		const isNestedElement = child.kind === 'element'
		const isNestedInline = !isNestedElement || checkWasWrittenInline(child)
		if (!isNestedInline) return false
	}

	return true
}

const printOpenTag = (element: MarkupElementT, context: PrintContextT): string => {
	const attributes = context.printAttributes(element)
	const hasAttributes = attributes.length > 0
	const attributeText = hasAttributes ? ` ${attributes.join(' ')}` : ''
	return `<${element.tag}${attributeText}`
}

const printInlineChildren = (element: MarkupElementT, context: PrintContextT): string => {
	const parts: string[] = []

	for (const child of element.children) {
		const isText = child.kind === 'text'
		if (isText) parts.push(escapeJsxText(collapseWhitespace(child.value)))
		const isElement = child.kind === 'element'
		if (isElement) parts.push(printInlineElement(child, context))
	}

	return parts.join('').trim()
}

const printInlineElement = (element: MarkupElementT, context: PrintContextT): string => {
	const openTag = printOpenTag(element, context)
	const childrenText = printInlineChildren(element, context)
	const isEmpty = childrenText === ''
	if (isEmpty) return `${openTag} />`
	return `${openTag}>${childrenText}</${element.tag}>`
}

// ── printing ──────────────────────────────────────────────────────

const printComment = (comment: MarkupCommentT, depth: number, context: PrintContextT): string[] => {
	const prefix = context.indent.repeat(depth)
	return [`${prefix}{/* ${comment.value} */}`]
}

const printOpenLines = (element: MarkupElementT, depth: number, context: PrintContextT, closing: string): string[] => {
	const prefix = context.indent.repeat(depth)
	const openTag = printOpenTag(element, context)
	const singleLine = `${prefix}${openTag}${closing}`
	const attributes = context.printAttributes(element)
	const fitsOnOneLine = singleLine.length <= MAX_LINE_LENGTH || attributes.length < 2
	if (fitsOnOneLine) return [singleLine]

	const attributePrefix = context.indent.repeat(depth + 1)
	const attributeLines = attributes.map((attribute) => `${attributePrefix}${attribute}`)
	const closingLine = `${prefix}${closing.trim()}`
	return [`${prefix}<${element.tag}`, ...attributeLines, closingLine]
}

const printChildToken = (token: ChildTokenT, depth: number, context: PrintContextT): string[] => {
	const isBlankLine = token.kind === 'blankLine'
	if (isBlankLine) return ['']
	const isText = token.kind === 'text'
	if (isText) return [`${context.indent.repeat(depth)}${token.text}`]
	return printNode(token.node, depth, context)
}

const printElement = (element: MarkupElementT, depth: number, context: PrintContextT): string[] => {
	const prefix = context.indent.repeat(depth)
	const canPrintInline = checkWasWrittenInline(element)
	const inlineLine = `${prefix}${printInlineElement(element, context)}`
	const fitsInline = canPrintInline && inlineLine.length <= MAX_LINE_LENGTH
	if (fitsInline) return [inlineLine]

	const tokens = buildChildTokens(element.children)
	const isEmpty = tokens.length === 0
	if (isEmpty) return printOpenLines(element, depth, context, ' />')

	const openLines = printOpenLines(element, depth, context, '>')
	const childLines = tokens.flatMap((token) => printChildToken(token, depth + 1, context))
	const closeLine = `${prefix}</${element.tag}>`
	return [...openLines, ...childLines, closeLine]
}

const printNode = (node: MarkupElementT | MarkupCommentT, depth: number, context: PrintContextT): string[] => {
	const isComment = node.kind === 'comment'
	if (isComment) return printComment(node, depth, context)
	return printElement(node, depth, context)
}

/**
 * JSX for a list of root nodes, indented to `depth`. Several roots are
 * wrapped in a fragment, since a component returns a single node.
 */
export const printJsx = (nodes: MarkupNodeT[], depth: number, printAttributes: AttributePrinterT): string => {
	const context: PrintContextT = { printAttributes, indent: '  ' }
	const tokens = buildChildTokens(nodes)
	const rootNodes = tokens.filter((token) => token.kind === 'node')
	const hasSingleRoot = rootNodes.length === 1 && tokens.length === 1
	if (hasSingleRoot) return printChildToken(tokens[0], depth, context).join('\n')

	const prefix = context.indent.repeat(depth)
	const childLines = tokens.flatMap((token) => printChildToken(token, depth + 1, context))
	return [`${prefix}<>`, ...childLines, `${prefix}</>`].join('\n')
}
