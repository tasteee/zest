import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZRatingDoc = () => (
	<ComponentDoc
		tag="z-rating"
		category="Forms"
		description="Pick a score with stars, hearts or dots. Works like a slider from the keyboard."
	>
		<DocExample
			demo="z-rating/collect-a-score"
			title="Collect a score"
			description={`can-clear lets a second click undo. step="0.5" allows halves.`}
		/>
		<DocExample
			demo="z-rating/show-an-average"
			title="Show an average"
			description={`is-readonly renders any fraction and names it "Rated 4.3 of 5".`}
		/>
		<DocExample
			demo="z-rating/pick-a-shape"
			title="Pick a shape"
			description="shape and max change the icon and the scale."
		/>
	</ComponentDoc>
)
