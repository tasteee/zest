import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZColorSwatchDoc = () => (
	<ComponentDoc
		tag="z-color-swatch"
		category="Data Display"
		description="A read-only color chip with its value. Use it to show a color, not to choose one."
	>
		<DocExample
			demo="z-color-swatch/list-design-tokens"
			title="List design tokens"
			description="Any CSS color works. Translucent colors sit on a checkerboard. With is-value-hidden, label becomes the accessible name."
		/>
	</ComponentDoc>
)
