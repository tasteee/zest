import { convertMarkupExample } from '@app/docs/frameworks/api-usage'
import { useFramework } from '@app/docs/frameworks/framework-storage'

// A short markup snippet in prose, written once as HTML and shown in the
// reader's framework: JSX for React and Solid, the HTML as-is for Vue and
// Svelte templates.

type MarkupCodePropsT = {
	html: string
	filename?: string

	// bare renders only the code block, for containers that frame it themselves
	isBare?: boolean
}

export const MarkupCode = (props: MarkupCodePropsT) => {
	const framework = useFramework()
	const trimmedHtml = props.html.trim()
	const example = convertMarkupExample(trimmedHtml, framework)
	const code = `${example.code.trim()}\n`
	const codeBlock = <z-code-block code={code} language={example.language} filename={props.filename} />
	if (props.isBare) return codeBlock
	return <div className="DocsCode">{codeBlock}</div>
}
