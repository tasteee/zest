import { convertToReact } from '@app/docs/frameworks/convert-react'
import { convertToSolid } from '@app/docs/frameworks/convert-solid'
import { convertToSvelte, convertToVue } from '@app/docs/frameworks/convert-sfc'
import { parseMarkup } from '@app/docs/frameworks/markup-tree'
import type { DemoFileT, DemoT } from '@app/docs/demos/registry'
import type { FrameworkT } from '@app/docs/frameworks/framework-storage'

/*
 * The files an example's Code tab shows for a framework. The live preview
 * always runs the demo's own HTML (+ JS), so this only decides what a
 * reader sees and copies:
 *
 *   1. a hand-written version beside the demo (`<name>.react.tsx`, `.vue`,
 *      `.svelte`, `.solid.tsx`) wins,
 *   2. markup-only demos are converted from their HTML,
 *   3. demos with a script and no hand-written version fall back to the
 *      HTML + JS, flagged so the Code tab can say so.
 */

type ComponentFrameworkT = Exclude<FrameworkT, 'html'>

type FrameworkFileT = { suffix: string; fileName: string; language: string }

export type DemoCodeT = { files: DemoFileT[]; isFallback: boolean }

const FRAMEWORK_FILES: Record<ComponentFrameworkT, FrameworkFileT> = {
	react: { suffix: '.react.tsx', fileName: 'Example.tsx', language: 'tsx' },
	vue: { suffix: '.vue', fileName: 'Example.vue', language: 'vue' },
	svelte: { suffix: '.svelte', fileName: 'Example.svelte', language: 'svelte' },
	solid: { suffix: '.solid.tsx', fileName: 'Example.tsx', language: 'tsx' }
}

const AUTHORED_FILES = import.meta.glob(
	['../demos/**/*.react.tsx', '../demos/**/*.solid.tsx', '../demos/**/*.vue', '../demos/**/*.svelte'],
	{ query: '?raw', import: 'default', eager: true }
) as Record<string, string>

const cache = new Map<string, DemoCodeT>()

const getAuthoredCode = (demoId: string, framework: ComponentFrameworkT): string | undefined => {
	const suffix = FRAMEWORK_FILES[framework].suffix
	return AUTHORED_FILES[`../demos/${demoId}${suffix}`]
}

const convertMarkup = (demo: DemoT, framework: ComponentFrameworkT): string => {
	const hasStyles = Boolean(demo.css)
	const isVue = framework === 'vue'
	if (isVue) return convertToVue(demo.html, hasStyles)
	const isSvelte = framework === 'svelte'
	if (isSvelte) return convertToSvelte(demo.html, hasStyles)

	const nodes = parseMarkup(demo.html)
	const isSolid = framework === 'solid'
	if (isSolid) return convertToSolid(nodes, hasStyles)
	return convertToReact(nodes, hasStyles)
}

const buildComponentFiles = (demo: DemoT, framework: ComponentFrameworkT, code: string): DemoFileT[] => {
	const frameworkFile = FRAMEWORK_FILES[framework]
	const componentFile = { name: frameworkFile.fileName, language: frameworkFile.language, code }
	const hasStyles = Boolean(demo.css)
	if (!hasStyles) return [componentFile]

	const styleFile = { name: 'styles.css', language: 'css', code: demo.css ?? '' }
	return [componentFile, styleFile]
}

const resolveDemoCode = (demo: DemoT, framework: FrameworkT): DemoCodeT => {
	const isPlainHtml = framework === 'html'
	if (isPlainHtml) return { files: demo.files, isFallback: false }

	const authoredCode = getAuthoredCode(demo.id, framework)
	const hasAuthoredCode = authoredCode !== undefined
	if (hasAuthoredCode) return { files: buildComponentFiles(demo, framework, authoredCode), isFallback: false }

	const hasScript = Boolean(demo.js)
	if (hasScript) return { files: demo.files, isFallback: true }

	const convertedCode = convertMarkup(demo, framework)
	return { files: buildComponentFiles(demo, framework, convertedCode), isFallback: false }
}

export const getDemoCode = (demo: DemoT, framework: FrameworkT): DemoCodeT => {
	const cacheKey = `${demo.id}:${framework}`
	const cachedCode = cache.get(cacheKey)
	if (cachedCode) return cachedCode

	const demoCode = resolveDemoCode(demo, framework)
	cache.set(cacheKey, demoCode)
	return demoCode
}
