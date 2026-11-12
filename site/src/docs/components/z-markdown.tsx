import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZMarkdownDoc = () => (
	<ComponentDoc
		tag="z-markdown"
		category="Specialized"
		description="Renders a markdown string with the Zest design system. GitHub-flavoured markdown, fenced code through z-code-block, and sanitized by default."
	>
		<DocExample demo="z-markdown/overview" title="Overview" description="set content to a markdown string" />
		<DocExample
			demo="z-markdown/anchors"
			title="Heading anchors"
			description="has-heading-anchors gives every heading an id and a # permalink"
		/>
		<DocExample demo="z-markdown/links" title="Links" description="linkclick reports the href of a clicked link" />
	</ComponentDoc>
)
