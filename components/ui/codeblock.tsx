'use client'

import * as React from 'react'
import { common, createStarryNight } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'
import { cn } from '@/lib/utils'
import zestDarkColorTheme from '@/zest-dark-color-theme.json'
import './codeblock.css'

type CodeBlockToneT = 'default' | 'success' | 'danger' | 'muted'

type CodeBlockPropsT = Omit<React.ComponentProps<'div'>, 'children' | 'content'> & {
	content: string
	label?: string
	language?: string
	height?: React.CSSProperties['height']
	minHeight?: React.CSSProperties['minHeight']
	maxHeight?: React.CSSProperties['maxHeight']
	tone?: CodeBlockToneT
	strikeThrough?: boolean
}
type StarryNightT = Awaited<ReturnType<typeof createStarryNight>>
type CodeBlockStyleT = React.CSSProperties & Record<string, string>

const languageAliasMap: Record<string, string> = {
	js: 'javascript',
	jsx: 'javascript',
	ts: 'typescript',
	tsx: 'typescript',
	md: 'markdown',
	yml: 'yaml',
	sh: 'bash',
	shell: 'bash'
}

const starryNightPromise = createStarryNight(common)
const highlightedMarkupCache = new Map<string, string>()

const getSemanticTokenForeground = (tokenName: keyof typeof zestDarkColorTheme.semanticTokenColors): string => {
	return zestDarkColorTheme.semanticTokenColors[tokenName].foreground
}

const getCodeBlockThemeStyle = (): CodeBlockStyleT => {
	return {
		'--codeblock-theme-editor-background': zestDarkColorTheme.colors['editor.background'],
		'--codeblock-theme-editor-foreground': zestDarkColorTheme.colors['editor.foreground'],
		'--codeblock-theme-editor-border': zestDarkColorTheme.colors['editorWidget.border'],
		'--codeblock-theme-comment': getSemanticTokenForeground('comment'),
		'--codeblock-theme-keyword': getSemanticTokenForeground('keyword'),
		'--codeblock-theme-operator': getSemanticTokenForeground('operator'),
		'--codeblock-theme-string': getSemanticTokenForeground('string'),
		'--codeblock-theme-number': getSemanticTokenForeground('number'),
		'--codeblock-theme-variable': getSemanticTokenForeground('variable'),
		'--codeblock-theme-parameter': getSemanticTokenForeground('parameter'),
		'--codeblock-theme-function': getSemanticTokenForeground('function'),
		'--codeblock-theme-method': getSemanticTokenForeground('method'),
		'--codeblock-theme-type': getSemanticTokenForeground('type'),
		'--codeblock-theme-property': getSemanticTokenForeground('property'),
		'--codeblock-theme-regexp': getSemanticTokenForeground('regexp'),
		'--codeblock-theme-decorator': getSemanticTokenForeground('decorator'),
		'--codeblock-theme-namespace': getSemanticTokenForeground('namespace')
	}
}

const codeBlockThemeStyle = getCodeBlockThemeStyle()

const escapeHtml = (value: string): string => {
	const escapedAmpersands = value.replaceAll('&', '&amp;')
	const escapedLessThan = escapedAmpersands.replaceAll('<', '&lt;')
	const escapedGreaterThan = escapedLessThan.replaceAll('>', '&gt;')
	const escapedDoubleQuotes = escapedGreaterThan.replaceAll('"', '&quot;')

	return escapedDoubleQuotes.replaceAll("'", '&#39;')
}

const getLanguageCandidates = (language: string): string[] => {
	const normalizedLanguage = language.trim().toLowerCase()
	const aliasedLanguage = languageAliasMap[normalizedLanguage]
	const hasAlias = aliasedLanguage != null
	if (!hasAlias) return [normalizedLanguage]
	const isAliasDifferent = aliasedLanguage !== normalizedLanguage
	if (!isAliasDifferent) return [normalizedLanguage]
	return [normalizedLanguage, aliasedLanguage]
}

