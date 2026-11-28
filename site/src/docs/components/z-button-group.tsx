import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZButtonGroupDoc = () => (
	<ComponentDoc
		tag="z-button-group"
		category="Actions"
		description="A seamless row or column of related controls. Each control keeps its own behavior and state."
	>
		<DocExample
			demo="z-button-group/pair-a-toggle-with-a-dropdown"
			title="Pair an icon toggle with a dropdown"
			description="Use an icon-only z-toggle-button with an accessible name to turn grid snapping on or off. Place an inline z-select beside it to choose the grid division. Give both controls the same size for an even seam."
		/>
		<DocExample
			demo="z-button-group/keep-sibling-actions-together"
			title="Keep sibling actions together"
			description="The group removes visual seams while preserving each button as a separate action."
		/>
		<DocExample
			demo="z-button-group/use-a-vertical-group-for"
			title="Use a vertical group for a compact tool rail"
			description="Vertical composition is useful when a narrow inspector needs several sibling commands."
		/>
	</ComponentDoc>
)
