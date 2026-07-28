// A structural check over the TypeScript component docs.
//
// The examples build real DOM and run their own wiring code, so a typo in an
// example selector is a runtime error that would otherwise only surface when
// someone opens that page. This renders every documented page and reports
// anything broken.
//
// It needs a DOM. In a browser that is free; in Node, install one first (see
// the harness that calls `runDocVerification`).

import { getAllComponentDocTags, getComponentDoc } from './component-docs/registry'
import { buildComponentPage } from './render/component-page'
import type { ComponentDocT, ExampleT } from './component-docs/types'

export type DocProblemT = {
	scope: string
	message: string
}

export type DocVerificationResultT = {
	pageCount: number
	exampleCount: number
	problems: DocProblemT[]
}

const verifyExample = (componentDoc: ComponentDocT, example: ExampleT, problems: DocProblemT[]): void => {
	const scope = `${componentDoc.tag} › ${example.id}`

	const hasSnippets = example.snippets.length > 0
	if (!hasSnippets) problems.push({ scope, message: 'no code snippets' })

	for (const snippet of example.snippets) {
		const isEmpty = snippet.code.trim().length === 0
		if (isEmpty) problems.push({ scope, message: `empty ${snippet.language} snippet` })
	}

	const hasDescription = example.description.trim().length > 0
	if (!hasDescription) problems.push({ scope, message: 'no description' })

	// The check that matters: this parses the markup and runs the example's
	// own wiring, so a bad selector throws right here rather than in a user's
	// browser.
	try {
		const preview = example.buildPreview()
		const isEmptyPreview = preview.childNodes.length === 0
		if (isEmptyPreview) problems.push({ scope, message: 'preview rendered nothing' })
	} catch (previewError) {
		problems.push({ scope, message: `buildPreview threw: ${(previewError as Error).message}` })
	}
}

const verifyExampleIds = (componentDoc: ComponentDocT, problems: DocProblemT[]): void => {
	const seenIds = new Set<string>()

	for (const example of componentDoc.examples) {
		const isDuplicate = seenIds.has(example.id)
		if (isDuplicate) problems.push({ scope: componentDoc.tag, message: `duplicate example id: ${example.id}` })
		seenIds.add(example.id)
	}
}

const verifyApiTables = (componentDoc: ComponentDocT, problems: DocProblemT[]): void => {
	for (const attribute of componentDoc.attributes) {
		const scope = `${componentDoc.tag} › ${attribute.name}`

		const hasType = attribute.type.trim().length > 0
		if (!hasType) problems.push({ scope, message: 'attribute has no type' })

		const hasDescription = attribute.description.trim().length > 0
		if (!hasDescription) problems.push({ scope, message: 'attribute has no description' })

		const hasDefault = attribute.defaultValue.trim().length > 0
		if (!hasDefault) problems.push({ scope, message: 'attribute has no default column value' })
	}
}

const verifyRelatedRoutes = (componentDoc: ComponentDocT, knownRoutes: Set<string>, problems: DocProblemT[]): void => {
	const hasRouteIndex = knownRoutes.size > 0
	if (!hasRouteIndex) return

	for (const related of componentDoc.related) {
		const isKnown = knownRoutes.has(related.route)
		if (!isKnown) problems.push({ scope: `${componentDoc.tag} › related`, message: `route does not exist: ${related.route}` })
	}
}

const verifyPageRenders = (componentDoc: ComponentDocT, problems: DocProblemT[]): void => {
	try {
		const page = buildComponentPage(componentDoc, 'Category')

		const hasArticle = Boolean(page.querySelector('.componentArticle'))
		if (!hasArticle) problems.push({ scope: componentDoc.tag, message: 'page rendered without an article' })

		const outlineLinkCount = page.querySelectorAll('.pageOutlineLink').length
		const hasOutline = outlineLinkCount > 0
		if (!hasOutline) problems.push({ scope: componentDoc.tag, message: 'page outline is empty' })
	} catch (renderError) {
		problems.push({ scope: componentDoc.tag, message: `buildComponentPage threw: ${(renderError as Error).message}` })
	}
}

// An empty `knownRoutes` skips the cross-reference check, since only a Node
// harness can read the docs/ tree to build the route index.
export const runDocVerification = (knownRoutes: Set<string>): DocVerificationResultT => {
	const problems: DocProblemT[] = []
	const documentedTags = getAllComponentDocTags()
	let exampleCount = 0

	for (const tag of documentedTags) {
		const componentDoc = getComponentDoc(tag)

		if (!componentDoc) {
			problems.push({ scope: tag, message: 'not found in the registry' })
			continue
		}

		verifyExampleIds(componentDoc, problems)
		for (const example of componentDoc.examples) {
			verifyExample(componentDoc, example, problems)
		}

		verifyApiTables(componentDoc, problems)
		verifyRelatedRoutes(componentDoc, knownRoutes, problems)
		verifyPageRenders(componentDoc, problems)

		exampleCount += componentDoc.examples.length
	}

	return { pageCount: documentedTags.length, exampleCount, problems }
}
