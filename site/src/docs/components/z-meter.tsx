import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZMeterDoc = () => (
	<ComponentDoc
		tag="z-meter"
		category="Feedback"
		description="A level inside a known range, coloured by how good it is."
	>
		<DocExample
			demo="z-meter/let-the-regions-pick-the-color"
			title="Let the regions pick the color"
			description="low, high and optimum work as on the native meter: success, then warning, then danger as the value moves away from the optimum."
		/>
		<DocExample
			demo="z-meter/segment-the-bar"
			title="Segment the bar"
			description="segments splits it into cells. tone fixes the color when there are no regions."
		/>
	</ComponentDoc>
)
