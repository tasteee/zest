import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZSelectDoc = () => (
	<ComponentDoc
		tag="z-select"
		category="Forms"
		description="A compact single-choice dropdown driven by an options attribute. Use it when the choice set is known and no search is necessary."
	>
		<DocExample
			demo="z-select/supply-options-as-a-property"
			title="Supply options from JavaScript"
			description="Array-valued props are passed from JavaScript or React, not written as an HTML attribute. Wrap standalone selects in z-field for their visible and accessible name."
		/>
		<DocExample
			demo="z-select/handle-a-committed-choice"
			title="Handle a committed choice"
			description="The change event reports the selected value."
		/>
		<DocExample
			demo="z-select/nest-options-as-submenus"
			title="Nest options as submenus"
			description="Give an option children to make it a branch that opens a cascading submenu. Only leaves can be selected, value stays a single string, and change also reports the path of values from the root down to the leaf."
		/>
	</ComponentDoc>
)
