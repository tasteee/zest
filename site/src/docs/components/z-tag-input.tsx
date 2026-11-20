import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZTagInputDoc = () => (
	<ComponentDoc
		tag="z-tag-input"
		category="Forms"
		description="A text field that turns entries into chips. Type, press Enter or a comma, paste a list."
	>
		<DocExample
			demo="z-tag-input/add-tags-as-you-type"
			title="Add tags as you type"
			description="Suggestions come from a native datalist. Backspace in the empty field steps back into the tags."
		/>
		<DocExample
			demo="z-tag-input/keep-the-value"
			title="Keep the value"
			description="change carries the whole string[]. max caps how many it takes."
		/>
	</ComponentDoc>
)
