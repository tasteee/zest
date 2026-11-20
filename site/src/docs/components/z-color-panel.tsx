import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZColorPanelDoc = () => (
	<ComponentDoc
		tag="z-color-panel"
		category="Forms"
		description="The color picker without its trigger. Place it inline in inspectors and settings forms that always show color controls."
	>
		<DocExample
			demo="z-color-panel/inline-inspector"
			title="Edit color inline"
			description="Its parent sets the width. has-eyedropper adds a screen picker where the browser supports one."
		/>
		<DocExample
			demo="z-color-panel/lock-one-format"
			title="Lock one format"
			description="A single allowed format shows as a label, not a menu. is-copy-hidden drops the copy button."
		/>
	</ComponentDoc>
)
