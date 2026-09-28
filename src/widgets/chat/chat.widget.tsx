import { ChatApi, ChatService } from '@units/chat'
import { useEffect, useRef, useState } from 'react'

import { ChatConversation, ChatHeader, ChatSwitchModal } from './ui'

const normalizePhone = (value: string) => value.replace(/\D/g, '')
const getChatId = (chat: ChatApi.Methods.ChatInfo) =>
  typeof chat.id === 'string' ? chat.id : typeof chat.chatId === 'string' ? chat.chatId : undefined

export function ChatWidget() {
  const [draft, setDraft] = useState('')
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [nextPhone, setNextPhone] = useState('')
  const [selectionError, setSelectionError] = useState('')

  const {
    idInstance,
    apiTokenInstance,
    phone,
    chatId: activeChatId,
    setTokens,
  } = ChatService.Store.useTokensStore()
  const {
    data: chats = [],
    isPending: isChatsPending,
    isError: isChatsError,
  } = ChatService.Queries.useChats()
  const { data, isError: isHistoryError } = ChatService.Queries.useChatHistory(activeChatId)
  const notificationQuery = ChatService.Queries.useReceiveNotification()
  const {
    mutate: deleteNotification,
    isPending: isDeletingNotification,
    isError: isDeleteNotificationError,
  } = ChatService.Mutations.useDeleteNotificationMutation()
  const sendMessageMutation = ChatService.Mutations.useSendMessageMutation()
  const processedReceiptId = useRef<number | null>(null)

  useEffect(() => {
    const notification = notificationQuery.data

    if (!notification || isDeletingNotification || processedReceiptId.current === notification.receiptId) {
      return
    }

    processedReceiptId.current = notification.receiptId
    deleteNotification({
      receiptId: notification.receiptId,
      chatId: notification.body.senderData?.chatId,
    })
  }, [deleteNotification, isDeletingNotification, notificationQuery.data])

  const messages = [...(data ?? [])]
    .sort((firstMessage, secondMessage) => firstMessage.timestamp - secondMessage.timestamp)
    .map((message) => ({
      ...message,
      text: message.textMessage ?? message.extendedTextMessage?.text ?? '',
      isMine: message.type.toLowerCase().includes('outgoing'),
    }))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()

    if (!text || !activeChatId) return

    sendMessageMutation.mutate(
      {
        chatId: activeChatId,
        message: text,
        typingTime: 0,
      },
      { onSuccess: () => setDraft('') },
    )
  }

  const handleOpenPhoneModal = () => {
    setNextPhone(phone ?? '')
    setIsPhoneModalOpen(true)
  }

  const handleSwitchChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedPhone = normalizePhone(nextPhone)

    if (!normalizedPhone) return

    const chat = chats.find((item) => {
      return item.type === 'user' && normalizePhone(String(item.phoneNumber)) === normalizedPhone
    })

    if (!chat) {
      setSelectionError(
        isChatsError
          ? 'Не удалось загрузить список чатов. Проверьте подключение и попробуйте снова.'
          : 'Чат с таким номером не найден.',
      )
      return
    }

    const chatId = getChatId(chat)
    if (!chatId) return

    setTokens({
      idInstance,
      apiTokenInstance,
      phone: normalizedPhone,
      chatId,
    })
    setDraft('')
    setSelectionError('')
    setIsPhoneModalOpen(false)
  }

  return (
    <>
      <main className="bg-primary flex max-h-screen min-h-dvh flex-col px-4 py-5 text-stone-100 sm:px-8 sm:py-8">
        <ChatHeader phone={phone ?? ''} onOpenModal={handleOpenPhoneModal} />

        <ChatConversation
          messages={messages}
          draft={draft}
          error={
            isChatsError
              ? 'Не удалось загрузить список чатов.'
              : isHistoryError
                ? 'Не удалось загрузить историю сообщений.'
                : notificationQuery.isError || isDeleteNotificationError
                  ? 'Не удалось получить или подтвердить уведомление Green API.'
                  : sendMessageMutation.isError
                    ? 'Не удалось отправить сообщение.'
                    : ''
          }
          isDisabled={!activeChatId || sendMessageMutation.isPending}
          onDraftChange={setDraft}
          onSubmit={handleSubmit}
        />
      </main>

      <ChatSwitchModal
        isOpen={isPhoneModalOpen}
        phone={nextPhone}
        error={selectionError}
        isLoading={isChatsPending}
        onPhoneChange={(value) => {
          setNextPhone(value)
          setSelectionError('')
        }}
        onClose={() => setIsPhoneModalOpen(false)}
        onSubmit={handleSwitchChat}
      />
    </>
  )
}
