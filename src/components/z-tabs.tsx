import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, event, useProp, useHost, useRef, useEffect } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-tabs — a tab list driven by a `tabs` array property:
 *   el.tabs = [{ value, label, isDisabled? }]
 * Panels are provided as named slots whose name matches each tab's value:
 *   <div slot="overview">…</div>
 * The active tab carries an accent underline; only the active panel renders.
 * Keyboard: ←/→ move between tabs (skipping disabled), Home/End jump to ends.
 * Fires `change` with { value } on selection.
 */
const styles = css`
	:host {
		display: block;
		--accent: var(--primary);
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.list {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		gap: 0.25rem;
		border-bottom: 1px solid var(--border);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-fitted]) .list {
		gap: 0;
	}

	.tab {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: transparent;
		border: 0;
		padding: 0.75rem 1rem;
		margin-bottom: -1px;
		font-family: inherit;
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--muted-foreground);
		cursor: pointer;
		white-space: nowrap;
		border-bottom: 2px solid transparent;
		transition:
			color var(--duration-fast) var(--easing-standard),
			border-color var(--duration-fast) var(--easing-standard);
	}

	:host([is-fitted]) .tab {
		flex: 1;
	}

	.tab:hover {
		color: var(--foreground);
	}

	.tab.is-active {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	.tab:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: -2px;
		border-radius: var(--radius-sm);
	}

	.tab:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.panel {
		padding-top: 1.25rem;
		color: var(--foreground);
	}
`

type TabT = { value: string; label: string; isDisabled?: boolean }

export const ZTabs = c(
	(props) => {
		const host = useHost()
		const pendingFocus = useRef<number>()
		const [value, setValue] = useProp<string>('value')
		useEffect(() => {
			if (pendingFocus.current === undefined) return
			host.current.shadowRoot?.querySelector<HTMLButtonElement>(`#tab-${pendingFocus.current}`)?.focus()
			pendingFocus.current = undefined
		})

		const tabs: TabT[] = Array.isArray(props.tabs) ? (props.tabs as TabT[]) : []
		const active = tabs.find((tab) => tab.value === value && !tab.isDisabled)?.value
			?? tabs.find((tab) => !tab.isDisabled)?.value

		const commit = (tab: TabT) => {
			if (tab.isDisabled || tab.value === active) return
			setValue(tab.value)
			props.change({ value: tab.value })
		}

		// In a right-to-left context the arrows swap: → moves to the tab that is
		// visually to the right, which is the previous one in document order.
		const isRightToLeft = () => getComputedStyle(host.current).direction === 'rtl'
		const onKeyDown = (e: KeyboardEvent, index: number) => {
			const forward = isRightToLeft() ? 'ArrowLeft' : 'ArrowRight'
			const backward = isRightToLeft() ? 'ArrowRight' : 'ArrowLeft'
			let next = index
			let step = 1
			if (e.key === forward) next = index + 1
			else if (e.key === backward) { next = index - 1; step = -1 }
			else if (e.key === 'Home') next = 0
			else if (e.key === 'End') { next = tabs.length - 1; step = -1 }
			else return
			e.preventDefault()
			for (let i = 0; i < tabs.length; i++) {
				const candidate = ((next % tabs.length) + tabs.length) % tabs.length
				if (!tabs[candidate].isDisabled) {
					pendingFocus.current = candidate
					commit(tabs[candidate])
					if (tabs[candidate].value === active) {
						host.current.shadowRoot?.querySelector<HTMLButtonElement>(`#tab-${candidate}`)?.focus()
						pendingFocus.current = undefined
					}
					break
				}
				next += step
			}
		}

		return (
			<host shadowDom>
				<div class="list" role="tablist" aria-label={props.label}>
					{tabs.map((tab, index) => {
						const isActive = tab.value === active
						return (
							<button
								key={tab.value}
								type="button"
								class={isActive ? 'tab is-active' : 'tab'}
								role="tab"
								id={`tab-${index}`}
								aria-controls={`panel-${index}`}
								aria-selected={isActive ? 'true' : 'false'}
								tabindex={isActive ? '0' : '-1'}
								disabled={tab.isDisabled}
								onclick={() => { if (tab.value !== active) pendingFocus.current = index; commit(tab) }}
								onkeydown={(e: KeyboardEvent) => onKeyDown(e, index)}
							>
								{tab.label}
							</button>
						)
					})}
				</div>
				{tabs.map((tab, index) => (
						<div key={tab.value} id={`panel-${index}`} class="panel" role="tabpanel" aria-labelledby={`tab-${index}`} tabindex="0" hidden={tab.value !== active}>
							<slot name={tab.value} />
						</div>
				))}
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			label: String,
			tabs: { type: Array },
			accent: { type: oneOf('neutral', 'dom', 'sub'), reflect: true },
			isFitted: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-tabs', ZTabs)
