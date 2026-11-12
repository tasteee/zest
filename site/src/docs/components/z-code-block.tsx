import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZCodeBlockDoc = () => (
	<ComponentDoc
		tag="z-code-block"
		category="Specialized"
		description="A syntax-highlighted code block, filename header, copy button, optional line numbers."
	>
		<DocExample demo="z-code-block/overview" title="Overview" description="" />
		<DocExample
			demo="z-code-block/files"
			title="Multiple files"
			description="files shows a tab per file in the header · each file can set its own language"
		/>
		<DocExample
			demo="z-code-block/languages"
			title="More languages"
			description="import @tasteee/zest/languages once to add Python, Ruby, PHP, Rust, Go and more"
		/>
	</ComponentDoc>
)
