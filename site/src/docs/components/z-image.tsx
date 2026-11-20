import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZImageDoc = () => (
	<ComponentDoc
		tag="z-image"
		category="Data display"
		description="An image that holds its box, shimmers while it loads, fades in, and falls back cleanly."
	>
		<DocExample
			demo="z-image/reserve-the-box"
			title="Reserve the box"
			description="ratio keeps the layout still while the file arrives. caption makes it a figure."
		/>
		<DocExample
			demo="z-image/fit-shape-and-fallback"
			title="Fit, shape and fallback"
			description={`radius="full" with ratio 1 is a circle. focal-point keeps the subject in frame. With no file, or a broken one, the fallback slot shows instead.`}
		/>
	</ComponentDoc>
)
