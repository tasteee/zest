import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZFieldsetDoc = () => (
	<ComponentDoc
		tag="z-fieldset"
		category="Forms"
		description="A titled group of related controls. One legend, one description, one error, and one switch that disables everything inside."
	>
		<DocExample
			demo="z-fieldset/group-related-controls"
			title="Group controls that answer one question"
			description="The legend names the group for screen readers too. Each control keeps its own z-field."
		/>
		<DocExample
			demo="z-fieldset/disable-a-section-at-once"
			title="Disable a section at once"
			description="is-disabled reaches every control inside, as a native fieldset does. The actions slot holds a link beside the legend."
		/>
	</ComponentDoc>
)
