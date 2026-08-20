import { defineElement } from '../shared/define-element'
import { c, css, event, useMemo } from 'atomico'
import { highlight, splitTokenLines, type Token } from '../shared/highlight'
import { themedScrollbarStyles } from '../shared/scrollbar-styles'
import './z-copy-button'

/*
 * z-code-block — a monospace code surface with an optional header (filename +
 * language tag) and a copy-to-clipboard button. Pass the source via the `code`
 * property (preserves whitespace); `line-numbers` adds a gutter and `highlight`
 * enables lowlight (highlight.js) syntax colour via shared/highlight.ts
 * and themed against the zest `--syntax-*` palette, so it renders synchronously
 * inside the shadow root. Fires `copy` after a successful copy.
 */
const styles = css`
	:host {
		display: block;
		--accent: var(--purple);
		width: 100%;
		min-width: 0;
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.block {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--color-neutral-0);
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
		background: var(--color-neutral-1);
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
		flex-shrink: 0;
	}

	.scroll {
		overflow: auto;
	}
	/* Firefox only — Chromium uses the arrow-less ::-webkit-scrollbar below; giving
	   it scrollbar-width would swap in the OS bar (arrows on Windows). */
	@supports not selector(::-webkit-scrollbar) {
		.scroll {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
		}
	}
	.scroll::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	.scroll::-webkit-scrollbar-thumb {
		background: var(--color-neutral-3);
		border-radius: 999px;
	}
	.scroll::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	pre {
		margin: 0;
		padding: 0.875rem 1rem;
		font-size: var(--font-size-small);
		line-height: 1.6;
		color: var(--foreground);
		tab-size: 2;
		/* Code stays selectable even though the page default is user-select:none
		   — people need to copy snippets. The line-number gutter re-opts out
		   below so dragging a selection doesn't pick up the numbers. */
		user-select: text;
		-webkit-user-select: text;
	}

	/* ::selection doesn't cross shadow boundaries, so restate the page-wide
	   selection style (ink.css) here for code rendered inside this shadow root.
	   Shares the --selection-* tokens, so code and prose highlight identically. */
	pre ::selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}
	pre ::-moz-selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
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

	/*
	 * Annotation. These are table-rows, so a background has to be painted on
	 * the cells rather than the row — a table-row's background sits behind its
	 * cells and is invisible wherever a cell paints its own.
	 *
	 * The marker column is the existing gutter: with added-lines set it
	 * carries +/- instead of the line number, because a diff reader wants the
	 * sign more than the count.
	 */
	.line.is-added .gutter,
	.line.is-added .text {
		background: color-mix(in oklch, var(--success) 12%, transparent);
	}

	.line.is-added .gutter {
		color: var(--success);
		opacity: 1;
	}

	.line.is-removed .gutter,
	.line.is-removed .text {
		background: color-mix(in oklch, var(--destructive) 12%, transparent);
	}

	.line.is-removed .gutter {
		color: var(--destructive);
		opacity: 1;
	}

	/* Focus dims everything else rather than hiding it, so the surrounding
	   code still gives the excerpt somewhere to sit. */
	.line.is-dimmed {
		opacity: 0.35;
		transition: opacity 0.15s ease;
	}

	.block:hover .line.is-dimmed {
		opacity: 1;
	}

	/*
	 * highlight.js token classes mapped onto the zest --syntax-* palette.
	 * Ordering matters: highlight.js nests JSX content inside .hljs-tag (e.g.
	 * "hljs-tag hljs-attr"), so structural classes (.hljs-tag) are declared
	 * BEFORE content classes — equal-specificity ties go to the later rule, so
	 * the nested attr/name/string colors win over the dim tag brackets.
	 */
	.hljs-comment,
	.hljs-quote {
		color: var(--syntax-comment);
		font-style: italic;
	}
	/* JSX/HTML angle-bracket structure: <, >, /, = — kept dim. */
	.hljs-tag,
	.hljs-operator,
	.hljs-punctuation {
		color: var(--syntax-operator);
	}
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-meta,
	.hljs-meta-keyword,
	.hljs-doctag {
		color: var(--syntax-keyword);
	}
	.hljs-string,
	.hljs-meta .hljs-string,
	.hljs-addition {
		color: var(--syntax-string);
	}
	.hljs-number {
		color: var(--syntax-number);
	}
	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-deletion {
		color: var(--syntax-constant);
	}
	.hljs-built_in,
	.hljs-type,
	.hljs-title.class_,
	.hljs-class .hljs-title,
	.hljs-selector-class {
		color: var(--syntax-class);
	}
	.hljs-attr,
	.hljs-attribute,
	.hljs-property,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: var(--syntax-property);
	}
	.hljs-variable,
	.hljs-template-variable,
	.hljs-params {
		color: var(--syntax-variable);
	}
	.hljs-title,
	.hljs-title.function_,
	.hljs-section,
	.hljs-selector-id {
		color: var(--syntax-function);
	}
	/* Tag/component name (declared after .hljs-tag so it wins in JSX). */
	.hljs-name {
		color: var(--syntax-tag);
	}
	.hljs-regexp {
		color: var(--syntax-regex);
	}
	.hljs-emphasis {
		font-style: italic;
	}
	.hljs-strong {
		font-weight: 700;
	}

	.rows {
		line-height: 1.75 !important;
		letter-spacing: 0.35px !important;
		font-family: var(--font-mono);
	}
`

