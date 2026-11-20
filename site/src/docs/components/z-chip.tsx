import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZChipDoc = () => (
	<ComponentDoc
		tag="z-chip"
		category="Forms"
		description="A compact toggle. Click to select, × to remove. The building block of z-chip-group."
	>
		<DocExample
			demo="z-chip/toggle-and-remove"
			title="Toggle and remove"
			description="A chip toggles on click. is-removable adds an × and makes Delete fire remove; the listener takes it out."
		/>
	</ComponentDoc>
)
