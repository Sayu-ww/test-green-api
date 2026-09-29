import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatApi, ChatService } from '@units/chat'

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ChatApi.Methods.PostSendMessage,
    onSuccess: (response, payload) => {
      const message: ChatApi.Methods.ChatHistoryMessage = {
        idMessage: String(response.idMessage),
        timestamp: Math.floor(Date.now() / 1000),
        type: 'outgoing',
        chatId: payload.chatId,
        textMessage: payload.message,
      }

      ChatService.Queries.upsertChatHistoryMessage(queryClient, payload.chatId, message)
    },
  })
}
