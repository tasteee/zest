import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZChipGroupDoc = () => (
	<ComponentDoc
		tag="z-chip-group"
		category="Forms"
		description="A wrapping row of chips with one value. Single choice by default, many with is-multiple."
	>
		<DocExample
			demo="z-chip-group/filter-a-list"
			title="Filter a list"
			description="is-multiple keeps several selected. value is a string[] either way."
		/>
		<DocExample
			demo="z-chip-group/choose-one"
			title="Choose one"
			description="Without is-multiple, selecting a chip clears the rest. tone, size and kind on the group reach every chip."
		/>
	</ComponentDoc>
)
