import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZCheckboxGroupDoc = () => (
	<ComponentDoc
		tag="z-checkbox-group"
		category="Forms"
		description="Pick any number of options. The group owns one string[] value, validates it, and submits it."
	>
		<DocExample
			demo="z-checkbox-group/pick-several"
			title="Pick several"
			description="Seed children with is-checked, or set value. The group submits one entry per checked box."
		/>
		<DocExample
			demo="z-checkbox-group/select-all-and-limits"
			title="Select all, with a limit"
			description="has-select-all adds a parent that goes mixed when some are checked. max validates on submit."
		/>
		<DocExample
			demo="z-checkbox-group/lay-them-in-a-row"
			title="Lay them in a row"
			description="is-horizontal wraps short options onto one line."
		/>
	</ComponentDoc>
)
