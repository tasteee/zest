import { DocsLink } from '@app/docs/DocsLink'
import { DocsFooter, DocsHero } from '@app/docs/DocsChrome'

export const Rules = () => (
	<div className="DocsPage">
		<DocsHero
			eyebrow="DESIGN SYSTEM"
			title="Design rules"
			lede="The constraints that keep zest coherent. Break them on purpose, not by accident."
		/>

		<section className="section" id="article">
			<article className="article">
				<div className="article-body">
					<z-heading size="sm" tag="h2">
						Flat, with shadows only where something floats
					</z-heading>
					<z-text>
						Resting UI is a surface plus a 1px border (<code className="inline">--border-default</code>), with no shadow: cards, fields,
						buttons and switches stay flat. Only things that float above other content take a shadow: <code className="inline">--shadow-overlay</code>
						for menus, popovers, tooltips and toasts, and <code className="inline">--shadow-modal</code> for dialogs and sheets.
						Pressed and selected states change surface, never elevation.
					</z-text>

					<z-heading size="sm" tag="h2">
						Dark and light, OKLCH throughout
					</z-heading>
					<z-text>
						Dark is the default; light switches on with <code className="inline">data-theme="light"</code> on the root
						element, or with <DocsLink href="/elements/z-theme-switcher">z-theme-switcher</DocsLink>. Color roles can be customized to suit your application. See <DocsLink href="/system/color">Color</DocsLink> for the ramps
						themselves.
					</z-text>

					<z-heading size="sm" tag="h2">
						One typeface, one scale
					</z-heading>
					<z-text>
						Google Sans for everything (body copy and headings both), with DM Mono reserved for code, tokens, and the small mono
						labels that mark a demo's props. Hierarchy comes from size and weight, never a second font family. Full scale on{' '}
						<DocsLink href="/system/typography">Typography</DocsLink>.
					</z-text>

					<z-heading size="sm" tag="h2">
						Use accent tones deliberately
					</z-heading>
					<z-text>
						<code className="inline">tone="secondary"</code> and <code className="inline">tone="tertiary"</code> draw attention to actions, active states, and highlights. Their colors can be customized.
					</z-text>

					<div className="pullquote">
						<z-text size="lg">
							Red means broken. It's reserved for destructive actions and error states, nowhere else.
						</z-text>
					</div>

					<z-heading size="sm" tag="h2">
						Tokens, not literals
					</z-heading>
					<z-text>
						Colors, spacing, radii, and font sizes are all CSS custom properties (see{' '}
						<DocsLink href="/system/spacing">Spacing</DocsLink>). Components read{' '}
						<code className="inline">var(--token)</code>, never a hardcoded hex or px value, retheming means moving a token,
						not hunting through component source.
					</z-text>
				</div>
			</article>
		</section>

		<DocsFooter
			links={
				<>
					<DocsLink href="/system/patterns">Patterns</DocsLink> · <DocsLink href="/system/color">Color</DocsLink> ·{' '}
					<DocsLink href="~/">Home</DocsLink>
				</>
			}
		>
			zest · design rules
		</DocsFooter>
	</div>
)
