import { ComponentDoc } from '@app/docs/ComponentDoc'
import { DocExample } from '@app/docs/DocExample'

export const ZTerminalDoc = () => (
	<ComponentDoc
		tag="z-terminal"
		category="Specialized"
		description="A terminal window for command walkthroughs. Copy a command line, or select any snippet and copy just that. It can play a session back, line by line, and loop."
	>
		<DocExample
			demo="z-terminal/overview"
			title="Overview"
			description="lines that start with the prompt are commands · hover a command to copy it without the prompt"
		/>
		<DocExample
			demo="z-terminal/copy"
			title="Copy"
			description="copy-lines picks which lines have a copy button · select text to copy a snippet"
		/>
		<DocExample
			demo="z-terminal/animate"
			title="Animate and loop"
			description="does-animate types commands and fades output in · does-loop restarts it · play(), pause() and restart() control it"
		/>
		<DocExample
			demo="z-terminal/timing"
			title="Per-line timing"
			description="lines takes { text, type, delay, typeSpeed, fade } so a slow step can hold longer"
		/>
	</ComponentDoc>
)
