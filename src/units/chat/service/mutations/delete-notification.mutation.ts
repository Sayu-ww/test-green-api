import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatApi, ChatService } from '@units/chat'

import { chatHistoryQueryKey } from '../queries/chat-history.query'
import { receiveNotificationQueryKey } from '../queries/receive-notification.query'

export type DeleteNotificationPayload = {
  receiptId: number
  chatId?: string
}

export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient()
  const idInstance = ChatService.Store.useTokensStore((state) => state.idInstance)

  return useMutation({
    mutationFn: ({ receiptId }: DeleteNotificationPayload) => ChatApi.Methods.DeleteNotification(receiptId),
    onSuccess: (_result, payload) => {
      const invalidations = [
        queryClient.invalidateQueries({ queryKey: receiveNotificationQueryKey(idInstance) }),
      ]

      if (payload.chatId) {
        invalidations.push(queryClient.invalidateQueries({ queryKey: chatHistoryQueryKey(payload.chatId) }))
      }

      return Promise.all(invalidations)
    },
  })
}
