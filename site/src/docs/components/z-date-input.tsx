import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZDateInputDoc = () => (
	<ComponentDoc
		tag="z-date-input"
		category="Forms"
		description="A text field for one date or a range of dates. Type it in your format, or add a calendar for picking. The value is always an ISO date."
	>
		<DocExample
			demo="z-date-input/type-a-date-in-your-format"
			title="Type a date in your format"
			description="format is any order of YYYY, MM, and DD with punctuation between. Separators fill in as you type, and a lone 5 in a month becomes 05. An incomplete date reverts on blur."
		/>
		<DocExample
			demo="z-date-input/add-a-calendar"
			title="Add a calendar"
			description="has-calendar adds a button that opens a z-calendar. Picking a day fills the field and closes the calendar. Arrow keys step the typed date by a day, and Alt+Down opens the calendar."
		/>
		<DocExample
			demo="z-date-input/pick-a-stay"
			title="Pick a stay"
			description="is-range shows a start and an end field in one frame, like z-number-range-input. The fields never cross, and the calendar closes after the second click."
		/>
		<DocExample
			demo="z-date-input/read-the-committed-dates"
			title="Read the committed dates"
			description="change reports { value, start, end } when the field is committed. An empty side is null, so open-ended ranges work."
		/>
	</ComponentDoc>
)