/*
 * Line annotation. Ranges are authored the way a person writes them —
 * "3-5,8" — because the alternative is an array property, and the pages that
 * most want to annotate a snippet are markdown pages with no script.
 */
const parseLineRanges = (spec?: string): Set<number> => {
	const lines = new Set<number>()
	if (!spec) return lines

	for (const part of spec.split(',')) {
		const range = part.trim()
		if (!range) continue

		const bounds = range.split('-')
		const start = Number(bounds[0])
		const end = bounds.length > 1 ? Number(bounds[1]) : start

		const isUsable = Number.isFinite(start) && Number.isFinite(end)
		if (!isUsable) continue

		for (let line = Math.min(start, end); line <= Math.max(start, end); line += 1) {
			lines.add(line)
		}
	}

	return lines
}

const buildLineClass = (lineNumber: number, marks: MarksT): string => {
	const classes = ['line']

	if (marks.added.has(lineNumber)) classes.push('is-added')
	if (marks.removed.has(lineNumber)) classes.push('is-removed')

	const hasFocus = marks.focused.size > 0
	const isDimmed = hasFocus && !marks.focused.has(lineNumber)
	if (isDimmed) classes.push('is-dimmed')

	return classes.join(' ')
}

type MarksT = {
	added: Set<number>
	removed: Set<number>
	focused: Set<number>
}

// With a diff annotation present the gutter carries the sign instead of the
// count: a reader following a change wants to know which way a line went more
// than they want its position.
const buildGutterLabel = (lineNumber: number, marks: MarksT): string => {
	if (marks.added.has(lineNumber)) return '+'
	if (marks.removed.has(lineNumber)) return '-'
	return String(lineNumber)
}


export const ZCodeBlock = c(
	(props) => {
		const code = (props.code as string) ?? ''
		const language = props.language as string | undefined

		const tokens = useMemo(
			() => props.highlight ? highlight(code.replace(/\n$/, ''), language) : [{ value: code.replace(/\n$/, ''), className: '' }],
			[code, language, props.highlight]
		)
		const tokenLines = useMemo(() => splitTokenLines(tokens), [tokens])

		const marks: MarksT = {
			added: parseLineRanges(props.addedLines as string),
			removed: parseLineRanges(props.removedLines as string),
			focused: parseLineRanges(props.focusLines as string)
		}

		// Any annotation needs the per-line rows, whether or not the reader
		// asked for numbers — there is nowhere else to hang a mark.
		const hasAnnotation = marks.added.size > 0 || marks.removed.size > 0 || marks.focused.size > 0
		const shouldRenderRows = Boolean(props.lineNumbers) || hasAnnotation
		const hasDiffMarks = marks.added.size > 0 || marks.removed.size > 0

		const renderToken = (token: Token, key: number) =>
			token.className ? (
				<span class={token.className} key={key}>
					{token.value}
				</span>
			) : (
				token.value
			)

		// z-copy-button's own `copy` is composed, so it would surface to
		// consumers alongside this element's. Swallow it and re-emit, keeping
		// z-code-block's long-standing void-detail event intact.
		const handleCopy = (copyEvent: Event) => {
			copyEvent.stopPropagation()
			props.copy()
		}

		const showHead = props.filename || props.language || props.hasCopy

		return (
			<host shadowDom>
				<div class="block">
					{showHead && (
						<div class="head">
							<div class="meta">
								{props.language && <span class="lang">{props.language}</span>}
								{props.filename && <span class="filename">{props.filename}</span>}
							</div>
							{props.hasCopy && <z-copy-button class="copy" value={code} oncopy={handleCopy} />}
						</div>
					)}
					<div class="scroll">
						<pre>
							{shouldRenderRows ? (
								<div class="rows">
									{tokenLines.map((line, i) => {
										const lineNumber = i + 1
										const gutterLabel = hasDiffMarks ? buildGutterLabel(lineNumber, marks) : String(lineNumber)
										const showGutter = Boolean(props.lineNumbers) || hasDiffMarks

										return (
											<div class={buildLineClass(lineNumber, marks)} key={i}>
												{showGutter && <span class="gutter">{gutterLabel}</span>}
												<span class="text">{line.length ? line.map(renderToken) : ' '}</span>
											</div>
										)
									})}
								</div>
							) : (
								<code>{tokens.map(renderToken)}</code>
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
			// Read by z-code-group to label this block's tab.
			label: String,
			lineNumbers: { type: Boolean, reflect: true },
			highlight: { type: Boolean, reflect: true },
			addedLines: { type: String, reflect: true },
			removedLines: { type: String, reflect: true },
			focusLines: { type: String, reflect: true },
			hasCopy: { type: Boolean, reflect: true, value: () => true },
			accent: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			copy: event<void>({ bubbles: true, composed: true })
		},
		styles: [themedScrollbarStyles, styles]
	}
)

defineElement('z-code-block', ZCodeBlock)
