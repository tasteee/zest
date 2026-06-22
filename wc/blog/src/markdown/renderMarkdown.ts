import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { customMarkers, matchDynamicMarkerDefinition, type MarkerDefinitionT } from './markers'

// Runs entirely in the browser. Code fences become <z-code-block> elements,
// which highlight themselves (lowlight) when they upgrade — so there is no
// async highlighting step here. Custom block markers (see markers.ts) are
// applied to paragraphs that start with a marker token.

type AnyNode = { type: string; value?: string; children?: AnyNode[]; data?: Record<string, unknown>; tagName?: string; properties?: Record<string, unknown> }

const applyMarker = (node: AnyNode, def: MarkerDefinitionT): void => {
	const existing = (node.data?.hProperties as Record<string, unknown>) ?? {}
	const hProperties: Record<string, unknown> = { ...existing, ...def.attributes }
	if (def.classes) hProperties.className = def.classes
	if (def.isAriaHidden) hProperties['aria-hidden'] = 'true'
	node.data = { ...node.data, hName: def.element ?? 'p', hProperties }
}

// mdast: rewrite paragraphs that begin with a custom marker token.
const remarkCustomParagraphs = () => (tree: AnyNode) => {
	visit(tree, 'paragraph', (node: AnyNode) => {
		const firstText = node.children?.find((c) => c.type === 'text')
		if (!firstText || firstText.value === undefined) return

		const dynamic = matchDynamicMarkerDefinition(firstText.value)
		if (dynamic) {
			if (dynamic.consumeLine) node.children = []
			else firstText.value = firstText.value.slice(dynamic.marker!.length).trimStart()
			applyMarker(node, dynamic)
			return
		}

		for (const [marker, def] of Object.entries(customMarkers)) {
			if (!firstText.value.startsWith(marker)) continue
			if (def.consumeLine) node.children = []
			else firstText.value = firstText.value.slice(marker.length).trimStart()
			applyMarker(node, def)
			return
		}
	})
}

const nodeText = (node: AnyNode): string => {
	if (node.type === 'text') return node.value ?? ''
	return (node.children ?? []).map(nodeText).join('')
}

const languageOf = (codeEl: AnyNode): string | undefined => {
	const classNames = (codeEl.properties?.className as string[] | undefined) ?? []
	const langClass = classNames.find((c) => String(c).startsWith('language-'))
	return langClass ? String(langClass).replace(/^language-/, '') : undefined
}

// hast: turn <pre><code> fences into self-highlighting <z-code-block>.
const rehypeCodeBlocks = () => (tree: AnyNode) => {
	visit(tree, 'element', (node: AnyNode) => {
		if (node.tagName !== 'pre') return
		const codeEl = node.children?.find((c) => c.type === 'element' && c.tagName === 'code')
		if (!codeEl) return

		const code = nodeText(codeEl).replace(/\n$/, '')
		const language = languageOf(codeEl)

		node.tagName = 'z-code-block'
		node.properties = { code, ...(language ? { language } : {}) }
		node.children = []
	})
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkCustomParagraphs)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeCodeBlocks)
	.use(rehypeSlug)
	.use(rehypeStringify, { allowDangerousHtml: true })

export const renderMarkdown = async (content: string): Promise<string> => {
	const result = await processor.process(content)
	return String(result)
}
