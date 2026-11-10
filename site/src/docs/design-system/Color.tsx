import type { CSSProperties } from 'react'
import { DocsLink } from '@app/docs/DocsLink'
import { DocsFooter, DocsHero, DocsSection } from '@app/docs/DocsChrome'

// Swatches render the literal CSS var so this page can never drift from the
// token values shipped in src/ink.css.
// The token is resolved on the outer element, before the tooltip. z-tooltip
// sets its own --tone for its children, which would otherwise repaint the
// --tone swatch with the tooltip's color instead of the page's.
const Swatch = ({ token, label, hint }: { token: string; label: string; hint?: string }) => {
	const swatch = (
		<div className="swatch" tabIndex={hint ? 0 : undefined}>
			<div className="swatch-fill" />
			<span className="swatch-label">{label}</span>
			<span className="swatch-token">{token}</span>
		</div>
	)

	const content = hint ? (
		<z-tooltip content={hint} placement="top" style={{ display: 'block' }}>
			{swatch}
		</z-tooltip>
	) : (
		swatch
	)

	return <div style={{ '--swatch-color': `var(${token})` } as CSSProperties}>{content}</div>
}

const RAMP_STEPS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

type RoleT = { token: string; label: string; hint: string }

const SURFACES: RoleT[] = [
	{ token: '--surface-page', label: 'Page', hint: 'The canvas behind everything. Body background.' },
	{ token: '--surface-default', label: 'Default', hint: 'Cards, panels and fields resting on the page. Flat: a fill and a hairline border, no shadow.' },
	{ token: '--surface-subtle', label: 'Subtle', hint: 'A quieter region inside a panel: wells, table headers, hover rows.' },
	{ token: '--surface-strong', label: 'Strong', hint: 'The deepest resting step: chips, tracks and tiles that must read against a subtle surface.' },
	{ token: '--surface-overlay', label: 'Overlay', hint: 'Anything that floats above the page: menus, popovers, tooltips, toasts, dialogs. Always paired with a border and a shadow.' },
	{ token: '--surface-inverse', label: 'Inverse', hint: 'A soft off-white panel with dark ink, for surfaces that must read as not part of the page. Pair with --text-inverse.' }
]

const TEXT: RoleT[] = [
	{ token: '--text-primary', label: 'Primary', hint: 'Default text and icons. Body copy, headings, anything that needs full contrast.' },
	{ token: '--text-secondary', label: 'Secondary', hint: 'Captions, helper text, placeholders, timestamps: whatever should recede.' },
	{ token: '--text-tertiary', label: 'Tertiary', hint: 'The quietest readable text: disabled-adjacent hints and decorative labels.' },
	{ token: '--text-strong', label: 'Strong', hint: 'Full contrast, reserved for display type and the few elements that opt in.' }
]

const BORDERS: RoleT[] = [
	{ token: '--border-default', label: 'Default', hint: 'Hairlines: card and input outlines, dividers, separators.' },
	{ token: '--border-strong', label: 'Strong', hint: 'Hover and emphasis outlines; scrollbar thumb on hover.' },
	{ token: '--border-focus', label: 'Focus', hint: 'The keyboard focus outline. Drawn around every interactive element reached with the keyboard; never removed.' }
]

const ACCENTS: RoleT[] = [
	{ token: '--accent-primary', label: 'Primary', hint: 'The primary tone, and it is neutral. The shell stays neutral so the content supplies the colour.' },
	{ token: '--accent-secondary', label: 'Secondary', hint: 'tone="secondary". Opt-in emphasis; use sparingly.' },
	{ token: '--accent-tertiary', label: 'Tertiary', hint: 'tone="tertiary". Opt-in emphasis; pairs with secondary in charts.' }
]

const STATUS: RoleT[] = [
	{ token: '--status-success', label: 'Success', hint: 'Completed steps, saved confirmations, passing checks, healthy status.' },
	{ token: '--status-warning', label: 'Warning', hint: 'Needs attention soon, risky-but-allowed actions, degraded status.' },
	{ token: '--status-danger', label: 'Danger', hint: 'Errors and irreversible actions: delete buttons, invalid fields, failure alerts.' }
]

const RoleRow = ({ roles }: { roles: RoleT[] }) => (
	<div className="swatch-row">
		{roles.map((role) => (
			<Swatch key={role.token} token={role.token} label={role.label} hint={role.hint} />
		))}
	</div>
)

export const Color = () => (
	<div className="DocsPage">
		<DocsHero
			eyebrow="DESIGN SYSTEM"
			title="Color."
			lede={
				<>
					Roles, not hues.{' '}
					<z-inline color="muted" weight={400}>
						Components read a role; the theme decides which colour fills it.
					</z-inline>
				</>
			}
		/>

		<DocsSection
			id="surfaces"
			tone="primary"
			title="Surfaces"
			tag="--surface-*"
			sub="Where something sits. Resting surfaces are flat: a fill plus a hairline border. Only surface-overlay floats, and it takes a shadow."
		>
			<RoleRow roles={SURFACES} />
		</DocsSection>

		<DocsSection id="text" tone="primary" title="Text" tag="--text-*" sub="Ink on a surface. On a solid accent or status fill, use --on-accent.">
			<RoleRow roles={TEXT} />
		</DocsSection>

		<DocsSection id="borders" tone="primary" title="Borders" tag="--border-*">
			<RoleRow roles={BORDERS} />
		</DocsSection>

		<DocsSection
			id="accents"
			tone="secondary"
			title="Accents"
			tag="--accent-*"
			sub={
				<>
					The three tones behind <code className="inline">tone="primary | secondary | tertiary"</code>. Inside a component,{' '}
					<code className="inline">--tone</code> holds whichever one is active.
				</>
			}
		>
			<RoleRow roles={ACCENTS} />
		</DocsSection>

		<DocsSection
			id="status"
			tone="tertiary"
			title="Status"
			tag="--status-*"
			sub={
				<>
					<code className="inline">tone="success | warning | danger"</code>.
				</>
			}
		>
			<RoleRow roles={STATUS} />
		</DocsSection>

		<DocsSection
			id="neutral"
			tone="secondary"
			title="Neutral palette"
			tag="--color-neutral-0…9"
			sub="The theme's private palette, shown for reference. Step N plays a different part in light and dark, so components never read it directly; they read the roles above."
		>
			<div className="swatch-row">
				{RAMP_STEPS.map((step) => (
					<Swatch key={step} token={`--color-neutral-${step}`} label={step} />
				))}
			</div>
		</DocsSection>

		<DocsFooter
			links={
				<>
					<DocsLink href="/system/spacing">Spacing</DocsLink> · <DocsLink href="/system/typography">Typography</DocsLink> ·{' '}
					<DocsLink href="~/">Home</DocsLink>
				</>
			}
		>
			zest · dark and light · OKLCH throughout
		</DocsFooter>
	</div>
)
