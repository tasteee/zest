import { c, css, event, useState } from 'atomico'

/*
 * z-was-this-helpful — the two-button feedback prompt at the foot of a page.
 *
 *   <z-was-this-helpful page="/c/forms/z-input"></z-was-this-helpful>
 *   el.addEventListener('feedback', (e) => e.detail) // { isHelpful, comment, page }
 *
 * It reports and forgets. Where the answer goes — an analytics call, an
 * issue, a webhook — is the host's decision, and baking a destination in would
 * make the element useless to anyone whose destination differs.
 *
 * "No" opens a comment field; "yes" does not. A thumbs-down without a reason
 * is close to worthless — you learn that a page failed but not how — and a
 * thumbs-up rarely has more to say than itself. Asking everyone for prose
 * lowers the response rate on the answer that actually matters.
 */
const styles = css`
	:host {
		display: block;
		padding: var(--space-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
	}

	:host([is-hidden]) {
		display: none;
	}

	.prompt {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-sm) var(--space-base);
	}

	.question {
		margin: 0;
		font-size: var(--font-size-small);
		color: var(--foreground);
	}

	.choices {
		display: flex;
		gap: var(--space-sm);
	}

	.choice {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		font: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
		transition: color 0.12s ease, border-color 0.12s ease;
	}

	.choice:hover {
		color: var(--foreground);
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	.choice:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.choice.is-chosen {
		color: var(--foreground);
		border-color: var(--purple);
	}

	.follow-up {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-base);
	}

	textarea {
		box-sizing: border-box;
		width: 100%;
		min-height: 4.5rem;
		padding: var(--space-sm);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--background);
		color: var(--foreground);
		font: inherit;
		font-size: var(--font-size-small);
		resize: vertical;
	}

	textarea:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 1px;
		border-color: transparent;
	}

	.thanks {
		margin: 0;
		font-size: var(--font-size-small);
		color: var(--muted-foreground);
	}

	.send {
		align-self: flex-start;
	}
`

export const ZWasThisHelpful = c(
	(props) => {
		const [answer, setAnswer] = useState<string>('')
		const [comment, setComment] = useState<string>('')
		const [isSent, setIsSent] = useState(false)

		const page = (props.page as string) || ''

		const send = (isHelpful: boolean, note: string) => {
			props.feedback({ isHelpful, comment: note, page })
			setIsSent(true)
		}

		const handleYes = () => {
			setAnswer('yes')
			send(true, '')
		}

		// No is the answer worth a reason, so it waits for one rather than
		// firing straight away.
		const handleNo = () => {
			setAnswer('no')
		}

		const handleSend = () => send(false, comment)

		if (isSent) {
			return (
				<host shadowDom>
					<p class='thanks'>{(props.thanksLabel as string) || 'Thanks for the feedback.'}</p>
				</host>
			)
		}

		const isNegative = answer === 'no'

		return (
			<host shadowDom>
				<div class='prompt'>
					<p class='question'>{(props.question as string) || 'Was this page helpful?'}</p>
					<div class='choices'>
						<button type='button' class={answer === 'yes' ? 'choice is-chosen' : 'choice'} onclick={handleYes}>
							Yes
						</button>
						<button type='button' class={isNegative ? 'choice is-chosen' : 'choice'} onclick={handleNo}>
							No
						</button>
					</div>
				</div>

				{isNegative && (
					<div class='follow-up'>
						<textarea
							placeholder={(props.commentPlaceholder as string) || 'What was missing or wrong?'}
							value={comment}
							oninput={(inputEvent: Event) => setComment((inputEvent.target as HTMLTextAreaElement).value)}
						/>
						<z-button class='send' size='sm' kind='outline' accent='dom' label='Send' onclick={handleSend} />
					</div>
				)}
			</host>
		)
	},
	{
		props: {
			page: { type: String, reflect: true },
			question: { type: String, reflect: true },
			commentPlaceholder: { type: String, reflect: true },
			thanksLabel: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			feedback: event<{ isHelpful: boolean; comment: string; page: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-was-this-helpful', ZWasThisHelpful)
