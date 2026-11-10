import { defineElement } from '../shared/define-element'
import { c, css, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-avatar, a circular identity mark. Shows an image when `src` loads, and
 * gracefully falls back to initials (derived from `name` or given via
 * `initials`) on a tinted ground. Optional status dot in the corner. No
 * shadows, a hairline ring separates it from busy backgrounds.
 */
const styles = css`
	:host {
		display: inline-flex;
		vertical-align: middle;
		position: relative;
		--size: 2.5rem;
		--tone: var(--text-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='primary']) {
		--tone: var(--text-tertiary);
	}
	:host([tone='success']) {
		--tone: var(--status-success);
	}
	:host([tone='warning']) {
		--tone: var(--status-warning);
	}
	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	:host([size='xs']) {
		--size: 1.5rem;
	}
	:host([size='sm']) {
		--size: 2rem;
	}
	:host([size='lg']) {
		--size: 3.25rem;
	}
	:host([size='xl']) {
		--size: 4rem;
	}

	.avatar {
		width: var(--size);
		height: var(--size);
		border-radius: var(--radius-full);
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1px solid color-mix(in oklch, var(--text-primary) 14%, transparent);
		/* srgb: mixing a chromatic tone with the hue-carrying --surface-default in oklch
		   drifts the hue around the wheel. */
		background: color-mix(in srgb, var(--tone) 22%, var(--surface-default));
		/* Toward the theme's own text color, so the initials read in light and dark. */
		color: color-mix(in oklch, var(--tone) 55%, var(--text-primary));
		font-family: inherit;
		font-weight: var(--font-weight-semibold);
		font-size: calc(var(--size) * 0.4);
		line-height: var(--line-height-none);
		user-select: none;
	}

	:host([is-square]) .avatar {
		border-radius: var(--radius-md);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.status {
		position: absolute;
		right: 0;
		bottom: 0;
		width: calc(var(--size) * 0.28);
		height: calc(var(--size) * 0.28);
		border-radius: var(--radius-full);
		border: 2px solid var(--surface-page);
		box-sizing: border-box;
	}
	.status.is-online {
		background: var(--status-success);
	}
	.status.is-busy {
		background: var(--status-danger);
	}
	.status.is-away {
		background: var(--status-warning);
	}
	.status.is-offline {
		background: var(--text-tertiary);
	}
`

const getInitials = (props: any): string => {
	if (props.initials) return props.initials.slice(0, 2).toUpperCase()
	if (!props.name) return '?'
	const parts = String(props.name).trim().split(/\s+/)
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const ZAvatar = c(
	(props) => {
		const [failed, setFailed] = useState(false)
		const showImage = props.src && !failed

		return (
			<host shadowDom>
				<span class="avatar" role={props.name ? 'img' : undefined} aria-label={props.name}>
					{showImage ? (
						<img src={props.src} alt={props.name || ''} onerror={() => setFailed(true)} />
					) : (
						<span aria-hidden="true">{getInitials(props)}</span>
					)}
				</span>
				{props.status && <span class={`status is-${props.status}`} aria-hidden="true"></span>}
			</host>
		)
	},
	{
		props: {
			src: String,
			name: String,
			initials: String,
			status: { type: oneOf('online', 'busy', 'away', 'offline'), reflect: true },
			size: { type: oneOf('xs', 'sm', 'md', 'lg', 'xl'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			isSquare: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-avatar', ZAvatar)
