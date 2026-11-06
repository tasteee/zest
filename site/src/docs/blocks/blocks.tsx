import type { ComponentType } from 'react'
import { DocExample } from '@app/docs/DocExample'

/*
 * Blocks: recipes that compose elements into real interfaces. Each block is
 * one or more demos under demos/blocks/, rendered and shown verbatim.
 */

type BlockDemoT = { demo: string; title: string; description?: string; isContained?: boolean }
export type BlockT = {
	slug: string
	title: string
	summary: string
	keywords?: string
	demos: BlockDemoT[]
	Component: ComponentType
}
export type BlockGroupT = { label: string; items: BlockT[] }

const block = (slug: string, title: string, summary: string, demos: BlockDemoT[], keywords?: string): BlockT => ({
	slug,
	title,
	summary,
	keywords,
	demos,
	Component: () => (
		<div className="DocsArticle">
			<z-eyebrow hasRule>Block</z-eyebrow>
			<h1>{title}</h1>
			<p className="DocsLede">{summary}</p>
			{demos.map((d) => (
				<DocExample key={d.demo} {...d} />
			))}
		</div>
	)
})

export const BLOCKS: BlockGroupT[] = [
	{
		label: 'Application',
		items: [
			block(
				'app-shell',
				'App shell',
				'A sidebar-led application frame: brand and account pinned in the sidebar’s header and footer, nested project groups, and a content region that follows the selection.',
				[
					{
						demo: 'blocks/app-shell',
						title: 'Sidebar + content',
						description:
							'The sidebar fills the shell’s height and scrolls its own nav; the page decides what each value shows.'
					}
				],
				'layout sidebar navigation frame'
			),
			block(
				'settings-panel',
				'Settings panel',
				'Tabs as a pure controller: the panels live outside z-tabs and simply follow its value, with a sticky action row underneath.',
				[
					{
						demo: 'blocks/settings-panel',
						title: 'Tabbed settings',
						description: 'Listen for change on z-tabs and show the matching section, wherever it lives in the tree.'
					}
				],
				'tabs form preferences'
			),
			block(
				'stats-overview',
				'Stats overview',
				'A row of KPI cards: a label, a big number, and a badge for the trend.',
				[{ demo: 'blocks/stats-overview', title: 'Four KPI cards', description: 'z-grid reflows the cards by min-column-width, so no breakpoints are needed.' }],
				'dashboard kpi metrics analytics cards'
			),
			block(
				'data-table',
				'Data table',
				'A filterable table with a search box, a status select, a live result count, and pagination.',
				[{ demo: 'blocks/data-table', title: 'Search and filter', description: 'Both controls re-render the table’s rows from the same source array.' }],
				'table filter search list pagination'
			),
			block(
				'activity-feed',
				'Activity feed',
				'A card of recent events: avatar, one sentence, and a relative time.',
				[{ demo: 'blocks/activity-feed', title: 'Recent activity', description: 'Each z-list-row holds an avatar and two lines of text.' }],
				'feed timeline notifications log'
			),
			block(
				'team-members',
				'Team members',
				'People with an inline role select on each row.',
				[{ demo: 'blocks/team-members', title: 'Roles per person', description: 'Options are assigned from JavaScript, since they are an array.' }],
				'users people roles permissions list'
			),
			block(
				'page-header',
				'Page header',
				'Breadcrumbs, a title with metadata, and the page’s primary actions.',
				[{ demo: 'blocks/page-header', title: 'Breadcrumbs + actions', description: 'Actions sit right and wrap below the title on narrow screens.' }],
				'breadcrumbs title toolbar heading'
			),
			block(
				'notification-prefs',
				'Notification preferences',
				'Switches with a label and a one-line description each.',
				[{ demo: 'blocks/notification-prefs', title: 'Per-event switches', description: 'The description says what each switch actually sends.' }],
				'switch settings notifications email'
			)
		]
	},
	{
		label: 'Forms',
		items: [
			block(
				'sign-in',
				'Sign in',
				'A compact authentication card: labelled fields, a remember-me choice, a pending submit state, and a secondary provider.',
				[
					{
						demo: 'blocks/sign-in',
						title: 'Email and password',
						description: 'Submitting shows the button’s loading state, then confirms with a toast.'
					}
				],
				'auth login authentication'
			),
			block(
				'sign-up',
				'Sign up',
				'An account-creation card with name, email, password, and a terms checkbox.',
				[{ demo: 'blocks/sign-up', title: 'Create account', description: 'Paired inputs share a row; the password field explains its rule.' }],
				'register signup account auth'
			),
			block(
				'otp-verification',
				'Verification code',
				'A six-digit code entry that unlocks its button only once complete.',
				[{ demo: 'blocks/otp-verification', title: 'Email code', description: 'Listen for change and compare the value length to enable the button.' }],
				'otp 2fa code verify'
			),
			block(
				'profile-form',
				'Profile form',
				'Avatar controls, text fields, and a footer action row.',
				[{ demo: 'blocks/profile-form', title: 'Edit profile', description: 'The footer is separated by a border, not a shadow.' }],
				'profile account edit avatar form'
			),
			block(
				'contact-form',
				'Contact form',
				'A form with a select, a textarea, and a pending submit that ends in a toast.',
				[{ demo: 'blocks/contact-form', title: 'Send a message', description: 'Submit shows the loading state, then confirms.' }],
				'contact support message form'
			),
			block(
				'payment-form',
				'Payment form',
				'A plan choice and card fields with the right autocomplete hints.',
				[{ demo: 'blocks/payment-form', title: 'Card details', description: 'autocomplete tokens let browsers fill every field.' }],
				'checkout billing card payment'
			),
			block(
				'newsletter-signup',
				'Newsletter signup',
				'A single-line email capture on a quiet surface.',
				[{ demo: 'blocks/newsletter-signup', title: 'Email and subscribe', description: 'The input grows; the button keeps its size.' }],
				'subscribe email footer'
			)
		]
	},
	{
		label: 'Feedback',
		items: [
			block(
				'upload-progress',
				'Upload progress',
				'One toast id per job, updated in place from progress to outcome, so a long task never floods the stack.',
				[
					{
						demo: 'blocks/upload-progress',
						title: 'Progress to result',
						description: 'Re-showing an active id updates that toast and restarts its countdown.'
					}
				],
				'toast toaster notification'
			),
			block(
				'empty-state',
				'Empty state',
				'The first-run screen for a collection: what belongs here, and the one or two ways to start.',
				[{ demo: 'blocks/empty-state', title: 'No projects yet' }],
				'blank zero first run'
			),
			block(
				'not-found',
				'Not found',
				'A 404 screen that says what happened and offers two ways out.',
				[{ demo: 'blocks/not-found', title: 'Page not found', description: 'An empty state doubles as an error page.' }],
				'404 error missing'
			),
			block(
				'loading-skeleton',
				'Loading skeleton',
				'Placeholder shapes that match the content they stand in for.',
				[{ demo: 'blocks/loading-skeleton', title: 'Profile row', description: 'Same layout as the loaded card, so nothing jumps.' }],
				'skeleton loading placeholder'
			),
			block(
				'cookie-banner',
				'Cookie banner',
				'A compact consent bar with a clear accept and reject.',
				[{ demo: 'blocks/cookie-banner', title: 'Consent bar', description: 'Both actions get equal weight except for the tone.' }],
				'cookies consent privacy banner'
			)
		]
	},
	{
		label: 'Overlays',
		items: [
			block(
				'command-palette',
				'Command palette',
				'Rich, declarative command rows (avatars, badges, shortcuts), grouped results, a custom empty state, and a hint footer.',
				[
					{
						demo: 'blocks/command-palette',
						title: 'Composed palette',
						description: 'Each z-command-item’s own content becomes its row; filtering uses its label or text.'
					}
				],
				'search cmdk spotlight'
			),
			block(
				'row-actions',
				'Row actions',
				'An overflow menu on a list row that routes its destructive action through a confirmation dialog.',
				[
					{
						demo: 'blocks/row-actions',
						title: 'Menu into confirmation',
						description: 'The menu confirms the pick with a double flash, then the dialog takes over.'
					}
				],
				'menu dropdown delete confirm'
			),
			block(
				'invite-dialog',
				'Invite dialog',
				'A dialog with a field, a role select, and a footer action row.',
				[{ demo: 'blocks/invite-dialog', title: 'Invite people', description: 'The trigger lives inside the dialog, so no script opens it.' }],
				'dialog modal invite share'
			),
			block(
				'filter-sheet',
				'Filter sheet',
				'A side sheet of filters with Reset and Show results.',
				[{ demo: 'blocks/filter-sheet', title: 'Filters', description: 'Radio, slider, and switch cover most filter types.' }],
				'sheet drawer filters faceted'
			),
			block(
				'danger-zone',
				'Danger zone',
				'A destructive action isolated in its own card and gated by a confirm dialog.',
				[{ demo: 'blocks/danger-zone', title: 'Delete workspace', description: 'The button opens the alert dialog from a one-line script.' }],
				'delete destructive confirm settings'
			)
		]
	},
	{
		label: 'Marketing',
		items: [
			block(
				'hero',
				'Hero',
				'A centered headline, supporting line, and two calls to action.',
				[{ demo: 'blocks/hero', title: 'Centered hero', description: 'Keep one primary action; the second is an outline.' }],
				'landing headline cta'
			),
			block(
				'pricing',
				'Pricing',
				'Three plan cards with the recommended one accented and badged.',
				[{ demo: 'blocks/pricing', title: 'Three tiers', description: 'Cards reflow from three columns to one with no media queries.' }],
				'plans tiers price'
			),
			block(
				'feature-grid',
				'Feature grid',
				'A bento of feature tiles, where spans signal what matters most.',
				[{ demo: 'blocks/feature-grid', title: 'Bento features', description: 'Wide tiles carry the lead features.' }],
				'features bento grid landing'
			),
			block(
				'faq',
				'FAQ',
				'Questions in a single-open accordion.',
				[{ demo: 'blocks/faq', title: 'Accordion FAQ', description: 'type="single" keeps one answer in focus.' }],
				'faq accordion questions'
			)
		]
	}
]
