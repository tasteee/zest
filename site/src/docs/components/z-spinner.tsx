import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZSpinnerDoc = () => {
	return (
		<ComponentDoc tag="z-spinner" category="Feedback" description="Indicate that work is in progress.">
			<DocExample demo="z-spinner/overview" title="Sizes" description="Use a label to describe what is loading." />
		</ComponentDoc>
	)
}
