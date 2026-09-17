import { c, css, event } from "atomico";
import { defineElement } from "../shared/define-element";
import type { ChatAttachmentT, ChatMessageT } from "./z-chat-types";

const dateValue = (value: Date | string | null | undefined): Date | null => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatTimestamp = (
  value: Date | string | null | undefined,
  locale?: string,
): string => {
  const date = dateValue(value);
  if (!date) return "Time unavailable";
  return new Intl.DateTimeFormat(locale || undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const formatSize = (bytes: number): string => {
  if (!Number.isFinite(bytes)) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2)
    return `${(bytes / 1024).toFixed(1).replace(".0", "")} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1).replace(".0", "")} MB`;
};

const attachmentSource = (attachment: ChatAttachmentT): string =>
  attachment.previewPath || attachment.thumbnailPath || attachment.dataPath;

const writeToClipboard = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand?.("copy");
  textarea.remove();
};

const styles = css`
  :host {
    display: block;
    outline: none;
  }
  :host([is-hidden]) {
    display: none;
  }
  .message {
    display: block;
    padding: var(--space-sm) var(--space-md);
    cursor: default;
  }
  :host(:focus-visible) .message {
    outline: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    min-width: 0;
  }
  :host([from-me]) .content {
    text-align: end;
    align-items: flex-end;
  }
  .meta {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
    margin-bottom: 0.35rem;
  }
  :host([from-me]) .meta {
    flex-direction: row-reverse;
  }
  time,
  .note {
    font-size: 0.625rem;
    color: var(--muted-foreground);
  }
  :host([from-me]) .bubble time,
  :host([from-me]) .bubble .note {
  }
  .subject {
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 0.15rem;
  }
  .bubble {
    position: relative;
    width: fit-content;
    max-width: 75%;
    box-sizing: border-box;
    padding: 0.625rem 0.8rem;
    border-radius: 1.15rem 1.15rem 1.15rem 0.22rem;
    background: var(--color-neutral-2);
    transition:
      box-shadow var(--duration-fast) var(--easing-standard),
      transform var(--duration-fast) var(--easing-standard);
  }
  .bubble::after {
    content: "";
    position: absolute;
    left: -0.22rem;
    bottom: 0;
    width: 0.65rem;
    height: 0.65rem;
    background: inherit;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  :host([from-me]) .bubble {
    border-radius: 1.15rem 1.15rem 0.22rem 1.15rem;
    background: var(--color-neutral-2);
  }
  :host([from-me]) .bubble::after {
    left: auto;
    right: -0.22rem;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
  :host(:focus-visible) .bubble {
    box-shadow:
      0 0 0 2px var(--background),
      0 0 0 4px var(--focus-ring);
  }
  .text {
    font-size: 0.9375rem;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
  .deleted {
    color: var(--muted-foreground);
    font-style: italic;
  }
  .reply {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0.7rem 0 0.8rem;
    padding: 0.4rem 0.625rem;
    border: 1px solid color-mix(in oklch, var(--primary) 48%, var(--border));
    border-radius: 0.75rem;
    background: color-mix(in oklch, var(--foreground) 7%, transparent);
    color: var(--muted-foreground);
    font-size: 0.8125rem;
    text-align: start;
    overflow: hidden;
    overflow-wrap: anywhere;
  }
  :host([from-me]) .reply {
    margin-inline-start: auto;
    border-color: color-mix(
      in oklch,
      var(--primary-foreground) 38%,
      transparent
    );
    align-items: flex-end;
    text-align: end;
    background: color-mix(in oklch, var(--primary-foreground) 11%, transparent);
  }
  .reply-link {
    appearance: none;
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--primary);
    font: inherit;
    font-size: 0.75rem;
    font-weight: 650;
    text-decoration: underline;
    text-underline-offset: 0.15em;
    cursor: pointer;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .reply-link:hover {
    text-decoration-thickness: 2px;
  }
  .attachments {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: var(--space-sm);
  }
  :host([from-me]) .attachments,
  :host([from-me]) .reactions {
    justify-content: flex-end;
  }
  .attachment {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 1fr);
    align-items: center;
    gap: var(--space-sm);
    min-width: min(16rem, 100%);
    max-width: 24rem;
    padding: 0.35rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: inherit;
    text-decoration: none;
  }
  .attachment:hover {
    background: color-mix(in oklch, var(--foreground) 4%, transparent);
  }
  .preview {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-sm);
    background: color-mix(in oklch, var(--foreground) 7%, transparent);
    overflow: hidden;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .file-name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8125rem;
    font-weight: 550;
  }
  .file-size {
    display: block;
    font-size: 0.6875rem;
    color: var(--muted-foreground);
  }
  .reactions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  .footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.65rem;
  }
  .message-actions {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    margin-inline-start: auto;
  }
  .message-action {
    display: grid;
    place-items: center;
    width: 1.55rem;
    height: 1.55rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    opacity: 0.52;
    cursor: pointer;
    transition:
      opacity var(--duration-fast) var(--easing-standard),
      background var(--duration-fast) var(--easing-standard);
  }
  .message-action:hover,
  .message-action:focus-visible {
    background: color-mix(in oklch, currentColor 11%, transparent);
    opacity: 1;
    outline: none;
  }
  .message-action:disabled {
    opacity: 0.2;
    cursor: default;
  }
  .message-action svg {
    width: 0.875rem;
    height: 0.875rem;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.75;
  }
  .reaction {
    position: relative;
    padding: 0.12rem 0.45rem;
    border: 1px solid color-mix(in oklch, currentColor 22%, transparent);
    border-radius: 999px;
    background: color-mix(in oklch, var(--background) 35%, transparent);
    font-size: 0.75rem;
    color: inherit;
    cursor: help;
  }
  .reaction::after {
    content: attr(data-tooltip);
    position: absolute;
    z-index: 3;
    left: 0;
    bottom: calc(100% + 0.45rem);
    width: max-content;
    max-width: 14rem;
    padding: 0.35rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 8px 24px
      color-mix(in oklch, var(--foreground) 16%, transparent);
    font-size: 0.6875rem;
    line-height: 1.35;
    text-align: start;
    white-space: normal;
    opacity: 0;
    pointer-events: none;
    transform: translateY(0.2rem);
    transition:
      opacity var(--duration-fast) var(--easing-standard),
      transform var(--duration-fast) var(--easing-standard);
  }
  :host([from-me]) .reaction::after {
    left: auto;
    right: 0;
  }
  .reaction:hover::after,
  .reaction:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ZChatMessage = c(
  (props) => {
    const message = props.message as ChatMessageT | undefined;
    if (!message) return <host shadowDom />;

    const sender = message.isFromMe
      ? props.meLabel || "You"
      : message.sender || "Unknown sender";
    const reply = props.replyMessage as ChatMessageT | undefined;
    const messageLink = String(
      props.messageLink ||
        (() => {
          if (typeof location === "undefined")
            return `?message=${encodeURIComponent(message.id)}`;
          const url = new URL(location.href);
          url.searchParams.set("message", message.id);
          return url.toString();
        })(),
    );
    const reactions = Object.values(
      (message.reactions || []).reduce<
        Record<string, { emoji: string; actors: string[] }>
      >((all, reaction) => {
        const group = all[reaction.emoji] || {
          emoji: reaction.emoji,
          actors: [],
        };
        group.actors.push(reaction.actor);
        all[reaction.emoji] = group;
        return all;
      }, {}),
    );
    const copyMessage = async (kind: "text" | "link") => {
      const value = kind === "link" ? messageLink : message.text || "";
      await writeToClipboard(value);
      props.messagecopy({ messageId: message.id, kind, value });
    };

    return (
      <host shadowDom tabindex="-1">
        <article
          class="message"
          aria-label={`${sender}, ${formatTimestamp(message.sentAt, props.locale as string)}`}
        >
          <div class="content">
            <div class="bubble">
                <header class="meta">
                  <time dateTime={dateValue(message.sentAt)?.toISOString()}>
                    {formatTimestamp(message.sentAt, props.locale as string)}
                  </time>
                  {message.isEdited && <span class="note">Edited</span>}
                  <span class="note">{message.service}</span>
                </header>
                {reply && (
                  <div class="reply">
                    <button
                      class="reply-link"
                      type="button"
                      onclick={(event: MouseEvent) => {
                        event.stopPropagation();
                        props.replyjump({ messageId: reply.id });
                      }}
                    >
                      Replying to{" "}
                      {reply.isFromMe
                        ? props.meLabel || "You"
                        : reply.sender || "Unknown sender"}
                    </button>
                    <span>
                      {reply.text ||
                        (reply.isDeleted ? "Deleted message" : "Attachment")}
                    </span>
                  </div>
                )}
                {message.subject && (
                  <div class="subject">{message.subject}</div>
                )}
                <div class={`text ${message.isDeleted ? "deleted" : ""}`}>
                  {message.isDeleted ? "Message deleted" : message.text}
                </div>
                <div class="footer">
                  {reactions.length > 0 && (
                    <div class="reactions" aria-label="Reactions">
                      {reactions.map((reaction) => {
                        const actorLabel = reaction.actors.join(", ");
                        return (
                          <span
                            class="reaction"
                            tabindex="0"
                            data-tooltip={actorLabel}
                            aria-label={`${reaction.emoji} from ${actorLabel}`}
                          >
                            {reaction.emoji} {reaction.actors.length}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div class="message-actions" aria-label="Message actions">
                    <button
                      class="message-action copy-text"
                      type="button"
                      aria-label="Copy text"
                      title="Copy text"
                      disabled={!message.text}
                      onclick={(event: MouseEvent) => {
                        event.stopPropagation();
                        void copyMessage("text");
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="9" y="9" width="11" height="11" rx="2" />
                        <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
                      </svg>
                    </button>
                    <button
                      class="message-action copy-link"
                      type="button"
                      aria-label="Copy link"
                      title="Copy link"
                      onclick={(event: MouseEvent) => {
                        event.stopPropagation();
                        void copyMessage("link");
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.15-1.15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            {message.attachments?.length > 0 && (
              <div class="attachments" aria-label="Attachments">
                {message.attachments.map((attachment) => (
                  <a
                    class="attachment"
                    href={attachment.dataPath}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span class="preview">
                      {attachment.mimeType.startsWith("image/") ? (
                        <img
                          src={attachmentSource(attachment)}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        attachment.mimeType.split("/")[0]
                      )}
                    </span>
                    <span>
                      <span class="file-name">
                        {attachment.transferName || attachment.filename}
                      </span>
                      <span class="file-size">
                        {formatSize(attachment.size)}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      </host>
    );
  },
  {
    props: {
      message: { type: Object },
      replyMessage: { type: Object },
      meLabel: { type: String, reflect: true },
      locale: { type: String, reflect: true },
      messageLink: { type: String, reflect: true },
      fromMe: { type: Boolean, reflect: true },
      isHidden: { type: Boolean, reflect: true },
      messagecopy: event<{
        messageId: string;
        kind: "text" | "link";
        value: string;
      }>({ bubbles: true, composed: true }),
      replyjump: event<{ messageId: string }>({
        bubbles: true,
        composed: true,
      }),
    },
    styles,
  },
);

defineElement("z-chat-message", ZChatMessage);