const getHighlightScope = (starryNight: StarryNightT, language: string): string | undefined => {
	const candidates = getLanguageCandidates(language)

	for (const candidate of candidates) {
		const scope = starryNight.flagToScope(candidate)
		const hasScope = scope != null
		if (hasScope) return scope
	}

	return undefined
}

const getHighlightedMarkup = async (starryNight: StarryNightT, language: string, content: string): Promise<string> => {
	const normalizedLanguage = language.trim().toLowerCase()
	const cacheKey = `${normalizedLanguage}::${content}`
	const cachedMarkup = highlightedMarkupCache.get(cacheKey)
	const hasCachedMarkup = cachedMarkup != null

	if (hasCachedMarkup) return cachedMarkup
	const scope = getHighlightScope(starryNight, normalizedLanguage)
	const hasScope = scope != null

	if (!hasScope) {
		const escapedContent = escapeHtml(content)
		highlightedMarkupCache.set(cacheKey, escapedContent)
		return escapedContent
	}

	const highlightedTree = starryNight.highlight(content, scope)
	const highlightedMarkup = toHtml(highlightedTree)
	highlightedMarkupCache.set(cacheKey, highlightedMarkup)
	return highlightedMarkup
}

const labelToneClassNames: Record<CodeBlockToneT, string> = {
	default: 'codeBlockLabelDefault',
	success: 'codeBlockLabelSuccess',
	danger: 'codeBlockLabelDanger',
	muted: 'codeBlockLabelMuted'
}

const CodeBlock = (props: CodeBlockPropsT) => {
	const [highlightedMarkup, setHighlightedMarkup] = React.useState<string>('')
	const [isReady, setIsReady] = React.useState<boolean>(false)
	const language = props.language ?? 'tsx'

	React.useEffect(() => {
		let isDisposed = false

		const highlightContent = async (): Promise<void> => {
			const starryNight = await starryNightPromise
			const markup = await getHighlightedMarkup(starryNight, language, props.content)
			const isComponentActive = !isDisposed

			if (!isComponentActive) return
			setHighlightedMarkup(markup)
			setIsReady(true)
		}

		setIsReady(false)
		void highlightContent()

		return () => {
			isDisposed = true
		}
	}, [language, props.content])

	const tone = props.tone ?? 'default'
	const hasLabel = props.label != null
	const classNames = cn('codeBlock', props.className)
	const codeClassNames = cn('codeBlockCode', props.strikeThrough && 'codeBlockStrikeThrough')
	const labelClassNames = cn('codeBlockLabel', labelToneClassNames[tone])
	const markup = isReady ? highlightedMarkup : escapeHtml(props.content)

	const codeBlockElementStyle = {
		...codeBlockThemeStyle,
		...props.style
	} as React.CSSProperties

	const codeBlockContentStyle = {
		height: props.height ?? 220,
		minHeight: props.minHeight,
		maxHeight: props.maxHeight
	} satisfies React.CSSProperties

	const elementProps: Record<string, unknown> = { ...props }
	delete elementProps.className
	delete elementProps.style
	delete elementProps.content
	delete elementProps.label
	delete elementProps.language
	delete elementProps.height
	delete elementProps.minHeight
	delete elementProps.maxHeight
	delete elementProps.tone
	delete elementProps.strikeThrough

	return (
		<div
			data-slot='codeblock'
			className={classNames}
			style={codeBlockElementStyle}
			{...(elementProps as React.ComponentProps<'div'>)}
		>
			{hasLabel ? (
				<span data-slot='codeblock-label' className={labelClassNames}>
					{props.label}
				</span>
			) : null}
			<div data-slot='codeblock-content' className='codeBlockContent' style={codeBlockContentStyle}>
				<pre className='codeBlockPre'>
					<code className={codeClassNames} data-language={language} dangerouslySetInnerHTML={{ __html: markup }} />
				</pre>
			</div>
		</div>
	)
}

export { CodeBlock }
export type { CodeBlockPropsT }
