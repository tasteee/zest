'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import type { BeforeMount, EditorProps, Monaco, OnMount } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { cn } from '@/lib/utils'
import zestDarkColorTheme from '@/zest-dark-color-theme.json'

const MonacoEditor = dynamic(() => import('@monaco-editor/react').then((module) => module.Editor), { ssr: false })

const THEME_NAME = 'zest-dark-color-theme'

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
	editorOptions?: editor.IStandaloneEditorConstructionOptions
}

function stripHash(color: string) {
	return color.replace(/^#/, '')
}

function getSemanticColor(tokenName: keyof typeof zestDarkColorTheme.semanticTokenColors) {
	return stripHash(zestDarkColorTheme.semanticTokenColors[tokenName].foreground)
}

function getMonacoLanguage(language: string) {
	if (language === 'tsx') return 'typescript'
	if (language === 'jsx') return 'javascript'
	return language
}

const defineZestDarkTheme: BeforeMount = (monaco: Monaco) => {
	monaco.editor.defineTheme(THEME_NAME, {
		base: 'vs-dark',
		inherit: false,
		rules: [
			{ token: '', foreground: stripHash(zestDarkColorTheme.colors['editor.foreground']) },
			{ token: 'comment', foreground: getSemanticColor('comment'), fontStyle: 'italic' },
			{ token: 'keyword', foreground: getSemanticColor('keyword') },
			{ token: 'keyword.operator', foreground: getSemanticColor('operator') },
			{ token: 'operator', foreground: getSemanticColor('operator') },
			{ token: 'delimiter', foreground: getSemanticColor('operator') },
			{ token: 'delimiter.bracket', foreground: getSemanticColor('operator') },
			{ token: 'delimiter.parenthesis', foreground: getSemanticColor('operator') },
			{ token: 'string', foreground: getSemanticColor('string') },
			{ token: 'string.escape', foreground: stripHash('#838584') },
			{ token: 'number', foreground: getSemanticColor('number') },
			{ token: 'regexp', foreground: stripHash('#838584') },
			{ token: 'identifier', foreground: getSemanticColor('variable') },
			{ token: 'variable', foreground: getSemanticColor('variable') },
			{ token: 'variable.predefined', foreground: getSemanticColor('keyword'), fontStyle: 'italic' },
			{ token: 'type', foreground: getSemanticColor('type') },
			{ token: 'type.identifier', foreground: getSemanticColor('type') },
			{ token: 'function', foreground: getSemanticColor('function'), fontStyle: 'bold' },
			{ token: 'function.call', foreground: getSemanticColor('function'), fontStyle: 'bold' },
			{ token: 'method', foreground: getSemanticColor('method'), fontStyle: 'bold' },
			{ token: 'property', foreground: getSemanticColor('property') },
			{ token: 'attribute.name', foreground: stripHash('#C8A878') },
			{ token: 'attribute.value', foreground: getSemanticColor('string') },
			{ token: 'tag', foreground: getSemanticColor('keyword') },
			{ token: 'tag.id', foreground: getSemanticColor('type') },
			{ token: 'tag.tsx', foreground: getSemanticColor('type') },
			{ token: 'metatag', foreground: getSemanticColor('keyword') }
		],
		colors: zestDarkColorTheme.colors
	})
}

const applyZestDarkTheme: OnMount = (_editor, monaco) => {
	defineZestDarkTheme(monaco)
	monaco.editor.setTheme(THEME_NAME)
}

const labelToneClassNames: Record<CodeBlockToneT, string> = {
	default: 'text-foreground',
	success: 'text-neon-green',
	danger: 'text-neon-pink',
	muted: 'text-muted-foreground'
}

function CodeBlock({
	className,
	content,
	label,
	language = 'tsx',
	height = 220,
	minHeight,
	maxHeight,
	tone = 'default',
	strikeThrough = false,
	editorOptions,
	style,
	...props
}: CodeBlockPropsT) {
	const editorHeight = maxHeight == null ? height : '100%'
	const monacoLanguage = getMonacoLanguage(language)

	const options = React.useMemo<editor.IStandaloneEditorConstructionOptions>(() => {
		return {
			automaticLayout: true,
			contextmenu: false,
			cursorBlinking: 'solid',
			cursorStyle: 'line-thin',
			domReadOnly: true,
			folding: false,
			glyphMargin: false,
			lineDecorationsWidth: 0,
			lineNumbers: 'off',
			lineNumbersMinChars: 0,
			minimap: { enabled: false },
			overviewRulerBorder: false,
			overviewRulerLanes: 0,
			padding: { top: 0, bottom: 0 },
			readOnly: true,
			renderLineHighlight: 'none',
			scrollBeyondLastLine: false,
			scrollbar: {
				alwaysConsumeMouseWheel: false,
				horizontalScrollbarSize: 8,
				verticalScrollbarSize: 8
			},
			smoothScrolling: true,
			wordWrap: 'on',
			...editorOptions
		}
	}, [editorOptions])

	const editorWrapperStyle = {
		height,
		minHeight,
		maxHeight
	} satisfies React.CSSProperties

	return (
		<div
			data-slot='codeblock'
			className={cn('overflow-hidden rounded-lg border border-border p-6', className)}
			style={style}
			{...props}
		>
			{label != null ? (
				<span
					data-slot='codeblock-label'
					className={cn('mb-4 block text-xs font-semibold uppercase tracking-wider', labelToneClassNames[tone])}
				>
					{label}
				</span>
			) : null}
			<div
				data-slot='codeblock-editor'
				className={cn(
					'overflow-hidden [&_.monaco-editor-background]:bg-transparent! [&_.monaco-editor]:bg-transparent!',
					strikeThrough && '[&_.view-line]:line-through'
				)}
				style={editorWrapperStyle}
			>
				<MonacoEditor
					value={content}
					language={monacoLanguage}
					height={editorHeight as EditorProps['height']}
					theme={THEME_NAME}
					beforeMount={defineZestDarkTheme}
					onMount={applyZestDarkTheme}
					options={options}
				/>
			</div>
		</div>
	)
}

export { CodeBlock }
export type { CodeBlockPropsT }
