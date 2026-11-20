import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZColorPickerDoc = () => (
	<ComponentDoc
		tag="z-color-picker"
		category="Forms"
		description="A swatch trigger that opens a full color panel. Use it where people meaningfully choose a color, not as decorative page chrome."
	>
		<DocExample
			demo="z-color-picker/choose-a-brand-color"
			title="Choose a brand color"
			description="The value is a CSS color string in the active format. Listen to change to persist it, or input to follow every move."
		/>
		<DocExample
			demo="z-color-picker/pick-in-oklch"
			title="Pick in a perceptual space"
			description="The format menu sits beside the value it formats. OKLCH and LCH draw chroma against lightness and grey out what sRGB cannot show. has-alpha adds an opacity slider."
		/>
		<DocExample
			demo="z-color-picker/limit-the-formats"
			title="Limit the formats"
			description="formats takes the list you allow. One format turns the menu into a plain label."
		/>
		<DocExample
			demo="z-color-picker/offer-swatches"
			title="Offer swatches"
			description="Swatches are opt-in. Pass the colors people reach for most."
		/>
		<DocExample
			demo="z-color-picker/bring-your-own-trigger"
			title="Bring your own trigger"
			description="Any focusable element in the trigger slot opens the panel. The current color is on the host as --z-color-value."
		/>
	</ComponentDoc>
)
