import { DocsLink } from '@app/docs/DocsLink'
import { DocsFooter, DocsHero, DocsSection } from '@app/docs/DocsChrome'

const SpaceRow = ({ token, rem }: { token: string; rem: string }) => (
	<div className="space-row">
		<span className="space-token">{token}</span>
		<div className="space-bar" style={{ width: `var(${token})` }} />
		<span className="space-value">{rem}</span>
	</div>
)

// gap/inset size scale the layout elements (z-row, z-column, z-grid, …)
// resolve their `gap`/`inset` props through; see resolveSize in layout-schema.ts.
const SIZE_SCALE = [
	{ key: '0', var: '--space-0', rem: '0' },
	{ key: '2xs', var: '--space-1', rem: '0.25rem' },
	{ key: 'xs', var: '--space-2', rem: '0.5rem' },
	{ key: 'sm', var: '--space-3', rem: '0.75rem' },
	{ key: 'md', var: '--space-4', rem: '1rem' },
	{ key: 'lg', var: '--space-6', rem: '1.5rem' },
	{ key: 'xl', var: '--space-8', rem: '2rem' },
	{ key: '2xl', var: '--space-12', rem: '3rem' },
	{ key: '3xl', var: '--space-16', rem: '4rem' },
	{ key: '4xl', var: '--space-24', rem: '6rem' }
]

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40]
const SPACE_SCALE = STEPS.map((n) => ({ token: '--space-' + n, rem: n / 4 + 'rem' }))

const RADIUS_SCALE = [
	{ key: 'sm', token: '--radius-sm', px: '6px' },
	{ key: 'md', token: '--radius-md', px: '8px' },
	{ key: 'lg', token: '--radius-lg', px: '10px' },
	{ key: 'xl', token: '--radius-xl', px: '14px' }
]

export const Spacing = () => (
	<div className="DocsPage">
		<DocsHero
			eyebrow="DESIGN SYSTEM"
			title="Spacing"
			lede={
				<>
					One base unit, one scale.{' '}
					<z-inline color="muted" weight={400}>
						A numeric ramp, and the size keywords layout primitives take.
					</z-inline>
				</>
			}
		/>

		<DocsSection
			id="gap-scale"
			tone="secondary"
			title="Gap / inset keywords"
			tag="resolveSize() · layout-schema.ts"
			sub={
				<>
					What <code className="inline">gap</code>, <code className="inline">inset</code>,{' '}
					<code className="inline">inset-x</code>, and <code className="inline">inset-y</code> take on z-row, z-column, and
					z-grid, and what z-spacer's <code className="inline">size</code> accepts.
				</>
			}
		>
			<z-column gap="0">
				{SIZE_SCALE.map((s) => (
					<div className="space-row" key={s.key}>
						<span className="space-token">{s.key}</span>
						<div className="space-bar" style={{ width: s.rem }} />
						<span className="space-value">
							{s.rem} · {s.var}
						</span>
					</div>
				))}
			</z-column>
		</DocsSection>

		<DocsSection
			id="raw-scale"
			tone="tertiary"
			title="Numeric scale"
			tag="--space-0…40"
			sub={
				<>
					One scale: <code className="inline">--space-N</code> is N times <code className="inline">--base-spacing</code> (0.25rem). Numeric props such as <code className="inline">gap="6"</code> resolve to it, and the size keywords above are steps of it.
				</>
			}
		>
			<z-column gap="0">
				{SPACE_SCALE.map((s) => (
					<SpaceRow key={s.token} token={s.token} rem={s.rem} />
				))}
			</z-column>
		</DocsSection>

		<DocsSection
			id="radius"
			tone="secondary"
			title="Radius"
			tag="--radius-sm…xl"
			sub={
				<>
					<code className="inline">--base-radius</code> is 0.625rem (10px); every step is a fixed offset from it, not a
					multiple.
				</>
			}
		>
			<div className="swatch-row">
				{RADIUS_SCALE.map((r) => (
					<div className="swatch" key={r.key}>
						<div
							className="swatch-fill"
							style={{ borderRadius: `var(${r.token})`, background: 'var(--surface-subtle)' }}
						/>
						<span className="swatch-label">{r.key}</span>
						<span className="swatch-token">
							{r.token} · {r.px}
						</span>
					</div>
				))}
			</div>
		</DocsSection>

		<DocsFooter
			links={
				<>
					<DocsLink href="/system/color">Color</DocsLink> · <DocsLink href="/system/layout">Layout</DocsLink> ·{' '}
					<DocsLink href="~/">Home</DocsLink>
				</>
			}
		>
			zest · one base unit, 0.25rem
		</DocsFooter>
	</div>
)
