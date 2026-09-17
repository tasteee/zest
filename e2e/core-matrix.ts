/*
 * The state matrix for the core set. Each entry says what to put on the
 * stage and which element to hover, focus and press. The runner
 * (core-matrix.screens.ts) photographs every entry per theme:
 *
 *   rest    — every static state in one image: default, disabled, error /
 *             invalid, loading, a long label, and a 320px container
 *   hover / focus / active — the interaction states on `probe`
 *   rtl     — the rest states with dir="rtl"
 *   forced  — the rest states under forced-colors
 *
 * `setup` runs in the page after the markup lands, for anything that needs
 * a property (options, rows, items) rather than an attribute. It is
 * serialised by source, so it can close over nothing — data lives inline.
 */

export type MatrixEntryT = {
	tag: string
	/** Rows of `{ name, markup }` rendered in order on the stage. */
	states: Array<{ name: string; markup: string }>
	/** Selector (piercing shadow DOM, Playwright style) for the element hover and active are applied to. */
	probe?: string
	/** The element that takes keyboard focus, when it is not the hover target (a hidden native input under a label). */
	focusProbe?: string
	/** Runs in the page once the stage is populated. */
	setup?: (stage: HTMLElement) => void | Promise<void>
	/** Real key presses after setup — for states that :focus-visible must agree on, which a synthetic event cannot guarantee. */
	keys?: string[]
	/** Extra height for overlays that float beyond the stage. */
	viewport?: { width: number; height: number }
}

const state = (name: string, markup: string) => ({ name, markup })
const narrow = (markup: string) => `<div class="narrow">${markup}</div>`
const long = 'A label that is a good deal longer than the room it has been given'

