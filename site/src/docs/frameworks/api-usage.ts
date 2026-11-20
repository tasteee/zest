import { printReactAttributes } from '@app/docs/frameworks/convert-react'
import { printSolidAttributes } from '@app/docs/frameworks/convert-solid'
import { parseMarkup } from '@app/docs/frameworks/markup-tree'
import { printJsx } from '@app/docs/frameworks/print-jsx'
import type { FrameworkT } from '@app/docs/frameworks/framework-storage'

// How an API table names an option or event in the reader's framework.
// `name` is what you write for a fixed value (or the handler); `alias` is
// the form for a dynamic value, where that differs. The rules match the
// framework guides: Vue and Svelte bind the camelCase property, Solid
// needs `prop:`, React takes the camelCase property everywhere.

export type ApiUsageT = { name: string; alias?: string }

type AttributeUsageInputT = { framework: FrameworkT; attributeName: string; propertyName: string }

const buildHtmlAttributeUsage = (input: AttributeUsageInputT): ApiUsageT => {
	const hasDifferentProperty = input.propertyName !== input.attributeName
	if (!hasDifferentProperty) return { name: input.attributeName }
	return { name: input.attributeName, alias: `js ${input.propertyName}` }
}

export const getAttributeUsage = (input: AttributeUsageInputT): ApiUsageT => {
	const isReact = input.framework === 'react'
	if (isReact) return { name: input.propertyName }
	const isVue = input.framework === 'vue'
	if (isVue) return { name: input.attributeName, alias: `dynamic :${input.propertyName}` }
	const isSvelte = input.framework === 'svelte'
	if (isSvelte) return { name: input.attributeName, alias: `dynamic ${input.propertyName}={…}` }
	const isSolid = input.framework === 'solid'
	if (isSolid) return { name: input.attributeName, alias: `dynamic prop:${input.propertyName}` }
	return buildHtmlAttributeUsage(input)
}

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1)

export const getEventUsage = (framework: FrameworkT, eventName: string): ApiUsageT => {
	const eventAlias = `event ${eventName}`
	const isReact = framework === 'react'
	if (isReact) return { name: `on${eventName}`, alias: eventAlias }
	const isVue = framework === 'vue'
	if (isVue) return { name: `@${eventName}`, alias: eventAlias }
	const isSvelte = framework === 'svelte'
	if (isSvelte) return { name: `on${eventName}`, alias: eventAlias }
	const isSolid = framework === 'solid'
	if (isSolid) return { name: `on${capitalize(eventName)}`, alias: eventAlias }
	return { name: eventName }
}

export type ApiExampleT = { code: string; language: string }

/**
 * A markup example in the reader's framework. Vue and Svelte templates take
 * the HTML as written; React and Solid get JSX.
 */
export const convertMarkupExample = (html: string, framework: FrameworkT): ApiExampleT => {
	const isReact = framework === 'react'
	if (isReact) return { code: printJsx(parseMarkup(html), 0, printReactAttributes), language: 'tsx' }
	const isSolid = framework === 'solid'
	if (isSolid) return { code: printJsx(parseMarkup(html), 0, printSolidAttributes), language: 'tsx' }
	return { code: html, language: 'html' }
}
