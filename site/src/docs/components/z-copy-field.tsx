import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZCopyFieldDoc = () => {
	return (
		<ComponentDoc tag="z-copy-field" category="Forms" description="Present a value that can be copied.">
			<DocExample demo="z-copy-field/overview" title="Copy a link" description="Provide a label describing the value." />
		</ComponentDoc>
	)
}
