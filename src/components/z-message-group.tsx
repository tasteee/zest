import { defineElement } from '../shared/define-element'
import { c, css, useHost, useEffect } from 'atomico'

/*
 * z-message-group, a run of consecutive messages from one sender, sharing a
 * single avatar, name, and timestamp. It positions its slotted
 * z-message-bubble children (sets their `side` and `group` corner position) so
 * you don't repeat that on every bubble.
 *
 *   <z-message-group side="start" name="Alice" avatar-name="Alice" timestamp="2026-07-04T18:00:00Z">
 *     <z-message-bubble>Hey!</z-message-bubble>
 *     <z-message-bubble>Did you see the designs?</z-message-bubble>
 *   </z-message-group>
 *
 * `side="end"` is you (right-aligned, no avatar by default). Avatars show on the
 * `start` side; toggle with `hide-avatar` / `show-avatar`.
 */
const styles = css`
	:host {
		display: block;
	}
	:host([is-hidden]) {
		display: none;
	}

	.row {
		display: flex;
		align-items: flex-end;
		gap: var(--space-2);
		padding: var(--space-0-5) 0;
	}
	:host([side='end']) .row {
		flex-direction: row-reverse;
	}

	.avatar {
		flex: 0 0 auto;
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		max-width: min(75%, 42rem);
	}
	:host([side='end']) .col {
		align-items: flex-end;
	}
	:host([side='start']) .col,
	:host(:not([side='end'])) .col {
		align-items: flex-start;
	}

	.name {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--text-secondary);
		margin: 0 var(--space-2) 2px;
	}
	.meta {
		font-size: var(--font-size-2xs);
		color: var(--text-secondary);
		margin: 2px var(--space-2) 0;
	}
`

export const ZMessageGroup = c(
	(props) => {
		const host = useHost()

		useEffect(() => {
			const el = host.current as HTMLElement
			const side = props.side === 'end' ? 'end' : 'start'
			const apply = () => {
				const bubbles = [...el.querySelectorAll(':scope > z-message-bubble')]
				bubbles.forEach((b, i) => {
					b.setAttribute('side', side)
					const pos =
						bubbles.length === 1
							? 'single'
							: i === 0
								? 'first'
								: i === bubbles.length - 1
									? 'last'
									: 'middle'
					b.setAttribute('group', pos)
				})
			}
			apply()
			const mo = new MutationObserver(apply)
			mo.observe(el, { childList: true })
			return () => mo.disconnect()
		}, [props.side])

		// `auto` is the default and matches how the two sides read: an incoming
		// group is identified by its avatar, an outgoing one is already known
		// to be you. `always` and `never` override that per group.
		const isEnd = props.side === 'end'
		const avatarMode = props.avatar || 'auto'
		const isAutoShown = !isEnd
		const shouldShowAvatar = avatarMode === 'auto' ? isAutoShown : avatarMode === 'always'

		return (
			<host shadowDom>
				<div class='row'>
					{shouldShowAvatar && (
						<div class='avatar'>
							<z-avatar
								size='sm'
								name={props.avatarName || props.name}
								src={props.avatarSrc}
								initials={props.avatarInitials}
							/>
						</div>
					)}
					<div class='col'>
						{props.name && !isEnd && <div class='name'>{props.name}</div>}
						<slot />
						{props.timestamp && (
							<div class='meta'>
								<z-relative-time datetime={props.timestamp} />
							</div>
						)}
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			side: { type: String, reflect: true },
			name: { type: String, reflect: true },
			avatarSrc: { type: String, reflect: true },
			avatarName: { type: String, reflect: true },
			avatarInitials: { type: String, reflect: true },
			timestamp: { type: String, reflect: true },
			avatar: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-message-group', ZMessageGroup)
