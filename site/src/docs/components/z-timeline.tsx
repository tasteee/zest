import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZTimelineDoc = () => (
	<ComponentDoc
		tag="z-timeline"
		category="Data display"
		description="Events in order down a rail: a delivery, an activity feed, a history."
		partTags={['z-timeline-item']}
	>
		<DocExample
			demo="z-timeline/tell-the-story-in-order"
			title="Tell the story in order"
			description="Each item has a heading, a time and a description. is-pending marks what has not happened yet."
		/>
		<DocExample
			demo="z-timeline/mark-events-with-icons"
			title="Mark events with icons"
			description="An icon turns the marker into a badge. The time slot takes a z-relative-time."
		/>
	</ComponentDoc>
)
