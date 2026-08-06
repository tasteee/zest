import { defineInteractiveExample, queryAllPreview, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type TerminalLineT = {
	text: string
	type?: 'command' | 'output'
	delay?: number
	typeSpeed?: number
	fade?: number
}

type TerminalElementT = HTMLElement & {
	code: string
	lines: TerminalLineT[]
	play: () => void
	pause: () => void
	restart: () => void
}

// The source of every static example. Written as an array and joined so the
// lines stay readable at this file's indentation — a template literal would
// carry its own leading tabs into the terminal body.
const buildSource = (lines: string[]): string => {
	return lines.join('\n')
}

const INSTALL_SOURCE = buildSource(['$ npm install zest-elements', 'added 42 packages in 1.4s', '$ npx zesty init', '✓ wrote zest.config.ts'])

const DEPLOY_SOURCE = buildSource([
	'$ zesty build',
	'compiling 128 modules',
	'✓ bundled in 1.2s',
	'$ zesty test',
	'running 64 specs',
	'✓ 64 passed',
	'$ zesty deploy --prod',
	'uploading dist/ → edge',
	'✓ live at https://zesty.dev'
])

const LOG_SOURCE = buildSource([
	'12:04:01 worker started',
	'12:04:03 queue drained',
	'12:04:09 cache warmed',
	'12:04:11 3 jobs scheduled',
	'12:04:18 job#1 complete',
	'12:04:24 job#2 complete'
])

const buildPlaygroundTerminal = (): HTMLElement => {
	const terminal = document.createElement('z-terminal') as TerminalElementT
	terminal.setAttribute('shell', 'zsh')
	terminal.setAttribute('cwd', '~/app')
	terminal.className = 'demoFullWidth'
	terminal.code = INSTALL_SOURCE
	return terminal
}

export const zTerminalDoc: ComponentDocT = {
	tag: 'z-terminal',
	title: 'z-terminal',
	tagline: 'A terminal window for command walkthroughs, with a live-session mode.',
	status: ComponentStatus.stable,

	description:
		'A chrome-styled shell window for install steps and CLI usage — no line numbers, no syntax highlighting, and a seamless header, so it reads as a session rather than a source file. Lines opening with the `prompt` marker are treated as commands: they copy on hover, minus the marker. Add `does-animate` and the same content plays back as a live session, commands typing out under a blinking caret and output fading in behind them. Give the window a `width` and `height` and it holds that footprint — a long run scrolls inside it instead of pushing the page around.',

	playground: {
		buildElement: buildPlaygroundTerminal,
		controlNames: ['shell', 'cwd', 'prompt', 'copy-lines', 'width', 'height', 'max-height', 'does-animate', 'does-loop', 'has-replay', 'does-auto-scroll', 'accent'],
		slotLabel: 'code set as a property'
	},

	usageGuidance: [
		'Set `code` as a **property**, not an attribute. Whitespace is the content here, and an attribute round-trips it through HTML parsing.',
		'Reach for this over `z-code-block` when the subject is a session — things you type and what comes back. For a file you would open in an editor, the code block is the honest frame.',
		'`does-animate` is for the top of a landing or getting-started page, where the point is what the tool feels like. Inside reference docs it costs the reader time they did not ask to spend.',
		'Pair `does-animate` with `does-start-on-view` so a run below the fold does not finish before anyone sees it.',
		'Give an animated terminal a `height`. Without one, the window grows line by line and shoves the page down mid-read.',
		'`copy-lines="none"` suits pasted output — a log or a stack trace has nothing worth copying line by line.'
	],

	anatomy: [
		{ name: 'bar', description: 'The header: shell label and working directory on the left, window dots on the right. No divider — it shares the body surface.' },
		{ name: 'dots', description: 'Traffic-light window dots. Decorative, and hidden from assistive tech.' },
		{ name: 'scroll', description: 'The scrolling viewport. Fills whatever height is left under the bar once the window is sized.' },
		{ name: 'line', description: 'One terminal row — a prompt marker plus command, or a plain output line.' },
		{ name: 'copy', description: 'The per-line copy button, revealed on hover over a copyable line.' },
		{ name: 'replay', description: 'The bottom-right control that appears once an animated run finishes.' }
	],

	examples: [
		defineInteractiveExample({
			id: 'basic',
			title: 'Basic',
			description: 'Command lines are the ones opening with the prompt marker. Hover one and a copy button appears; copying strips the `$`.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal id="installTerminal" shell="zsh" cwd="~/app"></z-terminal>
			`,
			script: `
				const installTerminal = document.querySelector('#installTerminal')

				installTerminal.code = [
				  '$ npm install zest-elements',
				  'added 42 packages in 1.4s',
				  '$ npx zesty init',
				  '✓ wrote zest.config.ts'
				].join('\\n')
			`,
			wire: (root) => {
				const installTerminal = queryPreview<TerminalElementT>(root, '#installTerminal')
				installTerminal.code = INSTALL_SOURCE
			}
		}),

		defineInteractiveExample({
			id: 'sized',
			title: 'A fixed window',
			description:
				'`width` and `height` take any CSS length and pin the window. The header stays put and the body scrolls in the space left over, so the terminal keeps its footprint however many lines it holds.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal id="sizedTerminal" shell="zsh" cwd="~/app" width="34rem" height="11rem"></z-terminal>
			`,
			script: `
				const sizedTerminal = document.querySelector('#sizedTerminal')

				sizedTerminal.code = [
				  '$ zesty build',
				  'compiling 128 modules',
				  '✓ bundled in 1.2s',
				  '$ zesty test',
				  'running 64 specs',
				  '✓ 64 passed',
				  '$ zesty deploy --prod',
				  'uploading dist/ → edge',
				  '✓ live at https://zesty.dev'
				].join('\\n')
			`,
			wire: (root) => {
				const sizedTerminal = queryPreview<TerminalElementT>(root, '#sizedTerminal')
				sizedTerminal.code = DEPLOY_SOURCE
			}
		}),

		defineInteractiveExample({
			id: 'max-height',
			title: 'Capped instead of fixed',
			description:
				'`max-height` lets a short session render at its natural size and only starts scrolling past the cap — the right choice for a log whose length you do not know up front.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal id="logTerminal" shell="bash" cwd="~/logs" max-height="8rem" copy-lines="none"></z-terminal>
			`,
			script: `
				const logTerminal = document.querySelector('#logTerminal')

				logTerminal.code = [
				  '12:04:01 worker started',
				  '12:04:03 queue drained',
				  '12:04:09 cache warmed',
				  '12:04:11 3 jobs scheduled',
				  '12:04:18 job#1 complete',
				  '12:04:24 job#2 complete'
				].join('\\n')
			`,
			wire: (root) => {
				const logTerminal = queryPreview<TerminalElementT>(root, '#logTerminal')
				logTerminal.code = LOG_SOURCE
			}
		}),

		defineInteractiveExample({
			id: 'animated',
			title: 'Animated session',
			description:
				'`does-animate` plays the content back: commands type out under a blinking caret, output fades in, and only one line reveals at a time. The replay control appears bottom-right when the run ends.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal id="animatedTerminal" shell="zsh" cwd="~/app" does-animate does-start-on-view does-loop></z-terminal>
			`,
			script: `
				const animatedTerminal = document.querySelector('#animatedTerminal')

				animatedTerminal.code = [
				  '$ npm install zest-elements',
				  'added 42 packages in 1.4s',
				  '$ npx zesty init',
				  '✓ wrote zest.config.ts'
				].join('\\n')
			`,
			wire: (root) => {
				const animatedTerminal = queryPreview<TerminalElementT>(root, '#animatedTerminal')
				animatedTerminal.code = INSTALL_SOURCE
			}
		}),

		defineInteractiveExample({
			id: 'animated-in-a-box',
			title: 'A long run in a sized window',
			description:
				'A sized terminal never grows as an animated run reveals lines — it scrolls, following the playhead so the newest line stays in view. Add `does-auto-scroll` to leave the scroll position to the reader.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal id="scrollingTerminal" shell="zsh" cwd="~/app" width="34rem" height="9rem" does-animate does-loop does-start-on-view></z-terminal>
			`,
			script: `
				const scrollingTerminal = document.querySelector('#scrollingTerminal')

				scrollingTerminal.code = [
				  '$ zesty build',
				  'compiling 128 modules',
				  '✓ bundled in 1.2s',
				  '$ zesty test',
				  'running 64 specs',
				  '✓ 64 passed',
				  '$ zesty deploy --prod',
				  'uploading dist/ → edge',
				  '✓ live at https://zesty.dev'
				].join('\\n')
			`,
			wire: (root) => {
				const scrollingTerminal = queryPreview<TerminalElementT>(root, '#scrollingTerminal')
				scrollingTerminal.code = DEPLOY_SOURCE
			}
		}),

		defineInteractiveExample({
			id: 'per-line-timing',
			title: 'Per-line timing',
			description:
				'Set `lines` instead of `code` to control each step. `delay` is the pause **before** a line begins, so a slow build can hold while the rest of the run stays brisk.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal id="timedTerminal" shell="zsh" cwd="~/app" width="34rem" height="9rem" does-animate does-loop does-start-on-view></z-terminal>
			`,
			script: `
				const timedTerminal = document.querySelector('#timedTerminal')

				timedTerminal.lines = [
				  { text: '$ pnpm dev', typeSpeed: 55 },
				  { text: 'compiling modules', delay: 900 },
				  { text: '✓ ready in 842ms', delay: 700 },
				  { text: '$ open http://localhost:5173', delay: 600 }
				]
			`,
			wire: (root) => {
				const timedTerminal = queryPreview<TerminalElementT>(root, '#timedTerminal')

				timedTerminal.lines = [
					{ text: '$ pnpm dev', typeSpeed: 55 },
					{ text: 'compiling modules', delay: 900 },
					{ text: '✓ ready in 842ms', delay: 700 },
					{ text: '$ open http://localhost:5173', delay: 600 }
				]
			}
		}),

		defineInteractiveExample({
			id: 'controls',
			title: 'Imperative controls',
			description: 'Playback is exposed as methods, so a run can be driven by your own UI instead of the built-in replay control.',
			layout: ExampleLayout.stack,
			markup: `
				<z-terminal id="controlledTerminal" shell="zsh" cwd="~/app" width="34rem" height="9rem" does-animate does-loop has-replay></z-terminal>

				<z-row gap="2">
				  <z-button id="playButton" size="sm" kind="outline" label="Play"></z-button>
				  <z-button id="pauseButton" size="sm" kind="outline" label="Pause"></z-button>
				  <z-button id="restartButton" size="sm" kind="outline" label="Restart"></z-button>
				</z-row>
			`,
			script: `
				const controlledTerminal = document.querySelector('#controlledTerminal')
				controlledTerminal.code = deploySource

				document.querySelector('#playButton').addEventListener('click', () => controlledTerminal.play())
				document.querySelector('#pauseButton').addEventListener('click', () => controlledTerminal.pause())
				document.querySelector('#restartButton').addEventListener('click', () => controlledTerminal.restart())

				controlledTerminal.addEventListener('done', () => {})
			`,
			wire: (root) => {
				const controlledTerminal = queryPreview<TerminalElementT>(root, '#controlledTerminal')
				controlledTerminal.code = DEPLOY_SOURCE

				const playButton = queryPreview<HTMLElement>(root, '#playButton')
				const pauseButton = queryPreview<HTMLElement>(root, '#pauseButton')
				const restartButton = queryPreview<HTMLElement>(root, '#restartButton')

				playButton.addEventListener('click', () => controlledTerminal.play?.())
				pauseButton.addEventListener('click', () => controlledTerminal.pause?.())
				restartButton.addEventListener('click', () => controlledTerminal.restart?.())
			}
		}),

		defineInteractiveExample({
			id: 'accents',
			title: 'Tones',
			description: 'The accent colors the prompt marker, the shell label, and the typing caret. Green by default; `secondary` swaps in purple.',
			layout: ExampleLayout.fill,
			markup: `
				<z-terminal class="accentedTerminal" shell="zsh" cwd="~/app" width="34rem"></z-terminal>
				<z-terminal class="accentedTerminal" shell="zsh" cwd="~/app" width="34rem" accent="sub"></z-terminal>
			`,
			script: `
				for (const terminal of document.querySelectorAll('.accentedTerminal')) {
				  terminal.code = installSource
				}
			`,
			wire: (root) => {
				const terminals = queryAllPreview<TerminalElementT>(root, '.accentedTerminal')
				for (const terminal of terminals) {
					terminal.code = INSTALL_SOURCE
				}
			}
		})
	],

	attributes: [
		{ name: 'shell', type: 'string', defaultValue: '—', description: 'Shell label in the header, e.g. zsh.' },
		{ name: 'cwd', type: 'string', defaultValue: '—', description: 'Working directory shown beside the shell label.' },
		{ name: 'prompt', type: 'string', defaultValue: '$', description: 'The marker that makes a line a command.' },
		{ name: 'copy-lines', type: 'string', defaultValue: 'commands', description: 'Which lines copy: all, none, commands, or ranges like 1-3,5.' },
		{ name: 'width', type: 'string', defaultValue: '—', description: 'CSS length for the window width.' },
		{ name: 'height', type: 'string', defaultValue: '—', description: 'CSS length that pins the window height; the body scrolls inside it.' },
		{ name: 'max-height', type: 'string', defaultValue: '—', description: 'CSS length that caps growth rather than fixing the height.' },
		{ name: 'does-animate', type: 'boolean', defaultValue: '—', description: 'Play the content back as a typed and faded simulation.' },
		{ name: 'does-start-on-view', type: 'boolean', defaultValue: '—', description: 'Wait until the terminal scrolls into view before playing.' },
		{ name: 'type-speed', type: 'number', defaultValue: '55', description: 'Milliseconds per character for typed commands.' },
		{ name: 'line-delay', type: 'number', defaultValue: '380', description: 'Milliseconds of gap before each line reveals.' },
		{ name: 'fade-duration', type: 'number', defaultValue: '240', description: 'Milliseconds for an output line to fade in.' },
		{ name: 'does-loop', type: 'boolean', defaultValue: '—', description: 'Restart automatically after the last line.' },
		{ name: 'loop-delay', type: 'number', defaultValue: '2200', description: 'Milliseconds to wait before an auto-restart.' },
		{ name: 'has-replay', type: 'boolean', defaultValue: '—', description: 'Suppress the bottom-right replay control.' },
		{ name: 'does-auto-scroll', type: 'boolean', defaultValue: '—', description: 'Do not follow the playhead while an animated run plays.' },
		{ name: 'accent', type: 'dom | sub', defaultValue: 'dom', description: 'Accent color for the prompt, shell label, and caret.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Hide the element.' }
	],

	properties: [
		{ name: 'code', type: 'string', defaultValue: '—', description: 'The session source, one terminal line per row. Set as a property to preserve whitespace.' },
		{
			name: 'lines',
			type: 'array',
			defaultValue: '—',
			description: 'Per-line content and timing: { text, type, delay, typeSpeed, fade }. Overrides code when set.'
		}
	],

	slots: [],

	events: [
		{ name: 'copy', detail: 'string', description: 'Fired after a line is copied, carrying the copied text.' },
		{ name: 'done', detail: 'void', description: 'Fired when an animated sequence reaches its last line.' }
	],

	cssVariables: [
		{ name: '--z-terminal-width', defaultValue: 'auto', description: 'Set by the width attribute; the window width.' },
		{ name: '--z-terminal-height', defaultValue: 'auto', description: 'Set by the height attribute; the pinned window height.' },
		{ name: '--z-terminal-max-height', defaultValue: 'none', description: 'Set by the max-height attribute; the growth cap.' }
	],

	accessibilityNotes: [
		'Terminal text stays selectable even though the page opts out elsewhere, so a reader can select a fragment rather than taking a whole line.',
		'Each copy button carries an accessible name and is reachable by keyboard; it is revealed by focus as well as hover.',
		'The traffic-light dots are aria-hidden — they are window chrome, not content.',
		'prefers-reduced-motion skips the animation entirely and renders the final state, caret blinking included.',
		'The replay control is removed from the tab order until a run completes, so it is never a focus stop that does nothing.'
	],

	related: [
		{ tag: 'z-code-block', route: '/c/specialized/z-code-block', description: 'For source files: line numbers and syntax highlighting.' },
		{ tag: 'z-streaming-text', route: '/c/specialized/z-streaming-text', description: 'The same typed-out feel for prose.' },
		{ tag: 'z-scroll', route: '/c/layout/z-scroll', description: 'The general-purpose scroll container.' }
	]
}
