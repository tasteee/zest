import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZStepperDoc = () => (
	<ComponentDoc
		tag="z-stepper"
		category="Navigation"
		description="Where someone is in an ordered flow. value is the current step; everything else follows."
		partTags={['z-step']}
	>
		<DocExample
			demo="z-stepper/show-where-people-are"
			title="Show where people are"
			description="Steps before value are complete. is-navigable lets people click back; is-error and is-optional mark a step."
		/>
		<DocExample
			demo="z-stepper/stack-steps-with-content"
			title="Stack steps with their content"
			description="is-vertical gives each step room for its own form under the label."
		/>
	</ComponentDoc>
)
