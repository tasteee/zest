import { c, css, event, useState } from 'atomico'

/*
 * z-code-block — a monospace code surface with an optional header (filename +
 * language tag) and a copy-to-clipboard button. Pass the source via the `code`
 * property (preserves whitespace); `is-line-numbers` adds a gutter. No syntax
 * highlighter is bundled — this stays dependency-free and renders plain,
 * legible mono on the panel surface. Fires `copy` after a successful copy.
 */
const styles = css`
	:host {
		display: block;
		--accent: var(--purple);
	}

	:host([tone='secondary']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.block {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--color-neutral-1);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem 0.5rem 0.875rem;
		border-bottom: 1px solid var(--border);
		background: var(--color-neutral-2);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		min-width: 0;
	}

	.filename {
		font-size: var(--font-size-caption);
		color: var(--foreground);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.lang {
		font-size: var(--font-size-caption);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.copy {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		flex-shrink: 0;
		padding: 0.25rem 0.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
		transition:
			color 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.copy:hover {
		color: var(--foreground);
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.copy:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.copy.is-copied {
		color: var(--success);
		border-color: color-mix(in oklch, var(--success) 50%, transparent);
	}

	.copy svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.scroll {
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--color-neutral-3) transparent;
	}
	.scroll::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	.scroll::-webkit-scrollbar-thumb {
		background: var(--color-neutral-3);
		border-radius: 999px;
	}

	pre {
		margin: 0;
		padding: 0.875rem 1rem;
		font-size: var(--font-size-small);
		line-height: 1.6;
		color: var(--foreground);
		tab-size: 2;
	}

	.rows {
		display: table;
		min-width: 100%;
	}

	.line {
		display: table-row;
	}

	.gutter,
	.text {
		display: table-cell;
		white-space: pre;
	}

	.gutter {
		padding-right: 1rem;
		text-align: right;
		color: var(--muted-foreground);
		user-select: none;
		opacity: 0.6;
	}
`

export const ZCodeBlock = c(
	(props) => {
		const [copied, setCopied] = useState(false)

		const code = (props.code as string) ?? ''
		const lines = code.replace(/\n$/, '').split('\n')

		const onCopy = async () => {
			try {
				await navigator.clipboard.writeText(code)
				setCopied(true)
				props.copy()
				setTimeout(() => setCopied(false), 1600)
			} catch {
				/* clipboard unavailable — no-op */
			}
		}

		const showHead = props.filename || props.language || !props.hideCopy

		return (
			<host shadowDom>
				<div class="block">
					{showHead && (
						<div class="head">
							<div class="meta">
								{props.filename && <span class="filename">{props.filename}</span>}
								{props.language && <span class="lang">{props.language}</span>}
							</div>
							{!props.hideCopy && (
								<button type="button" class={copied ? 'copy is-copied' : 'copy'} onclick={onCopy}>
									{copied ? (
										<svg viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6" /></svg>
									) : (
										<svg viewBox="0 0 24 24">
											<rect x="9" y="9" width="11" height="11" rx="2" />
											<path d="M5 15V5a2 2 0 0 1 2-2h10" />
										</svg>
									)}
									{copied ? 'Copied' : 'Copy'}
								</button>
							)}
						</div>
					)}
					<div class="scroll">
						<pre>
							{props.isLineNumbers ? (
								<div class="rows">
									{lines.map((line, i) => (
										<div class="line" key={i}>
											<span class="gutter">{i + 1}</span>
											<span class="text">{line || ' '}</span>
										</div>
									))}
								</div>
							) : (
								<code>{code}</code>
							)}
						</pre>
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			code: String,
			language: String,
			filename: String,
			isLineNumbers: { type: Boolean, reflect: true },
			hideCopy: { type: Boolean, reflect: true },
			tone: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			copy: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-code-block', ZCodeBlock)
