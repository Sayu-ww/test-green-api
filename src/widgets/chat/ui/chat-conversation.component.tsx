import { SharedUi } from '@shared'
import { useEffect, useRef } from 'react'

type ChatMessageItem = {
  idMessage: string
  timestamp: number
  text: string
  isMine: boolean
}

type Props = {
  messages: ChatMessageItem[]
  draft: string
  error: string
  isDisabled: boolean
  onDraftChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function ChatConversation(props: Props) {
  const { messages, draft, error, isDisabled, onDraftChange, onSubmit } = props
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageId = messages.at(-1)?.idMessage

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [messages.length, lastMessageId])

  return (
    <section className="bg-surface mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-b-md border border-white/10 shadow-2xl shadow-black/30">
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-7">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.idMessage}
              className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.isMine ? 'bg-message rounded-br-md' : 'bg-message-alt rounded-bl-md text-white'}`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-4 text-center text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-white/10 p-4 sm:p-5">
        <div className="bg-surface-strong flex items-end gap-2 rounded-2xl p-2 pl-4">
          <textarea
            value={draft}
            disabled={isDisabled}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                event.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder="Написать сообщение..."
            rows={1}
            aria-label="Текст сообщения"
            className="placeholder:text-muted max-h-28 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-white outline-none"
          />
          <SharedUi.Button
            type="submit"
            disabled={!draft.trim() || isDisabled}
            aria-label="Отправить сообщение"
            className="bg-message hover:bg-message/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition disabled:cursor-not-allowed"
          >
            <span className="-rotate-45 text-lg text-white">➤</span>
          </SharedUi.Button>
        </div>
        <p className="text-muted mt-2 hidden text-center text-xs sm:block">
          Enter — отправить, Shift + Enter — новая строка
        </p>
      </form>
    </section>
  )
}
