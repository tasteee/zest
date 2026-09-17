import { c, css, event, useEffect, useHost, useState } from "atomico";
import { defineElement } from "../shared/define-element";
import { themedScrollbarStyles } from "../shared/scrollbar-styles";
import "./z-chat-message";
import type {
  ChatContextRequestT,
  ChatMessageT,
  ChatTranscriptT,
} from "./z-chat-types";

const toDate = (value: Date | string | null | undefined): Date | null => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const dayKey = (value: Date | string | null | undefined): string => {
  const date = toDate(value);
  if (!date) return "unknown";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const dayLabel = (
  value: Date | string | null | undefined,
  locale?: string,
): string => {
  const date = toDate(value);
  if (!date) return "Date unavailable";
  return new Intl.DateTimeFormat(locale || undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const styles = css`
  :host {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    background: var(--background);
    color: var(--foreground);
  }
  :host([is-hidden]) {
    display: none;
  }
  .transcript {
    width: 100%;
    max-width: 52rem;
    margin: 0 auto;
    overflow-y: auto;
  }
  .archive-header {
    display: flex;
    align-items: end;
    gap: var(--space-md);
    padding: var(--space-lg) var(--space-md) var(--space-md);
    border-bottom: 1px solid var(--border);
  }
  .eyebrow {
    margin: 0 0 0.2rem;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-foreground);
  }
  h2 {
    margin: 0;
    font: inherit;
    font-size: 1.125rem;
    font-weight: 650;
  }
  .summary {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }
  .day {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-lg) var(--space-md) var(--space-sm);
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
  }
  .day::before,
  .day::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .day-summary {
    max-width: 42rem;
    margin: 0 auto var(--space-lg);
    padding: 0 var(--space-md);
    color: color-mix(in oklch, var(--foreground) 82%, var(--muted-foreground));
    font-size: clamp(1rem, 1.6vw, 1.125rem);
    font-weight: 500;
    line-height: 1.55;
    letter-spacing: -0.012em;
    text-align: center;
  }
  .empty {
    padding: var(--space-xl) var(--space-md);
    text-align: center;
    color: var(--muted-foreground);
  }
  @media (max-width: 36rem) {
    .archive-header {
      align-items: start;
      flex-direction: column;
    }
  }
`;

export const ZChatTranscript = c(
  (props) => {
    const host = useHost();
    const chat = props.chat as ChatTranscriptT | undefined;
    const messages = chat?.messages || [];
    const [visibleMessageIds, setVisibleMessageIds] = useState<string[]>([]);
    const byId = new Map(messages.map((message) => [message.id, message]));
    const syncVisibleWindow = (surface: HTMLElement | null) => {
      if (!surface) return;
      const top = surface.scrollTop;
      const bottom = top + surface.clientHeight;
      const next = [
        ...surface.querySelectorAll<HTMLElement>(
          "z-chat-message[data-message-id]",
        ),
      ]
        .filter(
          (element) =>
            element.offsetTop + element.offsetHeight >= top &&
            element.offsetTop <= bottom,
        )
        .map((element) => element.dataset.messageId || "")
        .filter(Boolean);
      if (next.join("|") !== visibleMessageIds.join("|"))
        setVisibleMessageIds(next);
    };

    useEffect(() => {
      const element = host.current as unknown as HTMLElement & {
        getVisibleMessages: () => ChatMessageT[];
        getMessagesAround: (
          messageIds: string[],
          limit?: number,
        ) => ChatMessageT[];
      };
      element.getVisibleMessages = () =>
        messages.filter((message) => visibleMessageIds.includes(message.id));
      element.getMessagesAround = (
        messageIds,
        limit = Number(props.contextWindow) || 6,
      ) => {
        const indexes = messageIds
          .map((id) => messages.findIndex((message) => message.id === id))
          .filter((index) => index >= 0);
        if (!indexes.length) return [];
        return messages.slice(
          Math.max(0, Math.min(...indexes) - limit),
          Math.min(messages.length, Math.max(...indexes) + limit + 1),
        );
      };
    }, [messages, props.contextWindow, visibleMessageIds]);

    useEffect(() => {
      const surface = host.current?.shadowRoot?.querySelector(
        ".transcript",
      ) as HTMLElement | null;
      const frame = requestAnimationFrame(() => {
        syncVisibleWindow(surface);
        if (typeof location !== "undefined") {
          const linkedId = new URL(location.href).searchParams.get("message");
          const target = linkedId
            ? (host.current?.shadowRoot?.querySelector(
                `[data-message-id="${CSS.escape(linkedId)}"]`,
              ) as HTMLElement | null)
            : null;
          target?.scrollIntoView({ block: "center" });
        }
      });
      return () => cancelAnimationFrame(frame);
    }, [messages]);

    const emitRequest = (detail: ChatContextRequestT) =>
      (
        props.contextrequest as unknown as (
          value: ChatContextRequestT,
        ) => boolean
      )(detail);

    const requestContext = (event: Event) => {
      const { value: query } = (event as CustomEvent<{ value: string }>).detail;
      if (!chat) return;
      const fallbackCount = Number(props.contextWindow) || 6;
      emitRequest({
        kind: "visible",
        chatId: chat.id,
        query,
        messageIds: visibleMessageIds.length
          ? visibleMessageIds
          : messages.slice(0, fallbackCount).map((message) => message.id),
      });
    };

    const updateVisibleWindow = (event: Event) =>
      syncVisibleWindow(event.currentTarget as HTMLElement);

    const jumpToReply = (event: Event) => {
      const { messageId } = (event as CustomEvent<{ messageId: string }>)
        .detail;
      const target = host.current?.shadowRoot?.querySelector(
        `[data-message-id="${CSS.escape(messageId)}"]`,
      ) as HTMLElement | null;
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus({ preventScroll: true });
    };

    if (!chat)
      return (
        <host shadowDom>
          <div class="empty">
            <slot />
          </div>
        </host>
      );

    return (
      <host shadowDom onreplyjump={jumpToReply} onask={requestContext}>
        <section
          class="transcript"
          aria-label={`Archived conversation: ${chat.displayName}`}
          onscroll={updateVisibleWindow}
        >
          {/* <header class="archive-header">
						<div>
							<p class="eyebrow">Archived conversation</p>
							<h2>{chat.displayName}</h2>
							<div class="summary">{messages.length} messages · {chat.participants.length} participants</div>
						</div>
					</header> */}

          {messages.length === 0 && (
            <div class="empty">No messages in this conversation.</div>
          )}
          {messages.map((message, index) => {
            const previous = messages[index - 1];
            const showDay =
              !previous || dayKey(previous.sentAt) !== dayKey(message.sentAt);
            return (
              <>
                {showDay && (
                  <>
                    <div class="day" role="separator">
                      {dayLabel(message.sentAt, props.locale as string)}
                    </div>
                    {chat.daySummaries?.[dayKey(message.sentAt)] && (
                      <p class="day-summary">
                        {chat.daySummaries[dayKey(message.sentAt)]}
                      </p>
                    )}
                  </>
                )}
                <z-chat-message
                  data-message-id={message.id}
                  data-day-key={dayKey(message.sentAt)}
                  message={message}
                  replyMessage={
                    message.replyToMessageId
                      ? byId.get(message.replyToMessageId)
                      : undefined
                  }
                  meLabel={props.meLabel}
                  locale={props.locale}
                  fromMe={message.isFromMe}
                />
              </>
            );
          })}
        </section>
        <slot name="assistant" />
      </host>
    );
  },
  {
    props: {
      chat: { type: Object },
      contextWindow: { type: Number, reflect: true, value: () => 6 },
      meLabel: { type: String, reflect: true, value: () => "You" },
      locale: { type: String, reflect: true },
      isHidden: { type: Boolean, reflect: true },
      contextrequest: event<ChatContextRequestT>({
        bubbles: true,
        composed: true,
      }),
    },
    styles: [themedScrollbarStyles, styles],
  },
);

defineElement("z-chat-transcript", ZChatTranscript);
