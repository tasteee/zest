import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZNumberRangeInputDoc = () => (
	<ComponentDoc
		tag="z-number-range-input"
		category="Forms"
		description="Two number fields for a lower and an upper bound. Use it when people should type exact values; reach for z-range when dragging is better."
	>
		<DocExample
			demo="z-number-range-input/set-a-price-interval"
			title="Set a price interval"
			description="value is a [lower, upper] array, so set it from JavaScript or React. min, max, and step are shared by both fields, and the fields never cross."
		/>
		<DocExample
			demo="z-number-range-input/add-a-unit"
			title="Add a prefix or suffix"
			description="value-prefix and value-suffix decorate each value while the field is not being edited. Focus shows the bare number."
		/>
		<DocExample
			demo="z-number-range-input/read-the-committed-interval"
			title="Read the committed interval"
			description="change reports { value: [lower, upper] }. An empty field is null, so open-ended ranges work."
		/>
	</ComponentDoc>
)
