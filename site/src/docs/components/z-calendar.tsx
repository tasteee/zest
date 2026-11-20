import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZCalendarDoc = () => (
	<ComponentDoc
		tag="z-calendar"
		category="Forms"
		description="A month grid for picking one day, or with is-range, a range of days. Month and year each have their own arrows, and days from neighbouring months stay visible but quiet."
	>
		<DocExample
			demo="z-calendar/pick-a-single-day"
			title="Pick a single day"
			description="value is an ISO date. Today carries a dot, the selected day is filled, and days outside the viewed month are dimmed but can still be picked."
		/>
		<DocExample
			demo="z-calendar/select-a-range"
			title="Select a range"
			description="Add is-range and value becomes an ISO interval, start/end. The first click sets the start, the second sets the end, and moving the pointer between them previews the span."
		/>
		<DocExample
			demo="z-calendar/limit-the-selectable-days"
			title="Limit the selectable days"
			description="min and max dim the days that cannot be picked, and disable arrows that would leave the allowed range. first-day-of-week starts each row on Monday."
		/>
		<DocExample
			demo="z-calendar/read-the-selected-range"
			title="Read the selection"
			description="input fires on every click, including the first click of a range. change fires once the selection is complete. Both carry { value, start, end }."
		/>
	</ComponentDoc>
)