export const coreMatrix: MatrixEntryT[] = [
	{
		tag: 'z-button',
		probe: '#probe button',
		states: [
			state('kinds', ['solid', 'outline', 'ghost', 'soft', 'plain'].map((kind) => `<z-button kind="${kind}" accent="dom">${kind}</z-button>`).join(' ')),
			state('accents', ['neutral', 'dom', 'sub', 'success', 'warning', 'error'].map((accent) => `<z-button accent="${accent}">${accent}</z-button>`).join(' ')),
			state('sizes', '<z-button size="sm" accent="dom">Small</z-button> <z-button size="md" accent="dom">Medium</z-button> <z-button size="lg" accent="dom">Large</z-button>'),
			state('disabled / loading', '<z-button accent="dom" is-disabled>Disabled</z-button> <z-button accent="dom" is-loading>Loading</z-button>'),
			state('long / narrow', narrow(`<z-button accent="dom" is-full-width>${long}</z-button>`)),
			state('probe', '<z-button accent="dom" id="probe">Probe</z-button>')
		]
	},
	{
		tag: 'z-button-group',
		probe: '#probe button',
		states: [
			state('default', '<z-button-group><z-button kind="outline">Left</z-button><z-button kind="outline" id="probe">Middle</z-button><z-button kind="outline">Right</z-button></z-button-group>'),
			state('vertical', '<z-button-group vertical><z-button kind="outline">Top</z-button><z-button kind="outline">Bottom</z-button></z-button-group>'),
			state('narrow', narrow(`<z-button-group><z-button kind="outline">${long}</z-button><z-button kind="outline">Two</z-button></z-button-group>`))
		]
	},
	{
		tag: 'z-input',
		probe: '#probe input',
		states: [
			state('default', '<z-input id="probe" label="Email" placeholder="you@example.com" value="ada@example.com"></z-input>'),
			state('sizes', '<z-input size="sm" label="Small" placeholder="Small"></z-input><z-input size="lg" label="Large" placeholder="Large"></z-input>'),
			state('disabled / readonly', '<z-input label="Disabled" value="Disabled" is-disabled></z-input><z-input label="Readonly" value="Readonly" is-readonly></z-input>'),
			state('error', '<z-field label="Email" error="Enter a valid address"><z-input value="not-an-email"></z-input></z-field>'),
			state('long / narrow', narrow(`<z-input label="Long" value="${long}"></z-input>`))
		]
	},
	{
		tag: 'z-textarea',
		probe: '#probe textarea',
		states: [
			state('default', '<z-textarea id="probe" label="Notes" value="Two lines\nof text"></z-textarea>'),
			state('disabled', '<z-textarea label="Disabled" value="Disabled" is-disabled></z-textarea>'),
			state('error', '<z-field label="Notes" error="Too short"><z-textarea value="x"></z-textarea></z-field>'),
			state('narrow', narrow(`<z-textarea label="Long" value="${long} ${long}"></z-textarea>`))
		]
	},
	{
		tag: 'z-number-input',
		probe: '#probe input',
		states: [
			state('default', '<z-number-input id="probe" label="Quantity" value="3" min="0" max="10" has-stepper-buttons></z-number-input>'),
			state('disabled', '<z-number-input label="Disabled" value="3" is-disabled has-stepper-buttons></z-number-input>'),
			state('error', '<z-field label="Quantity" error="Must be 10 or less"><z-number-input value="12" max="10"></z-number-input></z-field>'),
			state('narrow', narrow('<z-number-input label="Narrow" value="1234567890" has-stepper-buttons></z-number-input>'))
		]
	},
	{
		tag: 'z-checkbox',
		probe: '#probe label',
		focusProbe: '#probe input',
		states: [
			state('default', '<z-checkbox id="probe" name="a">Unchecked</z-checkbox> <z-checkbox name="b" is-checked>Checked</z-checkbox>'),
			state('sizes', '<z-checkbox size="sm" is-checked>Small</z-checkbox> <z-checkbox size="lg" is-checked>Large</z-checkbox>'),
			state('disabled', '<z-checkbox is-disabled>Disabled</z-checkbox> <z-checkbox is-disabled is-checked>Disabled checked</z-checkbox>'),
			state('error', '<z-field label="Terms" error="You must agree"><z-checkbox>I agree</z-checkbox></z-field>'),
			state('narrow', narrow(`<z-checkbox>${long}</z-checkbox>`))
		]
	},
	{
		tag: 'z-switch',
		probe: '#probe input',
		states: [
			state('default', '<z-switch id="probe">Off</z-switch> <z-switch is-checked>On</z-switch>'),
			state('sizes', '<z-switch size="sm" is-checked>Small</z-switch> <z-switch size="lg" is-checked>Large</z-switch>'),
			state('disabled', '<z-switch is-disabled>Disabled</z-switch> <z-switch is-disabled is-checked>Disabled on</z-switch>'),
			state('narrow', narrow(`<z-switch>${long}</z-switch>`))
		]
	},
	{
		tag: 'z-radio-group',
		probe: '#probe label',
		focusProbe: '#probe input',
		states: [
			state('default', '<z-radio-group label="Plan" value="b"><z-radio value="a" id="probe">Free</z-radio><z-radio value="b">Pro</z-radio><z-radio value="c" is-disabled>Team</z-radio></z-radio-group>'),
			state('horizontal', '<z-radio-group label="Plan" direction="horizontal" value="a"><z-radio value="a">Free</z-radio><z-radio value="b">Pro</z-radio></z-radio-group>'),
			state('error', '<z-field label="Plan" error="Pick one"><z-radio-group><z-radio value="a">Free</z-radio><z-radio value="b">Pro</z-radio></z-radio-group></z-field>'),
			state('narrow', narrow(`<z-radio-group label="Plan"><z-radio value="a">${long}</z-radio></z-radio-group>`))
		]
	},
	{
		tag: 'z-select',
		probe: '#probe button.trigger',
		viewport: { width: 960, height: 900 },
		states: [
			state('default', '<z-select id="probe" label="Fruit" placeholder="Pick a fruit"></z-select><z-select label="Chosen" value="banana"></z-select>'),
			state('disabled / invalid', '<z-select label="Disabled" value="apple" is-disabled></z-select><z-select label="Invalid" is-invalid placeholder="Invalid"></z-select>'),
			state('error', '<z-field label="Fruit" error="Choose one"><z-select></z-select></z-field>'),
			state('narrow', narrow('<z-select label="Narrow" value="banana"></z-select>')),
			state('open', '<z-select id="open" label="Open" value="apple"></z-select>')
		],
		setup: (stage) => {
			const options = [{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }, { value: 'cherry', label: 'Cherry', isDisabled: true }]
			for (const el of stage.querySelectorAll('z-select')) (el as HTMLElement & { options?: unknown }).options = options
			;(stage.querySelector('#open')!.shadowRoot!.querySelector('button.trigger') as HTMLElement).click()
		}
	},
	{
		tag: 'z-combobox',
		probe: '#probe input',
		viewport: { width: 960, height: 900 },
		states: [
			state('default', '<z-combobox id="probe" label="City" placeholder="Search…"></z-combobox><z-combobox label="Chosen" value="banana"></z-combobox>'),
			state('disabled / invalid', '<z-combobox label="Disabled" value="apple" is-disabled></z-combobox><z-combobox label="Invalid" is-invalid></z-combobox>'),
			state('error', '<z-field label="City" error="Choose one"><z-combobox></z-combobox></z-field>'),
			state('narrow', narrow('<z-combobox label="Narrow" value="banana"></z-combobox>'))
		],
		setup: (stage) => {
			const options = [{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }, { value: 'cherry', label: 'Cherry', isDisabled: true }]
			for (const el of stage.querySelectorAll('z-combobox')) (el as HTMLElement & { options?: unknown }).options = options
		}
	},
	{
		tag: 'z-field',
		states: [
			state('default', '<z-field label="Email" description="We never share it"><z-input placeholder="you@example.com"></z-input></z-field>'),
			state('required / hidden label', '<z-field label="Name" is-required><z-input></z-input></z-field><z-field label="Hidden" is-label-hidden><z-input placeholder="Label is visually hidden"></z-input></z-field>'),
			state('error', '<z-field label="Email" error="Enter a valid address"><z-input value="nope"></z-input></z-field>'),
			state('mixed row', '<div style="display:flex;gap:12px"><z-field label="Text"><z-input></z-input></z-field><z-field label="Switch"><z-switch></z-switch></z-field><z-field label="Select"><z-select placeholder="Pick"></z-select></z-field></div>'),
			state('narrow', narrow(`<z-field label="${long}" description="${long}"><z-input></z-input></z-field>`))
		]
	},
	{
		tag: 'z-dialog',
		viewport: { width: 960, height: 720 },
		states: [
			state('open', '<z-dialog id="open" heading="Delete project?" description="This cannot be undone."><z-button slot="trigger">Open</z-button><p>All 14 files go with it.</p><z-button slot="footer" kind="outline">Cancel</z-button><z-button slot="footer" accent="error">Delete</z-button></z-dialog>')
		],
		setup: (stage) => { (stage.querySelector('#open') as HTMLElement & { isOpen?: boolean }).isOpen = true }
	},
	{
		tag: 'z-popover',
		viewport: { width: 960, height: 720 },
		states: [
			state('open', '<div style="height:120px"></div><z-popover id="open" label="Details" placement="bottom"><z-button slot="trigger">Details</z-button><div style="padding:4px 0"><strong>Ada Lovelace</strong><br>Analyst, 1843</div></z-popover>')
		],
		setup: (stage) => { (stage.querySelector('#open') as HTMLElement & { isOpen?: boolean }).isOpen = true }
	},
	{
		tag: 'z-tooltip',
		viewport: { width: 960, height: 720 },
		states: [
			state('open', '<div style="height:60px"></div><z-tooltip id="open" content="Saves your draft" open-delay="0"><z-button>Save</z-button></z-tooltip>'),
			state('placements', '<div style="display:flex;gap:48px;padding:48px 0"><z-tooltip content="Left" placement="left"><z-button kind="outline">Left</z-button></z-tooltip><z-tooltip content="Right" placement="right"><z-button kind="outline">Right</z-button></z-tooltip></div>')
		],
		setup: (stage) => { (stage.querySelector('#open')!.querySelector('z-button')!.shadowRoot!.querySelector('button') as HTMLElement).focus() }
	},
	{
		tag: 'z-menu',
		viewport: { width: 960, height: 720 },
		states: [
			state('open', '<z-menu id="open"><z-button slot="trigger" kind="outline">File</z-button></z-menu><div style="height:220px"></div>')
		],
		setup: async (stage) => {
			const menu = stage.querySelector('#open') as HTMLElement & { items?: unknown; updated?: Promise<void> }
			menu.items = [
				{ value: 'new', label: 'New', shortcut: '⌘N' },
				{ value: 'open', label: 'Open…', shortcut: '⌘O' },
				{ isSeparator: true },
				{ value: 'rename', label: 'Rename', isDisabled: true },
				{ value: 'delete', label: 'Delete', isDanger: true }
			]
			await menu.updated
			menu.querySelector('z-button')!.shadowRoot!.querySelector<HTMLElement>('button')!.focus()
		},
		// A real ArrowDown opens the menu onto its first item with :focus-visible on.
		keys: ['ArrowDown']
	},
	{
		tag: 'z-tabs',
		probe: '#probe [role="tab"]',
		states: [
			state('default', '<z-tabs id="probe" label="Sections" value="b"><div slot="a">Alpha panel</div><div slot="b">Beta panel content</div><div slot="c">Gamma</div></z-tabs>'),
			state('fitted', '<z-tabs label="Fitted" is-fitted accent="dom"><div slot="a">A</div><div slot="b">B</div><div slot="c">C</div></z-tabs>'),
			state('narrow', narrow('<z-tabs label="Narrow"><div slot="a">A</div><div slot="b">B</div><div slot="c">C</div></z-tabs>'))
		],
		setup: (stage) => {
			for (const el of stage.querySelectorAll('z-tabs')) (el as HTMLElement & { tabs?: unknown }).tabs = [
				{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }, { value: 'c', label: 'A label that is longer', isDisabled: true }
			]
		}
	},
	{
		tag: 'z-table',
		probe: '#probe tbody tr',
		states: [
			state('default', '<z-table id="probe" is-clickable></z-table>'),
			state('striped', '<z-table is-striped></z-table>'),
			state('empty', '<z-table id="empty" empty-label="Nothing here yet"></z-table>'),
			state('narrow', narrow('<z-table id="narrow"></z-table>'))
		],
		setup: (stage) => {
			const columns = [{ key: 'name', label: 'Name' }, { key: 'qty', label: 'Qty', align: 'end', isMono: true }, { key: 'note', label: 'Note' }]
			const rows = [
				{ id: 1, name: 'Olives', qty: 3, note: 'Kalamata' },
				{ id: 2, name: 'Basil', qty: 12, note: 'A note that is a good deal longer than the room it has been given' },
				{ id: 3, name: 'Chili', qty: 1, note: '—' }
			]
			for (const el of stage.querySelectorAll('z-table')) {
				const table = el as HTMLElement & { columns?: unknown; rows?: unknown }
				table.columns = columns
				table.rows = el.id === 'empty' ? [] : rows
			}
		}
	},
	{
		tag: 'z-table-toolbar',
		viewport: { width: 960, height: 400 },
		states: [
			state('open', '<div style="height:80px"></div><z-table-toolbar id="open" is-open></z-table-toolbar><z-table-axis-handle id="axis" axis="column" is-open is-selected></z-table-axis-handle>')
		],
		setup: (stage) => {
			const toolbar = stage.querySelector('#open') as HTMLElement & { items?: unknown; anchorRect?: unknown }
			toolbar.anchorRect = { x: 60, y: 120, width: 320, height: 40 }
			toolbar.items = [{ value: 'insert-row', label: 'Insert row' }, { value: 'insert-col', label: 'Insert column' }, { value: 'delete', label: 'Delete' }]
			const axis = stage.querySelector('#axis') as HTMLElement & { anchorRect?: unknown }
			axis.anchorRect = { x: 420, y: 120, width: 80, height: 24 }
		}
	},
	{
		tag: 'z-toast',
		viewport: { width: 960, height: 480 },
		states: [
			state('stack', '<z-toast id="toast" position="bottom-end"></z-toast>')
		],
		setup: (stage) => {
			const toast = stage.querySelector('#toast') as HTMLElement & { push: (input: Record<string, unknown>) => number }
			toast.push({ title: 'Saved', description: 'Your changes are live.', accent: 'success', duration: 0 })
			toast.push({ title: 'Heads up', description: 'A description that is a good deal longer than the room it has been given', accent: 'warning', duration: 0 })
			toast.push({ title: 'Failed', accent: 'error', duration: 0 })
			toast.push({ title: 'Neutral', duration: 0 })
		}
	},
	{
		tag: 'z-alert',
		probe: '#probe button.close',
		states: [
			state('accents', ['neutral', 'dom', 'success', 'warning', 'error'].map((accent) => `<z-alert accent="${accent}" heading="${accent}">Body text for the ${accent} alert.</z-alert>`).join('')),
			state('dismissable', '<z-alert id="probe" accent="warning" heading="Heads up" is-dismissable>Can be dismissed.</z-alert>'),
			state('narrow', narrow(`<z-alert accent="dom" heading="${long}" is-dismissable>${long}</z-alert>`))
		]
	}
]
