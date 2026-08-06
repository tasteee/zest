import { c, css, event, useEffect, useMemo, useState } from 'atomico'

/*
 * z-sandbox — an example running in its own document.
 *
 *   <z-sandbox html="<z-button>Save</z-button>" assets="/zest.js /ink.css"></z-sandbox>
 *
 * Required whenever an example would otherwise reach outside itself: anything
 * that opens a <dialog>, registers a global hotkey, writes to storage, or
 * paints something fixed. On a docs page those escape the example and land on
 * the page around it — a modal example steals focus from the reader scrolling
 * past it, and two hotkey examples on one page fight each other.
 *
 * The document is built from `srcdoc` rather than fetched, so there is nothing
 * to serve and nothing to keep in sync. `assets` says where the library lives,
 * because this element cannot know: a docs site serves it from one path, a
 * consumer's app from another, a CDN from a third.
 *
 * Device presets are widths, not user-agent lies. Nothing here pretends to be
 * a phone — it just makes the viewport phone-sized, which is what a reader
 * checking a responsive layout actually wants.
 */
const DEVICE_WIDTHS: Record<string, string> = {
	phone: '390px',
	tablet: '768px',
	desktop: '100%'
}

const styles = css`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	:host([is-hidden]) {
		display: none;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		padding: 0.375rem 0.5rem;
		border-bottom: 1px solid var(--border);
		background: var(--background-light);
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 0.125rem;
	}

	.control {
		padding: 0.25rem 0.5rem;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		font: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
	}

	.control:hover {
		color: var(--foreground);
	}

	.control:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -2px;
	}

	.control.is-active {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	/* The stage centres the frame so a narrow device preset sits in the middle
	   of the panel rather than clinging to its left edge. */
	.stage {
		display: flex;
		justify-content: center;
		background: var(--color-neutral-0);
	}

	iframe {
		width: var(--sandbox-width, 100%);
		height: var(--sandbox-height, 20rem);
		border: 0;
		background: transparent;
		transition: width 0.15s ease;
	}
`

const readAssets = (value?: string): string[] => {
	if (!value) return []
	return value.split(/[\s,]+/).filter((asset) => asset.length > 0)
}

// Extension decides the tag. Guessing wrong would be silent, and there are
// only two kinds of asset this element can use.
const buildAssetTags = (assets: string[]): string => {
	const tags: string[] = []

	for (const asset of assets) {
		const isStylesheet = asset.endsWith('.css')
		if (isStylesheet) tags.push(`<link rel="stylesheet" href="${asset}">`)
		if (!isStylesheet) tags.push(`<script type="module" src="${asset}"></script>`)
	}

	return tags.join('\n')
}

const buildDocument = (markup: string, assets: string[], theme: string): string => {
	return `<!doctype html>
<html data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${buildAssetTags(assets)}
<style>
  body { margin: 0; padding: 1rem; background: var(--background); color: var(--foreground); font-family: var(--font-sans, system-ui); }
</style>
</head>
<body>
${markup}
</body>
</html>`
}

const DEVICE_ORDER = ['desktop', 'tablet', 'phone']

/*
 * Scripts yes, same-origin no. Without allow-same-origin the frame gets an
 * opaque origin, so it cannot read this page's storage, cookies or DOM — which
 * is the entire reason an example runs in here rather than inline.
 *
 * The cast is because JSX types `sandbox` as the DOM *property*, a
 * DOMTokenList. The attribute is a string.
 */
const SANDBOX_FLAGS = 'allow-scripts allow-popups allow-forms allow-modals' as unknown as DOMTokenList

export const ZSandbox = c(
	(props) => {
		const [device, setDevice] = useState<string>('')
		const [theme, setTheme] = useState<string>('')

		const assets = useMemo(() => readAssets(props.assets as string), [props.assets])
		const markup = (props.html as string) || ''

		// The page's theme is the starting point, because a sandbox that opens
		// in the opposite scheme to the page around it reads as broken.
		useEffect(() => {
			const declared = (props.theme as string) || document.documentElement.getAttribute('data-theme') || 'dark'
			setTheme(declared)
		}, [props.theme])

		const activeDevice = device || (props.device as string) || 'desktop'
		const activeTheme = theme || 'dark'

		const documentMarkup = useMemo(
			() => buildDocument(markup, assets, activeTheme),
			[markup, assets, activeTheme]
		)

		// Opening in a tab needs a real document, and srcdoc has no URL to
		// share. A blob is the only way to hand someone the same page.
		const openInTab = () => {
			const blob = new Blob([documentMarkup], { type: 'text/html' })
			const url = URL.createObjectURL(blob)

			window.open(url, '_blank', 'noopener,noreferrer')
			props.open({ url })

			// Revoked on a timer rather than immediately: the new tab has to
			// fetch it first, and there is no event for that.
			setTimeout(() => URL.revokeObjectURL(url), 30000)
		}

		const toggleTheme = () => {
			const isDark = activeTheme === 'dark' || activeTheme === 'console'
			setTheme(isDark ? 'light' : 'dark')
		}

		const stageStyle = {
			'--sandbox-width': DEVICE_WIDTHS[activeDevice] || '100%',
			'--sandbox-height': (props.height as string) || '20rem'
		}

		const hasChrome = !props.isBare

		return (
			<host shadowDom>
				{hasChrome && (
					<div class='bar'>
						<div class='controls'>
							{DEVICE_ORDER.map((name) => (
								<button
									key={name}
									type='button'
									class={name === activeDevice ? 'control is-active' : 'control'}
									aria-pressed={name === activeDevice ? 'true' : 'false'}
									onclick={() => setDevice(name)}
								>
									{name}
								</button>
							))}
						</div>
						<div class='controls'>
							<button type='button' class='control' onclick={toggleTheme}>
								{activeTheme}
							</button>
							<button type='button' class='control' onclick={openInTab}>
								Open ↗
							</button>
						</div>
					</div>
				)}

				<div class='stage' style={stageStyle}>
					<iframe
						title={(props.title as string) || 'Example'}
						sandbox={SANDBOX_FLAGS}
						srcdoc={documentMarkup}
					/>
				</div>
			</host>
		)
	},
	{
		props: {
			html: { type: String },
			assets: { type: String, reflect: true },
			device: { type: String, reflect: true },
			theme: { type: String, reflect: true },
			height: { type: String, reflect: true },
			title: { type: String, reflect: true },
			isBare: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			open: event<{ url: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-sandbox', ZSandbox)
