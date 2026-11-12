import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZScrollAreaDoc = () => (
	<ComponentDoc
		tag="z-scroll-area"
		category="Layout"
		description="A deliberately bounded overflow region with Zest scroll treatment. Use it for a panel-sized collection, never as a substitute for deciding how a page should grow."
	>
		<DocExample
			demo="z-scroll-area/constrain-a-vertical-collection"
			title="Constrain a vertical collection"
			description="Give the region a clear maximum height and preserve normal reading order inside it."
		/>
		<DocExample
			demo="z-scroll-area/use-horizontal-scrolling-sparingly"
			title="Use horizontal scrolling sparingly"
			description="A horizontal strip is appropriate for intentionally wide, peer content."
		/>
		<DocExample
			demo="z-scroll-area/keep-the-boundary-visible-in"
			title="Keep the boundary visible in context"
			description="The surrounding panel or region, not extra borders, should make the scroll area understandable."
		/>
	</ComponentDoc>
)
